export const ADDRESS = "0xcb9738c2Fad448bc324c5063B3E04f90b58dfe98";
export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_btrNFTAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_secondOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ALREADY_VOTED",
    type: "error",
  },
  {
    inputs: [],
    name: "CANT_MAKE_PROPOSAL_YET",
    type: "error",
  },
  {
    inputs: [],
    name: "DEADLINE_PASSED",
    type: "error",
  },
  {
    inputs: [],
    name: "HASNT_BEEN_30_DAYS",
    type: "error",
  },
  {
    inputs: [],
    name: "MINIMUM_OF_15_VOTES",
    type: "error",
  },
  {
    inputs: [],
    name: "NFT_BALANCE_EMPTY",
    type: "error",
  },
  {
    inputs: [],
    name: "NOT_AN_OWNER",
    type: "error",
  },
  {
    inputs: [],
    name: "NOT_ENOUGH_YES_VOTES",
    type: "error",
  },
  {
    inputs: [],
    name: "PROPOSAL_ALREADY_VALIDATED",
    type: "error",
  },
  {
    inputs: [],
    name: "PROPOSAL_DOESNT_EXIST",
    type: "error",
  },
  {
    inputs: [],
    name: "PROPOSAL_HASNT_BEEN_ACCEPTED",
    type: "error",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_acceptProposal",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "acceptOrDenyProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "bTRNFTAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "btrProposals",
    outputs: [
      {
        internalType: "bytes",
        name: "title",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "proposal",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "proposalOwner",
        type: "address",
      },
      {
        internalType: "bool",
        name: "proposalAccepted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "proposalAlreadyValidated",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "proposalExecuted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "votedYes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votedNo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalDeadline",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_proposal",
        type: "string",
      },
    ],
    name: "createProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "executeProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "secondOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "viewACreatedProposal",
    outputs: [
      {
        internalType: "string",
        name: "proposal",
        type: "string",
      },
      {
        internalType: "address",
        name: "proposalOwner",
        type: "address",
      },
      {
        internalType: "bool",
        name: "proposalAccepted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "proposalAlreadyValidated",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "proposalExecuted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "votedYes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votedNo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalDeadline",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum BTRDAO.Vote",
        name: "vote",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "voteOnProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAnyFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];