import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useContract, useSigner } from "wagmi";
import { ethers } from "ethers";
import {DAO_ADDRESS, DAO_ABI } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExecutingProposals from "./executingProposals"

export default function PendingProposals() {
  const { isConnected } = useAccount();
  const {data:signer} = useSigner()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [proposalCount, setProposalCount] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [activeProposals, setActiveProposals] = useState(0);

  useEffect(() => {
    if (!isConnected) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [isConnected]);

  const contract = useContract({
    address: DAO_ADDRESS,
    abi: DAO_ABI,
    signerOrProvider: signer,
  });

  const acceptOrDenyProposal = async(acceptProposal, index) => {
   const tx = await contract.acceptOrDenyProposal(acceptProposal, index)
   await tx.wait()
   toast.success(`You Have Successfully Validated This Proposal`, {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
   });
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
        noVotes: proposal.votedYes.toNumber(),
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
      let totalCount = 0;
      const proposals = [];
      for (let i = 0; i < numProposals; i++) {
        const proposal = await fetchProposalById(i);
        proposals.push(proposal);
        if (!proposal.active) total = total + 1;
        totalCount = totalCount + proposal.totalVotes
      }
      setProposals(proposals);
      setActiveProposals(total);
      setVoteCount(totalCount)
      return proposals;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allProposals();
  });

  return (
    <section className="pt-28">
      {!isLoggedIn && (
        <section className="flex justify-center pb-2 px-10 bg-black border-b border-gray-500">
          <section className="w-2/3 sm:w-2/4 lg:w-1/3 flex content-center justify-evenly">
            <p className="cursor-pointer hover:text-pink-600 text-lg">
              <Link href="/vote" className="text-pink-600">
                Proposals
              </Link>
            </p>
            <p className="cursor-pointer hover:text-pink-600 text-lg">
              <Link href="/createproposal">Create Proposal</Link>
            </p>
          </section>
        </section>
      )}

      <section className="flex flex-col items-center bg-white pt-8 pb-20">
        <section className="w-2/3">
          <section className="flex justify-evenly w-full">
            <section className="w-80 h-28 bg-waves bg-blue-900 flex flex-col justify-evenly pl-4 pb-4 border rounded-md border-gray-200 text-gray-900 shadow-lg">
              <p className="text-gray-100 text-lg">Total Proposals</p>
              <p className="text-white text-lg font-semibold">
                {proposalCount} total proposals
              </p>
            </section>
            <section className="w-80 h-28 bg-waves bg-blue-900 flex flex-col justify-evenly pl-4 pb-4 border rounded-md border-gray-200 text-gray-900 shadow-lg">
              <p className="text-gray-100 text-lg">Participation</p>
              <p className="text-white text-lg font-semibold">
                {voteCount} total votes
              </p>
            </section>
            <section className="w-80 h-28 bg-waves bg-blue-900 flex flex-col justify-evenly pl-4 pb-4 border rounded-md border-gray-200 text-gray-900 shadow-lg">
              <p className="text-gray-100 text-lg">Active Proposals</p>
              <p className="text-white text-lg font-semibold">
                {activeProposals} active proposals
              </p>
            </section>
          </section>
          <section className="w-full min-h-screen flex flex-col items-center mt-6 py-2">
            {proposals
              .filter((proposal) => proposal.validated === "false")
              .map((proposal, i) => {
                return (
                  <section
                    className="flex flex-col justify-between w-4/5 h-full my-4 px-4 py-2 rounded-md shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-300 hover:border-gray-100 hover:border"
                    key={i}
                  >
                    <span className="text-slate-900 mb-2 text-3xl font-semibold">
                      {proposal.title}
                    </span>
                    <span className="text-slate-900 text-xl">
                      {proposal.description}
                    </span>
                    <span className="text-slate-900 mt-4">
                      Creator: {proposal.owner}
                    </span>
                    <section className="w-full flex flex-col mt-6">
                      <button
                        onClick={() => acceptOrDenyProposal(true, i)}
                        className="h-12 text-lg text-white bg-green-600 tracking-wider mb-2 cursor-pointer rounded"
                      >
                        APPROVE
                      </button>
                      <button
                        onClick={() => acceptOrDenyProposal(false, i)}
                        className="h-12 text-lg text-white bg-red-600 tracking-wider cursor-pointer rounded"
                      >
                        DENY
                      </button>
                    </section>
                  </section>
                );
              })}
            <ExecutingProposals proposals={proposals}/>
          </section>
        </section>
      </section>
    </section>
  );
}
