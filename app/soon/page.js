"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Hammer, Sparkles } from "lucide-react";

/* ─── Variants ───────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const PULSE = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.15, 0.25, 0.15],
  },
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};

/* ─── Page ───────────────────────────────────────────────── */

export default function SoonPage() {
  return (
    <main className="relative min-h-screen bg-void flex items-center justify-center overflow-hidden">

      {/* Background glow */}
      <motion.div
        variants={PULSE}
        animate="animate"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[500px] h-[500px] rounded-full bg-fazen blur-[140px] pointer-events-none"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-fazen/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={STAGGER}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl"
      >

        {/* Icon badge */}
        <motion.div
          variants={FADE_UP}
          className="relative mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.08]
                          flex items-center justify-center">
            <Hammer size={32} className="text-fazen" strokeWidth={1.4} />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles size={16} className="text-fazen/60" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Badge label */}
        <motion.div variants={FADE_UP}
          className="inline-flex items-center gap-3 mb-6
                     border border-white/[0.12] rounded-full bg-white/[0.03] px-5 py-2.5">
          <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0 animate-pulse" />
          <span className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-white/50">
            Under Construction
          </span>
          <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0 animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={FADE_UP}
          className="font-display text-white
                     text-[2.4rem] lg:text-[3.5rem]
                     leading-tight lg:leading-[1.08] mb-5"
        >
          Something awesome<br />
          is <span className="text-fazen">cooking.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={FADE_UP}
          className="font-body font-medium text-white/45 text-base lg:text-lg
                     leading-relaxed mb-10 max-w-md"
        >
          We&apos;re crafting this page with the same precision and care we pour into every brand we build. 
          Swing by soon — it&apos;s going to be worth the wait.
        </motion.p>

        {/* Progress indicator */}
        <motion.div variants={FADE_UP} className="w-full max-w-xs mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="font-heading font-medium text-[10px] uppercase tracking-[0.2em] text-white/30">
              Progress
            </span>
            <span className="font-heading font-medium text-[10px] uppercase tracking-[0.2em] text-fazen/70">
              In Progress
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-fazen"
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={FADE_UP}>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-body font-medium text-sm
                       text-white/70 hover:text-white
                       border border-white/[0.12] hover:border-white/[0.25]
                       rounded-full px-6 py-3
                       transition-all duration-200"
          >
            <ArrowLeft size={15} />
            Back to Homepage
          </Link>
        </motion.div>

      </motion.div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fazen/30 to-transparent" />

    </main>
  );
}

