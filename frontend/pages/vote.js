import Head from "next/head";
import VoteComp from "../components/vote";
import Footer from "../components/footer";

export default function Learn() {
  return (
    <section>
      <Head>
        <title>Vote</title>
      </Head>
      <VoteComp />
      <Footer />
    </section>
  );
}
