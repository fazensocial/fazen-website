"use client";

import { motion } from "framer-motion";
import { Palette, Share2, Presentation, TrendingUp, ArrowRight, Zap } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */

const PLANS = [
  {
    id:       "brand",
    icon:     Palette,
    color:    "#FF5500",
    title:    "Logo & Brand Identity",
    popular:  true,
    promo:    200,
    original: 400,
    items: [
      "Logo Design (primary + variations)",
      "Brand Color & Type System",
      "Stationery & Brand Kit",
      "Brand Usage Guidelines",
    ],
  },
  {
    id:       "social",
    icon:     Share2,
    color:    "#9999FF",
    title:    "Social Media Design",
    popular:  false,
    promo:    100,
    original: 200,
    items: [
      "Instagram Feed Posts",
      "Story & Highlight Templates",
      "Content Carousels",
      "Social Profile Kit",
    ],
  },
  {
    id:       "presentation",
    icon:     Presentation,
    color:    "#00C4CC",
    title:    "Presentation Design",
    popular:  false,
    promo:    100,
    original: 200,
    items: [
      "Custom Pitch / Event Deck",
      "Investor Deck Layout",
      "Reusable Slide Template",
      "Presentation Animations",
    ],
  },
  {
    id:       "marketing",
    icon:     TrendingUp,
    color:    "#FF9A00",
    title:    "Marketing Design",
    popular:  false,
    promo:    50,
    original: 100,
    items: [
      "Social Media Ads",
      "Banner & Display Ads",
      "Email Template Design",
      "Campaign Visual Kit",
    ],
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

const CARD_FADE = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Pricing Card ───────────────────────────────────────── */

function PricingCard({ plan }) {
  const Icon = plan.icon;

  return (
    <motion.div
      variants={CARD_FADE}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className="group relative flex flex-col rounded-2xl overflow-hidden h-full cursor-default"
      style={{
        background:   plan.popular ? `${plan.color}0f` : "rgba(255,255,255,0.025)",
        border:       `1px solid ${plan.popular ? plan.color + "40" : "rgba(255,255,255,0.07)"}`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${plan.color}14 0%, transparent 65%)` }}
      />

      {/* Hover border brightens */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${plan.color}55` }}
      />

      {/* ── Top section ─────────────────────────────────── */}
      <div className="relative p-7 pb-5">

        {/* Icon + popular badge row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${plan.color}18`, border: `1px solid ${plan.color}30` }}
          >
            <Icon size={22} style={{ color: plan.color }} strokeWidth={1.5} />
          </div>

          {plan.popular && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white"
              style={{ backgroundColor: plan.color }}
            >
              <Zap size={10} strokeWidth={2.5} />
              <span className="font-body font-semibold text-[10px] uppercase tracking-[0.14em]">
                Most Popular
              </span>
            </motion.div>
          )}
        </div>

        {/* Service name */}
        <h3 className="font-body font-bold text-white-soft text-lg leading-snug mb-5">
          {plan.title}
        </h3>

        {/* Price block */}
        <div className="flex flex-col gap-1 mb-1">
          {/* Original price — blurred + strikethrough */}
          <div className="flex items-center gap-2">
            <span className="font-body text-white/40 text-sm line-through"
                  style={{ filter: "blur(3px)", transition: "filter 0.3s ease" }}
                  onMouseEnter={e => e.currentTarget.style.filter = "blur(1px)"}
                  onMouseLeave={e => e.currentTarget.style.filter = "blur(3px)"}>
              ${plan.original}
            </span>
            <span className="font-body font-medium text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                  style={{ color: plan.color, backgroundColor: `${plan.color}18` }}>
              50% off
            </span>
          </div>

          {/* Promo price */}
          <div className="flex items-end gap-1.5">
            <span className="font-heading text-[11px] uppercase tracking-[0.2em] text-white/35 mb-1.5">
              Start from
            </span>
          </div>
          <div className="font-display text-white leading-none"
               style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)" }}>
            <span style={{ color: plan.color }}>${"" }</span>
            <span>{plan.promo}</span>
          </div>
        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────── */}
      <div className="mx-7 h-px bg-white/[0.07]" />

      {/* ── Items list ──────────────────────────────────── */}
      <div className="relative flex-1 px-7 py-5 flex flex-col gap-3">
        {plan.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              className="w-[5px] h-[5px] rounded-full mt-[7px] flex-shrink-0"
              style={{ backgroundColor: plan.color }}
            />
            <span className="font-body text-sm text-white/55 group-hover:text-white/70 transition-colors duration-300 leading-snug">
              {item}
            </span>
          </div>
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA button */}
        <motion.a
          href="/soon"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl
                     font-body font-semibold text-sm transition-all duration-250"
          style={plan.popular
            ? { backgroundColor: plan.color, color: "#fff" }
            : { backgroundColor: "rgba(255,255,255,0.07)", color: "#F2F5F7",
                border: "1px solid rgba(255,255,255,0.1)" }
          }
        >
          Get Started
          <ArrowRight size={15} strokeWidth={2} />
        </motion.a>
      </div>

      {/* Bottom color bar on hover */}
      <div
        className="absolute bottom-0 inset-x-0 h-[2px] scale-x-0 group-hover:scale-x-100
                   origin-left transition-transform duration-400"
        style={{ backgroundColor: plan.color }}
      />
    </motion.div>
  );
}

/* ─── Bottom CTA ─────────────────────────────────────────── */

function PricingCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mt-6 rounded-2xl overflow-hidden cursor-default"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at 50% 100%, #FF550014 0%, transparent 60%)" }} />

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 px-8 py-7">
        <div className="flex flex-col gap-1.5 text-center lg:text-left">
          <p className="font-body font-bold text-white-soft text-base lg:text-lg">
            Need something specific or a custom quote?
          </p>
          <p className="font-body text-white/40 text-sm">
            See the full breakdown of every service, package, and bundling option.
          </p>
        </div>

        <motion.a
          href="/soon"
          whileHover={{ x: 4, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.97 }}
          className="flex-shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-xl
                     font-body font-semibold text-sm text-white
                     border border-white/15 hover:border-fazen/60
                     hover:bg-fazen/[0.08] transition-all duration-250"
        >
          View Full Pricing
          <ArrowRight size={16} strokeWidth={2} />
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

export default function Pricing() {
  return (
    <section className="bg-void">
      {/* Top divider glow */}
      <div className="page-container">
        <div className="relative h-px bg-gradient-to-r from-transparent via-fazen/40 to-transparent overflow-hidden">
          <motion.div
            animate={{ boxShadow: ["0 0 0px rgba(255,85,0,0)", "0 0 20px rgba(255,85,0,0.4)", "0 0 0px rgba(255,85,0,0)"] }}
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
          className="flex flex-col items-center text-center mb-14 lg:mb-16"
        >
          <motion.div
            variants={FADE_UP}
            className="inline-flex items-center gap-3 mb-6 border border-white/[0.12] rounded-full bg-white/[0.03] px-5 py-2.5"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
            <span className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-white/50">
              Pricing
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
          </motion.div>

          <motion.h2
            variants={FADE_UP}
            className="font-display text-white-soft text-[2rem] lg:text-[3rem] leading-tight mb-4"
          >
            Transparent pricing.{" "}
            <span className="text-fazen">No surprises.</span>
          </motion.h2>

          <motion.p
            variants={FADE_UP}
            className="font-body text-white/45 text-base lg:text-lg leading-relaxed max-w-xl"
          >
            Every project starts with a conversation. Here&apos;s what to expect.
          </motion.p>
        </motion.div>

        {/* ── Cards grid ─────────────────────────────────── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ─────────────────────────────────── */}
        <PricingCta />

      </div>
    </section>
  );
}
