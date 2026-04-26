"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";

/* ─── Blob definitions — darker for text readability ─────── */

const BLOBS = [
  { cx: 0.14, cy: 0.22, orbitR: 0.13, speed: 0.09, phase: 0.0, rFrac: 1.05, rgb: "8,8,12"   },
  { cx: 0.80, cy: 0.74, orbitR: 0.15, speed: 0.07, phase: 2.8, rFrac: 1.00, rgb: "5,5,8"    },
  { cx: 0.52, cy: 0.11, orbitR: 0.10, speed: 0.13, phase: 1.5, rFrac: 0.86, rgb: "22,22,32" },
  { cx: 0.18, cy: 0.84, orbitR: 0.14, speed: 0.10, phase: 4.2, rFrac: 0.88, rgb: "14,14,22" },
  { cx: 0.86, cy: 0.28, orbitR: 0.17, speed: 0.08, phase: 3.5, rFrac: 0.80, rgb: "28,28,42" },
  { cx: 0.42, cy: 0.64, orbitR: 0.09, speed: 0.15, phase: 5.5, rFrac: 0.76, rgb: "18,18,28" },
];

/* ─── Liquid Chrome Hook ─────────────────────────────────── */

function useLiquidChrome(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx    = canvas.getContext("2d");
    const off    = document.createElement("canvas");
    const offCtx = off.getContext("2d");

    let w = 0, h = 0, blurPx = 60;
    const mouse  = { x: 0.5, y: 0.5 };
    const smooth = { x: 0,   y: 0   };
    let ready = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr  = window.devicePixelRatio || 1;
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      off.width     = canvas.width;
      off.height    = canvas.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = rect.width;
      h = rect.height;
      blurPx = Math.round(Math.min(w, h) * 0.14);
      if (!ready) { smooth.x = w * 0.5; smooth.y = h * 0.5; ready = true; }
    };
    resize();

    const container = canvas.parentElement;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top)  / rect.height;
    };
    container.addEventListener("mousemove", onMove);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = Date.now();
    let frameId;

    const draw = () => {
      const t = (Date.now() - start) / 1000;

      smooth.x += (mouse.x * w - smooth.x) * 0.022;
      smooth.y += (mouse.y * h - smooth.y) * 0.022;

      const mx = smooth.x / w;
      const my = smooth.y / h;

      offCtx.clearRect(0, 0, w, h);

      BLOBS.forEach((blob) => {
        const bx = (blob.cx + Math.cos(t * blob.speed + blob.phase) * blob.orbitR + (mx - 0.5) * 0.06) * w;
        const by = (blob.cy + Math.sin(t * blob.speed + blob.phase * 0.7) * blob.orbitR + (my - 0.5) * 0.04) * h;
        const r  = blob.rFrac * Math.min(w, h);

        const g = offCtx.createRadialGradient(bx, by, 0, bx, by, r);
        g.addColorStop(0,    `rgba(${blob.rgb}, 0.98)`);
        g.addColorStop(0.45, `rgba(${blob.rgb}, 0.92)`);
        g.addColorStop(0.72, `rgba(${blob.rgb}, 0.44)`);
        g.addColorStop(1,    `rgba(${blob.rgb}, 0.0)`);

        offCtx.beginPath();
        offCtx.arc(bx, by, r, 0, Math.PI * 2);
        offCtx.fillStyle = g;
        offCtx.fill();
      });

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#070709";
      ctx.fillRect(0, 0, w, h);

      ctx.filter = `blur(${blurPx}px)`;
      ctx.drawImage(off, 0, 0, w, h);
      ctx.filter = "none";

      /* Cursor blob — kept very subtle */
      const cr = 0.22 * Math.min(w, h);
      ctx.filter = `blur(${Math.round(blurPx * 0.85)}px)`;
      const cg = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, cr);
      cg.addColorStop(0,   "rgba(160,160,180,0.18)");
      cg.addColorStop(0.5, "rgba(160,160,180,0.06)");
      cg.addColorStop(1,   "transparent");
      ctx.beginPath();
      ctx.arc(smooth.x, smooth.y, cr, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
      ctx.filter = "none";

      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener("mousemove", onMove);
      ro.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

/* ─── Variants ───────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

/* ─── Click Effect: Brush Strokes ("Start a Conversation") ── */
/*   10 ink strokes radiate from click — like starting to sketch   */

function BrushStroke({ x, y, angle, dist, thickness, length, isAccent }) {
  const rad = (angle * Math.PI) / 180;
  const dx  = Math.cos(rad) * dist;
  const dy  = Math.sin(rad) * dist;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x - thickness / 2,
        top:  y - length / 2,
        width:  thickness,
        height: length,
        borderRadius: thickness,
        backgroundColor: isAccent ? "#FF5500" : "rgba(255,255,255,0.72)",
        rotate: angle,
        transformOrigin: "center center",
      }}
      initial={{ opacity: 0.95, x: 0, y: 0, scaleY: 1, scaleX: 1 }}
      animate={{ opacity: 0,    x: dx, y: dy, scaleY: 0.2, scaleX: 0.5 }}
      transition={{ duration: 0.55, ease: [0.15, 0, 0.75, 1] }}
    />
  );
}

function BrushBurst({ burst }) {
  return (
    <>
      {burst.strokes.map((s) => (
        <BrushStroke key={s.key} x={burst.x} y={burst.y} {...s} />
      ))}
    </>
  );
}

function makeBrushBurst(x, y) {
  return {
    id:      Date.now() + Math.random(),
    x, y,
    strokes: Array.from({ length: 10 }, (_, i) => ({
      key:      i,
      angle:    i * 36 + (Math.random() * 16 - 8),
      dist:     48 + Math.random() * 36,
      thickness: 2 + Math.random() * 2.5,
      length:   8 + Math.random() * 14,
      isAccent: i % 4 === 0,
    })),
  };
}

/* ─── Click Effect: Card Scatter ("View Our Work") ──────── */
/*   Portfolio cards scatter from click — like fanning out work   */

const CARD_TONES = [
  "rgba(200,200,215,0.70)",
  "rgba(140,140,158,0.60)",
  "rgba(90,90,110,0.55)",
  "rgba(220,220,232,0.65)",
  "rgba(55,55,72,0.50)",
  "rgba(170,170,188,0.62)",
];

function PortfolioCard({ x, y, angle, dist, rotEnd, w, h, isAccent, tone }) {
  const rad = (angle * Math.PI) / 180;
  const dx  = Math.cos(rad) * dist;
  const dy  = Math.sin(rad) * dist + 18; // mild gravity

  return (
    <motion.div
      className="absolute pointer-events-none rounded-[3px]"
      style={{
        left:            x - w / 2,
        top:             y - h / 2,
        width:           w,
        height:          h,
        backgroundColor: isAccent ? "#FF5500" : tone,
        boxShadow:       isAccent ? "0 0 10px rgba(255,85,0,0.5)" : "none",
      }}
      initial={{ opacity: 0.88, x: 0, y: 0, rotate: 0, scale: 1 }}
      animate={{ opacity: 0,    x: dx, y: dy, rotate: rotEnd, scale: 0.55 }}
      transition={{ duration: 0.70, ease: [0.18, 0, 0.65, 1] }}
    />
  );
}

function CardBurst({ burst }) {
  return (
    <>
      {burst.cards.map((c) => (
        <PortfolioCard key={c.key} x={burst.x} y={burst.y} {...c} />
      ))}
    </>
  );
}

function makeCardBurst(x, y) {
  return {
    id:    Date.now() + Math.random(),
    x, y,
    cards: Array.from({ length: 7 }, (_, i) => ({
      key:      i,
      angle:    (i / 7) * 360 + (Math.random() * 24 - 12),
      dist:     42 + Math.random() * 48,
      rotEnd:   Math.random() * 64 - 32,
      w:        20 + Math.random() * 22,
      h:        14 + Math.random() * 18,
      isAccent: i === 0,
      tone:     CARD_TONES[i % CARD_TONES.length],
    })),
  };
}

/* ─── Buttons ────────────────────────────────────────────── */

function ConversationButton({ href }) {
  const wrapRef = useRef(null);
  const [bursts, setBursts] = useState([]);
  const [delta,  setDelta]  = useState({ x: 0, y: 0 });

  const handleClick = useCallback((e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const burst = makeBrushBurst(e.clientX - rect.left, e.clientY - rect.top);
    setBursts((prev) => [...prev, burst]);
    setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== burst.id)), 650);
  }, []);

  const onMouseMove  = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDelta({
      x: (e.clientX - (rect.left + rect.width  / 2)) * 0.26,
      y: (e.clientY - (rect.top  + rect.height / 2)) * 0.26,
    });
  };
  const onMouseLeave = () => setDelta({ x: 0, y: 0 });

  return (
    <motion.div
      ref={wrapRef}
      className="relative"
      style={{ overflow: "visible" }}
      animate={{ x: delta.x, y: delta.y }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      {/* Burst particles rendered outside link's overflow-hidden */}
      <div className="absolute inset-0 pointer-events-none" style={{ overflow: "visible", zIndex: 30 }}>
        {bursts.map((b) => <BrushBurst key={b.id} burst={b} />)}
      </div>

      <a
        href={href}
        className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl
                   border bg-white/[0.13] border-white/[0.28]
                   hover:bg-white/[0.22] hover:border-white/[0.46]
                   text-white backdrop-blur-md overflow-hidden cursor-pointer
                   font-heading font-medium text-sm transition-colors duration-250"
      >
        <div className="absolute inset-x-4 top-0 h-px
                        bg-gradient-to-r from-transparent via-white/45 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative">Start a Conversation</span>
        <ArrowRight
          size={15}
          className="relative transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </a>
    </motion.div>
  );
}

function WorkButton({ href }) {
  const wrapRef = useRef(null);
  const [bursts, setBursts] = useState([]);
  const [delta,  setDelta]  = useState({ x: 0, y: 0 });

  const handleClick = useCallback((e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const burst = makeCardBurst(e.clientX - rect.left, e.clientY - rect.top);
    setBursts((prev) => [...prev, burst]);
    setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== burst.id)), 800);
  }, []);

  const onMouseMove  = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDelta({
      x: (e.clientX - (rect.left + rect.width  / 2)) * 0.26,
      y: (e.clientY - (rect.top  + rect.height / 2)) * 0.26,
    });
  };
  const onMouseLeave = () => setDelta({ x: 0, y: 0 });

  return (
    <motion.div
      ref={wrapRef}
      className="relative"
      style={{ overflow: "visible" }}
      animate={{ x: delta.x, y: delta.y }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ overflow: "visible", zIndex: 30 }}>
        {bursts.map((b) => <CardBurst key={b.id} burst={b} />)}
      </div>

      <a
        href={href}
        className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl
                   border bg-white/[0.04] border-white/[0.11]
                   hover:bg-white/[0.09] hover:border-white/[0.24]
                   text-white/60 hover:text-white
                   backdrop-blur-md overflow-hidden cursor-pointer
                   font-heading font-medium text-sm transition-colors duration-250"
      >
        <div className="absolute inset-x-4 top-0 h-px
                        bg-gradient-to-r from-transparent via-white/45 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative">View Our Work</span>
        <Layers
          size={15}
          className="relative transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </a>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

export default function CTA() {
  const canvasRef = useRef(null);
  useLiquidChrome(canvasRef);

  return (
    <section className="relative overflow-hidden bg-[#070709]">

      {/* Divider */}
      <div className="page-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* Liquid chrome canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Extra dark veil — ensures text stays readable */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.028]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize:   "128px",
        }}
      />

      {/* Decorative concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          className="absolute w-[680px] max-w-[90vw] aspect-square rounded-full border border-white/[0.04]"
        />
        <div className="absolute w-[480px] max-w-[70vw] aspect-square rounded-full border border-white/[0.055]" />
        <div className="absolute w-[280px] max-w-[50vw] aspect-square rounded-full border border-white/[0.07]" />
      </div>

      {/* Content */}
      <div className="relative z-10 page-container py-20 lg:py-28">
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto gap-7"
        >

          {/* Badge */}
          <motion.div variants={FADE_UP}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full
                       border border-white/[0.14] bg-white/[0.05] backdrop-blur-sm">
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
            <span className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-white/50">
              Let&apos;s Work Together
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
          </motion.div>

          {/* Headline */}
          <motion.h2 variants={FADE_UP}
            className="font-display text-white text-[2rem] lg:text-[3.2rem] leading-tight">
            Have a project ready?{" "}
            <br className="hidden lg:block" />
            <span className="text-fazen underline decoration-fazen decoration-1 underline-offset-[7px]">
              Let&apos;s build something great.
            </span>
          </motion.h2>

          {/* Body */}
          <motion.p variants={FADE_UP}
            className="font-body text-white/55 text-base lg:text-lg leading-relaxed">
            Tell us what you&apos;re working on. Send a message and let&apos;s talk
            strategy, design, and everything in between.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={FADE_UP}
            className="flex flex-col sm:flex-row items-center gap-4 mt-1">
            <ConversationButton href="/soon" />
            <WorkButton href="/soon" />
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}
