"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */

const STATS = [
  {
    value: 120,
    suffix: "+",
    label: "Projects Delivered",
    sub:   "From first logos to full rebrands",
  },
  {
    value: 48,
    suffix: "h",
    label: "First Draft",
    sub:   "In your inbox. Not next week.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    sub:   "They come back. And bring friends.",
  },
  {
    value: 4,
    suffix: "×",
    label: "Avg. Engagement",
    sub:   "Brand growth post-visual overhaul",
  },
];

const PILLARS = [
  {
    title: "Sharp Brand Strategy",
    desc:  "We don't just design pretty things. Every pixel serves your brand's position, voice, and goals — no filler.",
    image: "/images/homepage/Foto%20depan/01.jpg",
  },
  {
    title: "Fast. Really Fast.",
    desc:  "48-hour first drafts. Clear rounds. Zero ghosting. Great work delivered before your deadline, not after.",
    image: "/images/homepage/Foto%20depan/07.jpg",
  },
  {
    title: "Built to Last",
    desc:  "From your first logo to a full visual system. Fazen builds what endures — and scales as your brand grows.",
    image: "/images/homepage/Foto%20depan/11.jpg",
  },
];

/* ─── Animated Counter ───────────────────────────────────── */

function Counter({ to }) {
  const ref          = useRef(null);
  const motionVal    = useMotionValue(0);
  const isInView     = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const ctrl  = animate(motionVal, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    const unsub = motionVal.on("change", (v) => setDisplay(Math.round(v)));
    return () => { ctrl.stop(); unsub(); };
  }, [isInView, motionVal, to]);

  return <span ref={ref}>{display}</span>;
}

/* ─── Stat Cell ──────────────────────────────────────────── */

function StatCell({ stat }) {
  return (
    <div className="group flex flex-col gap-2 p-8 lg:p-10 relative overflow-hidden cursor-default
                    border-r border-b border-void/[0.09]">
      {/* Hover bg tint */}
      <div className="absolute inset-0 bg-fazen/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Number */}
      <div className="font-display text-[3.5rem] lg:text-[5.5rem] leading-none text-void
                      group-hover:text-fazen transition-colors duration-350 select-none relative">
        <Counter to={stat.value} />
        <span className="text-fazen">{stat.suffix}</span>
      </div>

      {/* Label + sub */}
      <div className="relative">
        <p className="font-heading font-semibold text-void text-sm lg:text-base">
          {stat.label}
        </p>
        <p className="font-body text-void/40 text-xs lg:text-sm mt-0.5">
          {stat.sub}
        </p>
      </div>

      {/* Bottom accent — expands on hover */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-fazen
                      scale-x-0 group-hover:scale-x-100 origin-left
                      transition-transform duration-400" />
    </div>
  );
}

/* ─── Pillar Card ────────────────────────────────────────── */

function PillarCard({ pillar, index }) {
  return (
    <motion.div
      className="group relative border border-void/[0.1] rounded-2xl overflow-hidden bg-white cursor-default"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* ── Image area ── */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={pillar.image}
            alt={pillar.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* ── Content area ── */}
      <div className="relative px-7 pt-6 pb-8 min-h-[120px] overflow-hidden">
        {/* Faint index numeral */}
        <motion.span
          variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-2 right-5 font-display text-[5rem] leading-none
                     text-void/[0.05] select-none pointer-events-none"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Title — shifts up on hover */}
        <motion.h3
          variants={{ rest: { y: 0 }, hover: { y: -18 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-semibold text-void text-lg lg:text-xl leading-snug relative"
        >
          {pillar.title}
        </motion.h3>

        {/* Description — fades in on hover */}
        <motion.p
          variants={{ rest: { opacity: 0, y: 10 }, hover: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-body text-sm text-void/55 leading-relaxed mt-2.5 relative"
        >
          {pillar.desc}
        </motion.p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 inset-x-0 h-[2px] bg-fazen origin-left"
      />
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

export default function Impact() {
  return (
    <section className="bg-white-soft">
      <div className="page-container py-14 lg:py-20">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-12 lg:mb-16"
        >
          <motion.p
            variants={FADE_UP}
            className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-void/40 mb-3"
          >
            By the Numbers
          </motion.p>
          <motion.h2
            variants={FADE_UP}
            className="font-display text-void text-[2rem] lg:text-[3rem] leading-tight"
          >
            Impact that speaks{" "}
            <span className="text-fazen">for itself.</span>
          </motion.h2>
          <motion.p
            variants={FADE_UP}
            className="font-body text-void/45 text-base lg:text-lg mt-4 max-w-xl leading-relaxed"
          >
            Every metric here is a brand that pushed forward — and trusted Fazen to make it happen.
          </motion.p>
        </motion.div>

        {/* ── Stats Strip ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-void/[0.09]
                     rounded-2xl overflow-hidden bg-white"
        >
          {STATS.map((stat) => (
            <StatCell key={stat.label} stat={stat} />
          ))}
        </motion.div>

        {/* ── Pillar Cards ─────────────────────────────────── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5"
        >
          {PILLARS.map((pillar, i) => (
            <motion.div key={pillar.title} variants={FADE_UP}>
              <PillarCard pillar={pillar} index={i} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
