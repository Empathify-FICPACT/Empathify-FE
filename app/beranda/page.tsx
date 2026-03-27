import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Testi from "@/components/landing/testimonial";
import Trial from "@/components/landing/trial";
import Steps from "@/components/landing/steps";
import Fitur from "@/components/landing/fitur";
import Hero from "@/components/landing/hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full min-h-screen">
      <Hero />
      <Fitur />
      <Steps />
      <Trial />
      <Testi />
      <FAQ />
      <CTA />
      </main>
      <Footer />
    </div>
  );
}
