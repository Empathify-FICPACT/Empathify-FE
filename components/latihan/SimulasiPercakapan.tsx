"use client";

import Image from "next/image";
import { useState } from "react";
import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./header";

export default function SimulasiPercakapan() {
  const [isStarted, setIsStarted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">
      {/* Impor header dengan penyesuaian teks berdasarkan state */}
      <Header 
        buttonText={isStarted ? "Akhiri" : "Kembali"} 
        onButtonClick={isStarted ? () => setShowPopup(true) : undefined} 
      />

      <main 
        className="relative w-full flex-1 flex flex-col items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/background/BgLatihan.svg')",
        }}
      >
        <div className="z-10 flex flex-col items-center max-w-xl mx-auto -mt-10 md:-mt-20 w-full">
          {/* Character Image */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-6">
            <Image
              src="/pinguin/CaptainPingo.svg"
              alt="Captain Pingo"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {!isStarted ? (
            // STATE 1: Intro (Belum Mulai)
            <>
              <div className="text-center px-4 mb-8">
                <h1 className="text-[20px] sm:text-[22px] md:text-[26px] font-bold text-gray-900 mb-2">
                  Hai, Aku Captain Pingo!
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium max-w-[260px] sm:max-w-[340px] md:max-w-md mx-auto">
                  Yuk kita ngobrol dan belajar bareng dengan cara yang seru!
                </p>
              </div>

              <button 
                onClick={() => setIsStarted(true)}
                className="bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 text-white font-bold py-3 md:py-3.5 px-10 md:px-12 rounded-full border-[3px] border-yellow-100 shadow-sm hover:shadow-md transition-all text-sm md:text-base mr-2"
              >
                Mulai Sekarang!
              </button>
            </>
          ) : (
            // STATE 2 & 3: Sedang SimulasiPercakapan
            <>
              {/* Text Content */}
              <div className="text-center px-4 mb-10 h-10 flex items-center justify-center">
                <h1 className="text-[16px] sm:text-[18px] md:text-[20px] font-bold text-gray-900 transition-all duration-300">
                  {isListening ? "Mendengarkan ..." : "Hari ini kamu sudah melakukan apa saja?"}
                </h1>
              </div>

              {/* Action Button (Mic) */}
              <button 
                onClick={() => setIsListening(!isListening)}
                className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 shadow-md active:scale-95 ${
                  isListening ? "bg-[#e5a900]" : "bg-[#ffc107] hover:bg-[#ffb300]"
                }`}
              >
                {isListening && (
                  <span className="absolute w-full h-full rounded-full border-4 border-[#ffc107] opacity-60 animate-ping" />
                )}
                <Mic className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </button>
            </>
          )}
        </div>
      </main>

      {/* Popup Konfirmasi Akhiri */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md flex flex-col items-center shadow-xl animate-in fade-in zoom-in duration-200">
            {/* Image Pinguin End */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-2">
              <Image
                src="/pinguin/PinguinEnd.svg"
                alt="Istirahat Pingo"
                fill
                className="object-contain"
              />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Mau istirahat dulu?</h3>
            <p className="text-sm sm:text-base text-gray-500 text-center mb-8 px-2 leading-relaxed">
              Kamu bisa kembali ngobrol dengan Captain Pingo kapan saja.
            </p>

            <div className="flex w-full gap-3 sm:gap-4">
              <button 
                onClick={() => {
                  setIsStarted(false);
                  setIsListening(false);
                  setShowPopup(false);
                }}
                className="flex-1 bg-[#eafff2] text-[#2cb46c] hover:bg-[#d5fce4] font-extrabold py-3 sm:py-3.5 rounded-2xl transition-colors text-sm sm:text-base"
              >
                Keluar
              </button>
              <button 
                onClick={() => setShowPopup(false)}
                className="flex-1 bg-[#2cb46c] hover:bg-[#259b5d] text-white font-extrabold py-3 sm:py-3.5 rounded-2xl shadow-sm transition-colors text-sm sm:text-base"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
