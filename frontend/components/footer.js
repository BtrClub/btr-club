import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <section className="h-28 bg-neutral-100 flex justify-center pt-10">
      <section className="w-full sm:w-8/12 lg:w-5/12 flex justify-evenly text-xs sm:text-base text-gray-900">
        <p>
          <Link href="/">Whitepaper</Link>
        </p>
        <p> | </p>
        <p>
          <Link href="/learn">FAQ</Link>
        </p>
        <p> | </p>
        <p>
          <Link href="/about">About</Link>
        </p>
        <p> | </p>
        <p>
          <Link href="/contact">Contact</Link>
        </p>
        <p> | </p>
        <p>
          <Link href="/termsandconditions">Terms & Conditions</Link>
        </p>
      </section>
    </section>
  );
}
