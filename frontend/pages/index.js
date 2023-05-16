import Head from "next/head";
import Main from "../components/main";
import Description from "../components/description";
import Testimonial from "../components/testimonial";
import Values from "../components/values";
import JoinTheCommunity from "../components/joinTheCommunity";
import Explainer from "../components/explainer";
import Footer from "../components/footer";

export default function Home() {
  return (
    <section>
      <Head>
        <title>BTR INVESTMENT CLUB</title>
      </Head>
      <Main />
      <Description />
      <Testimonial />
      <Values />
      <JoinTheCommunity />
      <Explainer />
      <Footer />
    </section>
  );
}
