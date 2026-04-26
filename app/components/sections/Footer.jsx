"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

/* ─── Brand SVG icons (lucide-react has no social brand icons) ── */

const IconInstagram = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const IconLinkedin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IconYoutube = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);

/* ─── Data ───────────────────────────────────────────────── */

const NAV_COLS = [
  {
    heading: "Services",
    links: [
      { label: "Logo & Brand Identity", href: "/soon" },
      { label: "Social Media Design",   href: "/soon" },
      { label: "Presentation Design",   href: "/soon" },
      { label: "Marketing Design",      href: "/soon" },
      { label: "View All Services",     href: "/soon", accent: true },
    ],
  },
  {
    heading: "Navigate",
    links: [
      { label: "Portfolio",   href: "/soon"           },
      { label: "About Me",    href: "/#introduction"  },
      { label: "Process",     href: "/#process"       },
      { label: "Pricing",     href: "/#pricing"       },
      { label: "Blog",        href: "/soon", soon: true },
    ],
  },
  {
    heading: "Get in Touch",
    links: [
      { label: "Start a Project",       href: "/soon",                        Icon: ArrowUpRight  },
      { label: "fazensocial@gmail.com", href: "mailto:fazensocial@gmail.com", Icon: Mail          },
      { label: "Instagram",             href: "https://instagram.com",        Icon: IconInstagram },
      { label: "LinkedIn",              href: "https://linkedin.com",         Icon: IconLinkedin  },
    ],
  },
];

const SOCIALS = [
  { Icon: IconInstagram, href: "https://instagram.com",          label: "Instagram" },
  { Icon: IconLinkedin,  href: "https://linkedin.com",           label: "LinkedIn"  },
  { Icon: IconYoutube,   href: "/soon",                          label: "YouTube"   },
  { Icon: Mail,          href: "mailto:fazensocial@gmail.com",   label: "Email"     },
];

/* ─── Social Icon Button ─────────────────────────────────── */

function SocialBtn({ Icon, href, label }) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="group w-9 h-9 rounded-lg flex items-center justify-center
                 border border-white/[0.09] hover:border-fazen/50
                 hover:bg-fazen/[0.08] transition-colors duration-200"
    >
      <Icon size={15} className="text-white/40 group-hover:text-white/80 transition-colors duration-200" />
    </motion.a>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */

function FooterNavLink({ href, className, children }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-void">

      {/* Top divider */}
      <div className="page-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* ── Main body ──────────────────────────────────────── */}
      <div className="page-container py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-14">

          {/* Brand block */}
          <div className="lg:w-[28%] shrink-0 flex flex-col gap-6">

            {/* Wordmark */}
            <Link href="/" className="inline-flex items-baseline gap-0.5 w-fit">
              <span className="font-display text-white text-[2.2rem] leading-none">Fazen</span>
              <span className="font-display text-fazen text-[2.2rem] leading-none">.</span>
            </Link>

            {/* Tagline */}
            <p className="font-body text-white/30 text-sm leading-relaxed max-w-[210px]">
              Design that says something worth remembering. Sharp, fast, and built to last.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-white/22 shrink-0" />
              <span className="font-body text-white/22 text-xs tracking-wide">
                Indonesia · Remote Worldwide
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <SocialBtn key={s.label} {...s} />
              ))}
            </div>

          </div>

          {/* Nav columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:pl-12">
            {NAV_COLS.map((col) => (
              <div key={col.heading}>
                {/* Column heading */}
                <h3 className="font-heading font-semibold text-[11px] uppercase
                               tracking-[0.24em] text-white/80 mb-4">
                  {col.heading}
                </h3>

                {/* Separator */}
                <div className="h-px bg-white/[0.08] mb-5" />

                {/* Links */}
                <ul className="flex flex-col gap-3.5">
                  {col.links.map(({ label, href, accent, soon, Icon }) => (
                    <li key={label}>
                      <FooterNavLink
                        href={href}
                        className={`group flex items-center gap-2 font-body text-sm
                                   transition-colors duration-200
                                   ${accent
                                     ? "text-fazen/65 hover:text-fazen"
                                     : "text-white/35 hover:text-white/72"
                                   }`}
                      >
                        {Icon && (
                          <Icon
                            size={13}
                            className="shrink-0 opacity-55 group-hover:opacity-90 transition-opacity duration-200"
                          />
                        )}
                        <span>{label}</span>
                        {soon && (
                          <span className="text-[9px] font-heading font-medium uppercase
                                           tracking-wider text-fazen/60 border border-fazen/25
                                           rounded px-1.5 py-px leading-none shrink-0">
                            Soon
                          </span>
                        )}
                      </FooterNavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar — Fazen orange brand strip ──────────── */}
      <div className="bg-fazen">
        <div className="page-container h-12 flex items-center justify-between">
          <p className="font-body text-void/75 text-xs">
            © {new Date().getFullYear()} Fazen. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/soon"
              className="font-body text-void/60 hover:text-void text-xs transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/soon"
              className="font-body text-void/60 hover:text-void text-xs transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
