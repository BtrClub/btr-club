import React from "react";
import Image from "next/image";
import Proposal from "../public/assets/icons/proposal.png";
import YesVote from "../public/assets/icons/yes.png";
import VotingSquares from "../public/assets/icons/votingSquares.png";

export default function Explainer() {
  return (
    <section className="md:flex text-white text-center py-10">
      <section className="md:w-1/3 flex flex-col items-center pb-10">
        <Image src={Proposal} alt="Proposal" width="110" height="110" />
        <p className="pt-2 text-2xl">Have an NFT to create proposals</p>
        <p className="pt-4 w-2/3 text-lg text-center">
          Only the BTR Investment Club members can create proposals
        </p>
      </section>
      <section className="md:w-1/3 flex flex-col items-center pb-10">
        {/* Change image to an nft once we get the graphic */}
        <Image src={YesVote} alt="Yes Vote" width="110" height="110" />
        <p className="pt-2 text-2xl">Have an NFT to vote on proposals</p>
        <p className="pt-4 w-2/3 text-lg text-center">
          The BTR Investment Club members govern the Clubs investments
        </p>
      </section>
      <section className="md:w-1/3 flex flex-col items-center pb-10">
        <Image src={VotingSquares} alt="No Vote" width="110" height="110" />
        <p className="pt-2 text-2xl">Over 51% proposals</p>
        <p className="pt-4 w-2/3 text-lg text-center">
          Complete transparency and community driven decisions on each proposal
        </p>
      </section>
    </section>
  );
}
