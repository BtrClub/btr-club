import React, { useContext, useEffect, useState } from "react";
import { useAccount, useSigner, useContract } from "wagmi";
import { AlertTriangle } from "@web3uikit/icons";
import ProposalContext from "./proposalContext.js";
import { DAO_ADDRESS, DAO_ABI, AIRDROP_ADDRESS, AIRDROP_ABI} from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Proposal() {
  const {data:signer} = useSigner()
  const [theyVoted,setTheyVoted] = useState(false)
  const [daoMember, setDaoMember] = useState(false)
  const {
    proposalTitle,
    proposalDescription,
    proposalOwner,
    proposalDeadline,
    proposalActive,
    proposalTotalVotes,
    proposalYesVotes,
    proposalNoVotes,
    proposalIndex
  } = useContext(ProposalContext);
  const { isConnected, address } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const yesPercentage = Math.round(
    (proposalYesVotes / (proposalYesVotes + proposalNoVotes)) * 100
  );
  const noPercentage = Math.round(
    (proposalNoVotes / (proposalYesVotes + proposalNoVotes)) * 100
  );

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
    const member =
      tierOneBalance.toNumber() > 0 || tierTwoBalance.toNumber() > 0;
    setDaoMember(member);
  };

  const voteOnProposal = async(vote, index) => {
   const tx = await contract.voteOnProposal(vote, index)
   await tx.wait()
   toast.success(`You Have Successfully Voted On This Proposal!`, {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
   });
  }

  const haveYouVoted = async() => {
     const haveYouVoted = await contract.haveYouVotedThisProposal(proposalIndex);
     setTheyVoted(haveYouVoted)
  }

  useEffect(() => {
    haveYouVoted();
    DaoMember();
  });

  return (
    <section className="py-28">
      {!daoMember ? (
        <section className="min-h-screen flex flex-col items-center mt-8">
          <section className="w-2/6 flex justify-between items-center">
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
        <section className="min-h-screen flex justify-center mt-28 px-10">
          <section className="w-4/6 flex flex-col items-center">
            <h2 className="mb-8">{proposalTitle}</h2>
            <section className="w-2/3">{proposalDescription}</section>
          </section>
          <section>
            <section className="w-60 h-[17rem] flex flex-col items-center p-4 pb-20 text-sm border border-gray-600 rounded-xl uppercase">
              <section className="w-full flex justify-between py-2">
                <span>CREATED BY: </span>
                <span>{proposalOwner.slice(0, 8)}</span>
              </section>
              <section className="w-full flex justify-between py-2">
                <span>ENDS AT: </span>
                <span>
                  {new Date(proposalDeadline).toLocaleDateString("sv-SE")}
                </span>
              </section>
              <section className="w-full flex justify-between py-2">
                <span>AMOUNT OF VOTES: </span>
                <span>{proposalTotalVotes}</span>
              </section>
              <section className="w-full mt-2 border-2 rounded">
                {proposalTotalVotes < 1 ? (
                  <section className="flex">
                    <section className="w-full h-4 bg-green-400"></section>
                    <section className="w-full h-4 bg-red-400"></section>
                  </section>
                ) : (
                  <section className="flex">
                    <section
                      className={`w-[${yesPercentage}%] h-4 bg-green-400`}
                    ></section>
                    <section
                      className={`w-[${noPercentage}%] h-4 bg-red-400`}
                    ></section>
                  </section>
                )}
              </section>
              {(!proposalActive && !theyVoted) && (
                <section className="w-full flex flex-col mt-6">
                  <button
                    onClick={() => voteOnProposal(0, proposalIndex)}
                    className="h-8 text-lg bg-green-600 tracking-wider mb-2 cursor-pointer rounded"
                  >
                    YES
                  </button>
                  <button
                    onClick={() => voteOnProposal(1, proposalIndex)}
                    className="h-8 text-lg bg-red-600 tracking-wider cursor-pointer rounded"
                  >
                    NO
                  </button>
                </section>
              )}
            </section>
          </section>
        </section>
      )}
    </section>
  );
}
