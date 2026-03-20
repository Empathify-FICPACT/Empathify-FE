import Image from "next/image";

interface RightSidebarProps {
  showMisi?: boolean;
}

export default function RightSidebar({ showMisi = true }: RightSidebarProps) {
  return (
    <div className="w-full xl:w-[380px] flex flex-col gap-4 lg:gap-6 flex-shrink-0 order-1 xl:order-2 sticky top-2 md:top-[72px] z-30 xl:mt-[68px] bg-[#f9fafb] xl:bg-transparent pb-2 xl:pb-0">
      {/* Badge Level */}
      <div className="bg-white border border-gray-200 rounded-[20px] p-5 lg:p-6 shadow-sm">
        <h3 className="text-[#2cb46c] font-bold mb-3 lg:mb-4 text-[17px]">
          Badge Level
        </h3>
        <div className="flex gap-4 items-center">
          <div className="flex-shrink-0">
            <Image
              src="/logo/BadgeLevel.svg"
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
      {showMisi && (
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
                src="/dashboard/MisiIcon2.svg"
                alt="Mission Icon"
                width={48}
                height={56}
                className="object-contain w-10 h-10 lg:w-12 lg:h-[56px]"
              />
            </div>
            <div className="flex-grow flex flex-col justify-center">
              <p className="text-sm lg:text-[15px] text-gray-900 font-bold leading-snug mb-2 lg:mb-3">
                Selesaikan 2 latihan sampai selesai
              </p>
              <div className="w-full bg-[#d1d5db] rounded-full h-[22px] lg:h-6 relative flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#2cb46c] w-0"></div>
                <span className="relative z-10 text-[11px] lg:text-xs font-bold text-gray-900">
                  0 / 2
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
