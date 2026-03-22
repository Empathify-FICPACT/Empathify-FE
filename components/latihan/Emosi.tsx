"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./header";

export default function Emosi() {
  // State: 'intro' | 'question' | 'result'
  const [step, setStep] = useState<'intro' | 'question' | 'result'>('intro');
  
  // State untuk question
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('review') === 'true') {
        setStep('question');
        setSelectedOption('D');
        setIsSubmitted(true);
        setIsReviewMode(true);
      }
    }
  }, []);

  // Mock data untuk template
  const questionData = {
    story: "Dika tidak dipilih dalam tim padahal sudah berlatih keras",
    questionText: "Apa yang Dika rasakan?",
    options: [
      { id: "A", text: "Bangga", icon: "/icon/Bangga.svg" },
      { id: "B", text: "Marah", icon: "/icon/Marah.svg" },
      { id: "C", text: "Senang", icon: "/icon/Senang.svg" },
      { id: "D", text: "Kecewa", icon: "/icon/Kecewa.svg" }
    ],
    correctOption: "D"
  };

  const handleStart = () => {
    setStep('question');
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setStep('result');
  };

  // --- RENDERS ---

  if (step === 'intro') {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9fafb]">
        <Header buttonText="Kembali" />
        <main 
          className="relative w-full flex-1 flex flex-col items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background/BgLatihan.svg')" }}
        >
          <div className="z-10 flex flex-col items-center max-w-xl mx-auto -mt-10 md:-mt-20 w-full">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-6">
              <Image src="/pinguin/CaptainPingo.svg" alt="Captain Pingo" fill className="object-contain object-bottom" priority />
            </div>

            <div className="text-center px-4 mb-8">
              <h1 className="text-[20px] sm:text-[22px] md:text-[26px] font-bold text-gray-900 mb-2">
                Pahami Perasaannya!
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium mb-6">
                Baca situasi, lalu pilih perasaan yang tepat.
              </p>

              <div className="text-left w-max mx-auto px-2">
                <h2 className="font-bold text-gray-800 text-xs sm:text-sm md:text-base mb-2">
                  Cara bermain:
                </h2>
                <ul className="list-disc pl-6 text-gray-400 font-medium text-xs sm:text-sm md:text-base space-y-1.5">
                  <li>Baca kondisi yang ditampilkan</li>
                  <li>Pikirkan perasaannya</li>
                  <li>Pilih jawaban yang paling sesuai</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={handleStart}
              className="bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 text-white font-bold py-3 md:py-4 px-10 md:px-14 rounded-full border-[3px] border-yellow-100 shadow-sm transition-all text-sm md:text-lg"
            >
              Mulai Sekarang!
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'question') {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9fafb]">
        <Header buttonText={isReviewMode ? "Kembali" : "Akhiri"} onButtonClick={() => { if (isReviewMode) { setIsReviewMode(false); setStep('result'); } else { setShowExitPopup(true); } }} />

        <main 
          className="relative w-full flex-1 flex flex-col items-center px-4 pt-10 pb-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background/BgLatihan.svg')" }}
        >
          <div className="w-full max-w-5xl mx-auto z-10 flex flex-col mt-4 md:mt-6">
            
            {/* Progress Bar & Back Arrow */}
            <div className="flex items-center gap-4 mb-8 md:mb-12 w-full">
              <button 
                onClick={() => setShowExitPopup(true)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Kembali"
              >
                <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <div className="flex-1 h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#2cb46c] w-[20%] rounded-full"></div>
              </div>
            </div>

            {/* Question Text without card */}
            <div className="w-full text-center px-4 mb-8 md:mb-12">
              <h3 className="text-gray-900 font-extrabold text-lg md:text-xl lg:text-2xl mb-1.5">
                {questionData.story}
              </h3>
              <p className="text-gray-400 font-medium text-sm md:text-base">
                {questionData.questionText}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl mx-auto px-2">
              {questionData.options.map((opt) => {
                const effectivelySubmitted = isSubmitted || isReviewMode;
                const isSelected = selectedOption === opt.id;
                const isCorrect = effectivelySubmitted && opt.id === questionData.correctOption;
                const isIncorrect = effectivelySubmitted && isSelected && opt.id !== questionData.correctOption;
                
                let buttonClass = "bg-white border-[3px] border-transparent text-gray-900 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-[#2cb46c] hover:bg-[#eafff2]";

                if (effectivelySubmitted) {
                  if (isCorrect) {
                    buttonClass = "bg-[#2cb46c] border-[3px] border-[#2cb46c] text-white shadow-md";
                  } else if (isIncorrect) {
                    buttonClass = "bg-[#EF4444] border-[3px] border-[#EF4444] text-white shadow-md";
                  } else {
                    buttonClass = "bg-white border-[3px] border-transparent text-gray-400 opacity-50 shadow-sm";
                  }
                } else if (isSelected) {
                  buttonClass = "bg-[#eafff2] border-[3px] border-[#2cb46c] text-[#2cb46c] shadow-md";
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => !isSubmitted && !isReviewMode && setSelectedOption(opt.id)}
                    className={`flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 rounded-[20px] md:rounded-[32px] transition-all duration-200 aspect-[4/5] ${buttonClass} ${!effectivelySubmitted && "cursor-pointer hover:-translate-y-1"}`}
                    disabled={effectivelySubmitted}
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 mb-4 md:mb-6 transition-transform duration-200 transform hover:scale-105">
                      <Image src={opt.icon} alt={opt.text} fill className="object-contain" priority />
                    </div>
                    <span className="text-base sm:text-lg md:text-xl font-bold">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-auto pt-10 md:pt-16 w-full mb-10 max-w-5xl mx-auto">
              {!isReviewMode && (
                <button 
                  onClick={handleNext}
                  disabled={isSubmitted}
                  className={`text-gray-400 font-bold hover:text-gray-600 text-sm md:text-lg transition-colors px-2 ${isSubmitted && "opacity-50 cursor-not-allowed"}`}
                >
                  Lewati
                </button>
              )}
              
              {!isSubmitted && !isReviewMode ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className={`px-10 md:px-14 py-3 md:py-4 rounded-2xl font-bold transition-all text-sm md:text-base ${
                    selectedOption 
                      ? "bg-[#2cb46c] text-white hover:bg-[#259b5d] shadow-sm -translate-y-0.5 active:translate-y-0" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Kirim
                </button>
              ) : isReviewMode ? (
                <button
                  onClick={() => {
                    setStep('result');
                    setIsReviewMode(false);
                  }}
                  className="ml-auto px-10 md:px-14 py-3 md:py-4 rounded-2xl font-bold transition-all text-sm md:text-base bg-[#2cb46c] text-white hover:bg-[#259b5d] shadow-sm -translate-y-0.5 active:translate-y-0 animate-in fade-in zoom-in"
                >
                  Kembali ke Hasil
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="ml-auto px-10 md:px-14 py-3 md:py-4 rounded-2xl font-bold transition-all text-sm md:text-base bg-[#2cb46c] text-white hover:bg-[#259b5d] shadow-sm -translate-y-0.5 active:translate-y-0 animate-in fade-in zoom-in"
                >
                  Selanjutnya
                </button>
              )}
            </div>

          </div>
        </main>

        {/* Exit Popup */}
        {showExitPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md flex flex-col items-center shadow-xl animate-in fade-in zoom-in duration-200">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-2">
                <Image src="/pinguin/PinguinSedih.svg" alt="Sedih Pingo" fill className="object-contain" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Yakin ingin keluar?</h3>
              <p className="text-sm sm:text-base text-gray-500 text-center mb-8 px-2 leading-relaxed">
                Progress kamu belum tersimpan. Latihanmu sekarang akan terhapus jika kamu keluar.
              </p>
              <div className="flex w-full gap-3 sm:gap-4">
                <button 
                  onClick={() => {
                    setShowExitPopup(false);
                    setStep('intro');
                    setSelectedOption(null);
                    setIsSubmitted(false);
                  }}
                  className="flex-1 bg-[#eafff2] text-[#2cb46c] hover:bg-[#d5fce4] font-extrabold py-3 sm:py-3.5 rounded-2xl transition-colors text-sm sm:text-base"
                >
                  Keluar
                </button>
                <button 
                  onClick={() => setShowExitPopup(false)}
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

  // step === 'result'
  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">
      {/* HEADER JUGA DI TAMPILKAN DI RESULT */}
      <Header buttonText="Kembali" onButtonClick={() => {
        setStep('intro');
        setSelectedOption(null);
        setIsSubmitted(false);
      }} />

      <main 
        className="relative w-full flex-1 flex flex-col px-4 pt-4 pb-12 md:pt-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background/BgLatihan.svg')" }}
      >
        {/* TANPA CARD TAMBAHAN */}
        <div className="z-10 flex flex-col items-center max-w-6xl mx-auto w-full mt-2 md:mt-4 lg:mt-6">
          
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-8 md:mb-12">
            {/* Pinguin */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 mb-4 md:mb-6">
              <Image src="/pinguin/PinguinAmaze.svg" alt="Pingo Bangga" fill className="object-contain object-bottom" priority />
            </div>

            {/* Judul & Teks */}
            <h1 className="text-[24px] sm:text-[28px] md:text-[34px] font-extrabold text-gray-900 mb-2 md:mb-3 text-center">
              Latihan Kamu Selesai!
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 font-medium mb-8 md:mb-12 text-center max-w-xl">
              Pingo bangga sama kamu, sampai jumpa di latihan berikutnya!
            </p>

            {/* Stats Cards */}
            <div className="flex flex-col sm:flex-row gap-5 md:gap-6 w-full justify-center px-4">
              <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-[20px] p-5 md:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex-1 max-w-[280px]">
                <div className="bg-[#fff8e1] p-2 md:p-3 rounded-full flex shrink-0 border border-yellow-100">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#ffc107] shadow-sm flex items-center justify-center text-white font-black text-sm md:text-base">P</div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm font-semibold mb-1">Pingo Coin</p>
                  <p className="text-gray-900 font-black text-xl sm:text-2xl leading-none">15 Coin</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-[20px] p-5 md:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex-1 max-w-[280px]">
                <div className="shrink-0">
                  <Zap className="w-12 h-12 md:w-14 md:h-14 text-[#ffc107] fill-[#ffc107]" strokeWidth={1} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm font-semibold mb-1">Akurasi</p>
                  <p className="text-gray-900 font-black text-xl sm:text-2xl leading-none">75%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions spread out: "Lihat Jawaban" di kiri, "Selesai" di kanan. */}
          <div className="w-full flex justify-between items-center px-4 md:px-10 mt-2 md:mt-4">
            <button 
              onClick={() => {
                setStep('question');
                setIsReviewMode(true);
              }}
              className="text-[#2cb46c] bg-[#eafff2] hover:bg-[#d5fce4] font-extrabold py-3.5 sm:py-4 px-6 sm:px-10 md:px-14 rounded-2xl transition-colors text-sm sm:text-base md:text-lg shadow-sm w-auto"
            >
              Lihat Jawaban
            </button>
            <button 
              onClick={() => {
                setStep('intro');
                setSelectedOption(null);
                setIsSubmitted(false);
              }}
              className="bg-[#2cb46c] text-white hover:bg-[#259b5d] font-extrabold py-3.5 sm:py-4 px-8 sm:px-12 md:px-16 rounded-2xl transition-colors text-sm sm:text-base md:text-lg shadow-sm w-auto -translate-y-0.5 active:translate-y-0"
            >
              Selesai
            </button>
          </div>
          
        </div>
      </main>
    </div>
  );
}
