import Image from "next/image";

export default function Penghargaan() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start relative">
        {/* Placeholder Right Sidebar to keep main content width consistent with Misi */}
        <div className="w-full xl:w-[380px] flex-shrink-0 order-1 xl:order-2 hidden xl:block"></div>

        {/* Main Content (Penghargaan) */}
        <div className="flex-1 w-full order-2 xl:order-1 min-w-0">
          <div className="flex justify-between items-center mb-6 lg:mb-8 mt-2">
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900">
              Penghargaan
            </h1>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 lg:p-6 shadow-sm flex flex-col gap-6">
            {/* Mission 1 */}
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/dashboard/MisiIcon.svg"
                  alt="Misi 1"
                  width={48}
                  height={48}
                  className="object-contain w-10 h-10 lg:w-12 lg:h-12"
                />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-sm lg:text-[15px] text-gray-900 font-bold leading-snug mb-2">
                  Kumpulkan 30 XP hari ini
                </p>
                <div className="w-full bg-[#d1d5db] rounded-full h-[22px] lg:h-6 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-[#2cb46c] w-0"></div>
                  <span className="relative z-10 text-[11px] lg:text-xs font-bold text-gray-900">
                    0/30
                  </span>
                </div>
              </div>
            </div>
            
            <hr className="border-gray-100" />

            {/* Mission 2 */}
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/dashboard/MisiIcon2.svg"
                  alt="Misi 2"
                  width={48}
                  height={48}
                  className="object-contain w-10 h-10 lg:w-12 lg:h-12"
                />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-sm lg:text-[15px] text-gray-900 font-bold leading-snug mb-2">
                  Selesaikan 2 latihan sampai selesai
                </p>
                <div className="w-full bg-[#d1d5db] rounded-full h-[22px] lg:h-6 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-[#2cb46c] w-0"></div>
                  <span className="relative z-10 text-[11px] lg:text-xs font-bold text-gray-900">
                    0/2
                  </span>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Mission 3 */}
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/pinguin/CaptainPingo.svg"
                  alt="Misi 3"
                  width={48}
                  height={48}
                  className="object-contain w-10 h-10 lg:w-12 lg:h-12"
                />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-sm lg:text-[15px] text-gray-900 font-bold leading-snug mb-2">
                  Lakukan Percakapan Singkat dengan Pingo
                </p>
                <div className="w-full bg-[#d1d5db] rounded-full h-[22px] lg:h-6 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-[#2cb46c] w-0"></div>
                  <span className="relative z-10 text-[11px] lg:text-xs font-bold text-gray-900">
                    0/1
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
