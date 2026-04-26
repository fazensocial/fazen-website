"use client";

import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";

/* ─── Variants ───────────────────────────────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

/* ─── Constants ───────────────────────────────────────────── */

const GAP = 20;
const BASE_DURATION = 35;

const PORTFOLIO_ITEMS = [
  { id: 1,  image: "01.jpg", category: "Brand Identity"   },
  { id: 2,  image: "02.jpg", category: "Social Media"     },
  { id: 3,  image: "03.jpg", category: "Brand Identity"   },
  { id: 4,  image: "04.jpg", category: "Logo Design"      },
  { id: 5,  image: "05.jpg", category: "Brand Guidelines" },
  { id: 6,  image: "06.jpg", category: "Brand Identity"   },
  { id: 7,  image: "07.jpg", category: "Brand Identity"   },
  { id: 8,  image: "08.jpg", category: "Logo Design"      },
  { id: 9,  image: "09.jpg", category: "Social Media"     },
  { id: 10, image: "10.jpg", category: "Apparel Design"   },
  { id: 11, image: "11.jpg", category: "Brand Identity"   },
  { id: 12, image: "12.jpg", category: "Brand Guidelines" },
];

/* ─── Portfolio Card ─────────────────────────────────────── */

function PortfolioCard({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      className="group relative shrink-0 rounded-lg overflow-hidden cursor-pointer"
      style={{ aspectRatio: "4/5", width: "calc((100vw - 480px) / 5)" }}
    >
      <Image
        src={`/images/homepage/Foto%20depan/${item.image}`}
        alt={item.category}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
        sizes="20vw"
      />

      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md bg-black/20 border border-white/10 hover:border-white/20 transition-all duration-200">
        <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
        <span className="font-heading font-medium text-[10px] uppercase tracking-[0.15em] text-white">
          {item.category}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Carousel Track ─────────────────────────────────────── */

function CarouselTrack() {
  const posRef      = useRef(0);
  const x           = useMotionValue(0);
  const containerRef = useRef(null);

  const doubled = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

  useEffect(() => {
    let frameId;

    const animate = () => {
      if (!containerRef.current) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const containerWidth  = containerRef.current.offsetWidth;
      const itemWidth       = containerWidth / 5;
      const totalItemWidth  = itemWidth + GAP;
      const setWidth        = totalItemWidth * PORTFOLIO_ITEMS.length;
      const pixelsPerMs     = setWidth / (BASE_DURATION * 1000);
      const lastTime        = { current: Date.now() };

      const update = () => {
        const now   = Date.now();
        const delta = now - lastTime.current;
        lastTime.current = now;

        posRef.current -= pixelsPerMs * delta;
        if (posRef.current <= -setWidth) posRef.current = 0;

        x.set(posRef.current);
        frameId = requestAnimationFrame(update);
      };

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [x]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <motion.div style={{ x }} className="flex gap-5">
        {doubled.map((item, idx) => (
          <PortfolioCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

export default function FeaturedWorks() {
  return (
    <section className="bg-void">

      {/* Orange divider */}
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

        {/* Header */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center mb-12 lg:mb-16"
        >
          <motion.div
            variants={FADE_UP}
            className="inline-flex items-center gap-3 mb-6 border border-white/[0.12] rounded-full bg-white/[0.03] px-5 py-2.5"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
            <span className="font-heading font-medium text-[11px] uppercase tracking-[0.26em] text-white/50">
              Selected Works
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-fazen shrink-0" />
          </motion.div>

          <motion.h2
            variants={FADE_UP}
            className="font-display text-white text-[2rem] lg:text-[3rem] leading-tight lg:leading-[1.08] mb-4 max-w-2xl"
          >
            Every pixel has{" "}
            <span className="text-fazen">a purpose.</span>
          </motion.h2>

          <motion.p
            variants={FADE_UP}
            className="font-body text-white/45 text-base lg:text-lg max-w-xl leading-relaxed"
          >
            A running look at what leaves our studio — sharp, intentional, and built to last.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-r from-void to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-l from-void to-transparent z-20 pointer-events-none" />
          <CarouselTrack />
        </div>

      </div>
    </section>
  );
}
