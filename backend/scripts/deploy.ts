import { ethers } from "hardhat";
require("dotenv").config({ path: ".env" });

async function main() {
  const Airdrop = await ethers.getContractFactory("Airdrop");
  const airdrop = await Airdrop.deploy();

  console.log("Airdrop deployed to:", airdrop.address);

   const Dao = await ethers.getContractFactory("BTRDAO");
   const dao = await Dao.deploy(
     airdrop.address,
     "0xdfb91F19312914495F19401fF806ef5f4DCa3756"
   );

   console.log("Dao deployed to:", dao.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
