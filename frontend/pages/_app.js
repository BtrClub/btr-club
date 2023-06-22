import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";

import ProposalContext from "../components/proposalContext.js";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import Nav from "../components/nav";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "BTR DAO",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [proposalOwner, setProposalOwner] = useState("");
  const [proposalDeadline, setProposalDeadline] = useState("");
  const [proposalActive, setProposalActive] = useState("");
  const [proposalTotalVotes, setProposalTotalVotes] = useState("");
  const [proposalYesVotes, setProposalYesVotes] = useState("");
  const [proposalNoVotes, setProposalNoVotes] = useState("");
  const [proposalIndex, setProposalIndex] = useState(0)

  return (
    <ProposalContext.Provider
      value={{
        proposalTitle,
        setProposalTitle,
        proposalDescription,
        setProposalDescription,
        proposalOwner,
        setProposalOwner,
        proposalDeadline,
        setProposalDeadline,
        proposalActive,
        setProposalActive,
        proposalTotalVotes,
        setProposalTotalVotes,
        proposalYesVotes,
        setProposalYesVotes,
        proposalNoVotes,
        setProposalNoVotes,
        proposalIndex,
        setProposalIndex
      }}
    >
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider theme={darkTheme()} chains={chains}>
          <Nav />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ProposalContext.Provider>
  );
}

export default MyApp;
