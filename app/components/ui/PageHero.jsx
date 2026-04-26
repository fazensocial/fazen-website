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

  /* Lamp follows cursor X subtly */
  const lampX = useTransform(smoothX, [0, 1], ["-24px", "24px"]);

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

        {/* Dot-grid background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.052) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* ── Lamp from top ─────────────────────────────────── */}
        {/*
         * Structure mirrors Aceternity lamp:
         *   1. Two conic-gradient beam halves (overflow visible, masked at edges/bottom)
         *   2. Blurred void fill below beams (hides lower glow noise)
         *   3. Centre glow blob + tighter orb (animated breathe)
         *   4. Lamp line — thin, vivid, z above the blackout
         *   5. Blackout div — covers everything above the lamp line, leaving a clean V
         *
         * Lamp line width ≈ nav-links span (Portfolio → About).
         * Lamp follows cursor X by ±24px via lampX.
         */}
        <motion.div
          aria-hidden
          className="absolute top-0 pointer-events-none"
          style={{
            left: "50%",
            translateX: "-50%",
            x: lampX,
            width: "440px",
          }}
        >
          {/* scale-y-125 exaggerates the vertical spread of the conic beams */}
          <div
            className="relative flex w-full items-center justify-center isolate"
            style={{ height: "420px", transform: "scaleY(1.25)", transformOrigin: "top center" }}
          >
            {/* Left beam — origin at right-top corner = container centre-top */}
            <div
              style={{
                position: "absolute",
                inset: "auto",
                right: "50%",
                height: "224px",
                width: "220px",
                overflow: "visible",
                backgroundImage:
                  "conic-gradient(from 70deg at right top, rgba(255,255,255,0.22), rgba(255,85,0,0.28), transparent, transparent)",
              }}
            >
              {/* Fade bottom edge into void */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "160px", zIndex: 20, background: "linear-gradient(to top, #090C11, transparent)" }} />
              {/* Fade outer (left) edge */}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "160px", zIndex: 20, background: "linear-gradient(to right, #090C11, transparent)" }} />
            </div>

            {/* Right beam — origin at left-top corner = container centre-top */}
            <div
              style={{
                position: "absolute",
                inset: "auto",
                left: "50%",
                height: "224px",
                width: "220px",
                overflow: "visible",
                backgroundImage:
                  "conic-gradient(from 290deg at left top, transparent, transparent, rgba(255,85,0,0.28), rgba(255,255,255,0.22))",
              }}
            >
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "160px", zIndex: 20, background: "linear-gradient(to top, #090C11, transparent)" }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "160px", zIndex: 20, background: "linear-gradient(to left, #090C11, transparent)" }} />
            </div>

            {/* Blurred void fill — kills stray glow below beams */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                height: "192px",
                width: "100%",
                transform: "translateY(48px) scaleX(1.5)",
                background: "#090C11",
                filter: "blur(24px)",
              }}
            />

            {/* Wide orange glow blob at lamp line */}
            <motion.div
              animate={{ opacity: [0.25, 0.42, 0.25] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                zIndex: 50,
                width: "280px",
                height: "144px",
                top: "50%",
                left: "50%",
                translateX: "-50%",
                translateY: "-50%",
                background: "rgba(255,85,0,0.28)",
                borderRadius: "50%",
                filter: "blur(40px)",
              }}
            />

            {/* Tight orb — breathes in width */}
            <motion.div
              animate={{ width: ["96px", "172px", "96px"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                zIndex: 30,
                height: "144px",
                top: "50%",
                left: "50%",
                translateX: "-50%",
                translateY: "-96px",
                background: "rgba(255,110,20,0.5)",
                borderRadius: "50%",
                filter: "blur(28px)",
              }}
            />

            {/* Lamp bar — thin luminous line, z above blackout */}
            <motion.div
              animate={{ opacity: [0.72, 1, 0.72] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                zIndex: 50,
                height: "1.5px",
                width: "440px",
                top: "50%",
                left: "50%",
                translateX: "-50%",
                translateY: "-112px",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, transparent, rgba(255,180,120,0.8) 15%, rgba(255,255,255,1) 38%, rgba(255,85,0,1) 50%, rgba(255,255,255,1) 62%, rgba(255,180,120,0.8) 85%, transparent)",
                boxShadow:
                  "0 0 10px 2px rgba(255,85,0,0.55), 0 0 36px 6px rgba(255,85,0,0.18)",
              }}
            />

            {/* Blackout — hides messy conic-gradient tops above the lamp line */}
            <div
              style={{
                position: "absolute",
                zIndex: 40,
                width: "120%",
                height: "96px",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#090C11",
              }}
            />
          </div>
        </motion.div>

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
                           font-body text-sm text-white-soft/65
                           border border-white/[.12] rounded-full px-4 py-1.5
                           bg-void/50 backdrop-blur-md"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)" }}
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
              style={{ textShadow: "0 2px 32px rgba(9,12,17,0.95), 0 0 80px rgba(9,12,17,0.85)" }}
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
