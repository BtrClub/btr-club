import Head from "next/head";
import Main from "../components/main";
import Description from "../components/description";
import Testimonial from "../components/testimonial";
import Values from "../components/values";
import JoinTheCommunity from "../components/joinTheCommunity";
import Explainer from "../components/explainer";
import Footer from "../components/footer";
import ClaimBar from "../components/claimBar";

export default function Home() {
  return (
    <section className="overflow-x-hidden">
      <Head>
        <link rel="shortcut icon" href="/assets/btrLogo.png" />
        <title>BTR INVESTMENT CLUB</title>
      </Head>
      <Main />
      <Description />
      <Testimonial />
      <Values />
      <JoinTheCommunity />
      <Explainer />
      <Footer />
      <ClaimBar />
    </section>
  );
}
