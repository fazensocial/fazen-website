"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */

const CRITERIA = [
  { label: "Speed",       short: "Speed",    sub: "48h turnaround"      },
  { label: "Consistency", short: "Consist.", sub: "Brand voice & style"  },
  { label: "Quality",     short: "Quality",  sub: "Professional output"  },
  { label: "Affordable",  short: "Price",    sub: "Value for money"      },
  { label: "Flexibility", short: "Flex.",    sub: "Revisions & scope"    },
];

const ROWS = [
  {
    name:    "Fazen",
    desc:    "Your dedicated brand design partner. Fast, consistent, built around your brand.",
    isFazen: true,
    values:  [true, true, true, true, true],
  },
  {
    name:   "In-house Team",
    desc:   "High salaries, slow to hire, and costly to scale when workloads fluctuate.",
    values: [false, true, true, false, false],
  },
  {
    name:   "Freelancers",
    desc:   "Output quality varies widely. Deadlines slip. Brand consistency is hard to maintain.",
    values: [false, false, false, true, true],
  },
  {
    name:   "Creative Agency",
    desc:   "Premium pricing, rigid retainers, and slow turnarounds for everyday creative needs.",
    values: [false, true, true, false, false],
  },
  {
    name:   "AI Tools Only",
    desc:   "Fast and cheap, but lacks brand context, strategy, and human creative judgment.",
    values: [true, false, false, true, false],
  },
];

/* Desktop grid: name column + 5 equal criterion columns */
const GRID = { gridTemplateColumns: "minmax(220px, 2.2fr) repeat(5, minmax(90px, 1fr))" };

/* Mobile grid: compact name + 5 equal columns, fills full width */
const GRID_MOBILE = { gridTemplateColumns: "1.5fr repeat(5, 1fr)" };

/* ─── Indicators ─────────────────────────────────────────── */

function Yes({ isFazen, isHovered }) {
  return (
    <CheckCircle2
      size={27}
      className={`block mx-auto transition-colors duration-200 ${
        isFazen    ? "text-white" :
        isHovered  ? "text-white/75" :
                     "text-void/45"
      }`}
      strokeWidth={2}
    />
  );
}

function No({ isFazen, isHovered }) {
  return (
    <XCircle
      size={27}
      className={`block mx-auto transition-colors duration-200 ${
        isFazen    ? "text-white/35" :
        isHovered  ? "text-white/22" :
                     "text-void/16"
      }`}
      strokeWidth={1.6}
    />
  );
}

/* ─── Variants ───────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const ROW_FADE = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER_ROWS = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

/* ─── Section ────────────────────────────────────────────── */

export default function Comparison() {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <section className="bg-white-soft">
      {/* divider */}
      <div className="page-container">
        <div className="h-px bg-gradient-to-r from-transparent via-void/10 to-transparent" />
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
          <motion.p
            variants={FADE_UP}
            className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-void/40 mb-3"
          >
            Why Fazen
          </motion.p>
          <motion.h2
            variants={FADE_UP}
            className="font-display text-void text-[2rem] lg:text-[3rem] leading-tight mb-4"
          >
            The smarter choice,{" "}
            <span className="text-fazen">by design.</span>
          </motion.h2>
          <motion.p
            variants={FADE_UP}
            className="font-body text-void/45 text-base lg:text-lg leading-relaxed max-w-lg"
          >
            Every alternative comes with a catch. Fazen doesn&apos;t.
          </motion.p>
        </motion.div>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── MOBILE TABLE (lg:hidden) ───────────────────── */}
        {/* No descriptions, compact grid, fits one viewport */}
        {/* ══════════════════════════════════════════════════ */}
        <div className="lg:hidden">

          {/* Column headers */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid mb-1"
            style={GRID_MOBILE}
          >
            <div className="pb-3" />
            {CRITERIA.map((c) => (
              <div key={c.short} className="pb-3 text-center">
                <p className="font-body font-semibold text-void text-[9px] leading-tight">
                  {c.short}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Rows */}
          <motion.div
            variants={STAGGER_ROWS}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl overflow-hidden border border-void/[0.1]"
          >
            {ROWS.map((row, ri) => {
              const isLast = ri === ROWS.length - 1;
              return (
                <motion.div
                  key={row.name}
                  variants={ROW_FADE}
                  className={`
                    grid relative
                    ${!isLast ? "border-b border-void/[0.08]" : ""}
                    ${row.isFazen ? "bg-fazen" : "bg-white"}
                  `}
                  style={GRID_MOBILE}
                >
                  {/* Name only — no description */}
                  <div className="flex items-center px-3 py-4">
                    <span
                      className={`font-body font-bold text-[11px] leading-tight
                        ${row.isFazen ? "text-white" : "text-void"}`}
                    >
                      {row.name}
                    </span>
                  </div>

                  {/* Criteria cells */}
                  {row.values.map((val, ci) => (
                    <div
                      key={ci}
                      className={`flex items-center justify-center border-l py-4
                        ${row.isFazen ? "border-white/15" : "border-void/[0.07]"}`}
                    >
                      {val ? (
                        <CheckCircle2
                          size={20}
                          className={row.isFazen ? "text-white" : "text-void/45"}
                          strokeWidth={2}
                        />
                      ) : (
                        <XCircle
                          size={20}
                          className={row.isFazen ? "text-white/35" : "text-void/16"}
                          strokeWidth={1.6}
                        />
                      )}
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-body text-void/25 text-xs mt-4 text-right"
          >
            Based on general market observations. Results may vary.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── DESKTOP TABLE (hidden lg:block) ───────────── */}
        {/* Full table with descriptions and hover states   */}
        {/* ══════════════════════════════════════════════════ */}
        <div className="hidden lg:block overflow-x-auto pb-2">
          <div className="min-w-[680px]">

            {/* Column headers */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid mb-1"
              style={GRID}
            >
              <div className="px-7 pb-3 font-heading font-medium text-[11px] uppercase tracking-[0.2em] text-void/35">
                Platform
              </div>
              {CRITERIA.map((c) => (
                <div key={c.label} className="px-3 pb-3 text-center">
                  <p className="font-body font-semibold text-void text-sm">
                    {c.label}
                  </p>
                  <p className="font-body text-void/38 text-xs mt-0.5 hidden lg:block">
                    {c.sub}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Rows */}
            <motion.div
              variants={STAGGER_ROWS}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl overflow-hidden border border-void/[0.1]"
            >
              {ROWS.map((row, ri) => {
                const isLast    = ri === ROWS.length - 1;
                const isHovered = hoveredRow === ri && !row.isFazen;

                return (
                  <motion.div
                    key={row.name}
                    variants={ROW_FADE}
                    onMouseEnter={() => setHoveredRow(ri)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`
                      grid relative
                      ${!isLast ? "border-b border-void/[0.08]" : ""}
                      ${row.isFazen ? "bg-fazen" : isHovered ? "bg-void" : "bg-white"}
                      transition-colors duration-200
                    `}
                    style={GRID}
                  >
                    {/* Name + description */}
                    <div className="flex flex-col justify-center gap-1.5 px-7 py-6">
                      <span className={`font-body font-bold text-base lg:text-lg
                                        transition-colors duration-200
                        ${row.isFazen ? "text-white" : isHovered ? "text-white-soft" : "text-void"}`}>
                        {row.name}
                      </span>
                      <span className={`font-body text-sm leading-snug transition-colors duration-200
                        ${row.isFazen ? "text-white/70" : isHovered ? "text-white-soft/55" : "text-void/45"}`}>
                        {row.desc}
                      </span>
                    </div>

                    {/* Criteria cells */}
                    {row.values.map((val, ci) => (
                      <div
                        key={ci}
                        className={`flex items-center justify-center border-l py-6 transition-colors duration-200
                          ${row.isFazen
                            ? "border-white/15"
                            : isHovered ? "border-white/10" : "border-void/[0.07]"}`}
                      >
                        {val
                          ? <Yes isFazen={row.isFazen} isHovered={isHovered} />
                          : <No  isFazen={row.isFazen} isHovered={isHovered} />}
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-body text-void/25 text-xs mt-4 text-right"
            >
              Based on general market observations. Results may vary.
            </motion.p>

          </div>
        </div>

      </div>
    </section>
  );
}
