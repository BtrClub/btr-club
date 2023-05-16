import React from "react";
import Image from "next/image";

import DescriptionImg from "../public/assets/icons/description.png";

export default function Description() {
  return (
    <section className="w-full p-2 flex flex-col items-center py-16">
      <h1>A smarter Investment Club</h1>
      <section className="max-w-[1240px] m-auto md:grid grid-cols-2 gap-8 items-center mt-10">
        <section>
          <Image
            src={DescriptionImg}
            alt="investment club image"
            width="600"
            height="525"
          />
        </section>
        <section className="flex flex-col justify-center items-center px-2">
          <h2 className="uppercase">The Investment Club of BTR</h2>
          <h3 className="pt-2">( how does this work? )</h3>
          <ul className="pt-8">
            <li>
              1. Everyone with a BTR NFT will be able to create a proposal
            </li>
            <li>
              1. Everyone with a BTR NFT will be able to vote on a proposal
            </li>
            <li>
              3. If a proposal gets more than 51% yes-votes, the investment
              happens
            </li>
          </ul>
          <br />
          <p>
            The BTR Investment Club has the capacity to reach new heights as an
            investment club.
            <br />
            <br />
            The Investment Club along with its treasury will be managed by the
            collective responsibility of all Investment Club members, which also
            are members of the BTR community.
          </p>
          <p className="py-4">
            An Investment Club&apos;s greatest asset is the collective
            intelligence of its members
          </p>
          <p>
            Thankfully the BTR community brings knowledge and exposure to many
            things within blockchain which leads to a diverse community across
            multiple levels.
          </p>
        </section>
      </section>
    </section>
  );
}
