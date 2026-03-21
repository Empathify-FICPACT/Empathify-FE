import Image from "next/image";
import Link from "next/link";

export default function Trial() {
  return (
    <section className="relative w-full overflow-hidden bg-[#35b565] flex items-center min-h-[400px] md:min-h-[500px] mt-20">
      {/* Background patterns from bgFree Trial.svg */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/background/bgFree Trial.svg"
          alt="Background Pattern"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="max-w-6xl lg:max-w-[1200px] mx-auto w-full px-4 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-16 py-16 md:py-24">
        {/* Left Side: Penguin Image */}
        <div className="flex-shrink-0 w-full md:w-[45%] lg:w-[40%] flex justify-center md:justify-end">
          <Image
            src="/logo/logoTrial.svg"
            alt="Pinguin Mascot"
            width={500}
            height={500}
            className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[480px] h-auto object-contain drop-shadow-xl"
            priority
          />
        </div>

        {/* Right Side: Text & Button */}
        <div className="w-full md:w-[55%] lg:w-[65%] text-center md:text-left flex flex-col items-center md:items-start lg:pl-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 whitespace-nowrap">
            Coba Latihan Pertamamu Sekarang
          </h2>
          <p className="text-white/90 text-base md:text-lg lg:text-2xl mb-8 md:mb-10 font-medium">
            Jelajahi latihan pertama dan rasakan pengalaman belajar yang seru seperti bermain game.
          </p>
         <Link href="/dashboard/latihan">
          <button className="bg-[#ffc107] hover:bg-[#ffb300] text-white font-bold py-3 md:py-3.5 px-8 md:px-12 rounded-full border-[3px] border-yellow-200 shadow-md hover:shadow-lg transition-all text-base md:text-lg">
            Coba Latihan
          </button>
        </Link>
        </div>
      </div>
    </section>
  );
}
