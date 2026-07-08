"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      className="mx-auto flex h-[230vh] w-screen flex-col items-start overflow-hidden bg-[#FAFDEE] px-4 text-[#1F3A4B] sm:px-8 lg:px-16"
    >
      {/* Header with Logo and CTA Button */}
      <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-6 sm:px-8 lg:px-16">
        {/* Logo */}
        <div className="font-jakarta-sans text-2xl font-bold tracking-tight text-[#1F3A4B] lg:text-3xl">
          MOTION SOUL
        </div>

        {/* CTA Button */}
        <motion.button
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

      <div className="relative mt-20 md:mt-42 flex w-full max-w-7xl flex-col items-start justify-center gap-5 text-left lg:flex-row lg:items-center">
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
        </div>

        {/* Title + subtitle */}
        <div className="relative -mt-20 lg:mt-0 z-30 flex w-full flex-col items-center lg:items-start gap-2 lg:gap-5 text-center lg:text-left lg:flex-1">
          <h1 className="font-jakarta-sans relative z-10 text-center lg:text-left text-4xl md:text-7xl font-medium tracking-[-0.08em] lg:text-9xl">
            Empowering <span className="ml-2 lg:ml-4"></span> <br className="hidden lg:inline-flex ml-1 lg:ml-0" /> Every <span className="ml-2 lg:ml-4"></span> Soul <br className=" hidden lg:inline-flex ml-2 lg:ml-4" />
            Through <span className="ml-2 lg:ml-4"></span> Art
          </h1>
          <p className="font-jakarta-sans relative z-10 max-w-2xl text-center lg:text-left text-md lg:text-xl font-medium text-[#1F3A4B]">
            A New Era of Artistic Expression
          </p>
        </div>

        {/* Desktop-only decorative SVG */}
        <div className="absolute -right-[10%] top-0 z-0 hidden lg:block overflow-hidden pointer-events-none">
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
      <div className="relative z-10 mt-[450px] w-full max-w-7xl text-center mx-auto">
        <p className="font-jakarta-sans mx-auto text-base font-[500] text-[#1F3A4B] lg:text-5xl [text-shadow:_0_2px_4px_rgba(0,0,0,0.1)] hover:[text-shadow:_0_4px_8px_rgba(0,0,0,0.2)] transition-shadow duration-300">
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
  scrollYProgress: any;
}) => {
  const pathLengthRaw = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const pathLength = useSpring(pathLengthRaw, {
    stiffness: 40,
    damping: 30,
    mass: 1.2,
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
        strokeWidth="20"
        fill="none"
        style={{
          pathLength,
          strokeDashoffset,
        }}
      />
    </svg>
  );
};