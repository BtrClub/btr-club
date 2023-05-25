import React from "react";
import VideoTestimonial from "./videoTestimonial";

export default function About() {
  return (
    <section className="w-full p-2 flex flex-col items-center pt-28 py-16">
      <h1>About the BTR Investment Club</h1>
      <section className="max-w-[1240px] m-auto md:grid grid-cols-2 gap-8 items-center mt-14 mb-20">
        <section>
          <p>
            The BTR Investment Club is a dedicated platform created to empower
            and unite the members of the BTR community in exploring investment
            opportunities that may otherwise be inaccessible individually. It is
            a collective effort aimed at pooling our resources and leveraging
            the power of NFT voting to make informed investment decisions. By
            joining forces, we can potentially generate residual income and
            unlock future benefits for all club members..
          </p>
          <br />
          <p>
            The BTR community was founded in 2019 with a vision to provide
            trustworthy and value-driven insights in the ever-evolving world of
            cryptocurrencies. Brando, the founder, recognized the need for
            reliable crypto influencers and committed himself to be a guiding
            light for those seeking proper navigation in the crypto wild west.
            It was a calling that he embraced, driven by a sense of purpose to
            serve as a vessel for knowledge and guidance.
          </p>
          <br />
          <p>
            The community&apos;s journey began when a viewer expressed their
            willingness to pay for exclusive deep-dive videos. This led to the
            formation of a Patreon group, where like-minded individuals joined
            forces, resonating with the shared mission and material. Since then,
            the BTR community has grown in strength and continues to uphold the
            same energy, dedication, and mission in 2023.
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
            Join us in the BTR Investment Club and be part of a community that
            strives for financial growth, education, and collective empowerment.
            Together, we can navigate the ever-changing crypto landscape and
            make a lasting impact on our financial futures.
          </p>
          <br />
          <p>
            Let&apos;s embrace this ongoing journey and seize the opportunities
            that lie ahead!
          </p>
        </section>
      </section>
      <VideoTestimonial />
    </section>
  );
}
