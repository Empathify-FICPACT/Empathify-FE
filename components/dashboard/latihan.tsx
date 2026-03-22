import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Badge from "./badge";

export default function Latihan() {
  return (
    <div className="w-full max-w-[1740px] mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start relative">
        <Badge showMisi={true} />

        {/* Main Content (Latihan Harian + Cards) */}
        <div className="flex-1 w-full order-2 xl:order-1 min-w-0">
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 lg:mb-8 ">
            Latihan Harian
          </h1>

          {/* Main Grid - 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">

            {/* Card 1 - Green */}
            <Link href="/latihan/SimulasiPercakapan" className="block outline-none group">
              <div className="bg-[#3FC07B] rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 lg:p-6 text-white flex flex-col justify-between min-h-[150px] sm:min-h-[180px] lg:min-h-[255px] shadow-sm group-hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden cursor-pointer">
                <div className="z-10 relative max-w-[65%] mt-2">
                  <h2 className="text-lg lg:text-2xl font-bold lg:leading-relaxed mb-1">
                    Simulasi Percakapan
                  </h2>
                  <p className="text-xs sm:text-sm lg:text-xl text-white/90 font-medium">
                    Latih komunikasi anak dalam situasi sehari-hari dengan feedback.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold text-xs sm:text-sm lg:text-lg mt-2 z-10 relative">
                  Mulai Latihan
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
                <Image
                  src="/pinguin/PinguinHijau.svg"
                  alt="Pinguin Hijau"
                  width={200}
                  height={200}
                  className="absolute right-[-10px] lg:right-[-20px] bottom-0 w-[45%] sm:w-[42%] lg:w-[44%] h-[100%] object-contain object-bottom"
                />
              </div>
            </Link>

            {/* Card 2 - Blue */}
            <Link href="/latihan/Ekspresi" className="block outline-none group">
              <div className="bg-[#00C0C3] rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 lg:p-6 text-white flex flex-col justify-between min-h-[150px] sm:min-h-[180px] lg:min-h-[255px] shadow-sm group-hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden cursor-pointer">
                <div className="z-10 relative max-w-[65%] mt-2">
                  <h2 className="text-lg lg:text-2xl font-bold lg:leading-relaxed mb-1">
                    Mengenal Ekspresi
                  </h2>
                  <p className="text-xs sm:text-sm lg:text-xl text-white/90 font-medium">
                    Belajar memahami ekspresi wajah seperti senang, sedih, atau marah.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold text-xs sm:text-sm lg:text-lg mt-2 z-10 relative">
                  Mulai Latihan
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
                <Image
                  src="/pinguin/PinguinBiru.svg"
                  alt="Pinguin Biru"
                  width={200}
                  height={200}
                  className="absolute right-[-10px] lg:right-[-14px] bottom-0 w-[45%] sm:w-[42%] lg:w-[44%] h-[100%] object-contain object-bottom"
                />
              </div>
            </Link>

            {/* Card 3 - Purple */}
            <Link href="/latihan/Emosi" className="block outline-none group">
              <div className="bg-[#AF89BE] rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 lg:p-6 text-white flex flex-col justify-between min-h-[150px] sm:min-h-[180px] lg:min-h-[255px] shadow-sm group-hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden cursor-pointer">
                <div className="z-10 relative max-w-[65%] mt-2">
                  <h2 className="text-lg lg:text-2xl font-bold lg:leading-relaxed mb-1">
                    Memahami Emosi
                  </h2>
                  <p className="text-xs sm:text-sm lg:text-xl text-white/90 font-medium">
                    Kenali emosi dari berbagai situasi untuk meningkatkan empati.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold text-xs sm:text-sm lg:text-lg mt-2 z-10 relative">
                  Mulai Latihan
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
                <Image
                  src="/pinguin/PinguinUngu.svg"
                  alt="Pinguin Ungu"
                  width={400}
                  height={400}
                  className="absolute right-[-19px] lg:right-[-29px] bottom-0 w-[45%] sm:w-[42%] lg:w-[44%] h-[105%] object-contain object-bottom"
                />
              </div>
            </Link>

            {/* Card 4 - Orange */}
            <Link href="/latihan/Interaktif" className="block outline-none group">
              <div className="bg-[#F4B803] rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 lg:p-6 text-white flex flex-col justify-between min-h-[150px] sm:min-h-[180px] lg:min-h-[255px] shadow-sm group-hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden cursor-pointer">
                <div className="z-10 relative max-w-[65%] mt-2">
                  <h2 className="text-lg lg:text-2xl font-bold lg:leading-relaxed mb-1">
                    Cerita Interaktif
                  </h2>
                  <p className="text-xs sm:text-sm lg:text-xl text-white/90 font-medium">
                    Belajar lewat cerita dengan pilihan yang membentuk perilaku sosial.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold text-xs sm:text-sm lg:text-lg mt-2 z-10 relative">
                  Mulai Latihan
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
                <Image
                  src="/pinguin/PinguinKuning.svg"
                  alt="Pinguin Kuning"
                  width={400}
                  height={400}
                  className="absolute right-[-10px] lg:right-[-15px] bottom-0 w-[45%] sm:w-[42%] lg:w-[44%] h-[105%] object-contain object-bottom"
                />
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );  
}