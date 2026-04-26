"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 1,
    title: "Founders Club",
    categories: ["Branding", "Web Design", "Stationary"],
    period: "Jan 2025",
    color: "#1B3A2C",
  },
  {
    id: 2,
    title: "Body Hot Pilates",
    categories: ["Branding", "Web Design", "Stationary"],
    period: "Mar 2025",
    color: "#C4A882",
  },
  {
    id: 3,
    title: "Unplugs",
    categories: ["Branding", "Packaging", "Web Design"],
    period: "May 2025",
    color: "#111C10",
  },
  {
    id: 4,
    title: "Social Snowball",
    categories: ["Branding", "Product Design", "Web Design"],
    period: "Jul 2025",
    color: "#0D1B33",
  },
  {
    id: 5,
    title: "Happy Nuts",
    categories: ["Branding", "Packaging", "Amazon"],
    period: "Sep 2025",
    color: "#B81E18",
  },
  {
    id: 6,
    title: "Arkana Group",
    categories: ["Branding", "Stationary"],
    period: "Nov 2025",
    color: "#251A3A",
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

const CARD_STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const CARD_FADE = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Project Card ───────────────────────────────────────── */

function ProjectCard({ project }) {
  return (
    <motion.div
      variants={CARD_FADE}
      className="group relative rounded-2xl overflow-hidden cursor-default select-none"
      style={{ aspectRatio: "3/2" }}
    >
      {/* Colored placeholder — scales on hover */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        style={{ backgroundColor: project.color }}
      />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 42%, transparent 68%)",
        }}
      />

      {/* Hover border inset */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
      />

      {/* ── Glassmorphism badge — top left ─────────────────── */}
      <div
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          background:           "rgba(255,255,255,0.12)",
          backdropFilter:       "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border:               "1px solid rgba(255,255,255,0.22)",
        }}
      >
        <span className="w-[5px] h-[5px] rounded-full bg-fazen flex-shrink-0" />
        <span className="font-body font-medium text-white/85 text-[11px] tracking-wide leading-none">
          {project.period}
        </span>
      </div>

      {/* ── Content — bottom ───────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
        <h3 className="font-display text-white text-xl leading-snug mb-1.5">
          {project.title}
        </h3>
        <p className="font-body text-white/48 text-xs tracking-wide">
          {project.categories.join("  ·  ")}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

export default function SelectedWorks() {
  return (
    <section className="bg-white-soft">

      {/* Divider */}
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
            Portfolio
          </motion.p>

          <motion.h2
            variants={FADE_UP}
            className="font-display text-void text-[2rem] lg:text-[3rem] leading-tight mb-4"
          >
            Brands we&apos;ve built.{" "}
            <span className="text-fazen">Results they&apos;ve earned.</span>
          </motion.h2>

          <motion.p
            variants={FADE_UP}
            className="font-body text-void/45 text-base lg:text-lg leading-relaxed max-w-lg"
          >
            Six highlighted projects — each one a full brand system designed to win attention and hold it.
          </motion.p>
        </motion.div>

        {/* ── 2-row Grid ─────────────────────────────────── */}
        <motion.div
          variants={CARD_STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* ── CTA ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-10"
        >
          <motion.a
            href="/soon"
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl
                       font-body font-semibold text-sm text-void
                       border border-void/15 hover:border-fazen/60
                       hover:bg-fazen/[0.06] transition-all duration-250"
          >
            View All Works
            <ArrowRight size={16} strokeWidth={2} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
