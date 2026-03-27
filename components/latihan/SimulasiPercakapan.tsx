"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Mic, Square } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./header";
import { apiFetch } from "@/utils/api";
import { appendTrainingHistory } from "@/utils/training-history";
import { showErrorMessage } from "@/utils/error-message";

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: string;
}

export default function SimulasiPercakapan() {
  const [isStarted, setIsStarted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // States untuk API & Data
  const [topics, setTopics] = useState<Topic[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>(
    "Sabar ya, Pingo sedang memikirkan kata-kata...",
  );
  const [isInitializing, setIsInitializing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Refs untuk audio recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const router = useRouter();

  // Ambil topik saat pertama load
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await apiFetch("/api/v1/conversation/topics/");
        const data = await res.json();
        if (data.meta?.success && data.data) {
          setTopics(data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil topik:", error);
      }
    };
    fetchTopics();
  }, []);

  const handleStart = async () => {
    if (topics.length === 0) {
      showErrorMessage("Topik belum dimuat, harap tunggu sebentar.");
      return;
    }

    setIsInitializing(true);
    // Pilih topik acak
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    try {
      const res = await apiFetch("/api/v1/conversation/sessions/", {
        method: "POST",
        body: JSON.stringify({ topic_id: randomTopic.id }),
      });
      const data = await res.json();

      if (data.meta?.success) {
        setSessionId(data.data.id);
        setCurrentMessage(data.data.opening_message.content);
        setIsStarted(true);
      } else {
        showErrorMessage("Gagal memulai sesi percakapan.");
      }
    } catch (error) {
      console.error("Error start session:", error);
      showErrorMessage("Terjadi kesalahan sistem saat memulai.");
    } finally {
      setIsInitializing(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Stream dimatikan agar tidak makan resource
        stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioFile = new File([audioBlob], "audio.webm", {
          type: "audio/webm",
        });

        const formData = new FormData();
        formData.append("audio", audioFile);

        setIsGenerating(true);
        setCurrentMessage(
          "Pingo sedang mendengarkan dan memikirkan jawaban...",
        );

        try {
          const res = await apiFetch(
            `/api/v1/conversation/sessions/${sessionId}/messages`,
            {
              method: "POST",
              body: formData,
            },
          );
          const data = await res.json();

          if (data.meta?.success && data.data?.ai_message) {
            setCurrentMessage(data.data.ai_message.content);
          } else {
            setCurrentMessage("Maaf, Pingo kurang paham. Bisa diulangi?");
          }
        } catch (err) {
          console.error("Error upload audio:", err);
          setCurrentMessage("Maaf, koneksi ke Pingo terputus.");
        } finally {
          setIsGenerating(false);
        }
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (error) {
      console.error("Microphone error:", error);
      showErrorMessage(
        "Tidak dapat mengakses mikrofon. Pastikan Anda telah memberikan izin.",
      );
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const handleMicClick = () => {
    if (isGenerating) return; // Jangan biarkan record saat AI masih proses

    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleAkhiri = async () => {
    if (!sessionId) {
      router.push("/dashboard/beranda");
      return;
    }

    try {
      const res = await apiFetch(
        `/api/v1/conversation/sessions/${sessionId}/complete`,
        {
          method: "PATCH",
        },
      );

      let xpEarned = 0;
      let isSuccess = res.ok;
      try {
        const data = await res.json();
        xpEarned = data?.data?.xp_earned ?? 0;
        if (typeof data?.meta?.success === "boolean") {
          isSuccess = data.meta.success;
        }
      } catch {
        xpEarned = 0;
      }

      if (isSuccess) {
        appendTrainingHistory({
          title: "Simulasi Percakapan",
          xp: xpEarned,
        });
      }

      router.push("/dashboard/beranda");
    } catch (err) {
      console.error("Gagal mengakhiri sesi:", err);
      router.push("/dashboard/beranda");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">
      <Header
        buttonText={isStarted ? "Akhiri" : "Kembali"}
        onButtonClick={isStarted ? () => setShowPopup(true) : undefined}
      />

      <main
        className="relative w-full flex-1 flex flex-col items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background/BgLatihan.svg')" }}
      >
        <div className="z-10 flex flex-col items-center max-w-2xl mx-auto -mt-10 md:-mt-20 w-full">
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
                onClick={handleStart}
                disabled={isInitializing}
                className={`bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 text-white font-bold py-3 md:py-3.5 px-10 md:px-12 rounded-full border-[3px] border-yellow-100 shadow-sm transition-all text-sm md:text-base mr-2 ${isInitializing ? "opacity-70 cursor-wait" : ""}`}
              >
                {isInitializing ? "Memuat..." : "Mulai Sekarang!"}
              </button>
            </>
          ) : (
            <>
              <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-5 md:p-6 mb-8 text-center shadow-sm w-full">
                <p className="text-[15px] sm:text-[16px] md:text-[18px] font-medium text-gray-800 leading-relaxed transition-all duration-300">
                  {isListening ? (
                    <span className="text-[#e5a900] animate-pulse">
                      Sedang mendengarkan... (Ketuk tombol stop jika sudah)
                    </span>
                  ) : (
                    currentMessage
                  )}
                </p>
              </div>

              <button
                onClick={handleMicClick}
                disabled={isGenerating}
                className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 shadow-md ${
                  isGenerating
                    ? "bg-gray-300 cursor-not-allowed"
                    : isListening
                      ? "bg-[#EF4444] hover:bg-red-600 active:scale-95"
                      : "bg-[#ffc107] hover:bg-[#ffb300] active:scale-95"
                }`}
              >
                {isListening ? (
                  <>
                    <span className="absolute w-full h-full rounded-full border-4 border-[#EF4444] opacity-50 animate-ping" />
                    <Square className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
                  </>
                ) : (
                  <Mic className="w-8 h-8 md:w-10 md:h-10 text-white" />
                )}
              </button>
            </>
          )}
        </div>
      </main>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md flex flex-col items-center shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-2">
              <Image
                src="/pinguin/PinguinEnd.svg"
                alt="Istirahat Pingo"
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Mau istirahat dulu?
            </h3>
            <p className="text-sm sm:text-base text-gray-500 text-center mb-8 px-2 leading-relaxed">
              Percakapan kamu akan diselesaikan dan progres akan disimpan.
            </p>

            <div className="flex w-full gap-3 sm:gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 bg-[#eafff2] text-[#2cb46c] hover:bg-[#d5fce4] font-extrabold py-3 sm:py-3.5 rounded-2xl transition-colors text-sm sm:text-base"
              >
                Kembali
              </button>
              <button
                onClick={handleAkhiri}
                className="flex-1 bg-[#2cb46c] hover:bg-[#259b5d] text-white font-extrabold py-3 sm:py-3.5 rounded-2xl shadow-sm transition-colors text-sm sm:text-base"
              >
                Akhiri Sesi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
