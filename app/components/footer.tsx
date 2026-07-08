"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleNotifySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, company }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong.");
      }

      setStatus("success");
      setStatusMessage(data.message);
      setEmail("");
      setCompany("");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <footer
      id="footer"
      className="font-jakarta-sans relative w-full overflow-hidden bg-[linear-gradient(to_bottom,rgba(127,52,134,0)_0%,rgba(127,52,134,0.55)_42%,rgba(179,43,126,0.85)_70%,#F39E2D_100%)] text-[#FAFDEE]"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 pt-32 sm:px-10 sm:pt-36 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-end lg:px-16 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          <h2 className="whitespace-nowrap text-[21px] font-semibold leading-tight sm:text-3xl lg:text-[34px]">
            Get notified when Motion Soul goes live.
          </h2>
          <p className="mt-3 max-w-none whitespace-nowrap text-[11px] font-medium leading-6 text-[#FAFDEE]/75 sm:text-base lg:text-sm xl:text-base">
            Join the launch list and we will send you a short note when the new website is ready.
          </p>

          <form
            className="mt-6 flex w-full flex-col gap-3 sm:flex-row"
            onSubmit={handleNotifySubmit}
          >
            <label htmlFor="footer-notify-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-notify-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="h-12 min-w-0 flex-1 rounded-full border border-white bg-white px-5 py-3 text-base font-semibold text-[#1F3A4B] outline-none shadow-lg transition-colors placeholder:text-[#1F3A4B]/45 focus:border-[#1F3A4B] focus:bg-[#FAFDEE]"
            />
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              className="hidden"
              aria-hidden="true"
            />
            <motion.button
              type="submit"
              disabled={status === "submitting"}
              whileHover={status === "submitting" ? undefined : { y: -2 }}
              whileTap={status === "submitting" ? undefined : { scale: 0.97 }}
              className="h-12 rounded-full border border-[#1F3A4B] bg-[#1F3A4B] px-6 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg transition-colors hover:bg-[#142B38] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === "submitting" ? "Submitting..." : "Notify Me"}
            </motion.button>
          </form>

          {statusMessage && (
            <p
              className={`mt-3 text-sm font-semibold ${
                status === "success" ? "text-[#FAFDEE]" : "text-white"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="w-full lg:text-right"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FAFDEE]/70">
            Email
          </p>
          <a
            href="mailto:support@motionsoul.com.au"
            className="mt-3 inline-flex max-w-full items-center gap-3 break-words text-xl font-semibold leading-tight text-[#FAFDEE] transition-colors hover:text-white sm:text-3xl lg:justify-end"
          >
            support@motionsoul.com.au
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 mt-12 w-full px-4 sm:px-8 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap py-6 text-center text-[14vw] font-bold leading-none tracking-tight text-white sm:text-[13vw] lg:text-[150px] xl:text-[170px]"
        >
          MOTION SOUL
        </motion.h1>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 pb-8 pt-4 text-xs text-[#FAFDEE]/80 sm:flex-row sm:px-10 lg:px-16">
        <p>© {new Date().getFullYear()} Motion Soul Pty Ltd. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Made with</span>
          <span className="text-[#F39E2D]">♥</span>
          <span>in Sydney, Australia</span>
        </p>
      </div>

      {/* Subtle glow accents */}
      <div className="pointer-events-none absolute -left-32 top-10 z-0 h-72 w-72 rounded-full bg-[#F39E2D]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 z-0 h-80 w-80 rounded-full bg-[#7F3486]/40 blur-3xl" />
    </footer>
  );
};

export { Footer };
