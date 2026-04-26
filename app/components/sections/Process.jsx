"use client";

import { motion, useInView } from "framer-motion";
import { ClipboardList, Compass, PenTool, MessageCircle, Package } from "lucide-react";
import { useRef } from "react";

/* ─── Data ───────────────────────────────────────────────── */

const STEPS = [
  {
    number: "01",
    icon:   ClipboardList,
    title:  "Brief",
    desc:   "Share your goals, scope, and references. We ask the right questions upfront.",
  },
  {
    number: "02",
    icon:   Compass,
    title:  "Strategy",
    desc:   "We align on direction and deliverables before a single pixel is touched.",
  },
  {
    number: "03",
    icon:   PenTool,
    title:  "Design",
    desc:   "First draft lands in 48 hours. Sharp and built around your brand from day one.",
  },
  {
    number: "04",
    icon:   MessageCircle,
    title:  "Revise",
    desc:   "Two focused feedback rounds — enough to perfect it, fast enough to keep moving.",
  },
  {
    number: "05",
    icon:   Package,
    title:  "Deliver",
    desc:   "Final files in every format. Organized, labeled, and ready to launch.",
  },
];

/* ─── Variants ───────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* ─── Process Timeline ───────────────────────────────────── */

function ProcessTimeline() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>

      {/* ── Desktop: horizontal timeline ─────────────────── */}
      <div className="hidden lg:block">
        <div className="relative grid grid-cols-5 gap-0">

          {/* Base line through circle centers (h-16 / 2 = 32px = top-8) */}
          <div className="absolute top-8 left-[10%] right-[10%] h-px bg-white/[0.07] pointer-events-none" />

          {/* Animated orange fill line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="absolute top-8 left-[10%] right-[10%] h-px bg-fazen/55 origin-left pointer-events-none"
            style={{ boxShadow: "0 0 6px 1px rgba(255,85,0,0.25)" }}
          />

          {/* Step columns */}
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center gap-7 px-5 cursor-default"
              >
                {/* Circle — bg-void hides the line through it */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-void" />
                  <div
                    className="absolute inset-0 rounded-full border transition-all duration-300
                               border-white/[0.11] group-hover:border-fazen/55"
                  />
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(255,85,0,0.18) 0%, transparent 70%)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-xl text-white/30 group-hover:text-fazen transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Icon box */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                             bg-white/[0.04] border border-white/[0.07]
                             group-hover:border-fazen/35 group-hover:bg-fazen/[0.08]"
                >
                  <Icon
                    size={18}
                    className="text-white/35 group-hover:text-fazen transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title + description */}
                <div className="text-center flex flex-col gap-2">
                  <h3 className="font-body font-bold text-white-soft text-[0.95rem] leading-snug
                                 group-hover:text-white transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs text-white/35 leading-relaxed
                                group-hover:text-white/55 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: vertical timeline ─────────────────────── */}
      <div className="lg:hidden flex flex-col">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-6 pb-9 relative"
            >
              {/* Left: circle + connector line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-fazen/45 flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,85,0,0.08)" }}
                >
                  <span className="font-display text-sm text-fazen">{step.number}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.07] mt-3" />
                )}
              </div>

              {/* Right: icon + content */}
              <div className="pt-1.5 flex flex-col gap-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center
                             bg-white/[0.05] border border-white/[0.08]"
                >
                  <Icon size={16} className="text-white/45" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-body font-bold text-white-soft text-lg mb-1.5">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-white/38 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

export default function Process() {
  return (
    <section className="bg-void">

      {/* Orange divider — same as Services / Pricing */}
      <div className="page-container">
        <div className="relative h-px bg-gradient-to-r from-transparent via-fazen/40 to-transparent overflow-hidden">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(255,85,0,0)",
                "0 0 20px rgba(255,85,0,0.4)",
                "0 0 0px rgba(255,85,0,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>
      </div>

      <div className="page-container py-14 lg:py-20">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-center text-center mb-16 lg:mb-20"
        >
          <motion.div
            variants={FADE_UP}
            className="inline-flex items-center gap-3 mb-6 border border-white/[0.12] rounded-full bg-white/[0.03] px-5 py-2.5"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
            <span className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-white/50">
              How It Works
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
          </motion.div>

          <motion.h2
            variants={FADE_UP}
            className="font-display text-white-soft text-[2rem] lg:text-[3rem] leading-tight mb-4"
          >
            From brief to{" "}
            <span className="text-fazen">final files.</span>
          </motion.h2>

          <motion.p
            variants={FADE_UP}
            className="font-body text-white/45 text-base lg:text-lg leading-relaxed max-w-xl"
          >
            Five clear steps. No confusion, no delays — just great design delivered fast.
          </motion.p>
        </motion.div>

        {/* ── Timeline ───────────────────────────────────── */}
        <ProcessTimeline />

      </div>
    </section>
  );
}
