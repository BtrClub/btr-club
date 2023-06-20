//SPDX-License-Identifier: Unlicense
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

pragma solidity ^0.8.19;

contract BTRDAO {
    error NFT_BALANCE_EMPTY();
    error CANT_MAKE_PROPOSAL_YET();
    error PROPOSAL_HASNT_BEEN_ACCEPTED();
    error PROPOSAL_DOESNT_EXIST();
    error NOT_AN_OWNER();
    error PROPOSAL_ALREADY_VALIDATED();
    error ALREADY_VOTED();
    error MINIMUM_OF_15_VOTES();
    error NOT_ENOUGH_YES_VOTES();
    error HASNT_BEEN_30_DAYS();
    error DEADLINE_PASSED();

    enum Vote {
    YES, 
    No 
  }

    address public bTRNFTAddress;
    address public owner;
    address public secondOwner;
    uint public currentIndex;

    constructor(address _btrNFTAddress, address _owner, address _secondOwner) {
       bTRNFTAddress = _btrNFTAddress;
       owner = _owner;
       secondOwner = _secondOwner;
    }

    modifier doYouHoldBTRNFTS {
      bool hasDAONFT = (IERC1155(bTRNFTAddress).balanceOf(msg.sender, 1) > 0) || (IERC1155(bTRNFTAddress).balanceOf(msg.sender, 2) > 0);
        if(hasDAONFT == false) {
          revert NFT_BALANCE_EMPTY();
        }
        _;
    }

     modifier canYouMakeAnotherProposal {
        if(timeToCreateAnotherProposal[msg.sender] > block.timestamp) {
           revert CANT_MAKE_PROPOSAL_YET();
        }
        _;
    }

    modifier hasProposalBeenAccepted(uint index) {
      BTRProposal storage selectedBTRProposal = btrProposals[index];
        if(selectedBTRProposal.proposalAccepted == false) {
           revert PROPOSAL_HASNT_BEEN_ACCEPTED();
        }
        _;
    }

    modifier isProposalStillActive(uint index) {
      BTRProposal storage selectedBTRProposal = btrProposals[index];
      if(block.timestamp > selectedBTRProposal.proposalDeadline) {
        revert DEADLINE_PASSED();
      }
      _;
    }

     modifier canProposalBeAccepted(uint index) {
      BTRProposal storage selectedBTRProposal = btrProposals[index];
      bool isSenderAnOwner = (msg.sender == owner || msg.sender == secondOwner);
        if(selectedBTRProposal.proposalOwner == address(0)) {
           revert PROPOSAL_DOESNT_EXIST();
        }
        if(isSenderAnOwner == false) {
          revert NOT_AN_OWNER();
        }

        if(selectedBTRProposal.proposalAlreadyValidated == true) {
          revert PROPOSAL_ALREADY_VALIDATED();
        }
        _;
    }

    modifier haveYouVotedAlready(uint index) {
       BTRProposal storage selectedBTRProposal = btrProposals[index];
       if(selectedBTRProposal.votedAlready[msg.sender] == true) {
         revert ALREADY_VOTED();
       }
      _;
    }

    modifier canProposalBeExecuted(uint index) {
       BTRProposal storage selectedBTRProposal = btrProposals[index];
       bool isSenderAnOwner = (msg.sender == owner || msg.sender == secondOwner);
       bool hasDeadlinePassed = (selectedBTRProposal.proposalDeadline > block.timestamp && selectedBTRProposal.totalVotes != 100);
       if(selectedBTRProposal.totalVotes < 15) {
         revert MINIMUM_OF_15_VOTES();
       } 

       if(selectedBTRProposal.votedNo >= selectedBTRProposal.votedYes) {
         revert NOT_ENOUGH_YES_VOTES();
       }
        
        if(isSenderAnOwner == false) {
          revert NOT_AN_OWNER();
        }
        
        if(hasDeadlinePassed) {
          revert HASNT_BEEN_30_DAYS();
        }  
       _;
    }

    
    
    struct BTRProposal {
      bytes title;
      bytes proposal;
      address proposalOwner;
      bool proposalAccepted;
      bool proposalAlreadyValidated;
      bool proposalExecuted;
      uint votedYes;
      uint votedNo;
      uint totalVotes;
      uint proposalDeadline;
      mapping(address => bool) votedAlready;
    }
    
    mapping(uint => BTRProposal) public btrProposals;


    mapping(address => uint) timeToCreateAnotherProposal;


    function createProposal(string calldata _title, string calldata _proposal) external doYouHoldBTRNFTS canYouMakeAnotherProposal {
      BTRProposal storage currentBTRProposal = btrProposals[currentIndex];
      currentBTRProposal.title = abi.encode(_title);
      currentBTRProposal.proposal = abi.encode(_proposal);
      currentBTRProposal.proposalOwner = msg.sender;
      timeToCreateAnotherProposal[msg.sender] = block.timestamp + 24 hours;
      currentIndex++;
    }


    function acceptOrDenyProposal(bool _acceptProposal, uint index) external canProposalBeAccepted(index) {
       BTRProposal storage selectedBTRProposal = btrProposals[index];
       if(_acceptProposal == true) {
        selectedBTRProposal.proposalAccepted = true;
        selectedBTRProposal.proposalDeadline = block.timestamp + 30 days;
       } else {
        selectedBTRProposal.proposalAccepted = false;
       }
       selectedBTRProposal.proposalAlreadyValidated = true;
    }

    function voteOnProposal(Vote vote, uint index) external doYouHoldBTRNFTS haveYouVotedAlready(index) hasProposalBeenAccepted(index) isProposalStillActive(index) {
      BTRProposal storage selectedBTRProposal = btrProposals[index];
      if(vote == Vote.YES) {
        if(IERC1155(bTRNFTAddress).balanceOf(msg.sender, 1) > 0) {
          selectedBTRProposal.votedYes += 200;
        } else if(IERC1155(bTRNFTAddress).balanceOf(msg.sender, 2) > 0) {
          selectedBTRProposal.votedYes += 100;
        }
      } else {
          if(IERC1155(bTRNFTAddress).balanceOf(msg.sender, 1) > 0) {
          selectedBTRProposal.votedNo += 200;
        } else if(IERC1155(bTRNFTAddress).balanceOf(msg.sender, 2) > 0) {
          selectedBTRProposal.votedNo += 100;
        }
      }
      selectedBTRProposal.totalVotes++;
      selectedBTRProposal.votedAlready[msg.sender] = true;
    }

   //Either anybody from the DAO can execute the proposal or only the owners of the DAO can execute the propoosal
    function executeProposal(uint index) external canProposalBeExecuted(index) {
       BTRProposal storage selectedBTRProposal = btrProposals[index];
       selectedBTRProposal.proposalExecuted = true;
    }

    function withdrawAnyFunds() external {
      require(address(this).balance > 0, "NO_BALANCE_TO_WITHDRAW");
      require(msg.sender == owner || msg.sender == secondOwner, "NOT_OWNER");
      (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
      require(success, "TRANSFER_FAILED");
    }

    function viewACreatedProposal(uint index) external view returns(string memory proposal, address proposalOwner, bool proposalAccepted, bool proposalAlreadyValidated, bool proposalExecuted, uint votedYes, uint votedNo, uint totalVotes, uint proposalDeadline) {
       BTRProposal storage selectedBTRProposal = btrProposals[index];
       (proposal) = abi.decode(selectedBTRProposal.proposal, (string));
       return(proposal, selectedBTRProposal.proposalOwner, selectedBTRProposal.proposalAccepted, selectedBTRProposal.proposalAlreadyValidated, selectedBTRProposal.proposalExecuted, selectedBTRProposal.votedYes, selectedBTRProposal.votedNo, selectedBTRProposal.totalVotes, selectedBTRProposal.proposalDeadline);
    }

    receive() external payable {}
    fallback() external payable {}
}