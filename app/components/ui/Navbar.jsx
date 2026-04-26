"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Portfolio",  href: "/soon"  },
  { label: "Services",   href: "/soon"   },
  { label: "Resources",  href: "/soon"  },
  { label: "Pricing",    href: "/soon"    },
  { label: "About",      href: "/soon"      },
];

/* ─── Sub-components ─────────────────────────────────────── */

function Logo() {
  return (
    <Link href="/" className="font-heading font-semibold text-white-soft text-lg leading-none shrink-0">
      Fazen<span className="text-fazen">®</span>
    </Link>
  );
}

function NavLink({ label, href }) {
  return (
    <li>
      <Link
        href={href}
        className="relative group font-body text-sm text-white-soft/60
                   hover:text-white-soft transition-colors duration-200 py-1"
      >
        {label}
        <span
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-fazen
                     scale-x-0 group-hover:scale-x-100
                     transition-transform duration-200 origin-center"
        />
      </Link>
    </li>
  );
}

function CtaButton() {
  return (
    <Link
      href="/soon"
      className="inline-flex items-center justify-center
                 font-body font-medium text-sm bg-fazen text-white
                 px-4 py-2 rounded-full hover:bg-fazen/85
                 transition-colors duration-150 whitespace-nowrap shrink-0"
    >
      Get in Touch
    </Link>
  );
}

/* ─── Main Navbar ────────────────────────────────────────── */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50
                       backdrop-blur-md bg-void/[.88] border-b border-white/[.06]">
      <nav
        className="flex items-center h-20 w-full
                   px-6 lg:px-[240px]"
        aria-label="Main navigation"
      >

        {/* ── Desktop layout (md+) ── */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Logo />

          <ul className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={label} label={label} href={href} />
            ))}
          </ul>

          <CtaButton />
        </div>

        {/* ── Mobile layout (<md) ── */}
        <div className="flex md:hidden items-center w-full relative">

          {/* Left: hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="text-white-soft/70 hover:text-white-soft
                       transition-colors p-1 shrink-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Center: logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo />
          </div>

          {/* Right: CTA */}
          <div className="ml-auto">
            <CtaButton />
          </div>

        </div>
      </nav>
    </header>
  );
}
