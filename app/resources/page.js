"use client";

import Link from "next/link";
import { ArrowDown, ExternalLink } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import TrustedBy from "../components/sections/TrustedBy";
import Footer from "../components/sections/Footer";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-void flex flex-col">
      <main className="flex-1">

        <PageHero
          badge="Resources"
          headline={
            <>
              Templates & tools.<br />
              <span className="text-fazen">Built for real brands.</span>
            </>
          }
          description="Free design resources, Canva templates, and brand kits crafted by Fazen — made for founders and creatives who move fast."
          primaryButton={
            <Link
              href="#resources-grid"
              className="inline-flex items-center gap-2
                         font-body font-medium text-sm
                         bg-fazen text-white px-6 py-3 rounded-full
                         hover:bg-fazen/85 transition-colors duration-150"
            >
              Browse Resources
              <ArrowDown size={14} />
            </Link>
          }
          secondaryButton={
            <a
              href="https://www.etsy.com/shop/FazenGoods"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2
                         font-body font-medium text-sm
                         text-white-soft border border-white/[.14] px-6 py-3 rounded-full
                         hover:border-white/30 transition-colors duration-150"
            >
              Shop on Etsy
              <ExternalLink size={14} />
            </a>
          }
        />

        <TrustedBy />

        <div id="resources-grid" />

      </main>

      <Footer />
    </div>
  );
}
