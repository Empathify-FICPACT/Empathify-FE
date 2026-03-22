import Badge from "./badge";
import Image from "next/image";
import Link from "next/link";

export default function Riwayat() {
  const riwayatLatihan = [
    { title: "Cerita Interaktif", date: "30/01/2026 · 08:33", xp: 20 },
    { title: "Memahami Emosi", date: "29/01/2026 · 11:59", xp: 15 },
    { title: "Mengenal Ekspresi", date: "28/01/2026 · 12:14", xp: 10 },
    { title: "Mengenal Ekspresi", date: "28/01/2026 · 12:14", xp: 10 },
    { title: "Simulasi Percakapan", date: "27/01/2026 · 09:00", xp: 25 },
    { title: "Cerita Interaktif", date: "26/01/2026 · 14:20", xp: 20 },
    { title: "Memahami Emosi", date: "25/01/2026 · 10:10", xp: 15 },
    { title: "Simulasi Percakapan", date: "22/01/2026 · 13:45", xp: 25 },
    { title: "Mengenal Ekspresi", date: "21/01/2026 · 16:30", xp: 10 },
  ];

  const getRoutePath = (title: string) => {
    if (title === "Cerita Interaktif") return "Interaktif";
    if (title === "Memahami Emosi") return "Emosi";
    if (title === "Mengenal Ekspresi") return "Ekspresi";
    if (title === "Simulasi Percakapan") return "SimulasiPercakapan";
    return "Interaktif";
  };

  return (
    <div className="w-full max-w-[1740px] mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start relative">
        {/* Right Sidebar Component */}
        <Badge showMisi={true} />

        {/* Main Content */}
        <div className="flex-1 w-full order-2 xl:order-1 min-w-0">
          <div className="flex justify-between items-center mb-6 lg:mb-8">
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900">
              Riwayat Latihan
            </h1>
          </div>

          {/* Training History List */}
          <div className="bg-white border border-gray-200 rounded-[24px] flex flex-col shadow-sm mb-10">
            {riwayatLatihan.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 gap-6 ${
                  idx !== riwayatLatihan.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-6 flex-1 w-full">
                  <div className="w-[52px] h-[52px] rounded-xl bg-[#e6fbf2] flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/icon/IconList.svg"
                      alt="Icon"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 w-full">
                    <div>
                      <p className="text-base font-medium text-gray-400 mb-1">
                        Latihan
                      </p>
                      <p className="text-sm md:text-sm lg:text-xl font-semibold text-gray-900 leading-snug">
                        {item.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-400 mb-1">
                        Tanggal
                      </p>
                      <p className="text-sm md:text-sm lg:text-xl font-medium text-gray-900 leading-snug">
                        {item.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-400 mb-1">
                        Total XP
                      </p>
                      <p className="text-sm md:text-sm lg:text-xl font-semibold text-gray-900 leading-snug">
                        {item.xp}
                      </p>
                    </div>
                  </div>
                </div>
                <Link href={`/latihan/${getRoutePath(item.title)}?review=true`}>
                  <button className="text-sm md:text-sm lg:text-xl px-8 py-3 w-full lg:w-auto bg-[#2cb46c] text-white font-bold rounded-xl hover:bg-[#259b5c] transition-colors whitespace-nowrap">
                    Lihat
                  </button>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
