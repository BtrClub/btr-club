import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useContract, useSigner } from "wagmi";
import { AlertTriangle, Checkmark, CrossCircle } from "@web3uikit/icons";
import { ethers } from "ethers";
import {
  DAO_ADDRESS,
  DAO_ABI,
  AIRDROP_ADDRESS,
  AIRDROP_ABI,
} from "../constants";
import ProposalContext from "./proposalContext.js";

export default function Vote() {
  const {
    setProposalTitle,
    setProposalDescription,
    setProposalOwner,
    setProposalDeadline,
    setProposalActive,
    setProposalTotalVotes,
    setProposalYesVotes,
    setProposalNoVotes,
    setProposalIndex
  } = useContext(ProposalContext);
  const { address } = useAccount();
  const {data:signer} = useSigner();
  const [proposals, setProposals] = useState([]);
  const [proposalCount, setProposalCount] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [activeProposals, setActiveProposals] = useState(0);
  const [daoMember, setDaoMember] = useState(false);
  const [daoOwner, setDaoOwner] = useState("")
  const [secondDaoOwner, setSecondDaoOwner] = useState("")

  const setProposalContext = (
    proposalTitle,
    proposalDescription,
    proposalOwner,
    proposalDeadline,
    proposalActive,
    proposalTotalVotes,
    proposalYesVotes,
    proposalNoVotes,
    proposalIndex
  ) => {
    setProposalTitle(proposalTitle);
    setProposalDescription(proposalDescription);
    setProposalOwner(proposalOwner);
    setProposalDeadline(proposalDeadline);
    setProposalActive(proposalActive);
    setProposalTotalVotes(proposalTotalVotes);
    setProposalYesVotes(proposalYesVotes);
    setProposalNoVotes(proposalNoVotes);
    setProposalIndex(proposalIndex)
    
  };

  const contract = useContract({
    address: DAO_ADDRESS,
    abi: DAO_ABI,
    signerOrProvider: signer,
  });

  const nftContract = useContract({
    address: AIRDROP_ADDRESS,
    abi: AIRDROP_ABI,
    signerOrProvider: signer,
  });

  const DaoMember = async () => {
    const tierOneBalance = await nftContract.balanceOf(address, 1);
    const tierTwoBalance = await nftContract.balanceOf(address, 2);
    const member = tierOneBalance.toNumber() > 0 || tierTwoBalance.toNumber() > 0;
    setDaoMember(member);
  };

  const fetchDaoOwners = async() => {
    const daoOwner = await contract.owner();
    const secondDaoOwner = await contract.secondOwner();
    setDaoOwner(daoOwner)
    setSecondDaoOwner(secondDaoOwner)
  }

  const fetchProposalCount = async () => {
    const numProposals = await contract.currentIndex();
    setProposalCount(numProposals.toNumber());
    return numProposals;
  };

  const fetchProposalById = async (id) => {
    try {
      const proposal = await contract.btrProposals(id);
      const title = ethers.utils.defaultAbiCoder.decode(
        ["string"],
        proposal.title
      );
      const description = ethers.utils.defaultAbiCoder.decode(
        ["string"],
        proposal.proposal
      );

      const parsedProposal = {
        title: String(title),
        description: description,
        owner: proposal.proposalOwner,
        accepted: String(proposal.proposalAccepted),
        validated: String(proposal.proposalAlreadyValidated),
        executed: String(proposal.proposalExecuted),
        yesVotes: proposal.votedYes.toNumber(),
        noVotes: proposal.votedNo.toNumber(),
        totalVotes: proposal.totalVotes.toNumber(),
        deadline: new Date(
          parseInt(proposal.proposalDeadline.toString()) * 1000
        ).toDateString(),
        active:
          new Date().getTime() >
          new Date(
            parseInt(proposal.proposalDeadline.toString()) * 1000
          ).getTime(),
      };
      return parsedProposal;
    } catch (error) {
      console.error(error);
    }
  };

  const allProposals = async () => {
    try {
      const numProposals = await fetchProposalCount();
      let total = 0;
      const proposals = [];
      for (let i = 0; i < numProposals; i++) {
        const proposal = await fetchProposalById(i);
        proposals.push(proposal);
        if (!proposal.active) total = total + 1;
      }
      setProposals(proposals);
      setActiveProposals(total);
      return proposals;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalVotes = async () => {
    let total = 0;
    const numProposals = await fetchProposalCount();
    for (let i = 0; i < numProposals; i++) {
      const proposal = await contract.btrProposals(i);
      total = total + proposal.totalVotes.toNumber();
    }
    setVoteCount(total);
  };

  useEffect(() => {
    allProposals();
    fetchTotalVotes();
    DaoMember();
    fetchDaoOwners();
  });

  return (
    <section className="pt-28">
      {!daoMember ? (
        <section className="min-h-screen flex flex-col items-center mt-8">
          <section className="w-full md:w-2/6 flex justify-between items-center">
            <AlertTriangle fontSize="80px" className="text-red-600" />
            <section className="w-84 h-56 flex flex-col justify-center text-2xl text-center">
              <p className="mb-1">
                THIS IS A{" "}
                <span className="border-b-2 border-red-600">
                  RESTRICTED AREA
                </span>
              </p>
              <p>
                FOR <span className="text-pink-600">BTR INVESTMENT CLUB</span>{" "}
                MEMBERS ONLY
              </p>
            </section>
            <AlertTriangle fontSize="80px" className="text-red-600" />
          </section>
          <section className="flex flex-col justify-evenly items-center h-20 mt-16 text-xl tracking-wide">
            <p>CONNECT YOUR WALLET IF YOU ARE A BTR INVESTMENT CLUB MEMBER</p>
            <p>
              NOT A MEMBER?{" "}
              <a
                href="https://www.patreon.com/BiggerThanRace/"
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 text-black font-semibold bg-pink-600 hover:bg-black hover:text-pink-600 cursor-pointer"
              >
                JOIN THE BTR COMMUNITY
              </a>
            </p>
          </section>
        </section>
      ) : (
        <section>
          <section className="flex justify-center pb-2 sm:px-10 bg-black border-b border-gray-500">
            <section className="w-2/3 sm:w-2/4 lg:w-1/3 flex content-center justify-evenly">
              <p className="cursor-pointer hover:text-pink-600 text-base sm:text-lg">
                <Link href="/vote" className="text-pink-600">
                  Proposals
                </Link>
              </p>
              <p className="cursor-pointer hover:text-pink-600 text-base sm:text-lg">
                <Link href="/createproposal">Create Proposal</Link>
              </p>
              {(address === daoOwner || address === secondDaoOwner) && (
                <p className="cursor-pointer hover:text-pink-600 text-base sm:text-lg">
                  <Link href="/pendingproposals">Accept Proposals</Link>
                </p>
              )}
            </section>
          </section>
          <section className="flex flex-col items-center bg-white pt-8 pb-20">
            <section className="sm:w-11/12 lg:w-2/3">
              <section className="flex flex-col sm:flex-row items-center sm:justify-evenly w-full">
                <section className="w-64 h-28 bg-waves bg-blue-900 flex flex-col justify-evenly items-center sm:items-start sm:pl-4 pb-4 border rounded-md border-gray-200 text-gray-900 shadow-lg">
                  <p className="text-gray-100 text-lg">Total Proposals</p>
                  <p className="text-white text-lg font-semibold">
                    {proposalCount} total proposals
                  </p>
                </section>
                <section className="w-64 h-28 bg-waves bg-blue-900 flex flex-col justify-evenly items-center sm:items-start sm:pl-4 pb-4 border rounded-md border-gray-200 text-gray-900 shadow-lg">
                  <p className="text-gray-100 text-lg">Participation</p>
                  <p className="text-white text-lg font-semibold">
                    {voteCount} total votes
                  </p>
                </section>
                <section className="w-64 h-28 bg-waves bg-blue-900 flex flex-col justify-evenly items-center sm:items-start sm:pl-4 pb-4 border rounded-md border-gray-200 text-gray-900 shadow-lg">
                  <p className="text-gray-100 text-lg">Active Proposals</p>
                  <p className="text-white text-lg font-semibold">
                    {activeProposals} active proposals
                  </p>
                </section>
              </section>
              <section className="w-full min-h-screen flex flex-col items-center mt-6 py-2">
                {proposals.map((proposal, i) => {
                  return (
                    <section
                      className="flex flex-col justify-between w-screen sm:w-4/5 sm:h-24 my-4 px-4 py-2 rounded-md shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-300 hover:border-gray-100 hover:border cursor-pointer"
                      key={i}
                      onClick={() =>
                        setProposalContext(
                          proposal.title,
                          proposal.description,
                          proposal.owner,
                          proposal.deadline,
                          proposal.active,
                          proposal.totalVotes,
                          proposal.yesVotes,
                          proposal.noVotes,
                          i
                        )
                      }
                    >
                      <Link
                        href={`/proposal/${proposal.title}`}
                        className="h-full flex flex-col justify-between"
                      >
                        <span className="text-slate-900 text-3xl font-semibold">
                          {proposal.title}
                        </span>
                        <section className="flex justify-between text-sm">
                          <section className="flex items-center">
                            {!proposal.active ? (
                              <section className="flex items-center bg-green-100 px-2 mr-2 rounded-2xl">
                                <span>
                                  <Checkmark
                                    fontSize="13px"
                                    className="fill-green-500 mr-1"
                                  />
                                </span>
                                <span className="text-green-500 mr-2 font-semibold">
                                  ACTIVE
                                </span>
                              </section>
                            ) : (
                              <section className="flex items-center bg-red-100 px-2 mr-2 rounded-2xl">
                                <span>
                                  <CrossCircle
                                    fontSize="17px"
                                    className="fill-red-500 mr-1"
                                  />
                                </span>
                                <span className="text-red-500 mr-2 font-semibold">
                                  FINISHED
                                </span>
                              </section>
                            )}
                            <span className="text-slate-400 mr-2">
                              {proposal.totalVotes} VOTES
                            </span>
                            {!proposal.active ? (
                              <span className="text-slate-700">
                                ENDS ON {proposal.deadline}
                              </span>
                            ) : (
                              <span className="text-slate-700">
                                NO DEADLINE SET
                              </span>
                            )}
                          </section>
                          <span className="text-slate-400">
                            LEADING:{" "}
                            <span className="text-slate-700 font-semibold">
                              {proposal.yesVotes > proposal.noVotes
                                ? "YES"
                                : "NO"}
                            </span>
                          </span>
                        </section>
                      </Link>
                    </section>
                  );
                })}
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
}
