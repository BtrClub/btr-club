import React, {useState, useEffect} from "react";
import { DAO_ADDRESS, DAO_ABI } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContract, useSigner } from "wagmi";
import { LockClosed, CheckCircle } from "@web3uikit/icons";

export default function PendingProposals({proposals}) {
    const {data:signer} = useSigner()
    const contract = useContract({
      address: DAO_ADDRESS,
      abi: DAO_ABI,
      signerOrProvider: signer
    });

 const [minimumVote, setMinimumVote] = useState([])
 const [moreYesVotes, setMoreYesVotes] = useState([])
 const [deadlinePassed, setDeadlinePassed] = useState([])
 const [everyMemberVoted, setEveryMemberVoted] = useState([])
 const [canBeExecuted, setCanBeExecuted] = useState([])

  const proposalStats = async() => {
    for (let i = 0; i < proposals.length; i++) {
      const stats = await contract.viewACreatedProposal(i);
      const minimumVotes = stats[7] >= 15
      const moreYesVote = stats[5] > stats[6]
      const deadlinePass = new Date().getTime() > (parseInt(stats[8].toString()) * 1000)
      const everyMemberVote = stats[7] >= 63
      setMinimumVote([...minimumVote, minimumVotes])
      setMoreYesVotes([...moreYesVotes, moreYesVote])
      setDeadlinePassed([...deadlinePassed, deadlinePass])
      setEveryMemberVoted([...everyMemberVoted, everyMemberVote])
      if(minimumVotes && moreYesVote && (deadlinePass || everyMemberVote)) {
        setCanBeExecuted([...canBeExecuted, true])
      } else {
         setCanBeExecuted([...canBeExecuted, false]);
      }
    }    
  }

   const executeProposal = async(index) => {
     const tx = await contract.executeProposal(index)
     await tx.wait()
     toast.success(`You Have Successfully Executed This Proposal`, {
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
     });
   }

   useEffect(() => {
     proposalStats()
   })

  return (
    <>
      {proposals
        .filter((proposal) => proposal.validated === "true" && proposal.executed === "false")
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
              <span className="text-slate-900 mt-4">
                Has Minimum Votes Been Reached:
                {String(minimumVote[i]) === "false" ? (
                  <LockClosed />
                ) : (
                  <CheckCircle />
                )}
              </span>
              <span className="text-slate-900 mt-4">
                Is There More Yes Votes Than No:
                {String(moreYesVotes[i]) === "false" ? (
                  <LockClosed />
                ) : (
                  <CheckCircle />
                )}
              </span>
              <span className="text-slate-900 mt-4">
                Has Every Member Voted:
                {String(everyMemberVoted[i]) === "false" ? (
                  <LockClosed />
                ) : (
                  <CheckCircle />
                )}
              </span>
              <span className="text-slate-900 mt-4">
                Has The Voting Deadline Passed:
                {String(deadlinePassed[i]) === "false" ? (
                  <LockClosed />
                ) : (
                  <CheckCircle />
                )}
              </span>
              {canBeExecuted[i] ? (
                <section className="w-full flex flex-col mt-6">
                  <button
                    onClick={() => executeProposal(i)}
                    className="h-12 text-lg text-white bg-green-600 tracking-wider mb-2 cursor-pointer rounded"
                  >
                    EXECUTE PROPOSAL
                  </button>
                </section>
              ) : (
                <section className="w-full flex flex-col mt-6 opacity-50">
                  <div
                    className="h-12 text-lg text-white pt-[0.7rem] text-center bg-green-600 tracking-wider mb-2 rounded"
                  >
                    EXECUTE PROPOSAL
                  </div>
                </section>
              )}
            </section>
          );
        })}
    </>
  );
}
