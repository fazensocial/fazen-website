"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/sections/Footer";

/* ─── Variants ───────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

/* ─── Page ───────────────────────────────────────────────── */

export default function SoonPage() {
  return (
    <div className="min-h-screen bg-void flex flex-col">

      {/* ── Content ──────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-6 py-24">

        {/* Subtle glow */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[480px] h-[320px] rounded-full bg-fazen/[0.06] blur-[120px] pointer-events-none"
        />

        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center max-w-lg"
        >

          {/* Badge */}
          <motion.div variants={FADE_UP}
            className="inline-flex items-center gap-2.5 mb-8
                       border border-white/[0.10] rounded-full bg-white/[0.03] px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-fazen shrink-0 animate-pulse" />
            <span className="font-body text-xs text-white/40 tracking-widest uppercase">
              Under Construction
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={FADE_UP}
            className="font-display text-white
                       text-[2.6rem] lg:text-[3.8rem]
                       leading-[1.05] mb-5"
          >
            Coming <span className="text-fazen">Soon.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={FADE_UP}
            className="font-body text-white/40 text-base leading-relaxed mb-10 max-w-sm"
          >
            This page is being built with care. Check back soon — it will be worth the wait.
          </motion.p>

          {/* Back button */}
          <motion.div variants={FADE_UP}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-sm font-medium
                         text-white/50 hover:text-white/90
                         border border-white/[0.10] hover:border-white/[0.22]
                         rounded-full px-5 py-2.5
                         transition-all duration-200"
            >
              <ArrowLeft size={14} />
              Back to Homepage
            </Link>
          </motion.div>

        </motion.div>

      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer />

    </div>
  );
}
