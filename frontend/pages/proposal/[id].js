import Head from "next/head";
import Proposal from "../../components/proposal.js";

export default function Home() {
  return (
    <section className="font-mono min-h-screen bg-[#131615]">
      <Head>
        <title>Proposal</title>
      </Head>
      <Proposal />
    </section>
  );
}
