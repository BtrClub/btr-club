import Head from "next/head";
import ProposalComp from "../components/proposal";
import Footer from "../components/footer";

export default function Proposal() {
  return (
    <section>
      <Head>
        <title>Proposal</title>
      </Head>
      <ProposalComp />
      <Footer />
    </section>
  );
}
