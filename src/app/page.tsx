import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { CTA, Footer } from "@/components/Footer";
import { ParallaxText } from "@/components/ParallaxText";
import { Benefits } from "@/components/Benefits";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Showcase } from "@/components/Showcase";
import { Founders } from "@/components/Founders";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <ParallaxText text="PERFORMANCE" />

      <Benefits />

      <Showcase />

      <Services />

      <ParallaxText text="TRANSFORMATION" />

      <Process />

      <Founders />

      <Pricing />

      <Testimonials />

      <FAQ />

      <CTA />

      <Footer />
    </main>
  );
}
