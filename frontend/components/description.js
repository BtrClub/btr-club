import React from "react";
import Image from "next/image";
import { Card } from "@web3uikit/core";

import DescriptionImg from "../public/assets/icons/description.png";
import Tier1 from "../public/assets/tier1.png";
import Tier2 from "../public/assets/tier2.png";

export default function Description() {
  return (
    <section className="w-full p-2 flex flex-col items-center py-16">
      <h1>A smarter Investment Club</h1>
      <section className="xl:w-5/6 md:flex justify-evenly items-center mt-10 ">
        <section className="w-full flex justify-center">
          <Image
            src={DescriptionImg}
            alt="investment club image"
            width="600"
            height="525"
          />
        </section>
        <section className="w-full flex flex-col justify-center items-center px-2">
          <h3 className="uppercase text-center text-lg">
            Introducing The BTR Investment Club: A Smarter Investment Approach
          </h3>
          <p className="text-center py-4">
            Welcome to the Investment Club of BTR! We are thrilled to announce
            the launch of our Investment Club, which aims to leverage the
            collective intelligence and diverse expertise of our BTR NFT holders
            for smarter investment decisions in the blockchain space.
          </p>
          <h3>( How does this work? )</h3>
          <ul className="pt-4">
            <li>
              Proposal Creation: Every BTR NFT holder will have the opportunity
              to create investment proposals. Whether you have identified a
              promising crypto project or have an innovative idea, your
              proposals will be considered for investment by the club.
            </li>
            <br />
            <li>
              Voting Power: Each BTR NFT holder will also have the privilege to
              participate in the voting process. You have the power to vote on
              the proposals put forward by the community, ensuring that the
              investment decisions are made collectively.
            </li>
            <br />
            <li>
              Majority Rule: To ensure a fair and transparent decision-making
              process, proposals receiving more than 51% of yes votes from the
              community will be considered for investment. This ensures that the
              investment choices align with the majority&apos;s preference.
            </li>
          </ul>
          <br />
        </section>
      </section>
      <section className="max-w-[1000px] flex flex-col text-center pt-8">
        <h3>The BTR Investment Club: Reaching New Heights Together</h3>
        <br />
        <p>
          We believe that the BTR Investment Club has the potential to achieve
          remarkable milestones as an investment community. By collectively
          managing the investment club&apos;s treasury, we can pool our
          resources and expertise to maximise the growth and success of our
          investments.
        </p>
        <br />
        <p>
          The true strength of an Investment Club lies in the collective
          intelligence and diverse perspectives of its members. Fortunately, We
          have a knowledgeable and diverse BTR community covering various
          aspects of the blockchain ecosystem. This rich diversity enhances our
          ability to make well-informed investment decisions.
        </p>
        <br />
        <p>
          Join us in the BTR Investment Club and be part of a community
          committed to exploring new horizons, seizing investment opportunities,
          and shaping the future of the blockchain industry.
        </p>
        <br />
        <p>
          Together, let&apos;s unlock the full potential of our collective
          intelligence and drive the BTR Investment Club to new heights!
        </p>
        <br />
        <section className="flex justify-evenly">
          <section className="w-40 md:w-72">
            <Card
              onClick={function noRefCheck() {}}
              setIsSelected={function noRefCheck() {}}
              title="BLACK CARD"
              description="TIER 1"
              className="bg-white h-60 md:h-full"
            >
              <Image src={Tier1} alt="Tier 1 NFT" className="rounded-3xl p-2" />
            </Card>
          </section>
          <section className="w-40 md:w-72">
            <Card
              onClick={function noRefCheck() {}}
              setIsSelected={function noRefCheck() {}}
              title="MONEY PRINTER"
              description="TIER 2"
              className="bg-white h-60 md:h-full"
            >
              <Image src={Tier2} alt="Tier 2 NFT" className="rounded-3xl p-2" />
            </Card>
          </section>
        </section>
        <br />
        <p>
          Note: The Investment Club operates within the framework of mutual
          trust, transparency, and responsibility. All investment decisions are
          subject to the club&apos;s guidelines and protocols to ensure the best
          interests of our members.
        </p>
        <br />
        <p>
          Let&apos;s embark on this exciting journey of collective investment
          and make a lasting impact in the blockchain space!
        </p>
        <br />
        <p>- The BTR Investment Club</p>
      </section>
    </section>
  );
}
