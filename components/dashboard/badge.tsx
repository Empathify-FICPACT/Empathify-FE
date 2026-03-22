import Image from "next/image";
import Link from "next/link";

interface RightSidebarProps {
  showMisi?: boolean;
}

export default function RightSidebar({ showMisi = true }: RightSidebarProps) {
  return (
    <div className="w-full xl:w-[450px] flex-shrink-0 order-1 xl:order-2 hidden xl:block">
      <div className="bg-white border border-gray-200 rounded-[20px] p-5 lg:p-6 shadow-sm">
        <h3 className="text-[#2cb46c] font-bold mb-3 lg:mb-4 text-base md:text-lg lg:text-2xl">
          Lencana
        </h3>
        <div className="flex gap-4 items-center">
          <div className="flex-shrink-0">
            <Image
              src="/logo/BadgeLevel.svg"
              alt="Lencana Level"
              width={48}
              height={56}
              className="object-contain w-10 h-10 lg:w-12 lg:h-[56px]"
            />
          </div>
          <p className="text-sm md:text-sm lg:text-xl text-gray-900 font-bold leading-snug">
            Mulai latihan untuk mendapatkan badge pertamamu!
          </p>
        </div>
      </div>

      {/* Misi Harian */}
      {showMisi && (
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 mt-5 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-[#2cb46c] font-bold text-base md:text-lg lg:text-2xl">
              Misi Harian
            </h3>
           <Link href="/dashboard/misi">
              <button className="text-sm md:text-sm lg:text-base text-gray-900 font-bold hover:text-green-500 transition-colors">
                Lihat Semua
              </button>
            </Link>
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
              <p className="text-sm md:text-sm lg:text-xl text-gray-900 font-bold leading-snug mb-2 lg:mb-3">
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
