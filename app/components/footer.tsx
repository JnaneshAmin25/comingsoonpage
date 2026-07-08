"use client";

import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/motionsoul/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/motionsoul/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/motionsoul/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@motionsoul",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@motionsoul",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:support@motionsoul.com.au",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer
      id="footer"
      className="font-jakarta-sans relative w-full overflow-hidden bg-gradient-to-br from-[#7F3486] via-[#B32B7E] to-[#F39E2D] text-[#FAFDEE]"
    >
      {/* Tagline + Socials row */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-6 pt-16 sm:px-10 lg:flex-row lg:items-center lg:px-16 lg:pt-20">
        {/* Tagline — top left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FAFDEE]/70">
            Motion Soul
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
            Where movement, music and meaning meet —{" "}
            <span className="italic text-[#FAFDEE]/85">
              a new chapter begins.
            </span>
          </h2>
        </motion.div>

        {/* Socials — top right */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="flex flex-wrap items-center gap-3"
        >
          {socialLinks.map((link) => (
            <li key={link.name}>
              <motion.a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={link.name}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#FAFDEE]/30 bg-white/5 text-[#FAFDEE] backdrop-blur-sm transition-colors hover:border-[#FAFDEE] hover:bg-[#FAFDEE] hover:text-[#B32B7E]"
              >
                {link.icon}
              </motion.a>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* COMING SOON — big text */}
      <div className="relative mt-12 w-full px-4 sm:px-8 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-[#FAFDEE]
                     text-[15.5vw] font-bold leading-[0.9] tracking-tighter lg:text-[190px]
                     py-6"
        >
          COMING <span className="">SOON</span>
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
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#F39E2D]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#7F3486]/40 blur-3xl" />
    </footer>
  );
};

export { Footer };
