"use client";

import {
  AnimatePresence,
  motion,
  type MotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { FormEvent, useRef, useState } from "react";
import Image from "next/image";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [showPrivacyTooltip, setShowPrivacyTooltip] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const closeNotifyModal = () => {
    if (status === "submitting") return;

    setIsNotifyOpen(false);
    setStatus("idle");
    setStatusMessage("");
    setName("");
    setCompany("");
    setShowPrivacyTooltip(false);
  };

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
        body: JSON.stringify({ name, email, company }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong.");
      }

      setStatus("success");
      setStatusMessage(data.message);
      setName("");
      setEmail("");
      setCompany("");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <section
      ref={ref}
      className="mx-auto flex min-h-screen w-screen flex-col items-start overflow-hidden bg-[#FAFDEE] px-4 pb-28 text-[#1F3A4B] sm:px-8 sm:pb-32 lg:px-16 lg:pb-40"
    >
      {/* Header with Logo and CTA Button */}
      <div className="z-50 flex w-full items-center justify-between py-6">
        {/* Logo */}
        <div className="font-jakarta-sans text-2xl font-bold tracking-tight text-[#1F3A4B] lg:text-3xl">
          MOTION SOUL
        </div>

        {/* CTA Button */}
        <motion.button
          type="button"
          onClick={() => setIsNotifyOpen(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex w-fit h-[42px] items-center justify-between rounded-full bg-gradient-to-r from-[#7F3486] via-[#B32B7E] to-[#F39E2D] pl-4 pr-2 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
        >
          <span className=" pe-2 font-jakarta-sans font-semibold">
            NOTIFY ME
          </span>
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-[#B32B7E] group-hover:translate-x-[0.5] transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isNotifyOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1F3A4B]/35 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNotifyModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="notify-title"
              className="relative w-full max-w-md overflow-hidden rounded-[24px] bg-[#FAFDEE] p-6 text-[#1F3A4B] shadow-2xl sm:p-8"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeNotifyModal}
                aria-label="Close notify form"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#1F3A4B]/15 bg-white/50 text-[#1F3A4B] transition-colors hover:bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              <div className="mb-6 pr-8">
                <h2 id="notify-title" className="font-jakarta-sans text-3xl font-bold leading-tight">
                  Be there when the curtain rises.
                </h2>
                <p className="font-jakarta-sans mt-3 text-sm font-medium text-[#1F3A4B]/75">
                  Leave your email and we will send the launch note straight to your inbox.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleNotifySubmit}>
                <div className="block">
                  <label htmlFor="notify-name" className="font-jakarta-sans text-sm font-semibold text-[#1F3A4B]">
                    Name
                  </label>
                  <input
                    id="notify-name"
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className="mt-2 h-12 w-full rounded-full border border-[#1F3A4B]/15 bg-white/70 px-4 text-base font-medium text-[#1F3A4B] outline-none transition-colors placeholder:text-[#1F3A4B]/35 focus:border-[#B32B7E]"
                  />
                </div>

                <div className="block">
                  <div className="flex items-center gap-2">
                    <label htmlFor="notify-email" className="font-jakarta-sans text-sm font-semibold text-[#1F3A4B]">
                    Email address
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        aria-label="Email privacy information"
                        aria-describedby="notify-email-tooltip"
                        onClick={() => setShowPrivacyTooltip((value) => !value)}
                        onMouseEnter={() => setShowPrivacyTooltip(true)}
                        onMouseLeave={() => setShowPrivacyTooltip(false)}
                        onFocus={() => setShowPrivacyTooltip(true)}
                        onBlur={() => setShowPrivacyTooltip(false)}
                        className="flex h-5 w-5 items-center justify-center rounded-full border border-[#1F3A4B]/25 bg-white/60 text-[11px] font-bold leading-none text-[#1F3A4B] transition-colors hover:border-[#B32B7E] hover:text-[#B32B7E]"
                      >
                        i
                      </button>
                      {showPrivacyTooltip && (
                        <div
                          id="notify-email-tooltip"
                          role="tooltip"
                          className="font-jakarta-sans absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg bg-[#1F3A4B] px-3 py-2 text-center text-xs font-medium leading-snug text-[#FAFDEE] shadow-lg"
                        >
                          We will only use your email to send launch updates. No spam, no sharing, no other purpose.
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    id="notify-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 h-12 w-full rounded-full border border-[#1F3A4B]/15 bg-white/70 px-4 text-base font-medium text-[#1F3A4B] outline-none transition-colors placeholder:text-[#1F3A4B]/35 focus:border-[#B32B7E]"
                  />
                </div>

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
                  whileHover={status === "submitting" ? undefined : { scale: 1.02 }}
                  whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
                  className="font-jakarta-sans flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#7F3486] via-[#B32B7E] to-[#F39E2D] px-5 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? "Submitting..." : "Notify Me"}
                </motion.button>

                {statusMessage && (
                  <p
                    className={`font-jakarta-sans text-center text-sm font-semibold ${
                      status === "success" ? "text-[#1F3A4B]" : "text-[#B32B7E]"
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto mt-20 md:mt-42 flex w-full max-w-7xl flex-col items-start justify-center gap-5 text-left lg:flex-row lg:items-center">
        {/* Image — top on mobile, right side on desktop */}
        <div className="relative z-20 -mx-12 mt-6 w-[130%] self-center overflow-hidden pointer-events-none sm:-mx-8 sm:w-full lg:hidden">
          <Image
            src="/Easyplacehero1.png"
            alt="Hero Image"
            width={900}
            height={1100}
            className="h-auto w-full object-contain"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#FAFDEE] via-[#FAFDEE]/90 via-[65%] to-transparent backdrop-blur-[1px]" />
        </div>

        {/* Title + subtitle */}
        <div className="relative -mt-[50vw] z-30 flex w-full flex-col items-center gap-2 text-center sm:-mt-64 md:-mt-72 lg:mt-0 lg:flex-1 lg:items-start lg:gap-5 lg:text-left">
          <h1 className="font-jakarta-sans relative z-10 text-center lg:text-left text-4xl md:text-7xl font-medium tracking-[-0.08em] lg:text-9xl">
            Empowering <span className="ml-2 lg:ml-4"></span> <br className="hidden lg:inline-flex ml-1 lg:ml-0" /> Every <span className="ml-2 lg:ml-4"></span> Soul <br className=" hidden lg:inline-flex ml-2 lg:ml-4" />
            Through <span className="ml-2 lg:ml-4"></span> Art
          </h1>
          <p className="font-jakarta-sans relative z-10 max-w-2xl text-center lg:text-left text-md lg:text-xl font-medium text-[#1F3A4B]">
            A New Era of Artistic Expression
          </p>
        </div>

        {/* Desktop-only decorative SVG */}
        <div className="absolute -right-[10%] top-0 z-0 hidden overflow-hidden pointer-events-none">
          <LinePath
            className=""
            scrollYProgress={scrollYProgress}
          />
        </div>

        {/* Desktop-only image on the right */}
        <div className="absolute -right-[22%] top-[-25%] z-20 hidden lg:block overflow-hidden pointer-events-none">
          <Image
            src="/Easyplacehero1.png"
            alt="Hero Image"
            width={900}
            height={1100}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Added text centered after hero title - FIXED: added w-full and proper centering */}
      <div className="relative z-10 mt-[225px] w-full max-w-7xl text-center mx-auto lg:mt-[450px]">
        <p className="font-jakarta-sans mx-auto text-xl font-[500] text-[#1F3A4B] sm:text-2xl lg:text-5xl [text-shadow:_0_2px_4px_rgba(0,0,0,0.1)] hover:[text-shadow:_0_4px_8px_rgba(0,0,0,0.2)] transition-shadow duration-300">
          Motion Soul Pty Ltd is an arts, culture and creative services company supporting dance and music education, accredited performing arts examinations, cultural productions, events, digital media and creative content.
        </p>
      </div>

      {/* <div className="rounded-4xl font-jakarta-sans w-full translate-y-[30vh] h-screen bg-gradient-to-t from-[#7F3486] to-[#FAFDEE] pb-10 text-[#FAFDEE]">
        <h1 className="h-full flex items-end justify-center text-center text-[15.5vw] font-bold leading-[0.9] tracking-tighter lg:text-[190px]">
          COMING <span className="ml-4"></span> SOON
        </h1>
      </div> */}
    </section>
  );
};

export { HeroSection };

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: MotionValue<number>;
}) => {
  const pathLengthRaw = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const pathLength = useSpring(pathLengthRaw, {
    stiffness: 28,
    damping: 36,
    mass: 1.4,
  });
  const strokeDashoffset = useTransform(pathLength, (value) => 1 - value);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="lineGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
          gradientUnits="objectBoundingBox"
        >

          <stop offset="0%" stopColor="#FAFDEE" stopOpacity="1" />
          <stop offset="2%" stopColor="#FAFDEE" stopOpacity="1" />

          <stop offset="7%" stopColor="#FAFDEE" stopOpacity="0.8" />
          <stop offset="10%" stopColor="#B32B7E" stopOpacity="0.5" />
          <stop offset="12.5%" stopColor="#B32B7E" stopOpacity="1" />

          <stop offset="50%" stopColor="#B32B7E" stopOpacity="1" />
          <stop offset="80%" stopColor="#F39E2D" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F39E2D" stopOpacity="1" />
        </linearGradient>
      </defs>

      <motion.path
        d="M1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="url(#lineGradient)"
        strokeWidth="14"
        fill="none"
        style={{
          pathLength,
          strokeDashoffset,
        }}
      />
    </svg>
  );
};
