"use client";

import { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────── */

const LOGO_GAP = 56; // matches gap-14 (56px)

const ROW1 = [
  { id:  1, label: "Tokopedia"        },
  { id:  2, label: "Gojek"            },
  { id:  3, label: "BCA"              },
  { id:  4, label: "Telkom Indonesia" },
  { id:  5, label: "Pertamina"        },
  { id:  6, label: "Traveloka"        },
  { id:  7, label: "Shopee"           },
  { id:  8, label: "Grab"             },
  { id:  9, label: "OVO"              },
  { id: 10, label: "Bukalapak"        },
];

const ROW2 = [
  { id: 11, label: "Garuda Indonesia" },
  { id: 12, label: "Bank Mandiri"     },
  { id: 13, label: "Astra"            },
  { id: 14, label: "Indofood"         },
  { id: 15, label: "Unilever"         },
  { id: 16, label: "Mayora"           },
  { id: 17, label: "BRI"              },
  { id: 18, label: "Kalbe Farma"      },
  { id: 19, label: "XL Axiata"        },
  { id: 20, label: "Sinarmas"         },
];

/* ─── Logo Item ─────────────────────────────────────────── */

function LogoItem({ label }) {
  return (
    <motion.span
      className="shrink-0 select-none cursor-default inline-flex items-center gap-2.5
                 font-body font-medium text-base whitespace-nowrap
                 text-void/30 hover:text-void/60 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* Bullet dot */}
      <span className="w-[5px] h-[5px] rounded-full bg-current shrink-0" />
      {label}
    </motion.span>
  );
}

/* ─── Marquee Row ───────────────────────────────────────── */

// "left"  → x decreases: starts at 0,        resets at -setWidth
// "right" → x increases: starts at -setWidth, resets at 0

function MarqueeRow({ logos, direction, duration }) {
  const trackRef = useRef(null);
  const posRef   = useRef(null);
  const x        = useMotionValue(0);
  const doubled  = [...logos, ...logos];

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el) return;

    const setWidth = el.scrollWidth / 2 + LOGO_GAP / 2;

    if (posRef.current === null) {
      posRef.current = direction === "left" ? 0 : -setWidth;
      x.set(posRef.current);
      return;
    }

    const pixelsPerMs = setWidth / (duration * 1000);
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
    <div className="overflow-x-hidden">
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex items-center gap-14 w-max"
      >
        {doubled.map((logo, i) => (
          <LogoItem key={`${logo.id}-${i}`} label={logo.label} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────── */

export default function TrustedBy() {
  return (
    <section className="bg-white-soft">

      {/* Header — centered, within page-container */}
      <div className="page-container pt-16 lg:pt-20 pb-10 lg:pb-14
                      flex flex-col items-center text-center">

        {/* Label — Clash Grotesk Medium, pill with orange dots */}
        <div className="inline-flex items-center gap-3 mb-6
                        border border-void/[0.12] rounded-full
                        bg-void/[0.025] px-5 py-2.5">
          <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
          <span className="font-heading font-medium text-[11px] uppercase
                           tracking-[0.26em] text-void/50">
            Clients &amp; Collaboration
          </span>
          <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
        </div>

        {/* Headline — Sharone */}
        <h2 className="font-display text-void
                       text-[1.9rem] lg:text-[2.8rem] leading-tight lg:leading-[1.1] mb-4">
          Trusted by{" "}
          <span className="text-fazen underline decoration-fazen decoration-1 underline-offset-[6px]">
            100+ Brands &amp; Organizations
          </span>
        </h2>

        {/* Sub — Inter Tight Medium */}
        <p className="font-body font-medium text-void/45 text-base lg:text-lg max-w-md leading-relaxed">
          From homegrown startups to global companies —<br className="hidden lg:block" />
          across Indonesia and beyond.
        </p>
      </div>

      {/* Marquee — respects page-container padding, edge fades clip inside */}
      <div className="page-container pb-16 lg:pb-20">
        <div className="relative overflow-hidden flex flex-col gap-7">

          {/* Left fade */}
          <div aria-hidden
            className="absolute inset-y-0 left-0 w-12 lg:w-20 z-10 pointer-events-none
                       bg-gradient-to-r from-white-soft to-transparent" />
          {/* Right fade */}
          <div aria-hidden
            className="absolute inset-y-0 right-0 w-12 lg:w-20 z-10 pointer-events-none
                       bg-gradient-to-l from-white-soft to-transparent" />

          <MarqueeRow logos={ROW1} direction="left"  duration={32} />
          <MarqueeRow logos={ROW2} direction="right" duration={28} />
        </div>
      </div>

    </section>
  );
}
