import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY).then(
      (result) => {
        console.log(`Message was sent successfully: ${result.text}`);
      },
      (error) => {
        console.log(`Message was not sent successfully: ${error.text}`);
      }
    );
    e.target.reset();
  };

  return (
    <section className="w-full flex flex-col items-center pt-32 py-16 bg-white text-gray-900">
      <h1>Contact</h1>
      <section id="contact" className="w-full lg:h-screen">
        <section className="max-w-[1240px] m-auto px-2 py-16 w-full">
          <section className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
            <section className="p-4">
              <form ref={form} onSubmit={handleSubmit}>
                <section className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <section className="flex flex-col">
                    <label className="uppercase text-sm py-2">Name</label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-gray-300"
                      type="text"
                      name="name"
                    />
                  </section>
                  <section className="flex flex-col">
                    <label className="uppercase text-sm py-2">Email</label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-gray-300"
                      type="email"
                      name="email"
                    />
                  </section>
                </section>
                <section className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Subject</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="text"
                    name="subject"
                  />
                </section>
                <section className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Message</label>
                  <textarea
                    className="border-2 rounded-lg p-3 border-gray-300"
                    rows="10"
                    name="message"
                  ></textarea>
                </section>
                <button className="w-full p-4 dark:bg-gray-900 text-gray-100 mt-4">
                  Send Message
                </button>
              </form>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
