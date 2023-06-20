import React from "react";
import Image from "next/image";
import { Card } from "@web3uikit/core";

import Tier1 from "../public/assets/tier1.png";
import Tier2 from "../public/assets/tier2.png";
import {AIRDROP_ADDRESS, AIRDROP_ABI} from "../constants"
import { useContract, useSigner } from "wagmi";

export default function Claim() {

   const { data: signer } = useSigner();

  const contract = useContract({
    address: AIRDROP_ADDRESS,
    abi: AIRDROP_ABI,
    signerOrProvider: signer,
  });

  const claimTierOne = async () => {
    await contract.sendTierOneDAONFT();
  };


  const claimTierTwo = async () => {
    await contract.sendTierTwoDAONFT();
  };


  return (
    <section className="w-full h-screen text-center">
      <section className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-white text-5xl drop-shadow-lg">
          CLAIM YOUR BTR INVESTMENT CLUB NFT
        </h1>
        <section className="w-3/4 flex justify-evenly mt-10">
          <section className="flex flex-col justify-center items-center w-1/3">
            <h2 className="my-4 text-white">Generals Claim</h2>
            <section className="w-40 md:w-72">
              <Card
                onClick={function noRefCheck() {}}
                setIsSelected={function noRefCheck() {}}
                title="BLACK CARD"
                description="TIER 1"
                className="bg-white h-60 md:h-full"
              >
                <Image
                  src={Tier1}
                  alt="Tier 1 NFT"
                  className="rounded-3xl p-2"
                />
              </Card>
              <button
                onClick={claimTierOne}
                className="bg-white hover:bg-gray-500 text-black hover:text-white font-bold py-2 px-8 mt-4 rounded cursor-pointer"
              >
                CLAIM
              </button>
            </section>
          </section>
          <section className="flex flex-col justify-center items-center w-1/3">
            <h2 className="my-4 text-white">Special Forces Claim</h2>
            <section className="w-40 md:w-72">
              <Card
                onClick={function noRefCheck() {}}
                setIsSelected={function noRefCheck() {}}
                title="MONEY PRINTER"
                description="TIER 2"
                className="bg-white h-60 md:h-full"
              >
                <Image
                  src={Tier2}
                  alt="Tier 2 NFT"
                  className="rounded-3xl p-2"
                />
              </Card>
              <button
                onClick={claimTierTwo}
                className="bg-white hover:bg-gray-500 text-black hover:text-white font-bold py-2 px-8 mt-4 rounded cursor-pointer"
              >
                CLAIM
              </button>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
