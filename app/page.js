import Hero from "./components/sections/Hero";
import TrustedBy from "./components/sections/TrustedBy";
import Introduction from "./components/sections/Introduction";
import Advantage from "./components/sections/Advantage";
import FeaturedWorks from "./components/sections/FeaturedWorks";
import Services from "./components/sections/Services";
import Impact from "./components/sections/Impact";
import Comparison from "./components/sections/Comparison";
import Pricing from "./components/sections/Pricing";
import Process from "./components/sections/Process";
import Testimonials from "./components/sections/Testimonials";
import SelectedWorks from "./components/sections/SelectedWorks";
import CTA from "./components/sections/CTA";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <main>
      {/* Sticky scroll: 200svh parent keeps Hero pinned for exactly one viewport of scroll.
          Hero releases when TrustedBy has fully covered it. */}
      <div className="relative h-[200svh]">
        <div className="sticky top-0 z-0">
          <Hero />
        </div>
      </div>

      {/* TrustedBy pulled up by -100svh so it starts at page position 100svh
          (right below Hero), slides over Hero as user scrolls. */}
      <div className="relative z-10 -mt-[100svh]">
        <TrustedBy />
      </div>

      <Introduction />
      <Advantage />
      <FeaturedWorks />
      <Services />
      <Impact />
      <Comparison />
      <Pricing />
      <Process />
      <Testimonials />
      <SelectedWorks />
      <CTA />
      <Footer />
    </main>
  );
}
