import React from "react";
import Link from "next/link";

export default function claimBar() {
  return (
    <section className="w-full mt-10 text-center relative">
      <section className="w-full h-16 dark:bg-gray-900 fixed bottom-0 flex justify-center items-center">
        <Link href="/claim">
          <h1 className="text-xl text-white hover:text-gray-400 drop-shadow-lg cursor-pointer">
            CLAIM YOUR BTR INVESTMENT CLUB NFT
          </h1>
        </Link>
      </section>
    </section>
  );
}
