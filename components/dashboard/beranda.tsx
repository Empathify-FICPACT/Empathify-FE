import Badge from "./badge";
import Image from "next/image";
import Link from "next/link";

export default function Beranda() {
  const barHeights = [55, 75, 45, 100, 90, 85, 45];
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const latihanHariIni = [
    { title: "Cerita Interaktif", time: "3 Latihan" },
    { title: "Memahami Emosi", time: "6 Latihan" },
    { title: "Simulasi Percakapan", time: "15 Menit" },
  ];

  const riwayatLatihan = [
    { title: "Cerita Interaktif", date: "30/01/2026 · 08:33", xp: 20 },
    { title: "Memahami Emosi", date: "29/01/2026 · 11:59", xp: 15 },
    { title: "Mengenal Ekspresi", date: "28/01/2026 · 12:14", xp: 10 },
    { title: "Mengenal Ekspresi", date: "28/01/2026 · 12:14", xp: 10 },
  ];

  return (
    <div className="w-full max-w-[1740px] mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start relative">
        {/* Right Sidebar Component */}
        <Badge showMisi={true} />

        {/* Main Content */}
        <div className="flex-1 w-full order-2 xl:order-1 min-w-0">
          <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1">
            Halo, Febrian Faiq
          </h2>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Selamat Pagi!
          </h1>

          {/* Yellow Banner */}
          <div className="bg-[#FFF9E6] rounded-[20px] p-4 lg:px-7 py-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm border border-[#fef0b3]">
            <p className="text-base lg:text-[22px] font-medium text-black">
              Sudahkah kamu latihan hari ini? Pingo menunggu kamu
            </p>
            {/* <p className="text-base lg:text-2xl font-medium text-black">
              Sudahkah kamu latihan hari ini? Pingo menunggu kamu
            </p> */}
            <Link href="/dashboard/latihan">
          <button className="bg-[#ffc107] hover:bg-[#ffb300] text-white font-bold  mx-auto block md:mx-0 py-1 md:py-2 px-8 md:px-12  rounded-full border-[5px] border-[#FFDE00] shadow-md hover:shadow-lg transition-all text-base md:text-lg lg:text-lg">
            Yuk Latihan !
          </button>
        </Link>
          </div>
  
          <h2 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-4">    
            Progress Kamu
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Chart Card */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 lg:p-8 flex-1 shadow-sm flex flex-col justify-end">
              <div className="flex items-end justify-between h-[160px] mb-4 gap-2 lg:gap-4 px-2">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center flex-1 group"
                  >
                    <div
                      className="w-full max-w-[28px] bg-[#2cb46c] rounded-full"
                      style={{
                        height: `${h}%`,
                        minHeight: h > 0 ? "28px" : "0",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center px-1">
                {days.map((d, i) => (
                  <span
                    key={i}
                    className="text-[14px] font-bold text-gray-500 text-center flex-1"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Today's Training Card */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 lg:p-8 flex-1 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-500 mb-6">
                Latihan Hari Ini
              </h3>
              <div className="flex flex-col gap-6">
                {latihanHariIni.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#e6fbf2] flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/icon/IconList.svg"
                          alt="Latihan"
                          width={24}
                          height={24}
                        />
                      </div>
                      <span className="text-sm md:text-sm lg:text-xl font-semibold text-gray-900">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-sm md:text-sm lg:text-lg font-medium text-gray-400">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Training History Header */}
          <div className="flex justify-between items-center mb-4 mt-8">
            <h2 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900">
              Riwayat Latihan
            </h2>
            <button className="text-base md:text-base lg:text-lg pr-6 font-semibold text-gray-900 hover:text-[#2cb46c] transition-colors">
              Lihat Semua
            </button>
          </div>

          {/* Training History List */}
          <div className="bg-white border border-gray-200 rounded-[24px] flex flex-col shadow-sm">
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
                <button className="text-sm md:text-sm lg:text-xl px-8 py-3 w-full lg:w-auto bg-[#2cb46c] text-white font-bold rounded-xl hover:bg-[#259b5c] transition-colors whitespace-nowrap">
                  Lihat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
