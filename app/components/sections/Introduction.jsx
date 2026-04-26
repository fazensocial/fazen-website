"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* ─── Variants ───────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const FADE_RIGHT = {
  hidden: { opacity: 0, x: 40, scale: 0.97 },
  show:   { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const BADGE_RIGHT = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.45 } },
};

const BADGE_LEFT = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 } },
};

/* ─── Tools Data ─────────────────────────────────────────── */

const TOOLS = [
  { name: "Adobe Illustrator", abbr: "Ai", color: "#FF9A00", desc: "Vector & brand systems"       },
  { name: "Adobe Photoshop",   abbr: "Ps", color: "#31A8FF", desc: "Photo & compositing"           },
  { name: "After Effects",     abbr: "Ae", color: "#9999FF", desc: "Motion & animation"            },
  { name: "Canva",             abbr: "Cv", color: "#00C4CC", desc: "Rapid content creation"        },
  { name: "AI-Gen Tools",      abbr: "AI", color: "#FF5500", desc: "Generative design & ideation"  },
];

/* ─── Tool Card ─────────────────────────────────────────── */

function ToolCard({ tool, isLast }) {
  return (
    <motion.div
      variants={FADE_UP}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className={`group relative flex flex-col gap-2 p-4 rounded-xl overflow-hidden
                  border border-white/[0.07] bg-white/[0.025] cursor-default
                  ${isLast ? "col-span-2" : ""}`}
    >
      <div className="absolute top-0 inset-x-0 h-[1.5px]"
           style={{ backgroundColor: tool.color }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
           style={{ background: `radial-gradient(ellipse at 50% -20%, ${tool.color}1A 0%, transparent 60%)` }} />
      <span className="font-heading font-medium text-[10px] tracking-[0.22em] uppercase relative"
            style={{ color: tool.color }}>
        {tool.abbr}
      </span>
      <p className="font-body font-medium text-sm text-white/70 group-hover:text-white/95 transition-colors duration-200 relative leading-snug">
        {tool.name}
      </p>
      <p className="font-body text-[11px] leading-relaxed text-white/30 group-hover:text-white/50 transition-colors duration-300 relative">
        {tool.desc}
      </p>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────── */

export default function Introduction() {
  return (
    <section className="bg-white-soft py-14 lg:py-20">
      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-void rounded-[2rem] px-8 py-12 lg:px-14 lg:py-16
                     flex flex-col lg:flex-row gap-12 lg:gap-16"
        >

          {/* ── Left: Text content ─────────────────────────── */}
          <motion.div variants={STAGGER} className="flex flex-col flex-1 min-w-0">

            <motion.div variants={FADE_UP}
              className="inline-flex items-center gap-3 mb-8 self-start
                         border border-white/[0.12] rounded-full bg-white/[0.03] px-5 py-2.5">
              <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
              <span className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-white/50">
                Who I Am
              </span>
              <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
            </motion.div>

            <motion.h2 variants={FADE_UP}
              className="font-display text-white
                         text-[2rem] lg:text-[2.8rem]
                         leading-[1.1] lg:leading-[1.07] mb-5">
              Design that says<br />
              something{" "}
              <span className="text-fazen underline decoration-fazen decoration-1 underline-offset-[7px]">
                worth remembering.
              </span>
            </motion.h2>

            <motion.p variants={FADE_UP}
              className="font-body font-medium text-white/50 text-base lg:text-lg
                         max-w-lg leading-relaxed mb-8">
              I&apos;m Hafaz — a graphic designer &amp; creativepreneur based in Indonesia.
              5+ years building brand identities, social systems, and motion content
              for businesses that want to be remembered.
            </motion.p>

            <motion.div variants={FADE_UP} className="w-10 h-px bg-fazen/40 mb-8" />

            <motion.p variants={FADE_UP}
              className="font-heading font-medium text-[11px] uppercase tracking-[0.22em] text-white/30 mb-4">
              Tools &amp; Workflow
            </motion.p>

            <motion.div variants={STAGGER} className="grid grid-cols-2 gap-3">
              {TOOLS.map((tool, i) => (
                <ToolCard key={tool.name} tool={tool} isLast={i === TOOLS.length - 1} />
              ))}
            </motion.div>

          </motion.div>

          {/* ── Right: Photo ───────────────────────────────── */}
          <motion.div
            variants={STAGGER}
            className="relative w-full lg:w-[38%] shrink-0 h-[420px] lg:h-auto"
          >
            <motion.div
              variants={FADE_RIGHT}
              className="relative h-full rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/homepage/hafaz.jpg"
                alt="Hafaz — Graphic Designer & Creativepreneur"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 38vw"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5
                              bg-gradient-to-t from-void/90 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="font-heading font-medium text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                  Graphic Designer &amp; Creativepreneur
                </p>
                <p className="font-display text-white text-xl leading-tight">Hafaz Sofyan</p>
              </div>
            </motion.div>

            <motion.div
              variants={BADGE_RIGHT}
              className="absolute right-3 top-5
                         bg-void/80 backdrop-blur-sm
                         border border-white/[0.12] rounded-2xl px-4 py-3 text-center"
            >
              <span className="font-display text-fazen text-[1.75rem] leading-none block">5+</span>
              <span className="font-body text-[10px] text-white/40 uppercase tracking-widest mt-1 block">Years</span>
            </motion.div>

            <motion.div
              variants={BADGE_LEFT}
              className="absolute left-3 bottom-20
                         bg-void/80 backdrop-blur-sm
                         border border-white/[0.12] rounded-2xl px-4 py-3 text-center"
            >
              <span className="font-display text-white text-[1.75rem] leading-none block">200+</span>
              <span className="font-body text-[10px] text-white/40 uppercase tracking-widest mt-1 block">Projects</span>
            </motion.div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
