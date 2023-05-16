import Head from "next/head";
import CreateProposalComp from "../components/createProposal";
import Footer from "../components/footer";

export default function Proposal() {
  return (
    <section>
      <Head>
        <title>Create Proposal</title>
      </Head>
      <CreateProposalComp />
      <Footer />
    </section>
  );
}
