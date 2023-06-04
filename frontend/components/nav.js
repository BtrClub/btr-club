import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Logo from "../public/assets/btrLogo.png";

export default function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <section className="bg-gray-800/90 fixed w-full h-20 shadow-xl z-[100]">
      <section className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <Image src={Logo} alt="Logo image" width="60" height="60" />
        </Link>
        <section className="sm:hidden flex items-center">
          <section className="mr-4 text-xs sm:text-sm uppercase">
            <ConnectButton />
          </section>
          <section
            className="space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </section>

          <section
            className={
              isNavOpen
                ? "absolute w-5/6 h-screen top-0 right-0 bg-black flex flex-col justify-evenly items-center"
                : "hidden"
            }
          >
            <section
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </section>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link
                  href="/learn"
                  onClick={() => setIsNavOpen((prev) => !prev)}
                >
                  Learn
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link
                  href="/about"
                  onClick={() => setIsNavOpen((prev) => !prev)}
                >
                  About
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link
                  href="/community"
                  onClick={() => setIsNavOpen((prev) => !prev)}
                >
                  Community
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link
                  href="/vote"
                  onClick={() => setIsNavOpen((prev) => !prev)}
                >
                  Vote
                </Link>
              </li>
            </ul>
          </section>
        </section>
        <section className="hidden sm:flex">
          <ul className="flex items-center mr-4 text-[#ecf0f3]">
            <li className="ml-4 sm:ml-10 text-xs sm:text-sm uppercase hover:border-b">
              <Link href="/learn">Learn</Link>
            </li>
            <li className="ml-4 sm:ml-10 text-xs sm:text-sm uppercase hover:border-b flex items-center">
              <Link href="/about">About</Link>
            </li>
            <li className="ml-4 sm:ml-10 text-xs sm:text-sm uppercase hover:border-b">
              <Link href="/community">Community</Link>
            </li>
            <li className="ml-4 sm:ml-10 text-xs sm:text-sm uppercase hover:border-b">
              <Link href="/vote">Vote</Link>
            </li>
            <li className="ml-4 sm:ml-10 text-xs sm:text-sm uppercase">
              <ConnectButton />
            </li>
          </ul>
        </section>
      </section>
    </section>
  );
}
