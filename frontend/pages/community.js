import Head from "next/head";
import CommunityComp from "../components/community";
import Footer from "../components/footer";

export default function Community() {
  return (
    <section>
      <Head>
        <title>Learn</title>
      </Head>
      <CommunityComp />
      <Footer />
    </section>
  );
}
