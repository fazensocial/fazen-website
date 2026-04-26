"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, Share2, Presentation, TrendingUp, ArrowRight } from "lucide-react";

/* ─── Variants ───────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const MotionLink = motion.create(Link);

/* ─── Data ───────────────────────────────────────────────── */

const SERVICES = [
  {
    id: "brand",
    icon: Palette,
    color: "#FF5500",
    title: "Logo & Brand Identity",
    description: "Build a brand that's impossible to ignore. From first mark to full identity system.",
    items: [
      "Logo Design",
      "Brand Guidelines",
      "Stationery Kit",
      "Branding Kit",
      "Color System",
      "Visual Language",
    ],
  },
  {
    id: "social",
    icon: Share2,
    color: "#9999FF",
    title: "Social Media Design",
    description: "Content that stops the scroll. Visuals designed to engage and perform.",
    items: [
      "Instagram Posts",
      "Content Carousels",
      "Social Profile Kit",
      "Microblog Design",
      "Story Templates",
      "Video Graphics",
    ],
  },
  {
    id: "presentation",
    icon: Presentation,
    color: "#00C4CC",
    title: "Presentation Design",
    description: "Slides that sell your story. Polished decks that make every room pay attention.",
    items: [
      "Pitch Deck",
      "Event Presentation",
      "Investor Deck",
      "Marketing Deck",
      "Deck Templates",
      "Keynote Support",
    ],
  },
  {
    id: "marketing",
    icon: TrendingUp,
    color: "#FF9A00",
    title: "Marketing Design",
    description: "Visuals built to convert. From ads to emails — every asset designed to perform.",
    items: [
      "Email Template",
      "Banner Design",
      "Ads Design",
      "Static Motion Ads",
      "Campaign Kit",
      "Landing Page Design",
    ],
  },
];

/* ─── Service Card ─────────────────────────────────────── */

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={FADE_UP}
      whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group relative flex flex-col rounded-2xl overflow-hidden
                 border border-white/[0.07] bg-white/[0.03] h-full"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${service.color}18 0%, transparent 55%)` }}
      />

      {/* Header section with icon and text */}
      <div className="relative p-8 border-b border-white/[0.07] flex flex-col gap-4">
        {/* Icon box */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${service.color}15`, border: `1px solid ${service.color}28` }}
        >
          <Icon size={24} style={{ color: service.color }} strokeWidth={1.4} />
        </div>

        {/* Title and description */}
        <div>
          <h3 className="font-heading font-semibold text-white text-lg mb-2
                         group-hover:text-white transition-colors duration-200">
            {service.title}
          </h3>
          <p className="font-body text-sm text-white/45 leading-relaxed
                        group-hover:text-white/60 transition-colors duration-300">
            {service.description}
          </p>
        </div>
      </div>

      {/* Items list section */}
      <div className="relative flex-1 p-8 flex flex-col gap-4">
        <ul className="space-y-3">
          {service.items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors duration-200"
            >
              <span
                className="w-[4px] h-[4px] rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: service.color }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Spacer to push button to bottom */}
        <div className="flex-1" />

        {/* Explore CTA */}
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="group/btn flex items-center justify-between w-full pt-6 border-t border-white/[0.07]
                     text-sm font-heading font-medium cursor-pointer mt-auto
                     text-white/70 hover:text-white transition-colors duration-200"
          style={{ background: "transparent" }}
        >
          <span>Explore Now</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </motion.button>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 inset-x-0 h-[1.5px] scale-x-0 group-hover:scale-x-100
                   transition-transform duration-400 origin-left"
        style={{ backgroundColor: service.color }}
      />
    </motion.div>
  );
}

/* ─── CTA Section ────────────────────────────────────────── */

function ConfusionCTA() {
  return (
    <motion.div
      variants={FADE_UP}
      className="relative mt-16 lg:mt-20 flex flex-col items-center text-center gap-6
                 p-8 lg:p-12 rounded-2xl border border-white/[0.07] bg-white/[0.02]
                 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: `radial-gradient(ellipse at 50% 50%, #FF550018 0%, transparent 70%)` }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-4">
        <p className="font-body text-white/50 text-base">
          Not sure what you need?{" "}
          <span className="text-white font-medium">Let&apos;s figure it out together.</span>
        </p>

        <MotionLink
          href="/soon"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                     bg-fazen hover:bg-fazen/90 transition-colors duration-200
                     text-white font-heading font-medium text-sm cursor-pointer"
        >
          <span>Start a conversation</span>
          <ArrowRight size={16} />
        </MotionLink>
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────── */

export default function Services() {
  return (
    <section className="bg-void">
      {/* ── Divider ────────────────────────────────────── */}
      <div className="page-container">
        <div className="relative h-px bg-gradient-to-r from-transparent via-fazen/40 to-transparent overflow-hidden">
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 0px rgba(255,85,0,0)",
                "0 0 20px rgba(255,85,0,0.4)",
                "0 0 0px rgba(255,85,0,0)"
              ]
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
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center mb-12 lg:mb-16"
        >
          <motion.div variants={FADE_UP}
            className="inline-flex items-center gap-3 mb-6
                       border border-white/[0.12] rounded-full bg-white/[0.03] px-5 py-2.5">
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
            <span className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-white/50">
              What We Do
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
          </motion.div>

          <motion.h2 variants={FADE_UP}
            className="font-display text-white
                       text-[2rem] lg:text-[3rem]
                       leading-tight lg:leading-[1.08] mb-4">
            Every brand deserves{" "}
            <span className="text-fazen underline decoration-fazen decoration-1 underline-offset-[7px]">
              design that actually works.
            </span>
          </motion.h2>

          <motion.p variants={FADE_UP}
            className="font-body font-medium text-white/45 text-base lg:text-lg max-w-2xl leading-relaxed">
            From logo to launch — Fazen covers every visual touchpoint your brand
            needs to show up, stand out, and sell.
          </motion.p>
        </motion.div>

        {/* ── Services Grid ──────────────────────────────── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* ── Confusion CTA ──────────────────────────────── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <ConfusionCTA />
        </motion.div>

      </div>
    </section>
  );
}
