"use client";

import { motion } from "framer-motion";
import { Target, Sparkles, Layers, Zap, Globe } from "lucide-react";

/* ─── Variants ───────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* ─── Data ───────────────────────────────────────────────── */

const ADVANTAGES = [
  {
    icon:  Target,
    color: "#FF5500",
    title: "Brand-First Thinking",
    desc:  "Every visual decision is grounded in brand strategy — not trends, not templates.",
  },
  {
    icon:  Sparkles,
    color: "#9999FF",
    title: "AI-Enhanced, Human-Led",
    desc:  "AI tools accelerate the process. Human judgment shapes the direction and quality.",
  },
  {
    icon:  Globe,
    color: "#00C4CC",
    title: "Multi-Platform Output",
    desc:  "Print, digital, social, motion — one consistent visual language across every channel.",
  },
  {
    icon:  Zap,
    color: "#FF9A00",
    title: "Fast Without Compromise",
    desc:  "A process-driven workflow so quality never takes a back seat to speed.",
  },
];

/* ─── Advantage Card ─────────────────────────────────────── */

function AdvantageCard({ adv }) {
  const Icon = adv.icon;
  return (
    <motion.div
      variants={FADE_UP}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group relative flex flex-col gap-5 p-6 rounded-2xl cursor-default
                 border border-white/[0.07] bg-white/[0.03] overflow-hidden"
    >
      {/* Hover glow from top-left */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${adv.color}18 0%, transparent 55%)` }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 inset-x-0 h-[1.5px] scale-x-0 group-hover:scale-x-100
                   transition-transform duration-400 origin-left"
        style={{ backgroundColor: adv.color }}
      />

      {/* Icon box */}
      <div
        className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${adv.color}15`, border: `1px solid ${adv.color}28` }}
      >
        <Icon size={19} style={{ color: adv.color }} strokeWidth={1.6} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 relative">
        <h3 className="font-heading font-medium text-white/90 text-[0.95rem] leading-snug
                       group-hover:text-white transition-colors duration-200">
          {adv.title}
        </h3>
        <p className="font-body text-sm text-white/35 leading-relaxed
                      group-hover:text-white/55 transition-colors duration-300">
          {adv.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────── */

export default function Advantage() {
  return (
    <section className="bg-void">
      <div className="page-container py-14 lg:py-20">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center mb-12 lg:mb-16"
        >
          <motion.div variants={FADE_UP}
            className="inline-flex items-center gap-3 mb-6
                       border border-white/[0.12] rounded-full bg-white/[0.03] px-5 py-2.5">
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
            <span className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-white/50">
              Why Fazen
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
          </motion.div>

          <motion.h2 variants={FADE_UP}
            className="font-display text-white
                       text-[2rem] lg:text-[3rem]
                       leading-tight lg:leading-[1.08] mb-4">
            Design that works{" "}
            <span className="text-fazen underline decoration-fazen decoration-1 underline-offset-[7px]">
              as hard as you do.
            </span>
          </motion.h2>

          <motion.p variants={FADE_UP}
            className="font-body font-medium text-white/45 text-base lg:text-lg max-w-md leading-relaxed">
            Not just aesthetics — every project is built with intention,
            clarity, and a process that delivers.
          </motion.p>
        </motion.div>

        {/* ── Grid: Featured + Cards ──────────────────────── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col lg:flex-row gap-4"
        >

          {/* Featured card */}
          <motion.div
            variants={FADE_UP}
            className="relative lg:w-[38%] shrink-0 rounded-2xl overflow-hidden
                       border border-white/[0.07] p-8 lg:p-10
                       flex flex-col justify-between gap-10 min-h-[300px]"
          >
            {/* Animated background glow */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full
                         bg-fazen blur-3xl pointer-events-none"
            />

            {/* Decorative concentric rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-6 right-6 w-36 h-36 rounded-full
                         border border-fazen/15 pointer-events-none"
            />
            <div className="absolute top-[3.25rem] right-[3.25rem] w-[4.5rem] h-[4.5rem] rounded-full
                            border border-fazen/25 pointer-events-none" />
            {/* Center dot */}
            <div className="absolute top-[4.9rem] right-[4.9rem] w-5 h-5 rounded-full
                            bg-fazen/40 pointer-events-none" />

            {/* Content top */}
            <div className="relative">
              <span className="font-heading font-medium text-[10px] uppercase
                               tracking-[0.22em] text-fazen/60 block mb-5">
                The Fazen Standard
              </span>
              <h3 className="font-display text-white text-[1.6rem] lg:text-[1.9rem] leading-[1.1]">
                One creative hand.<br />
                Consistent across<br />
                every output.
              </h3>
            </div>

            {/* Bottom: signature area */}
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl shrink-0
                              bg-fazen/10 border border-fazen/20
                              flex items-center justify-center">
                <span className="font-display text-fazen text-xl leading-none">F</span>
              </div>
              <div>
                <p className="font-display text-white text-[1rem] leading-tight">
                  Hafaz Sofyan
                </p>
                <p className="font-body text-[11px] text-white/40 mt-0.5 leading-snug">
                  Graphic Designer &amp; Creativepreneur
                </p>
              </div>
            </div>
          </motion.div>

          {/* Advantage cards — 2×2 grid */}
          <motion.div
            variants={STAGGER}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {ADVANTAGES.map((adv) => (
              <AdvantageCard key={adv.title} adv={adv} />
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
