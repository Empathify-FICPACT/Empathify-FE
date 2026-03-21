import Image from "next/image";
import Badge from "./badge";

export default function Penghargaan() {
  const penghargaanList = [
    { id: 1, title: "Pemula", progress: "0 / 10", percentage: 0 },
    { id: 2, title: "Penjelajah", progress: "0 / 10", percentage: 0 },
    { id: 3, title: "Jagoan", progress: "0 / 10", percentage: 0 },
    { id: 4, title: "Raja", progress: "0 / 10", percentage: 0 },
    { id: 5, title: "Master", progress: "0 / 10", percentage: 0 },
  ];

  return (
    <div className="w-full max-w-[1740px] mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start relative">
        {/* Right Sidebar (Lencana) */}
        <Badge showMisi={false} />

        {/* Main Content (Penghargaan) */}
        <div className="flex-1 w-full order-2 xl:order-1 min-w-0">
          <div className="flex justify-between items-center mb-6 lg:mb-8 mt-2">
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900">
              Penghargaan
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {penghargaanList.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-[20px] p-6 lg:p-8 shadow-sm flex flex-col items-center justify-center text-center"
              >
                <div className="mb-4">
                  <Image
                    src="/icon/PenghargaanSimbol.svg"
                    alt={item.title}
                    width={96}
                    height={96}
                    className="object-contain w-20 h-20 lg:w-24 lg:h-24"
                  />
                </div>
                <h3 className="text-[#2cb46c] text-xl lg:text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <div className="w-full max-w-[240px] bg-[#d1d5db] rounded-full h-[24px] lg:h-[28px] relative flex items-center justify-center overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#2cb46c]"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                  <span className="relative z-10 text-[12px] lg:text-sm font-bold text-gray-900">
                    {item.progress}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
