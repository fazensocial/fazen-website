"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Completely transformed how our brand is perceived. Sharp, consistent, and impossible to ignore.",
    name: "Arief Wicaksono",
    company: "Nuansa Studio",
  },
  {
    id: 2,
    quote: "Delivered our pitch deck in 48 hours. Investors asked who designed it before we even finished.",
    name: "Diandra Kusuma",
    company: "GrowBase",
  },
  {
    id: 3,
    quote: "Gets strategy and aesthetics at once. Every slide felt intentional — not just pretty, but smart.",
    name: "Rizky Prasetyo",
    company: "Founder, Loka",
  },
  {
    id: 4,
    quote: "Our engagement jumped after the rebrand. The visual system scales perfectly across every format.",
    name: "Sari Handayani",
    company: "Maven Culture",
  },
  {
    id: 5,
    quote: "No back-and-forth, no confusion — just great design delivered exactly when promised.",
    name: "Bintang Rahardjo",
    company: "Arkana Group",
  },
  {
    id: 6,
    quote: "I've worked with agencies charging 5× more with half the output. Fazen is in a different league.",
    name: "Nindya Putri",
    company: "Elevare",
  },
  {
    id: 7,
    quote: "Three revisions and they nailed it. The brand feels like us — and our customers notice.",
    name: "Hendra Santoso",
    company: "Volta ID",
  },
  {
    id: 8,
    quote: "Professional, fast, and genuinely invested in our success from the first call to final file.",
    name: "Larasati Devi",
    company: "Seedlab",
  },
];

const GAP           = 20;
const BASE_DURATION = 42; // seconds per full set

/* ─── Variants ───────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* ─── Testimonial Card ───────────────────────────────────── */

function TestimonialCard({ testimonial, cardWidth, isHovered, isAnyHovered, onMouseEnter, onMouseLeave }) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        opacity: isAnyHovered && !isHovered ? 0.4 : 1,
        y:       isHovered ? -4 : 0,
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default select-none shrink-0"
      style={{
        width:      cardWidth,
        minHeight:  220,
        background: "rgba(255,255,255,0.03)",
        border:     "1px solid rgba(255,255,255,0.07)",
        padding:    "28px",
      }}
    >
      {/* Hover glow — top-left radial */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% -10%, rgba(255,85,0,0.11) 0%, transparent 60%)" }}
      />

      {/* Hover border inset */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,85,0,0.30)" }}
      />

      {/* Decorative large quote mark — top right */}
      <span
        className="absolute top-3 right-6 font-display leading-none select-none pointer-events-none
                   text-white/[0.06] group-hover:text-fazen/[0.20] transition-colors duration-400"
        style={{ fontSize: "4.5rem" }}
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <p
        className="font-body text-[0.8rem] text-white/50 group-hover:text-white/75
                   leading-relaxed flex-1 relative z-[1] transition-colors duration-300"
      >
        {testimonial.quote}
      </p>

      {/* Divider */}
      <div className="h-px bg-white/[0.07] my-5 relative z-[1]" />

      {/* Name + company */}
      <div className="flex flex-col gap-0.5 relative z-[1]">
        <span className="font-body font-semibold text-white/90 text-[0.82rem] leading-snug">
          {testimonial.name}
        </span>
        <span className="font-body text-white/30 text-xs group-hover:text-white/50 transition-colors duration-300">
          {testimonial.company}
        </span>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 inset-x-0 h-[1.5px] bg-fazen origin-left
                   scale-x-0 group-hover:scale-x-100 transition-transform duration-400 z-10"
      />
    </motion.div>
  );
}

/* ─── Carousel Track ─────────────────────────────────────── */

function CarouselTrack() {
  const containerRef              = useRef(null);
  const posRef                    = useRef(0);
  const lastTimeRef               = useRef(0);
  const isPausedRef               = useRef(false);
  const x                         = useMotionValue(0);
  const [width, setWidth]         = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  /* Measure container */
  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => setWidth(containerRef.current.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const visibleCards = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
  const cardWidth    = width > 0 ? (width - GAP * (visibleCards - 1)) / visibleCards : 340;
  const itemWidth    = cardWidth + GAP;
  const totalSetW    = itemWidth * TESTIMONIALS.length;

  /* Auto-scroll loop */
  useEffect(() => {
    if (width === 0) return;
    const pxPerMs = totalSetW / (BASE_DURATION * 1000);
    lastTimeRef.current = Date.now();

    let frameId;
    const tick = () => {
      if (!isPausedRef.current) {
        const now   = Date.now();
        const delta = now - lastTimeRef.current;
        lastTimeRef.current = now;
        posRef.current -= pxPerMs * delta;
        if (posRef.current <= -totalSetW) posRef.current = 0;
        x.set(posRef.current);
      } else {
        lastTimeRef.current = Date.now();
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [width, totalSetW, x]);

  const handleEnter = (idx) => {
    setHoveredIdx(idx);
    isPausedRef.current = true;
  };
  const handleLeave = () => {
    setHoveredIdx(null);
    isPausedRef.current = false;
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Edge fades */}
      <div className="absolute left-0 inset-y-0 w-16 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to right, #090C11, transparent)" }} />
      <div className="absolute right-0 inset-y-0 w-16 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to left, #090C11, transparent)" }} />

      <motion.div style={{ x, gap: `${GAP}px` }} className="flex">
        {doubled.map((t, idx) => (
          <TestimonialCard
            key={`${t.id}-${idx}`}
            testimonial={t}
            cardWidth={cardWidth}
            isHovered={hoveredIdx === idx}
            isAnyHovered={hoveredIdx !== null}
            onMouseEnter={() => handleEnter(idx)}
            onMouseLeave={handleLeave}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

export default function Testimonials() {
  return (
    <section className="bg-void">

      {/* Orange animated divider */}
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
          className="flex flex-col items-center text-center mb-14 lg:mb-16"
        >
          <motion.div variants={FADE_UP}
            className="inline-flex items-center gap-3 mb-6 border border-white/[0.12] rounded-full bg-white/[0.03] px-5 py-2.5">
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
            <span className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-white/50">
              Testimonials
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
          </motion.div>

          <motion.h2 variants={FADE_UP}
            className="font-display text-white-soft text-[2rem] lg:text-[3rem] leading-tight mb-4">
            Trusted by founders,{" "}
            <span className="text-fazen">backed by results.</span>
          </motion.h2>

          <motion.p variants={FADE_UP}
            className="font-body text-white/45 text-base lg:text-lg leading-relaxed max-w-xl">
            Real words from the brands that bet on Fazen — and won.
          </motion.p>
        </motion.div>

        {/* ── Carousel ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <CarouselTrack />
        </motion.div>

      </div>
    </section>
  );
}
