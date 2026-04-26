"use client";

import { useContext } from "react";
import { motion, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import PageHero, { HeroMouseCtx } from "../components/ui/PageHero";
import Footer from "../components/sections/Footer";

/* ─── WhatsApp icon (lucide doesn't include brand icons) ─── */
const IconWhatsApp = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

/* ─── Floating service pills ─────────────────────────────── */
/*
 * Each pill floats at a corner of the hero (desktop only).
 * Outer motion.div handles parallax (moves opposite cursor direction).
 * Inner motion.div handles the vertical bobbing loop.
 * depth (0-1): higher = moves more with mouse = feels "closer"
 */
const PILLS = [
  { label: "Logo & Brand Identity", x: 10,  y: 28,  depth: 0.85, phase: 0.0  },
  { label: "Social Media Design",   x: 87,  y: 22,  depth: 0.65, phase: 1.1  },
  { label: "Presentation Design",   x: 7,   y: 74,  depth: 0.75, phase: 2.0  },
  { label: "Marketing Design",      x: 88,  y: 76,  depth: 0.55, phase: 0.75 },
];

function ServicePill({ label, x, y, depth, phase }) {
  const { smoothX, smoothY } = useContext(HeroMouseCtx);

  /* Parallax: pills drift opposite to cursor — creates a depth/parallax feel */
  const px = useTransform(smoothX, [0, 1], [-24 * depth,  24 * depth]);
  const py = useTransform(smoothY, [0, 1], [-16 * depth,  16 * depth]);

  return (
    /* Absolutely positioned anchor + parallax transform */
    <motion.div
      className="hidden lg:block"
      style={{ position: "absolute", left: `${x}%`, top: `${y}%`, x: px, y: py }}
    >
      {/* Center the pill on its anchor point */}
      <div style={{ transform: "translate(-50%, -50%)" }}>
        {/* Vertical bobbing loop */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{
            duration:   3.8 + phase * 0.45,
            repeat:     Infinity,
            ease:       "easeInOut",
            delay:      phase * 0.35,
          }}
        >
          <span
            className="inline-flex items-center gap-2
                       font-body text-xs text-white/38
                       border border-white/[.08] rounded-full
                       px-3.5 py-1.5 bg-white/[.03] backdrop-blur-sm
                       whitespace-nowrap select-none"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-fazen/50 shrink-0" />
            {label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-void flex flex-col">
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────── */}
        <PageHero
          badge="Our Services"
          headline={
            <>
              Design services.<br />
              <span className="text-fazen">Built to stand out.</span>
            </>
          }
          description="From brand identity to social media — end-to-end creative solutions that make your brand impossible to ignore."
          primaryButton={
            <Link
              href="#services-detail"
              className="inline-flex items-center gap-2
                         font-body font-medium text-sm
                         bg-fazen text-white px-6 py-3 rounded-full
                         hover:bg-fazen/85 transition-colors duration-150"
            >
              Lihat Service Lengkap
              <ArrowDown size={14} />
            </Link>
          }
          secondaryButton={
            <a
              href="https://wa.me/62818566006"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2
                         font-body font-medium text-sm
                         text-white-soft border border-white/[.14] px-6 py-3 rounded-full
                         hover:border-white/30 transition-colors duration-150"
            >
              Kabari Kami
              <IconWhatsApp size={14} />
            </a>
          }
        >
          {/* Floating service pills — parallax + bobbing, desktop only */}
          {PILLS.map((pill) => (
            <ServicePill key={pill.label} {...pill} />
          ))}
        </PageHero>

        {/* ── Services detail — to be built ────────────────── */}
        <div id="services-detail" />

      </main>

      <Footer />
    </div>
  );
}
