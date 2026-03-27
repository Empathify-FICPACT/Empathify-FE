"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Camera, RefreshCcw, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./header";
import { apiFetch } from "@/utils/api";
import { appendTrainingHistory } from "@/utils/training-history";
import { showErrorMessage } from "@/utils/error-message";

interface ExpressionData {
  id: string;
  emotion: string;
  image_url: string;
  order: number;
}

export default function Ekspresi() {
  const [step, setStep] = useState<
    "intro" | "observe" | "camera" | "review" | "analysis" | "result"
  >("intro");
  const [showExitPopup, setShowExitPopup] = useState(false);

  // Mapping for emotion enum from backend
  const emotionTranslation: Record<string, string> = {
    happy: "Senang",
    angry: "Marah",
    sad: "Sedih",
    surprised: "Terkejut",
    disgusted: "Jijik",
    fear: "Takut",
    fearful: "Takut",
    neutral: "Biasa",
  };

  const translateEmotion = (emotion: string) => {
    return emotionTranslation[emotion.toLowerCase()] || emotion.toUpperCase();
  };

  const router = useRouter();

  // Integrasi API & Logic
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [expressions, setExpressions] = useState<ExpressionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  // Camera & Image logic
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null);

  // Hasil Analysis
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    score: number;
    message: string;
  } | null>(null);

  // Custom cleanup effect to make sure camera turns off when unmounting
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Ensure video element gets the stream when it mounts (step === 'camera')
  useEffect(() => {
    if (step === "camera" && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [step, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const getProgressWidth = () => {
    if (expressions.length === 0) return "0%";
    const baseProgress = (currentIndex / expressions.length) * 100;

    const stepProgress =
      step === "observe"
        ? 5
        : step === "camera"
          ? 10
          : step === "review"
            ? 15
            : step === "analysis"
              ? 20
              : 0;

    return `${Math.min(baseProgress + stepProgress, 100)}%`;
  };

  const handleStartSession = async () => {
    setIsLoading(true);
    try {
      const res = await apiFetch("/api/v1/expression/sessions", {
        method: "POST",
        body: JSON.stringify({ total_expressions: 3 }),
      });
      const data = await res.json();
      if (data.meta?.success && data.data) {
        setSessionId(data.data.id);
        const sortedExp = data.data.expressions.sort(
          (a: any, b: any) => a.order - b.order,
        );
        setExpressions(sortedExp);
        setCurrentIndex(0);
        setStep("observe");
      } else {
        showErrorMessage("Gagal memulai sesi latihan ekspresi.");
      }
    } catch (error) {
      console.error(error);
      showErrorMessage("Terjadi kesalahan sistem saat menghubungi server.");
    } finally {
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      setStep("camera");
    } catch (err) {
      console.error("Camera access denied:", err);
      showErrorMessage(
        "Gagal mengakses kamera. Mohon izinkan akses kamera pada browser Anda.",
      );
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCapturedBlob(blob);
            const url = URL.createObjectURL(blob);
            setCapturedUrl(url);
            stopCamera();
            setStep("review");
          }
        },
        "image/jpeg",
        0.9,
      );
    }
  };

  const retakePhoto = () => {
    if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    setCapturedBlob(null);
    setCapturedUrl(null);
    startCamera();
  };

  const retryPhotoAfterAnalysis = () => {
    setFeedback(null);
    retakePhoto();
  };

  const submitPhoto = async () => {
    if (!capturedBlob || !sessionId || expressions.length === 0) return;

    setStep("analysis");
    setIsLoading(true);
    setFeedback(null);

    const currentExpression = expressions[currentIndex];
    const formData = new FormData();
    formData.append("reference_id", currentExpression.id);
    formData.append(
      "photo",
      new File([capturedBlob], "attempt.jpg", { type: "image/jpeg" }),
    );

    try {
      const res = await apiFetch(
        `/api/v1/expression/sessions/${sessionId}/attempts`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();

      if (data.meta?.success && data.data) {
        setFeedback({
          isCorrect: data.data.is_correct,
          score: Math.round(data.data.similarity_score * 100),
          message: data.data.ai_feedback || "Ekspresi dianalisa dengan sukses.",
        });
      } else {
        setFeedback({
          isCorrect: false,
          score: 0,
          message: data.meta?.message || "Gagal menganalisa ekspresi.",
        });
      }
    } catch (err) {
      console.error(err);
      setFeedback({
        isCorrect: false,
        score: 0,
        message: "Terjadi gangguan jaringan saat menganalisa.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextAction = async () => {
    if (currentIndex + 1 < expressions.length) {
      setCurrentIndex(currentIndex + 1);
      if (capturedUrl) URL.revokeObjectURL(capturedUrl);
      setCapturedBlob(null);
      setCapturedUrl(null);
      setFeedback(null);
      setStep("observe");
    } else {
      setIsLoading(true);
      try {
        const res = await apiFetch(
          `/api/v1/expression/sessions/${sessionId}/complete`,
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
            title: "Mengenal Ekspresi",
            xp: xpEarned,
          });
        }

        setStep("result");
      } catch (err) {
        console.error(err);
        setStep("result");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (step === "intro") {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9fafb]">
        <Header buttonText="Kembali" />
        <main
          className="relative w-full flex-1 flex flex-col items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background/BgLatihan.svg')" }}
        >
          <div className="z-10 flex flex-col items-center max-w-xl mx-auto -mt-10 md:-mt-20 w-full">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-6">
              <Image
                src="/pinguin/CaptainPingo.svg"
                alt="Captain Pingo"
                fill
                className="object-contain object-bottom"
                priority
              />
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
                  <li>Tirukan ekspresi tersebut sebaik mungkin</li>
                  <li>Ambil foto untuk melihat hasilnya</li>
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

  if (step === "result") {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9fafb]">
        <Header
          buttonText="Kembali"
          onButtonClick={() => router.push("/dashboard/beranda")}
        />

        <main
          className="relative w-full flex-1 flex flex-col px-4 pt-4 pb-12 md:pt-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background/BgLatihan.svg')" }}
        >
          <div className="z-10 flex flex-col items-center max-w-5xl mx-auto w-full mt-2 md:mt-4 lg:mt-6">
            <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-8 md:mb-12">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 mb-4 md:mb-6">
                <Image
                  src="/pinguin/PinguinAmaze.svg"
                  alt="Pingo Bangga"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>

              <h1 className="text-[24px] sm:text-[28px] md:text-[34px] font-extrabold text-gray-900 mb-2 md:mb-3 text-center">
                Latihan Kamu Selesai!
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-500 font-medium mb-8 md:mb-12 text-center max-w-xl">
                Pingo bangga sama kamu, kemampuan ekspresimu semakin mantap!
              </p>
            </div>

            <div className="w-full flex justify-center items-center px-4 md:px-10 mt-2 md:mt-4">
              <button
                onClick={() => router.push("/dashboard/beranda")}
                className="bg-[#2cb46c] text-white hover:bg-[#259b5d] font-extrabold py-3.5 sm:py-4 px-12 sm:px-16 md:px-20 rounded-2xl transition-colors text-sm sm:text-base md:text-lg shadow-sm w-auto -translate-y-0.5 active:translate-y-0"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">
      <Header
        buttonText="Akhiri"
        onButtonClick={() => setShowExitPopup(true)}
      />

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
              <div
                className="h-full bg-[#2cb46c] rounded-full transition-all duration-500"
                style={{ width: getProgressWidth() }}
              ></div>
            </div>
          </div>

          {step === "observe" && expressions.length > 0 && (
            <div className="flex flex-col flex-1 pb-4">
              <h3 className="text-gray-600 font-medium text-sm md:text-base mb-4 md:mb-5 text-center">
                Perhatikan ekspresi di bawah ini, lalu tirukan menggunakan
                kamera
              </h3>

              <div className="w-full max-w-2xl mx-auto bg-gray-100 rounded-[20px] md:rounded-[24px] overflow-hidden mb-6 aspect-video flex items-center justify-center relative shadow-sm">
                <Image
                  src={expressions[currentIndex].image_url}
                  alt={expressions[currentIndex].emotion}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-8 w-full max-w-2xl mx-auto mb-8 text-center">
                <h4 className="text-[#2cb46c] font-bold text-lg md:text-xl uppercase tracking-widest">
                  {translateEmotion(expressions[currentIndex].emotion)}
                </h4>
              </div>

              <div className="flex justify-center items-center w-full max-w-2xl mx-auto mt-6 md:mt-8 pt-4">
                <button
                  onClick={startCamera}
                  className="flex items-center gap-2 bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-2xl shadow-sm transition-all text-sm md:text-base -translate-y-0.5 active:translate-y-0"
                >
                  <Camera className="w-5 h-5 md:w-6 md:h-6" />
                  Buka Kamera
                </button>
              </div>
            </div>
          )}

          {step === "camera" && (
            <div className="flex flex-col flex-1 pb-4">
              <h3 className="text-gray-600 font-medium text-sm md:text-base mb-4 md:mb-5 text-center">
                Pastikan wajah Anda terlihat dengan jelas untuk ekspresi:
                <span className="font-bold text-[#2cb46c] ml-1 uppercase">
                  {translateEmotion(expressions[currentIndex]?.emotion || "")}
                </span>
              </h3>

              <div className="w-full max-w-2xl mx-auto bg-black rounded-[20px] md:rounded-[24px] overflow-hidden mb-8 aspect-video flex items-center justify-center relative shadow-sm border border-gray-200">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex justify-center items-center w-full max-w-2xl mx-auto mt-6 md:mt-8 pt-4">
                <button
                  onClick={takePhoto}
                  className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 rounded-full shadow-md transition-all border-4 border-yellow-200"
                >
                  <Camera className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </button>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="flex flex-col flex-1 pb-4">
              <h3 className="text-gray-600 font-medium text-sm md:text-base mb-4 md:mb-5 text-center">
                Apakah gambar ini sudah cukup mewakili ekspresi{" "}
                <span className="uppercase font-bold">
                  {translateEmotion(expressions[currentIndex]?.emotion || "")}
                </span>
                ?
              </h3>

              <div className="w-full max-w-2xl mx-auto bg-gray-100 rounded-[20px] md:rounded-[24px] overflow-hidden mb-8 aspect-video flex items-center justify-center relative shadow-sm border border-gray-200">
                {capturedUrl && (
                  <Image
                    src={capturedUrl}
                    alt="Hasil Kamera"
                    fill
                    className="object-cover transform -scale-x-100"
                    unoptimized
                  />
                )}
              </div>

              <div className="flex justify-between items-center w-full max-w-2xl mx-auto mt-6 md:mt-8 pt-4">
                <button
                  onClick={retakePhoto}
                  className="flex items-center gap-2 bg-[#ffc107] hover:bg-[#ffb300] active:scale-95 text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-2xl shadow-sm transition-all text-sm md:text-base -translate-y-0.5 active:translate-y-0"
                >
                  <RefreshCcw className="w-5 h-5 md:w-6 md:h-6" />
                  Ulang
                </button>
                <button
                  onClick={submitPhoto}
                  className="bg-[#2cb46c] hover:bg-[#259b5d] active:scale-95 text-white font-bold py-3 md:py-4 px-10 md:px-14 rounded-2xl shadow-sm transition-all text-sm md:text-base -translate-y-0.5 active:translate-y-0"
                >
                  Kirim
                </button>
              </div>
            </div>
          )}

          {step === "analysis" && (
            <div className="flex flex-col flex-1 pb-4">
              <h3 className="text-gray-600 font-medium text-sm md:text-base mb-4 md:mb-5 text-center">
                Hasil Analisa Ekspresi Wajahmu
              </h3>

              <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-sm w-full border border-gray-100 min-h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ECA7B] mb-6"></div>
                    <p className="text-gray-600 font-medium animate-pulse">
                      Pingo sedang menganalisa fotomu...
                    </p>
                  </div>
                ) : feedback ? (
                  <div
                    className={`w-full bg-white rounded-[24px] shadow-sm border-2 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${feedback.isCorrect ? "border-green-200" : "border-red-200"}`}
                  >
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                      <div
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-black text-xl shrink-0 ${feedback.isCorrect ? "bg-[#2cb46c]" : "bg-[#EF4444]"}`}
                      >
                        {feedback.score}%
                      </div>
                      <div className="flex flex-col">
                        <h4
                          className={`font-black text-lg md:text-xl ${feedback.isCorrect ? "text-[#2cb46c]" : "text-[#EF4444]"}`}
                        >
                          {feedback.isCorrect
                            ? "Hebat, Sangat Mirip!"
                            : "Masih Kurang Tepat, Jangan Menyerah!"}
                        </h4>
                        <p className="text-gray-500 font-medium text-sm">
                          Target ekspresi:{" "}
                          <span className="uppercase font-bold text-gray-700">
                            {translateEmotion(
                              expressions[currentIndex]?.emotion || "",
                            )}
                          </span>
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed whitespace-pre-line bg-gray-50 rounded-xl p-4 md:p-5">
                      {feedback.message}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-2xl mx-auto mt-6 md:mt-8 pt-4 gap-4">
                {feedback?.isCorrect === false && (
                  <button
                    disabled={isLoading}
                    onClick={retryPhotoAfterAnalysis}
                    className={`flex items-center justify-center gap-2 bg-white border-[3px] border-[#ffc107] text-[#f5b000] hover:bg-[#fff9e6] active:scale-95 font-bold py-3 md:py-4 px-6 md:px-10 rounded-2xl shadow-sm transition-all text-sm md:text-base -translate-y-0.5 active:translate-y-0 ${isLoading ? "opacity-50 cursor-not-allowed hidden" : ""}`}
                  >
                    <RefreshCcw className="w-5 h-5 md:w-6 md:h-6" />
                    Coba Lagi
                  </button>
                )}
                <button
                  disabled={isLoading}
                  onClick={nextAction}
                  className={`bg-[#2cb46c] hover:bg-[#259b5d] active:scale-95 text-white font-bold py-3 md:py-4 px-10 md:px-14 rounded-2xl shadow-sm transition-all text-sm md:text-base -translate-y-0.5 active:translate-y-0 ${isLoading ? "opacity-50 cursor-not-allowed hidden" : ""}`}
                >
                  {currentIndex + 1 < expressions.length
                    ? "Lanjut Ekspresi Selanjutnya"
                    : "Selesaikan Latihan"}
                </button>
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
              <Image
                src="/pinguin/PinguinSedih.svg"
                alt="Sedih Pingo"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Yakin ingin keluar?
            </h3>
            <p className="text-sm sm:text-base text-gray-500 text-center mb-8 px-2 leading-relaxed">
              Progress kamu belum tersimpan. Latihanmu sekarang akan terhapus
              jika kamu keluar.
            </p>
            <div className="flex w-full gap-3 sm:gap-4">
              <button
                onClick={() => {
                  stopCamera();
                  router.push("/dashboard/beranda");
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
