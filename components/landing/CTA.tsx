import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative w-full bg-[#f9fafb] overflow-hidden pt-16 md:pt-24 pb-0 min-h-[350px] md:min-h-[450px] flex flex-col justify-between items-center">
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl mx-auto mb-20 md:mb-32">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#35b565] mb-3 md:mb-4">
          Belajar Seru Bareng Empathify
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-500 font-medium mb-8 md:mb-10">
          Kapan saja, di mana saja, tanpa batas
        </p>
        <Link href="/login">
          <button className="bg-[#ffc107] hover:bg-[#ffb300] text-white font-bold py-3 md:py-3.5 px-8 md:px-12 rounded-full border-[3px] border-yellow-200 shadow-md hover:shadow-lg transition-all text-base md:text-lg">
            Mulai Sekarang!
          </button>
        </Link>
      </div>

      {/* Vector Background */}
      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-0">
        <Image
          src="/background/VectorCTA.svg"
          alt="Wave pattern"
          width={1920}
          height={368}
          className="w-full h-auto object-cover object-bottom"
          priority
        />
      </div>
      
    </section>
  );
}
