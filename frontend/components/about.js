import React from "react";
import VideoTestimonial from "./videoTestimonial";

export default function About() {
  return (
    <section className="w-full p-2 flex flex-col items-center pt-28 py-16">
      <h1>About</h1>
      <section className="max-w-[1240px] m-auto md:grid grid-cols-2 gap-8 items-center mt-14 mb-20">
        <section>
          <p>
            The BTR Investment Club is created to help the BTR community members
            share in different investment opportunities they couldn&apos;t
            otherwise take part in. It&apos;s a collective effort to find
            opportunities and pool our money together for future benefits based
            on a NFT voting system. This can create residual income for all
            members who partake in this Investment Club.
          </p>
          <br />
          <p>
            The BTR community was started in 2019. I (Brando) saw a void of
            trustworthy crypto influencers who gave real value. Feeling like God
            led me to this opportunity, I vowed to be used as a vessel and a
            guide to those who would need proper navigation of the crypto wild
            west. A viewer left a comment/compliment on a video saying they
            would pay a monthly subscription for two deep dive videos a month. A
            Patreon group was formed, and members who resonated with the
            material and mission started to pile in. The same energy and mission
            have continued even now in 2023.
          </p>
        </section>
        <section>
          <section className="text-center py-2 text-black font-semibold bg-pink-600">
            NOTHING WE SAY, DO, OR PRESENT IS EVER FINANCIAL ADVICE.
            <br />
            PLEASE, ALWAYS DO YOUR OWN RESEARCH
          </section>
          <br />
          <p>
            The Bigger Than Race “BTR” community comprises people from all walks
            of life. We share a common goal of achieving success, breaking
            generational curses and shifting our perspectives to become better
            investors and people through blockchain technology. Spirituality is
            at the forefront of everything we do, which helps guide the
            community members in the best infrastructure assets to own for the
            Fourth Industrial Revolution.
          </p>
        </section>
      </section>
      <VideoTestimonial />
    </section>
  );
}
