import React from "react";
import Image from "next/image";
import Link from "next/link";

import arrow from "../public/assets/icons/next.png";
import youtube from "../public/assets/icons/youtube.png";
import blog from "../public/assets/icons/blog.png";
import website from "../public/assets/icons/code.png";
import telegram from "../public/assets/icons/telegram.png";
import discord from "../public/assets/icons/discord.png";

export default function Community() {
  return (
    <section className="w-full text-center bg-black pt-40">
      <section className="max-w-[1240px] h-96 mx-auto p-2 flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h1>Join the BTR Community</h1>
      </section>
      <section className="max-w-[1240px] m-auto mt-10 pb-20 md:grid grid-cols-12 gap-8">
        <Link
          href="https://www.youtube.com/c/BiggerThanRace"
          target="_blank"
          className="h-24 flex items-center p-6 col-start-2 col-span-5 border-2 rounded border-gray-200 text-gray-300 hover:shadow-lg hover:shadow-slate-700"
        >
          <section className="w-full flex items-center justify-between">
            <section className="flex items-center">
              <Image
                src={youtube}
                alt="youtube"
                width="35"
                height="35"
                className="mr-4"
              />
              <p>Link to youtube</p>
            </section>
            <Image src={arrow} alt="arrow" width="25" height="25" />
          </section>
        </Link>
        <Link
          href="https://biggerthanrace.com/blog"
          target="_blank"
          className="h-24 flex items-center p-6 col-start-7 col-span-5 border-2 rounded border-gray-200 text-gray-300 hover:shadow-lg hover:shadow-slate-700"
        >
          <section className="w-full flex items-center justify-between">
            <section className="flex items-center">
              <Image
                src={blog}
                alt="blog"
                width="35"
                height="35"
                className="mr-4"
              />
              <p>Link to blog</p>
            </section>
            <Image src={arrow} alt="arrow" width="25" height="25" />
          </section>
        </Link>
        <Link
          href="https://www.patreon.com/BiggerThanRace/"
          target="_blank"
          className="h-24 flex items-center p-6 col-start-2 col-span-5 border-2 rounded border-gray-200 text-gray-300 hover:shadow-lg hover:shadow-slate-700"
        >
          <section className="w-full flex items-center justify-between">
            <section className="flex items-center">
              <Image
                src={telegram}
                alt="telegram"
                width="35"
                height="35"
                className="mr-4"
              />
              <p>Link to telegram</p>
            </section>
            <Image src={arrow} alt="arrow" width="25" height="25" />
          </section>
        </Link>
        <Link
          href="https://biggerthanrace.com/"
          target="_blank"
          className="h-24 flex items-center p-6 col-start-7 col-span-5 border-2 rounded border-gray-200 text-gray-300 hover:shadow-lg hover:shadow-slate-700"
        >
          <section className="w-full flex items-center justify-between">
            <section className="flex items-center">
              <Image
                src={website}
                alt="website"
                width="35"
                height="35"
                className="mr-4"
              />
              <p>Link to website</p>
            </section>
            <Image src={arrow} alt="arrow" width="25" height="25" />
          </section>
        </Link>
        <Link
          href="https://discord.gg/XDb7dtxxV4"
          target="_blank"
          className="h-24 flex items-center p-6 col-start-2 col-span-5 border-2 rounded border-gray-200 text-gray-300 hover:shadow-lg hover:shadow-slate-700"
        >
          <section className="w-full flex items-center justify-between">
            <section className="flex items-center">
              <Image
                src={discord}
                alt="discord"
                width="35"
                height="35"
                className="mr-4"
              />
              <p>Link to discord</p>
            </section>
            <Image src={arrow} alt="arrow" width="25" height="25" />
          </section>
        </Link>
      </section>
      <section className="w-full flex flex-col items-center pb-20">
        <iframe
          width="315"
          height="560"
          src="https://www.youtube.com/embed/6kf5IgZC4ho"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </section>
    </section>
  );
}
