"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, Camera, RefreshCcw, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./header";

export default function Ekspresi() {
  // State: 'intro' | 'observe' | 'camera' | 'review' | 'analysis' | 'result'
  const [step, setStep] = useState<'intro' | 'observe' | 'camera' | 'review' | 'analysis' | 'result'>('intro');
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('review') === 'true') {
        setStep('analysis');
        setIsReviewMode(true);
      }
    }
  }, []);

  const handleNext = (nextStep: any) => {
    setStep(nextStep);
  };

  const getProgressWidth = () => {
    switch(step) {
      case 'observe': return '20%';
      case 'camera': return '40%';
      case 'review': return '60%';
      case 'analysis': return '80%';
      default: return '0%';
    }
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
                Ayo Tirukan Ekspresi!
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium mb-6">
                Lihat ekspresi wajah, lalu coba tirukan ya.
              </p>

              <div className="text-left w-max mx-auto px-2">
                <h2 className="font-bold text-gray-800 text-xs sm:text-sm md:text-base mb-2">
                  Cara bermain:
                </h2>
                <ul className="list-disc pl-6 text-gray-400 font-medium text-xs sm:text-sm md:text-base space-y-1.5">
                  <li>Perhatikan ekspresi yang ditampilkan</li>
                  <li>Tirukan ekspresi tersebut</li>
                  <li>Ambil foto untuk melihat hasilnya</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => handleNext('observe')}
              className="bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 text-white font-bold py-3 md:py-4 px-10 md:px-14 rounded-full border-[3px] border-yellow-100 shadow-sm transition-all text-sm md:text-lg"
            >
              Mulai Sekarang!
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9fafb]">
        {/* HARUS ADA HEADER JUGA */}
        <Header buttonText="Kembali" onButtonClick={() => setStep('intro')} />

        <main 
          className="relative w-full flex-1 flex flex-col px-4 pt-4 pb-12 md:pt-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background/BgLatihan.svg')" }}
        >
          {/* TANPA CARD TAMBAHAN */}
          <div className="z-10 flex flex-col items-center max-w-5xl mx-auto w-full mt-2 md:mt-4 lg:mt-6">
            
            <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-8 md:mb-12">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 mb-4 md:mb-6">
                <Image src="/pinguin/PinguinAmaze.svg" alt="Pingo Bangga" fill className="object-contain object-bottom" priority />
              </div>

              <h1 className="text-[24px] sm:text-[28px] md:text-[34px] font-extrabold text-gray-900 mb-2 md:mb-3 text-center">
                Latihan Kamu Selesai!
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-500 font-medium mb-8 md:mb-12 text-center max-w-xl">
                Pingo bangga sama kamu, sampai jumpa di latihan berikutnya!
              </p>

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

            <div className="w-full flex justify-between items-center px-4 md:px-10 mt-2 md:mt-4">
              <button 
                onClick={() => {
                  setStep('analysis');
                  setIsReviewMode(true);
                }}
                className="text-[#2cb46c] bg-[#eafff2] hover:bg-[#d5fce4] font-extrabold py-3.5 sm:py-4 px-6 sm:px-10 md:px-14 rounded-2xl transition-colors text-sm sm:text-base md:text-lg shadow-sm w-auto"
              >
                Lihat Jawaban
              </button>
              <button 
                onClick={() => {
                  setStep('intro');
                  setIsReviewMode(false);
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

  // Common steps: observe, camera, review, analysis
  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">
      {/* HEADER JUGA DISINI SAMA SEPERTI SIMULASI PERCAKAPAN */}
      <Header buttonText={isReviewMode ? "Kembali" : "Akhiri"} onButtonClick={() => { if (isReviewMode) { setIsReviewMode(false); setStep('result'); } else { setShowExitPopup(true); } }} />

      <main 
        className="relative w-full flex-1 flex flex-col items-center px-4 pt-10 pb-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background/BgLatihan.svg')" }}
      >
        <div className="w-full max-w-5xl mx-auto z-10 flex flex-col mt-4 md:mt-6">
          
          <div className="flex items-center gap-4 mb-6 md:mb-8 w-full">
            <button 
              onClick={() => setShowExitPopup(true)} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <div className="flex-1 h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#2cb46c] rounded-full transition-all duration-300" style={{ width: getProgressWidth() }}></div>
            </div>
          </div>

          {step === 'observe' && (
            <div className="flex flex-col flex-1 pb-4">
              <h3 className="text-gray-600 font-medium text-sm md:text-base mb-4 md:mb-5 text-center">
                Perhatikan ekspresi di bawah ini, lalu tirukan menggunakan kamera
              </h3>

              <div className="w-full max-w-2xl mx-auto bg-gray-100 rounded-[20px] md:rounded-[24px] overflow-hidden mb-6 aspect-video flex items-center justify-center relative shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-blue-50/50">
                  <span className="text-gray-400 font-medium italic text-center">
                    [ Gambar Referensi Wanita Mockup ]
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-8 w-full max-w-2xl mx-auto mb-8">
                <h4 className="text-[#2cb46c] font-bold text-lg md:text-xl mb-2">Lelah</h4>
                <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                  Kondisi ketika seseorang merasa capek setelah melakukan aktivitas. Biasanya wajah terlihat lesu dan tubuh terasa kurang bertenaga.
                </p>
              </div>

              <div className="flex justify-between items-center w-full max-w-2xl mx-auto mt-6 md:mt-8 pt-4">
                <button 
                  onClick={() => handleNext('camera')}
                  className="flex items-center gap-2 bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-2xl shadow-sm transition-all text-sm md:text-base -translate-y-0.5 active:translate-y-0"
                >
                  <Camera className="w-5 h-5 md:w-6 md:h-6" />
                  Ambil Gambar
                </button>
                <button disabled className="bg-gray-300 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-2xl cursor-not-allowed text-sm md:text-base shadow-sm">
                  Kirim
                </button>
              </div>
            </div>
          )}

          {step === 'camera' && (
            <div className="flex flex-col flex-1 pb-4">
              <h3 className="text-gray-600 font-medium text-sm md:text-base mb-4 md:mb-5 text-center">
                Pastikan wajah Anda terlihat dengan jelas
              </h3>

              <div className="w-full max-w-2xl mx-auto bg-gray-50 rounded-[20px] md:rounded-[24px] overflow-hidden mb-8 aspect-video flex items-center justify-center relative shadow-sm border border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <span className="text-gray-400 font-medium italic text-center">
                    [ Tampilan Kamera Aktif Mockup ]
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center w-full max-w-2xl mx-auto mt-6 md:mt-8 pt-4">
                <button 
                  onClick={() => handleNext('review')}
                  className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 rounded-full shadow-md transition-all border-4 border-yellow-200"
                >
                  <Camera className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </button>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="flex flex-col flex-1 pb-4">
              <h3 className="text-gray-600 font-medium text-sm md:text-base mb-4 md:mb-5 text-center">
                Pastikan wajah Anda terlihat dengan jelas
              </h3>

              <div className="w-full max-w-2xl mx-auto bg-gray-100 rounded-[20px] md:rounded-[24px] overflow-hidden mb-8 aspect-video flex items-center justify-center relative shadow-sm border border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-blue-50/50">
                  <span className="text-gray-400 font-medium italic text-center">
                    [ Hasil Jepretan Kamera Mockup ]
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center w-full max-w-2xl mx-auto mt-6 md:mt-8 pt-4">
                <button 
                  onClick={() => handleNext('camera')}
                  className="flex items-center gap-2 bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-2xl shadow-sm transition-all text-sm md:text-base -translate-y-0.5 active:translate-y-0"
                >
                  <RefreshCcw className="w-5 h-5 md:w-6 md:h-6" />
                  Ambil Ulang
                </button>
                <button 
                  onClick={() => handleNext('analysis')}
                  className="bg-[#2cb46c] hover:bg-[#259b5d] active:scale-95 text-white font-bold py-3 md:py-4 px-10 md:px-14 rounded-2xl shadow-sm transition-all text-sm md:text-base -translate-y-0.5 active:translate-y-0"
                >
                  Kirim
                </button>
              </div>
            </div>
          )}

          {step === 'analysis' && (
            <div className="flex flex-col flex-1 pb-4">
              <h3 className="text-gray-600 font-medium text-sm md:text-base mb-4 md:mb-5 text-center">
                Perhatikan ekspresi di bawah ini, lalu tirukan menggunakan kamera
              </h3>

              <div className="w-full max-w-2xl mx-auto bg-gray-100 rounded-[20px] md:rounded-[24px] overflow-hidden mb-6 aspect-video flex items-center justify-center relative shadow-sm border border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-blue-50/50">
                  <span className="text-gray-400 font-medium italic text-center">
                    [ Hasil Jepretan Kamera Mockup ]
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-8 w-full max-w-2xl mx-auto mb-8">
                <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                  Hasil analisa blablablablabla
                </p>
              </div>

              <div className="flex flex-row-reverse items-center w-full max-w-2xl mx-auto mt-2 md:mt-4 pt-4">
                {isReviewMode ? (
                  <button 
                    onClick={() => {
                      setStep('result');
                      setIsReviewMode(false);
                    }}
                    className="bg-[#2cb46c] hover:bg-[#259b5d] active:scale-95 text-white font-bold py-3 md:py-4 px-10 md:px-14 rounded-2xl shadow-sm transition-all text-sm md:text-base -translate-y-0.5 active:translate-y-0"
                  >
                    Kembali ke Hasil
                  </button>
                ) : (
                  <button 
                    onClick={() => handleNext('result')}
                    className="bg-[#2cb46c] hover:bg-[#259b5d] active:scale-95 text-white font-bold py-3 md:py-4 px-10 md:px-14 rounded-2xl shadow-sm transition-all text-sm md:text-base -translate-y-0.5 active:translate-y-0"
                  >
                    Selanjutnya
                  </button>
                )}
              </div>
            </div>
          )}

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
