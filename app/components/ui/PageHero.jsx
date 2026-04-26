"use client";

import { createContext, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─── Mouse context — shared with floating children ─────── */
export const HeroMouseCtx = createContext({ smoothX: null, smoothY: null });

/* ─── Variants ───────────────────────────────────────────── */
const FADE_UP = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ─── PageHero ───────────────────────────────────────────── */
/*
 * Reusable inner-page hero. Used on Services, Portfolio, etc.
 * Props:
 *   badge          — string label inside the status pill
 *   headline       — JSX rendered as <h1>
 *   description    — string body text
 *   primaryButton  — JSX (Link or <a>)
 *   secondaryButton— JSX (Link or <a>)
 *   children       — decorative floating elements specific to each page
 *                    (rendered in an aria-hidden, pointer-events-none layer)
 */
export default function PageHero({
  badge,
  headline,
  description,
  primaryButton,
  secondaryButton,
  children,
}) {
  const sectionRef = useRef(null);

  const rawX    = useMotionValue(0.5);
  const rawY    = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { stiffness: 70, damping: 22 });
  const smoothY = useSpring(rawY, { stiffness: 70, damping: 22 });

  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top)  / rect.height);
  };
  const onMouseLeave = () => { rawX.set(0.5); rawY.set(0.5); };

  /* Content block — directional 3-D tilt */
  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-14,  14]);

  /* Spotlight cone follows cursor X, anchored to top */
  const spotlightX = useTransform(smoothX, [0, 1], ["28%", "72%"]);

  return (
    <HeroMouseCtx.Provider value={{ smoothX, smoothY }}>
      <section
        ref={sectionRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative flex items-center justify-center
                   min-h-[80vh] bg-void overflow-hidden
                   pt-28 pb-20"
      >

        {/* Dot-grid background — references design-software grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.052) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Spotlight cone from top — follows cursor X */}
        <motion.div
          aria-hidden
          className="absolute top-0 pointer-events-none"
          style={{
            left: spotlightX,
            translateX: "-50%",
            width: "680px",
            height: "100%",
            background:
              "radial-gradient(ellipse 44% 82% at 50% 0%, rgba(255,85,0,0.22) 0%, rgba(255,85,0,0.08) 42%, transparent 68%)",
          }}
        />

        {/* Edge vignette — softens the dot grid at edges */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 88% 68% at 50% 50%, transparent 30%, rgba(9,12,17,0.92) 100%)",
          }}
        />

        {/* Page-specific floating decorations */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-visible">
          {children}
        </div>

        {/* Main content — 3-D tilt on mouse */}
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className="relative z-10"
        >
          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center max-w-2xl px-6"
          >

            {/* Badge */}
            <motion.div variants={FADE_UP} className="mb-7">
              <span
                className="inline-flex items-center gap-2.5
                           font-body text-sm text-white-soft/50
                           border border-white/[.10] rounded-full px-4 py-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-fazen animate-pulse shrink-0" />
                {badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={FADE_UP}
              className="font-display text-[clamp(2.6rem,5.5vw,5rem)]
                         leading-[1.02] text-white-soft mb-5"
            >
              {headline}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={FADE_UP}
              className="font-body text-base lg:text-lg text-white-soft/45
                         leading-relaxed mb-9 max-w-lg"
            >
              {description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={FADE_UP}
              className="flex flex-col sm:flex-row gap-3 items-center"
            >
              {primaryButton}
              {secondaryButton}
            </motion.div>

          </motion.div>
        </motion.div>

        {/* Bottom fade into next section */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none
                     bg-gradient-to-t from-void to-transparent"
        />

      </section>
    </HeroMouseCtx.Provider>
  );
}
