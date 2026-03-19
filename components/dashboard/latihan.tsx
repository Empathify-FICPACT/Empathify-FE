import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Latihan() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start relative">
        {/* Right Sidebar - Badges & Missions (order-1 on mobile = appears first / on top) */}
        <div className="w-full xl:w-[320px] flex flex-col gap-4 lg:gap-6 flex-shrink-0 order-1 xl:order-2 sticky top-2 md:top-[72px] z-30 xl:mt-[68px] bg-[#f9fafb] xl:bg-transparent pb-2 xl:pb-0">
          {/* Badge Level */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 lg:p-6 shadow-sm">
            <h3 className="text-[#2cb46c] font-bold mb-3 lg:mb-4 text-[17px]">
              Badge Level
            </h3>
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/BadgeLevel.svg"
                  alt="Badge Level"
                  width={48}
                  height={56}
                  className="object-contain w-10 h-10 lg:w-12 lg:h-[56px]"
                />
              </div>
              <p className="text-sm lg:text-[15px] text-gray-900 font-bold leading-snug">
                Mulai latihan untuk mendapatkan badge pertamamu!
              </p>
            </div>
          </div>

          {/* Misi Harian */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <h3 className="text-[#2cb46c] font-bold text-[17px]">
                Misi Harian
              </h3>
              <button className="text-[13px] text-gray-900 font-bold hover:text-green-500 transition-colors">
                Lihat Semua
              </button>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 pt-1">
                <Image
                  src="/BadgeLevel.svg"
                  alt="Mission Padlock"
                  width={48}
                  height={56}
                  className="object-contain w-10 h-10 lg:w-12 lg:h-[56px]"
                />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-sm lg:text-[15px] text-gray-900 font-bold leading-snug mb-2 lg:mb-3">
                  Selesaikan 1 latihan simulasi percakapan
                </p>
                <div className="w-full h-2.5 lg:h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2cb46c] w-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content (Latihan Harian + Cards) */}
        <div className="flex-1 w-full order-2 xl:order-1 min-w-0">
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 lg:mb-8 mt-2">
            Latihan Harian
          </h1>

          {/* Main Grid - 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">

            {/* Card 1 - Green */}
            <div className="bg-[#3FC07B] rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 lg:p-6 text-white flex flex-col justify-between min-h-[150px] sm:min-h-[180px] lg:min-h-[240px] shadow-sm hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
              <div className="z-10 relative max-w-[58%] mt-2">
                <h2 className="text-lg lg:text-2xl font-bold lg:leading-relaxed mb-1">
                  Simulasi Percakapan
                </h2>
                <p className="text-xs lg:text-base text-white/90 font-medium">
                  Latih komunikasi anak dalam situasi sehari-hari dengan feedback.
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-white font-semibold text-xs sm:text-sm lg:text-base mt-2 z-10 relative">
                Mulai Latihan
                <ArrowRight className="w-3 h-3" />
              </button>
              <Image
                src="/PinguinHijau.svg"
                alt="Pinguin Hijau"
                width={200}
                height={200}
                className="absolute right-[-10px] lg:right-[-20px] bottom-0 w-[45%] sm:w-[42%] lg:w-[44%] h-[100%] object-contain object-bottom"
              />
            </div>

            {/* Card 2 - Blue */}
            <div className="bg-[#00C0C3] rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 lg:p-6 text-white flex flex-col justify-between min-h-[150px] sm:min-h-[180px] lg:min-h-[240px] shadow-sm hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
              <div className="z-10 relative max-w-[58%] mt-2">
                <h2 className="text-lg lg:text-2xl font-bold lg:leading-relaxed mb-1">
                  Mengenal Ekspresi
                </h2>
                <p className="text-xs lg:text-base text-white/90 font-medium">
                  Belajar memahami ekspresi wajah seperti senang, sedih, atau marah.
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-white font-semibold text-xs sm:text-sm lg:text-base mt-2 z-10 relative">
                Mulai Latihan
                <ArrowRight className="w-3 h-3" />
              </button>
              <Image
                src="/pinguinBiru.svg"
                alt="Pinguin Biru"
                width={200}
                height={200}
                className="absolute right-[-10px] lg:right-[-14px] bottom-0 w-[45%] sm:w-[42%] lg:w-[44%] h-[100%] object-contain object-bottom"
              />
            </div>

            {/* Card 3 - Purple */}
            <div className="bg-[#AF89BE] rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 lg:p-6 text-white flex flex-col justify-between min-h-[150px] sm:min-h-[180px] lg:min-h-[240px] shadow-sm hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
              <div className="z-10 relative max-w-[58%] mt-2">
                <h2 className="text-lg lg:text-2xl font-bold lg:leading-relaxed mb-1">
                  Memahami Emosi
                </h2>
                <p className="text-xs lg:text-base text-white/90 font-medium">
                  Kenali emosi dari berbagai situasi untuk meningkatkan empati.
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-white font-semibold text-xs sm:text-sm lg:text-base mt-2 z-10 relative">
                Mulai Latihan
                <ArrowRight className="w-3 h-3" />
              </button>
              <Image
                src="/PinguinUngu.svg"
                alt="Pinguin Ungu"
                width={400}
                height={400}
                className="absolute right-[-19px] lg:right-[-29px] bottom-0 w-[45%] sm:w-[42%] lg:w-[44%] h-[105%] object-contain object-bottom"
              />
            </div>

            {/* Card 4 - Orange */}
            <div className="bg-[#F4B803] rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 lg:p-6 text-white flex flex-col justify-between min-h-[150px] sm:min-h-[180px] lg:min-h-[240px] shadow-sm hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
              <div className="z-10 relative max-w-[58%] mt-2">
                <h2 className="text-lg lg:text-2xl font-bold lg:leading-relaxed mb-1">
                  Cerita Interaktif
                </h2>
                <p className="text-xs lg:text-base text-white/90 font-medium">
                  Belajar lewat cerita dengan pilihan yang membentuk perilaku sosial.
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-white font-semibold text-xs sm:text-sm lg:text-base mt-2 z-10 relative">
                Mulai Latihan
                <ArrowRight className="w-3 h-3" />
              </button>
              <Image
                src="/PinguinKuning.svg"
                alt="Pinguin Kuning"
                width={400}
                height={400}
                className="absolute right-[-10px] lg:right-[-15px] bottom-0 w-[45%] sm:w-[42%] lg:w-[44%] h-[105%] object-contain object-bottom"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );  
}