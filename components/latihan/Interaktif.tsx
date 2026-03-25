"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, Zap, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./header";
import { apiFetch } from "@/utils/api";

interface StoryScenario {
  id: string;
  situation: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  order: number;
}

interface AnswerResult {
  scenario_id: string;
  chosen_answer: string;
  correct_answer: string;
  is_correct: boolean;
  explanation: string;
}

export default function Interaktif() {
  const [step, setStep] = useState<'intro' | 'question' | 'result'>('intro');
  const [showExitPopup, setShowExitPopup] = useState(false);
  
  // API State
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<StoryScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionResult, setSessionResult] = useState<{ correct_count: number; total: number; xp_earned: number; total_xp: number } | null>(null);

  // Interaction State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentAnswerResult, setCurrentAnswerResult] = useState<AnswerResult | null>(null);
  
  // Review Mode Caching
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<Record<string, AnswerResult>>({});

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('review') === 'true') {
        // Fallback for direct URL
      }
    }
  }, []);

  const handleStartSession = async () => {
    setIsLoading(true);
    try {
      const res = await apiFetch("/api/v1/story/sessions", {
        method: "POST",
        body: JSON.stringify({ total_scenarios: 5 }),
      });
      const data = await res.json();
      if (data.meta?.success && data.data) {
        setSessionId(data.data.id);
        const sortedScenarios = data.data.scenarios.sort((a: any, b: any) => a.order - b.order);
        setScenarios(sortedScenarios);
        setCurrentIndex(0);
        setAnswersHistory({});
        setIsSubmitted(false);
        setSelectedOption(null);
        setCurrentAnswerResult(null);
        setStep('question');
      } else {
        alert("Gagal memulai sesi simulasi cerita.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem saat menghubungi server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedOption || !sessionId || scenarios.length === 0) return;
    
    setIsLoading(true);
    const currentScenario = scenarios[currentIndex];

    try {
      const res = await apiFetch(`/api/v1/story/sessions/${sessionId}/answers`, {
        method: "POST",
        body: JSON.stringify({
          scenario_id: currentScenario.id,
          chosen_answer: selectedOption
        }),
      });
      const data = await res.json();
      if (data.meta?.success && data.data) {
        setIsSubmitted(true);
        const result: AnswerResult = {
          scenario_id: data.data.scenario_id,
          chosen_answer: data.data.chosen_answer,
          correct_answer: data.data.correct_answer,
          is_correct: data.data.is_correct,
          explanation: data.data.explanation
        };
        setCurrentAnswerResult(result);
        
        // Cache result untuk review
        setAnswersHistory(prev => ({ ...prev, [currentScenario.id]: result }));
      } else {
        alert("Gagal mengirim jawaban.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan koneksi saat mengirim jawaban.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (isReviewMode) {
      if (currentIndex + 1 < scenarios.length) {
        setCurrentIndex(currentIndex + 1);
        prepareReviewState(currentIndex + 1);
      } else {
        // Selesai review
        setIsReviewMode(false);
        setStep('result');
      }
      return;
    }

    if (currentIndex + 1 < scenarios.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setCurrentAnswerResult(null);
    } else {
      // Complete Session
      setIsLoading(true);
      try {
        const res = await apiFetch(`/api/v1/story/sessions/${sessionId}/complete`, {
          method: "PATCH"
        });
        const data = await res.json();
        if (data.meta?.success && data.data) {
          setSessionResult(data.data);
          setStep("result");
        } else {
          setStep("result"); // Fallback
        }
      } catch (err) {
        console.error(err);
        setStep("result");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const startReviewMode = () => {
    setIsReviewMode(true);
    setStep('question');
    setCurrentIndex(0);
    prepareReviewState(0);
  };

  const prepareReviewState = (index: number) => {
    const sId = scenarios[index]?.id;
    if (sId && answersHistory[sId]) {
      const history = answersHistory[sId];
      setSelectedOption(history.chosen_answer);
      setCurrentAnswerResult(history);
      setIsSubmitted(true);
    } else {
      // Fallback
      setSelectedOption(null);
      setIsSubmitted(false);
      setCurrentAnswerResult(null);
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
                Yuk, Ikuti Ceritanya!
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium mb-6">
                Baca cerita dan pilih tindakan yang tepat bersosial dengan benar.
              </p>

              <div className="text-left w-max mx-auto px-2">
                <h2 className="font-bold text-gray-800 text-xs sm:text-sm md:text-base mb-2">
                  Cara bermain:
                </h2>
                <ul className="list-disc pl-6 text-gray-400 font-medium text-xs sm:text-sm md:text-base space-y-1.5">
                  <li>Baca cerita yang ditampilkan</li>
                  <li>Perhatikan situasinya</li>
                  <li>Pilih apa yang akan kamu lakukan</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={handleStartSession}
              disabled={isLoading}
              className={`bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 text-white font-bold py-3 md:py-4 px-10 md:px-14 rounded-full border-[3px] border-yellow-100 shadow-sm transition-all text-sm md:text-lg ${isLoading ? "opacity-70 cursor-wait" : ""}`}
            >
              {isLoading ? "Memuat..." : "Mulai Sekarang!"}
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'question' && scenarios.length > 0) {
    const currentScenario = scenarios[currentIndex];
    const progressPercentage = ((currentIndex + 1) / scenarios.length) * 100;

    const optionsMap = [
      { id: "a", text: currentScenario.option_a },
      { id: "b", text: currentScenario.option_b },
      { id: "c", text: currentScenario.option_c },
      { id: "d", text: currentScenario.option_d }
    ];

    return (
      <div className="flex flex-col min-h-screen bg-[#f9fafb]">
        <Header buttonText={isReviewMode ? "Selesai Review" : "Akhiri"} onButtonClick={() => { if (isReviewMode) { setIsReviewMode(false); setStep('result'); } else { setShowExitPopup(true); } }} />

        <main 
          className="relative w-full flex-1 flex flex-col items-center px-4 pt-10 pb-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background/BgLatihan.svg')" }}
        >
          <div className="w-full max-w-5xl mx-auto z-10 flex flex-col mt-4 md:mt-6">
            
            {/* Progress Bar & Back Arrow */}
            <div className="flex items-center gap-4 mb-6 md:mb-8 w-full">
              <button 
                onClick={() => { if (isReviewMode) { setIsReviewMode(false); setStep('result'); } else { setShowExitPopup(true); } }} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Kembali"
              >
                <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <div className="flex-1 h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#2cb46c] rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 md:p-10 mb-6 md:mb-8 w-full">
              <h3 className="text-[#2cb46c] font-bold text-sm md:text-lg tracking-wide mb-3 md:mb-4">
                {isReviewMode ? `Review Cerita ${currentIndex + 1}` : "Perhatikan cerita berikut!"}
              </h3>
              <p className="text-gray-800 font-medium text-base md:text-xl leading-relaxed">
                {currentScenario.situation}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full">
              {optionsMap.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrect = isSubmitted && currentAnswerResult?.correct_answer === opt.id;
                const isIncorrect = isSubmitted && isSelected && currentAnswerResult?.correct_answer !== opt.id;
                
                let buttonClass = "bg-white border-gray-200 text-gray-700 hover:border-[#2cb46c] hover:bg-[#eafff2]";
                let circleClass = "bg-[#eafff2] text-[#2cb46c]";

                if (isSubmitted) {
                  if (isCorrect) {
                    buttonClass = "bg-[#2cb46c] border-[#2cb46c] text-white shadow-md transform scale-[1.02] z-10";
                    circleClass = "bg-white text-[#2cb46c]";
                  } else if (isIncorrect) {
                    buttonClass = "bg-[#EF4444] border-[#EF4444] text-white";
                    circleClass = "bg-white text-[#EF4444]";
                  } else {
                    buttonClass = "bg-white border-gray-200 text-gray-400 opacity-60";
                    circleClass = "bg-gray-100 text-gray-400";
                  }
                } else if (isSelected) {
                  buttonClass = "bg-[#eafff2] border-[#2cb46c] text-[#2cb46c]";
                  circleClass = "bg-[#2cb46c] text-white";
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => !isSubmitted && !isReviewMode && setSelectedOption(opt.id)}
                    className={`flex items-center text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 ${buttonClass} ${!isSubmitted && "cursor-pointer"}`}
                    disabled={isSubmitted}
                  >
                    <div className={`shrink-0 uppercase flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-bold text-base md:text-lg mr-4 md:mr-6 transition-colors shadow-sm ${circleClass}`}>
                      {opt.id}
                    </div>
                    <span className="text-sm sm:text-base md:text-lg font-medium leading-snug">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* AI Explanation Box (Shows only after submission) */}
            {isSubmitted && currentAnswerResult && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full bg-[#eafff2] border-2 border-[#2cb46c] rounded-2xl p-6 flex flex-col sm:flex-row gap-4 sm:items-start text-[#1e8a51]">
                <div className="bg-white p-2 rounded-full shrink-0 flex items-center justify-center self-start">
                  <Info className="w-6 h-6 text-[#2cb46c]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg mb-2">Penjelasan Pingo:</h4>
                  <p className="text-sm sm:text-base font-medium leading-relaxed">
                    {currentAnswerResult.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-end mt-10 md:mt-12 w-full mb-10">              
              {!isSubmitted && !isReviewMode ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption || isLoading}
                  className={`px-10 md:px-14 py-3 md:py-4 rounded-2xl font-bold transition-all text-sm md:text-base ${
                    selectedOption && !isLoading
                      ? "bg-[#2cb46c] text-white hover:bg-[#259b5d] shadow-sm -translate-y-0.5 active:translate-y-0" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? "Mengirim..." : "Kirim"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="px-10 md:px-14 py-3 md:py-4 rounded-2xl font-bold transition-all text-sm md:text-base bg-[#2cb46c] text-white hover:bg-[#259b5d] shadow-sm -translate-y-0.5 active:translate-y-0 animate-in fade-in zoom-in"
                >
                  {isLoading ? "Memuat..." : (isReviewMode && currentIndex === scenarios.length - 1 ? "Selesai Review" : "Selanjutnya")}
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
      <Header buttonText="Kembali" onButtonClick={() => router.push('/dashboard/beranda')} />

      <main 
        className="relative w-full flex-1 flex flex-col px-4 pt-4 pb-12 md:pt-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background/BgLatihan.svg')" }}
      >
        <div className="z-10 flex flex-col items-center max-w-5xl mx-auto w-full mt-2 md:mt-4 lg:mt-6">
          
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 mb-4 md:mb-6">
              <Image src="/pinguin/PinguinAmaze.svg" alt="Pingo Bangga" fill className="object-contain object-bottom" priority />
            </div>

            <h1 className="text-[24px] sm:text-[28px] md:text-[34px] font-extrabold text-gray-900 mb-2 md:mb-3 text-center">
              Cerita Selesai!
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 font-medium mb-8 md:mb-12 text-center max-w-xl">
              Pingo suka caramu mengambil keputusan. Kamu makin peduli pada sekitar!
            </p>

            {/* Stats Cards */}
            <div className="flex flex-col sm:flex-row gap-5 md:gap-6 w-full justify-center px-4">
              <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-[20px] p-5 md:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex-1 max-w-[280px]">
                <div className="bg-[#fff8e1] p-2 md:p-3 rounded-full flex shrink-0 border border-yellow-100">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#ffc107] shadow-sm flex items-center justify-center text-white font-black text-sm md:text-base">P</div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm font-semibold mb-1">XP Diperoleh</p>
                  <p className="text-gray-900 font-black text-xl sm:text-2xl leading-none">+{sessionResult?.xp_earned || 0} XP</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-[20px] p-5 md:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex-1 max-w-[280px]">
                <div className="shrink-0">
                  <Zap className="w-12 h-12 md:w-14 md:h-14 text-[#ffc107] fill-[#ffc107]" strokeWidth={1} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm font-semibold mb-1">Skor Benar</p>
                  <p className="text-gray-900 font-black text-xl sm:text-2xl leading-none">{sessionResult?.correct_count || 0}/{sessionResult?.total || 5}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between items-center px-4 md:px-10 mt-2 md:mt-4">
            <button 
              onClick={startReviewMode}
              className="text-[#2cb46c] bg-[#eafff2] hover:bg-[#d5fce4] font-extrabold py-3.5 sm:py-4 px-6 sm:px-10 md:px-14 rounded-2xl transition-colors text-sm sm:text-base md:text-lg shadow-sm w-auto"
            >
              Lihat Jawaban
            </button>
            <button 
              onClick={() => router.push('/dashboard/beranda')}
              className="bg-[#2cb46c] text-white hover:bg-[#259b5d] font-extrabold py-3.5 sm:py-4 px-8 sm:px-12 md:px-16 rounded-2xl transition-colors text-sm sm:text-base md:text-lg shadow-sm w-auto -translate-y-0.5 active:translate-y-0"
            >
              Kembali ke Beranda
            </button>
          </div>
          
        </div>
      </main>
    </div>
  );
}
