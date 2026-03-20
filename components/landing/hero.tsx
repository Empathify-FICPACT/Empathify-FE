import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section 
      className="relative w-full min-h-[300px] md:min-h-[450px] lg:min-h-[500px] flex items-center bg-[#2cb46c] bg-[url('/background/BgHero.svg')] bg-cover bg-[position:left_top] md:bg-center bg-no-repeat text-white overflow-hidden py-16 md:py-24"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-8xl relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Content */}
        <div className="flex-1 w-full max-w-3xl text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-[64px] font-extrabold leading-[1.2] lg:leading-[1.1] mb-5 tracking-tight px-2 md:px-0">
            belajar, bermain, dan <br className="hidden md:block" /> berkembang setiap hari
          </h1>
          <p className="text-center md:text-left text-base sm:text-lg md:text-xl lg:text-2xl font-medium opacity-95 mb-8 md:mb-10 max-w-2xl px-4 md:px-0">
            Bantu anak kenali emosi, berlatih sosial, dan berkembang dengan
            cara yang lebih seru dan interaktif.
          </p>
          
          <Link href="/dashboard/latihan">
            <button className="bg-[#ffc107] hover:bg-[#ffb300] text-white font-bold py-3 md:py-3.5 px-8 md:px-12 rounded-full border-[3px] border-yellow-200 shadow-md hover:shadow-lg transition-all text-base md:text-lg mx-auto md:mx-0">
              Mulai Belajar, Yuk
            </button>
          </Link>
        </div>

        {/* Right Content / Image */}
        <div className="flex-1 w-full relative flex justify-center md:justify-end mb-8 md:mb-0">
          <div className="relative w-[380px] h-[320px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] mx-auto md:mx-0">
            <Image
              src="/icon/IconHero.svg"
              alt="Hero Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
