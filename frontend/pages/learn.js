import Head from "next/head";
import LearnComp from "../components/learn";
import Footer from "../components/footer";

export default function Learn() {
  return (
    <section>
      <Head>
        <title>Learn</title>
      </Head>
      <LearnComp />
      <Footer />
    </section>
  );
}
