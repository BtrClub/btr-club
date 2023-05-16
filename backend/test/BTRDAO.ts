import chai from "chai"
import { expect } from "chai";
import { ethers, network } from "hardhat";
import { solidity } from "ethereum-waffle";
chai.use(solidity);


describe("BTRDAO", function () {
   it("Should be able to create a proposal", async() => {
     const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
     const NFT = await ethers.getContractFactory("Airdrop");
     const nft = await NFT.connect(owner).deploy();
     await nft.deployed();
     const BTRDAO = await ethers.getContractFactory("BTRDAO");
     const btrdao = await BTRDAO.deploy(nft.address, addr1.address, addr2.address);
     await btrdao.deployed();
     await nft.connect(owner).sendTierOneDAONFT();
     await nft.connect(owner).sendTierTwoDAONFT();
     await btrdao.connect(owner).createProposal("The Man In The Middle", "Hello")
     
     await network.provider.send("evm_increaseTime", [86400]);
     await network.provider.send("evm_mine");

     await btrdao.connect(owner).createProposal("The Man In The Middle","Biscuit"); 
     const currentIndex = await btrdao.currentIndex();
     expect(currentIndex).to.equal(2)
   })

   xit("Should not be able to create a propoosal", async() => {
       const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
       const NFT = await ethers.getContractFactory("Airdrop");
       const nft = await NFT.connect(owner).deploy();
       await nft.deployed();
       
       const BTRDAO = await ethers.getContractFactory("BTRDAO");
       const btrdao = await BTRDAO.deploy(nft.address, addr1.address, addr2.address);
       await btrdao.deployed();
       
       await nft.connect(owner).sendTierOneDAONFT();
       await nft.connect(owner).sendTierTwoDAONFT();
       await btrdao.connect(owner).createProposal("The Man In The Middle", "Hello");
       const createSecondProposal = btrdao.connect(owner).createProposal("The Man In The Middle", "Hello")
       await expect(createSecondProposal).to.be.revertedWith("CANT_MAKE_PROPOSAL_YET");

       const noNFT = btrdao.connect(addr1).createProposal("The Man In The Middle", "Hello")
       await expect(noNFT).to.be.revertedWith("NFT_BALANCE_EMPTY");
   })

   it("Should be able to accept and deny a proposal", async() => {
     const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
     const NFT = await ethers.getContractFactory("Airdrop");
     const nft = await NFT.connect(owner).deploy();
     await nft.deployed();
     
     const BTRDAO = await ethers.getContractFactory("BTRDAO");
     const btrdao = await BTRDAO.deploy(nft.address, addr1.address, addr2.address);
     await btrdao.deployed();
     
     await nft.connect(owner).sendTierOneDAONFT();
     await nft.connect(owner).sendTierTwoDAONFT();
     await btrdao.connect(owner).createProposal("The Man In The Middle", "Hello");
     await btrdao.connect(addr1).acceptOrDenyProposal(true, 0)
     
     await network.provider.send("evm_increaseTime", [86400]);
     await network.provider.send("evm_mine");
    
     await btrdao.connect(owner).createProposal("The Man In The Middle", "Biscuit");
     await btrdao.connect(addr2).acceptOrDenyProposal(false, 1);
     
   })

   xit("Should not be able to create or deny a proposal", async() => {
      const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
      const NFT = await ethers.getContractFactory("Airdrop");
      const nft = await NFT.connect(owner).deploy();
      await nft.deployed();
      
      const BTRDAO = await ethers.getContractFactory("BTRDAO");
      const btrdao = await BTRDAO.deploy(nft.address, addr1.address, addr2.address);
      await btrdao.deployed();
      
      const dontExist = btrdao.connect(addr2).acceptOrDenyProposal(true, 0);
      await expect(dontExist).to.be.rejectedWith("PROPOSAL_DOESNT_EXIST");
      
      await nft.connect(owner).sendTierOneDAONFT();
      await nft.connect(owner).sendTierTwoDAONFT();
      await btrdao.connect(owner).createProposal("The Man In The Middle","Hello");
      const notOwner = btrdao.connect(addr3).acceptOrDenyProposal(true, 0);
      await expect(notOwner).to.be.rejectedWith("NOT_AN_OWNER");
      
      await network.provider.send("evm_increaseTime", [86400]);
      await network.provider.send("evm_mine");
      await btrdao.connect(owner).createProposal("The Man In The Middle", "Biscuit");
      await btrdao.connect(addr2).acceptOrDenyProposal(true, 0);
      const alreadyValidated = btrdao.connect(addr1).acceptOrDenyProposal(false, 0);
      await expect(alreadyValidated).to.be.revertedWith("PROPOSAL_ALREADY_VALIDATED");
      
   })

   it("Should be able to vote on proposal", async() => {
     const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
     const NFT = await ethers.getContractFactory("Airdrop");
     const nft = await NFT.connect(owner).deploy();
     await nft.deployed();
     
     await nft.connect(owner).sendTierOneDAONFT();
     await nft.connect(owner).sendTierTwoDAONFT();
     const BTRDAO = await ethers.getContractFactory("BTRDAO");
     const btrdao = await BTRDAO.deploy(nft.address, addr1.address, addr2.address);
     await btrdao.deployed();



     await btrdao.connect(owner).createProposal("The Man In The Middle", "Hello");
     await btrdao.connect(addr2).acceptOrDenyProposal(true, 0);
     await btrdao.connect(owner).voteOnProposal(0,0)
   })

   xit("Should not be able to vote on proposal", async() => {
      const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
      const NFT = await ethers.getContractFactory("Airdrop");
      const nft = await NFT.connect(owner).deploy();
      await nft.deployed();
      await nft.connect(owner).sendTierOneDAONFT();
      await nft.connect(owner).sendTierTwoDAONFT();

      
      const BTRDAO = await ethers.getContractFactory("BTRDAO");
      const btrdao = await BTRDAO.deploy(nft.address, addr1.address, addr2.address);
      await btrdao.deployed();
      
      await btrdao.connect(owner).createProposal("The Man In The Middle", "Hello");
      await btrdao.connect(addr2).acceptOrDenyProposal(false, 0);
      const noNFT = btrdao.connect(addr3).voteOnProposal(0,0)
      const denied = btrdao.connect(owner).voteOnProposal(0,0)

      await expect(noNFT).to.be.rejectedWith("NFT_BALANCE_EMPTY");
      await expect(denied).to.be.rejectedWith("PROPOSAL_HASNT_BEEN_ACCEPTED");

      await network.provider.send("evm_increaseTime", [86400]);
      await network.provider.send("evm_mine");

      await btrdao.connect(owner).createProposal("The Man In The Middle", "Biscuit");
      await btrdao.connect(addr2).acceptOrDenyProposal(true, 1);
      await btrdao.connect(owner).voteOnProposal(0,1)
      const alreadyVoted = btrdao.connect(owner).voteOnProposal(0,1);
      await expect(alreadyVoted).to.be.rejectedWith("ALREADY_VOTED");

      await network.provider.send("evm_increaseTime", [2592000]);
      await network.provider.send("evm_mine");
      
      const timePassed = btrdao.connect(addr4).voteOnProposal(0, 1);
      await expect(timePassed).to.be.rejectedWith("DEADLINE_PASSED");

   })

   it("Should be able to execute proposal", async() => {
     const [owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10, addr11, addr12, addr13, addr14, addr15, addr16, addr17, addr18, addr19, addr20] = await ethers.getSigners();
     const NFT = await ethers.getContractFactory("Airdrop");
     const nft = await NFT.connect(owner).deploy();
     await nft.deployed();
     await nft.connect(owner).sendTierOneDAONFT();
     await nft.connect(owner).sendTierTwoDAONFT();

     
     const BTRDAO = await ethers.getContractFactory("BTRDAO");
     const btrdao = await BTRDAO.deploy(nft.address,addr1.address,addr2.address);
     await btrdao.deployed();
      
     await btrdao.connect(owner).createProposal("The Man In The Middle","Hello");
     await btrdao.connect(addr2).acceptOrDenyProposal(true, 0);
     await btrdao.connect(owner).voteOnProposal(0, 0);
     
     
     await btrdao.connect(addr1).voteOnProposal(0, 0);

     
     await btrdao.connect(addr2).voteOnProposal(0, 0);

    
     await btrdao.connect(addr3).voteOnProposal(0, 0);

    
     await btrdao.connect(addr4).voteOnProposal(0, 0);

     
     await btrdao.connect(addr5).voteOnProposal(0, 0);

     
     await btrdao.connect(addr6).voteOnProposal(0, 0);

    
     await btrdao.connect(addr7).voteOnProposal(0, 0);

     
     await btrdao.connect(addr8).voteOnProposal(0, 0);

     
     await btrdao.connect(addr9).voteOnProposal(0, 0);

     
     await btrdao.connect(addr10).voteOnProposal(0, 0);

     
     await btrdao.connect(addr11).voteOnProposal(0, 0);

     
     await btrdao.connect(addr12).voteOnProposal(0, 0);

     
     await btrdao.connect(addr13).voteOnProposal(0, 0);

     
     await btrdao.connect(addr14).voteOnProposal(0, 0);

     
     await btrdao.connect(addr15).voteOnProposal(0, 0);

     await btrdao.connect(addr16).voteOnProposal(1, 0);

     await btrdao.connect(addr17).voteOnProposal(1, 0);

     await btrdao.connect(addr18).voteOnProposal(1, 0);

     await btrdao.connect(addr19).voteOnProposal(1, 0);

      await network.provider.send("evm_increaseTime", [2592000]);
      await network.provider.send("evm_mine");

     await btrdao.connect(addr1).executeProposal(0)
     const totalVotes = (await btrdao.btrProposals(0))
     console.log(totalVotes.votedYes)
   })

   it("Should not be able to execute a proposal", async() => {
     const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
      const NFT = await ethers.getContractFactory("Airdrop");
      const nft = await NFT.connect(owner).deploy();
      await nft.deployed();
      await nft.connect(owner).sendTierOneDAONFT();
      await nft.connect(owner).sendTierTwoDAONFT();

      const BTRDAO = await ethers.getContractFactory("BTRDAO");
      const btrdao = await BTRDAO.deploy(nft.address, addr1.address, addr2.address);
      await btrdao.deployed();

      await btrdao.connect(owner).createProposal("The Man In The Middle", "Hello");
      await btrdao.connect(addr2).acceptOrDenyProposal(true, 0);
      await btrdao.connect(owner).voteOnProposal(0, 0);

      const minimumVotes = btrdao.connect(addr1).executeProposal(0);

      await expect(minimumVotes).to.be.rejectedWith("MINIMUM_OF_15_VOTES");
   })

   

   it("Should be able to withdraw funds from contract", async() => {
    const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    const BTRDAO = await ethers.getContractFactory("BTRDAO");
    const btrdao = await BTRDAO.deploy(addr4.address,addr1.address,addr2.address);
    await btrdao.deployed()
    let receiverAddress = btrdao.address
    let tx = {
      to: receiverAddress,
      value: ethers.utils.parseEther("1"),
    };
    await owner.sendTransaction(tx);

    await btrdao.connect(addr1).withdrawAnyFunds()
   })

   it("Should be able to view a proposal", async() => {
     const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
     const NFT = await ethers.getContractFactory("Airdrop");
     const nft = await NFT.connect(owner).deploy();
     await nft.deployed();
     await nft.connect(owner).sendTierOneDAONFT();
     await nft.connect(owner).sendTierTwoDAONFT();
     
     const BTRDAO = await ethers.getContractFactory("BTRDAO");
     const btrdao = await BTRDAO.deploy(nft.address,addr1.address,addr2.address);
     await btrdao.deployed();

     await btrdao.connect(owner).createProposal("The Man In The Middle", "Hello");
     const proposal = await btrdao.viewACreatedProposal(0)
     console.log(proposal)
   })
});
