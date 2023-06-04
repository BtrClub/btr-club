import React from "react";
import Image from "next/image";
import Ownership from "../public/assets/icons/ownership.png";
import Educational from "../public/assets/icons/educational.png";
import Urgency from "../public/assets/icons/urgency.png";

export default function Values() {
  return (
    <section className="pb-20">
      <p className="text-4xl text-center py-14 pt-20 text-pink-600 underline underline-offset-8">
        Our core values
      </p>
      <section className="md:flex text-white pt-10">
        <section className="md:w-1/3 flex flex-col items-center pb-10">
          <Image src={Ownership} alt="Proposal" width="110" height="110" />
          <p className="pt-2 text-2xl">Ownership</p>
          <p className="pt-4 w-2/3 text-lg text-center">
            We expect every BTR member to care about the outcomes of their
            actions. Therefore we take every detail into consideration and take
            ownership in our decisions.
          </p>
        </section>
        <section className="md:w-1/3 flex flex-col items-center pb-10">
          <Image src={Educational} alt="Proposal" width="110" height="110" />
          <p className="pt-2 text-2xl">Educational</p>
          <p className="pt-4 w-2/3 text-lg text-center">
            We are an educated community and we expect every community member to
            help each other with questions and taking learning seriously. The
            more knowledge we have, the bigger achievements.
          </p>
        </section>
        <section className="md:w-1/3 flex flex-col items-center pb-10">
          <Image src={Urgency} alt="Proposal" width="110" height="110" />
          <p className="pt-2 text-2xl">Urgency</p>
          <p className="pt-4 w-2/3 text-lg text-center">
            We work hard to be at the right place in the right time and
            therefore strive to make quick changes towards the right directions.
          </p>
        </section>
      </section>
    </section>
  );
}
