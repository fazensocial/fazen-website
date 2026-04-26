"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const GAP = 12; // matches gap-3 (12px)

const CARDS = [
  { id:  1, image: "/images/homepage/Foto%20depan/01.jpg", title: "Eterious Sportiva",         category: "BRAND IDENTITY"     },
  { id:  2, image: "/images/homepage/Foto%20depan/02.jpg", title: "Universitas Sumatera Utara", category: "SOCIAL MEDIA"       },
  { id:  3, image: "/images/homepage/Foto%20depan/03.jpg", title: "Tanaka Collective",          category: "BRAND IDENTITY"     },
  { id:  4, image: "/images/homepage/Foto%20depan/04.jpg", title: "Cante Indonesia",            category: "LOGO DESIGN"        },
  { id:  5, image: "/images/homepage/Foto%20depan/05.jpg", title: "IDE Institute",              category: "BRAND GUIDELINES"   },
  { id:  6, image: "/images/homepage/Foto%20depan/06.jpg", title: "NoirHouse",                 category: "BRAND IDENTITY"     },
  { id:  7, image: "/images/homepage/Foto%20depan/07.jpg", title: "Fastinasi",                 category: "BRAND IDENTITY"     },
  { id:  8, image: "/images/homepage/Foto%20depan/08.jpg", title: "TOWB Apparel",              category: "LOGO DESIGN"        },
  { id:  9, image: "/images/homepage/Foto%20depan/09.jpg", title: "Khong Guan",                category: "SOCIAL MEDIA"       },
  { id: 10, image: "/images/homepage/Foto%20depan/10.jpg", title: "Think About The Sea",       category: "APPAREL DESIGN"     },
  { id: 11, image: "/images/homepage/Foto%20depan/11.jpg", title: "Struckin",                  category: "BRAND IDENTITY"     },
  { id: 12, image: "/images/homepage/Foto%20depan/12.jpg", title: "Fastinasi",                 category: "BRAND GUIDELINES"   },
];

// Desktop: 3 vertical columns of 4
const COLS       = [CARDS.slice(0, 4), CARDS.slice(4, 8), CARDS.slice(8, 12)];
const DIRECTIONS = ["down", "up", "down"];
const DURATIONS  = [28, 22, 32];

// Mobile: 2 horizontal rows of 6
const ROWS          = [CARDS.slice(0, 6), CARDS.slice(6, 12)];
const ROW_DIRS      = ["right", "left"];
const ROW_DURATIONS = [26, 22];

/* ─── Framer variants ────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};
const STATS = [
  { value: "5+",   label: "Years Experience"     },
  { value: "200+", label: "Projects Delivered"   },
  { value: "4",    label: "Core Specializations" },
];

/* ─── Typewriter ─────────────────────────────────────────── */

const TW_WORDS = ["RESULTS.", "OUTPUTS.", "IMPACTS.", "VALUES."];

function TypewriterText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [chars,   setChars]   = useState(TW_WORDS[0].length);
  const [phase,   setPhase]   = useState("hold");

  useEffect(() => {
    const word = TW_WORDS[wordIdx];

    if (phase === "hold") {
      const t = setTimeout(() => setPhase("deleting"), 2500);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      if (phase === "deleting") {
        if (chars === 0) {
          setWordIdx((i) => (i + 1) % TW_WORDS.length);
          setPhase("typing");
          return;
        }

        setChars((c) => c - 1);
        return;
      }

      if (chars === word.length) {
        setPhase("hold");
        return;
      }

      setChars((c) => c + 1);
    }, phase === "deleting" && chars === 0 ? 0 : 500 / word.length);

    return () => clearTimeout(t);
  }, [phase, chars, wordIdx]);

  return (
    <span className="text-fazen">
      {TW_WORDS[wordIdx].slice(0, chars)}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="inline-block w-[2px] h-[0.8em] bg-fazen ml-[3px] align-middle"
      />
    </span>
  );
}

/* ─── Portfolio Card (desktop) ───────────────────────────── */

// Left streak  — 1px, top-0, gradient orange→transparent going down, leading edge = top
//   enter: y 200%→100%  (rises from below card, orange tip arrives at center)
//   exit:  y 100%→-100% (continues rising, exits from top — momentum, not retreat)
// Right streak — 1px, bottom-0, gradient orange→transparent going up, leading edge = bottom
//   enter: y -200%→-100% (descends from above, orange tip arrives at center)
//   exit:  y -100%→100%  (continues descending, exits from bottom)

const STREAK_ENTER = { duration: 0.46, ease: [0.22, 1, 0.36, 1] };
const STREAK_EXIT  = { duration: 0.42, ease: [0.4, 0, 0.9, 1] };

function PortfolioCard({ card, isHovered, isDimmed, onHover, onLeave }) {
  return (
    <div className="relative aspect-[4/5] shrink-0 cursor-pointer rounded-2xl">

      {/* Ambient outer glow — not clipped by overflow-hidden */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? "0 0 28px 6px rgba(255,85,0,0.18)"
            : "0 0 0px 0px rgba(255,85,0,0)",
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Inner card — clipped */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5
                        bg-gradient-to-t from-black to-transparent
                        flex flex-col justify-end px-3.5 pb-3 z-10">
          <p className="font-heading font-semibold text-white text-sm leading-tight truncate">
            {card.title}
          </p>
          <p className="font-body text-[10px] text-fazen mt-0.5 uppercase tracking-widest">
            {card.category}
          </p>
        </div>

        {/* Left edge streak */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="streak-left"
              aria-hidden
              className="absolute top-0 left-0 pointer-events-none z-20"
              style={{
                width: 1,
                height: "50%",
                background: "linear-gradient(to bottom, rgba(255,85,0,0.78) 0%, rgba(255,85,0,0.2) 55%, transparent 100%)",
              }}
              initial={{ y: "200%" }}
              animate={{ y: "100%", transition: STREAK_ENTER }}
              exit={{ y: "-100%", transition: STREAK_EXIT }}
            />
          )}
        </AnimatePresence>

        {/* Right edge streak */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="streak-right"
              aria-hidden
              className="absolute bottom-0 right-0 pointer-events-none z-20"
              style={{
                width: 1,
                height: "50%",
                background: "linear-gradient(to top, rgba(255,85,0,0.78) 0%, rgba(255,85,0,0.2) 55%, transparent 100%)",
              }}
              initial={{ y: "-200%" }}
              animate={{ y: "-100%", transition: STREAK_ENTER }}
              exit={{ y: "100%", transition: STREAK_EXIT }}
            />
          )}
        </AnimatePresence>

        {/* Dim overlay */}
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-black pointer-events-none z-30"
          animate={{ opacity: isDimmed ? 0.8 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}

/* ─── Carousel Column (desktop, vertical) ────────────────── */

function CarouselColumn({ cards, direction, baseDur, isSlowed, hoveredId, onHover, onLeave }) {
  const trackRef = useRef(null);
  const posRef   = useRef(null);
  const speedRef = useRef(1);
  const y        = useMotionValue(0);
  const doubled  = [...cards, ...cards];

  useEffect(() => {
    speedRef.current = isSlowed ? 0.25 : 1;
  }, [isSlowed]);

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el) return;

    const setHeight = el.scrollHeight / 2 + GAP / 2;

    if (posRef.current === null) {
      posRef.current = direction === "up" ? 0 : -setHeight;
      y.set(posRef.current);
      return;
    }

    const pixelsPerMs = setHeight / (baseDur * 1000);
    const move = pixelsPerMs * delta * speedRef.current;

    let next = posRef.current;
    if (direction === "up") {
      next -= move;
      if (next <= -setHeight) next += setHeight;
    } else {
      next += move;
      if (next >= 0) next -= setHeight;
    }

    posRef.current = next;
    y.set(next);
  });

  return (
    <div className="flex-1 overflow-y-hidden overflow-x-visible min-w-0">
      <motion.div ref={trackRef} style={{ y }} className="flex flex-col gap-3">
        {doubled.map((card, i) => (
          <PortfolioCard
            key={`${card.id}-${i}`}
            card={card}
            isHovered={hoveredId === card.id}
            isDimmed={hoveredId !== null && hoveredId !== card.id}
            onHover={() => onHover(card.id)}
            onLeave={onLeave}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Mobile Card ────────────────────────────────────────── */

function MobileCard({ card }) {
  return (
    <div className="relative w-36 aspect-[4/5] shrink-0 rounded-xl overflow-hidden">
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover"
        sizes="144px"
        priority={false}
      />
      <div className="absolute bottom-0 inset-x-0 h-2/5
                      bg-gradient-to-t from-black to-transparent
                      flex flex-col justify-end px-3 pb-3">
        <p className="font-heading font-semibold text-white text-[11px] leading-tight truncate">
          {card.title}
        </p>
        <p className="font-body text-[9px] text-fazen mt-0.5 uppercase tracking-widest truncate">
          {card.category}
        </p>
      </div>
    </div>
  );
}

/* ─── Carousel Row (mobile, horizontal) ──────────────────── */

// "right" → content moves right (x increases): starts at -setWidth, resets at 0
// "left"  → content moves left  (x decreases): starts at 0, resets at -setWidth

function CarouselRow({ cards, direction, baseDur }) {
  const trackRef = useRef(null);
  const posRef   = useRef(null);
  const x        = useMotionValue(0);
  const doubled  = [...cards, ...cards];

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el) return;

    const setWidth = el.scrollWidth / 2 + GAP / 2;

    if (posRef.current === null) {
      posRef.current = direction === "left" ? 0 : -setWidth;
      x.set(posRef.current);
      return;
    }

    const pixelsPerMs = setWidth / (baseDur * 1000);
    const move = pixelsPerMs * delta;

    let next = posRef.current;
    if (direction === "left") {
      next -= move;
      if (next <= -setWidth) next += setWidth;
    } else {
      next += move;
      if (next >= 0) next -= setWidth;
    }

    posRef.current = next;
    x.set(next);
  });

  return (
    <div className="overflow-x-hidden overflow-y-visible">
      <motion.div ref={trackRef} style={{ x }} className="flex gap-3 w-max">
        {doubled.map((card, i) => (
          <MobileCard key={`${card.id}-${i}`} card={card} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */

export default function Hero() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="relative flex flex-col lg:flex-row h-[100svh] lg:h-screen overflow-hidden">

      {/* BG glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 left-1/4 -translate-x-1/2
                        w-[600px] h-[500px] bg-fazen/[.06] blur-[130px] rounded-full" />
      </div>

      {/* ── Text content ────────────────────────────────── */}
      <div className="relative z-10 flex flex-col flex-shrink-0 items-center lg:items-start
                      pl-6 lg:pl-[240px] pr-6 lg:pr-14
                      w-full lg:w-[52%]
                      pt-[100px] lg:pt-32 pb-0 lg:pb-10">

        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div variants={FADE_UP} className="mb-5 lg:mb-8">
            <span className="inline-flex items-center gap-2.5
                             font-body text-sm text-white-soft/50
                             border border-white/[.10] rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-fazen animate-pulse shrink-0" />
              Graphic Designer &amp; Creativepreneur
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={FADE_UP}
            className="font-display text-[clamp(2.4rem,5.5vw,6.5rem)]
                       leading-[0.95] text-white-soft mb-5 lg:mb-6"
          >
            Bold Design.<br />
            Real <TypewriterText />
          </motion.h1>

          {/* Sub — hidden on mobile to save vertical space */}
          <motion.p
            variants={FADE_UP}
            className="hidden sm:block font-body text-base md:text-lg text-white-soft/55
                       max-w-md leading-relaxed mb-10"
          >
            End-to-end creative partner for brands that want to stand out —
            from identity to social media, powered by 5+ years of experience
            and AI as leverage.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={FADE_UP} className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Link
              href="/soon"
              className="inline-flex items-center gap-2 font-body font-medium text-sm
                         bg-fazen text-white px-6 py-3 rounded-full
                         hover:bg-fazen/85 transition-colors duration-150"
            >
              Explore Portfolio
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/soon"
              className="inline-flex items-center gap-2 font-body font-medium text-sm
                         text-white-soft border border-white/[.14] px-6 py-3 rounded-full
                         hover:border-white/30 transition-colors duration-150"
            >
              Let&apos;s Work Together
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 lg:mt-auto pt-6 lg:pt-8 flex gap-8 lg:gap-14 justify-center lg:justify-start border-t border-white/[.06] w-full"
        >
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-heading font-semibold text-2xl md:text-3xl text-white-soft leading-none">
                {value}
              </p>
              <p className="font-body text-xs text-white-soft/40 mt-1.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Desktop: vertical carousel ───────────────────── */}
      <div className="hidden lg:flex flex-1 gap-3 relative overflow-visible pr-[240px]">

        {COLS.map((cards, ci) => (
          <CarouselColumn
            key={ci}
            cards={cards}
            direction={DIRECTIONS[ci]}
            baseDur={DURATIONS[ci]}
            isSlowed={hoveredId !== null}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
          />
        ))}

        {/* Top fade */}
        <div aria-hidden
          className="absolute top-0 left-0 right-0 h-44 pointer-events-none z-40
                     bg-gradient-to-b from-void to-transparent" />
        {/* Bottom fade */}
        <div aria-hidden
          className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-40
                     bg-gradient-to-t from-void to-transparent" />
      </div>

      {/* ── Mobile: horizontal carousel ──────────────────── */}
      <div className="lg:hidden flex-1 flex flex-col justify-center gap-4 pb-10 pt-2 relative overflow-hidden">

        {/* Left fade mask */}
        <div aria-hidden
          className="absolute inset-y-0 left-0 w-10 pointer-events-none z-10
                     bg-gradient-to-r from-void to-transparent" />
        {/* Right fade mask */}
        <div aria-hidden
          className="absolute inset-y-0 right-0 w-10 pointer-events-none z-10
                     bg-gradient-to-l from-void to-transparent" />

        {ROWS.map((cards, ri) => (
          <CarouselRow
            key={ri}
            cards={cards}
            direction={ROW_DIRS[ri]}
            baseDur={ROW_DURATIONS[ri]}
          />
        ))}
      </div>

    </section>
  );
}
