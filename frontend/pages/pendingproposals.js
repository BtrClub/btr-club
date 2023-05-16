import Head from "next/head";
import PendingProposalsComp from "../components/pendingProposals.js";
import Footer from "../components/footer";

export default function PendingProposals() {
  return (
    <section>
      <Head>
        <title>Pending Proposals</title>
      </Head>
      <PendingProposalsComp />
      <Footer />
    </section>
  );
}
