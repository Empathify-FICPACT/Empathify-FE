import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Testi from "@/components/landing/testimonial";
import Trial from "@/components/landing/trial";
import Steps from "@/components/landing/steps";
import Fitur from "@/components/landing/fitur";
import Hero from "@/components/landing/hero";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <Fitur />
      <Steps />
      <Trial />
      <Testi />
      <FAQ />
      <CTA />
    </main>
  );
}
