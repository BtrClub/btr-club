import React, { useEffect, useState } from "react";
import { useAccount, useContract, useSigner } from "wagmi";
import { ADDRESS, abi } from "../constants";
import { AlertTriangle } from "@web3uikit/icons";

export default function CreateProposal() {
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const contract = useContract({
    address: ADDRESS,
    abi: abi,
    signerOrProvider: signer,
  });

  const createProposal = async () => {
    await contract.createProposal(title, description);
  };

  useEffect(() => {
    if (!isConnected) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [isConnected]);

  return (
    <section className="py-28">
      {!isLoggedIn ? (
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
                FOR <span className="text-pink-600">BTR Investment Club</span>{" "}
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
            <h2 className="mb-8">Create Your Proposal</h2>
            <section className="w-2/3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-12 flex text-black p-2 outline-none rounded-md"
                type="text"
                name="proposal title"
                placeholder="add your title here"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-72 text-black mt-10 p-2 outline-none rounded-md"
                name="proposal description"
                placeholder="add your description here"
                required
              />
              <button
                onClick={createProposal}
                className="w-full p-4 bg-blue-500 hover:bg-blue-600 text-gray-100 mt-4 rounded-md"
              >
                Submit Proposal
              </button>
            </section>
          </section>
        </section>
      )}
    </section>
  );
}
