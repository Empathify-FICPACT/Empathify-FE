import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Testi from "@/components/landing/testimonial";
import Trial from "@/components/landing/trial";
export default function Home() {
  return (
    <main className="w-full min-h-screen">
        <Trial />
      <Testi />
      <FAQ />
      <CTA />
      
    </main>
  );
}