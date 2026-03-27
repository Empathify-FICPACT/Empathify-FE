"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";

interface ProfileUpdateResponse {
  meta: {
    success: boolean;
    message: string;
  };
}

export default function AvatarSelect() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"boy" | "girl" | null>(null);
  const [avatar, setAvatar] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = async () => {
    setErrorMessage("");

    if (step === 1 && role) setStep(2);

    if (step === 2 && avatar && role) {
      setIsSubmitting(true);

      try {
        const response = await apiFetch("/api/v1/user/profile", {
          method: "PATCH",
          body: JSON.stringify({
            gender: role === "boy" ? "male" : "female",
            avatar_id: avatar,
          }),
        });

        const json = (await response.json()) as ProfileUpdateResponse;

        if (!response.ok || !json.meta?.success) {
          throw new Error(json.meta?.message || "Gagal menyimpan avatar");
        }

        setStep(3);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menyimpan profil",
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 3) setStep(step - 1);
  };

  // Step 3: Success Screen
  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] font-sans p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 text-center space-y-4 shadow-xl animate-in fade-in zoom-in duration-500">
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 mx-auto -mt-4 mb-2">
            <Image
              src="/icon/IconSukses.svg"
              alt="Pendaftaran Berhasil"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Pendaftaran Berhasil!
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Akun Anda telah sukses terdaftar. Mari mulai petualangan Anda di
            Empathify sekarang juga!
          </p>

          <div className="pt-4">
            <button
              onClick={() => router.push("/dashboard/beranda")}
              className="w-full bg-[#2ECA7B] hover:bg-[#25A866] text-white font-bold py-3.5 rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Masuk ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Common Layout for Step 1 & 2
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      {/* Header / Progress Bar */}
      <div className="w-full max-w-5xl mx-auto px-6 py-8 flex items-center gap-4">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="p-2 text-gray-400 hover:text-gray-700 bg-white shadow-sm hover:shadow rounded-full transition-all mt-20"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Progress Track */}
        <div className="grow h-4.5 bg-gray-200 rounded-full overflow-hidden relative shadow-inner mt-20">
          <div
            className="absolute top-0 left-0 h-full bg-[#2ECA7B] transition-all duration-700 ease-in-out rounded-full"
            style={{ width: step === 1 ? "0%" : "50%" }}
          ></div>
        </div>
      </div>

      <div className="grow flex flex-col items-center justify-start pt-4 lg:pt-10 px-4 pb-20 sm:mt-0">
        {errorMessage && (
          <div className="mb-6 w-full max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {/* STEP 1: Role Selection */}
        {step === 1 && (
          <div className="text-center w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Aku adalah seorang
            </h1>
            <p className="text-gray-500 mb-10 text-sm sm:text-base font-medium">
              Pilih salah satu yang sesuai dengan Anda
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-8 justify-center w-full max-w-2xl mx-auto px-4 sm:px-8">
              {/* Boy Card */}
              <button
                onClick={() => setRole("boy")}
                className={`relative w-full max-w-50 sm:max-w-70 mx-auto aspect-4/5 rounded-4xl overflow-hidden bg-transparent border-4 transition-all duration-300 ${
                  role === "boy"
                    ? "border-[#2ECA7B] scale-105 shadow-2xl shadow-green-100"
                    : "border-transparent hover:scale-[1.03] shadow-md"
                }`}
              >
                {/* Character Image */}
                <div className="absolute inset-0 pointer-events-none p-4 sm:p-9">
                  <Image
                    src="/avatar/gender1.svg"
                    alt="Laki-laki"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </button>

              {/* Girl Card */}
              <button
                onClick={() => setRole("girl")}
                className={`relative w-full max-w-50 sm:max-w-70 mx-auto aspect-4/5 rounded-4xl overflow-hidden bg-transparent border-4 transition-all duration-300 ${
                  role === "girl"
                    ? "border-[#2ECA7B] scale-105 shadow-2xl shadow-green-100"
                    : "border-transparent hover:scale-[1.03] shadow-md"
                }`}
              >
                {/* Character Image */}
                <div className="absolute inset-0 pointer-events-none p-4 sm:p-9">
                  <Image
                    src="/avatar/gender2.svg"
                    alt="Perempuan"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Avatar Selection */}
        {step === 2 && (
          <div className="text-center w-full max-w-7xl animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Pilih Avatar
            </h1>
            <p className="text-gray-500 mb-10 text-sm sm:text-base font-medium">
              Kamu bisa mengubahnya kapan saja nanti.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 justify-center w-full max-w-6xl px-4 sm:px-8 mx-auto">
              {/* Chick */}
              <button
                onClick={() => setAvatar(1)}
                className={`relative w-full max-w-50 sm:max-w-70 mx-auto aspect-4/5 rounded-4xl overflow-hidden bg-transparent border-4 transition-all duration-300 ${
                  avatar === 1
                    ? "border-[#2ECA7B] scale-[1.03] sm:scale-105 shadow-xl shadow-green-100/50 z-10"
                    : "border-transparent hover:scale-[1.02] hover:shadow-md"
                }`}
              >
                <div className="absolute inset-0 pointer-events-none p-4 sm:p-9">
                  <Image
                    src="/avatar/avatar1.svg"
                    alt="Avatar 1"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </button>

              {/* Koala */}
              <button
                onClick={() => setAvatar(2)}
                className={`relative w-full max-w-50 sm:max-w-70 mx-auto aspect-4/5 rounded-4xl overflow-hidden bg-transparent border-4 transition-all duration-300 ${
                  avatar === 2
                    ? "border-[#2ECA7B] scale-[1.03] sm:scale-105 shadow-xl shadow-green-100/50 z-10"
                    : "border-transparent hover:scale-[1.02] hover:shadow-md"
                }`}
              >
                <div className="absolute inset-0 pointer-events-none p-4 sm:p-9">
                  <Image
                    src="/avatar/avatar2.svg"
                    alt="Avatar 2"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </button>

              {/* Panda */}
              <button
                onClick={() => setAvatar(3)}
                className={`relative w-full max-w-50 sm:max-w-70 mx-auto aspect-4/5 rounded-4xl overflow-hidden bg-transparent border-4 transition-all duration-300 ${
                  avatar === 3
                    ? "border-[#2ECA7B] scale-[1.03] sm:scale-105 shadow-xl shadow-green-100/50 z-10"
                    : "border-transparent hover:scale-[1.02] hover:shadow-md"
                }`}
              >
                <div className="absolute inset-0 pointer-events-none p-4 sm:p-9">
                  <Image
                    src="/avatar/avatar3.svg"
                    alt="Avatar 3"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </button>

              {/* Lion */}
              <button
                onClick={() => setAvatar(4)}
                className={`relative w-full max-w-50 sm:max-w-70 mx-auto aspect-4/5 rounded-4xl overflow-hidden bg-transparent border-4 transition-all duration-300 ${
                  avatar === 4
                    ? "border-[#2ECA7B] scale-[1.03] sm:scale-105 shadow-xl shadow-green-100/50 z-10"
                    : "border-transparent hover:scale-[1.02] hover:shadow-md"
                }`}
              >
                <div className="absolute inset-0 pointer-events-none p-4 sm:p-9">
                  <Image
                    src="/avatar/avatar4.svg"
                    alt="Avatar 4"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Action Button Container */}
        <div className="mt-14 sm:mt-20 w-full max-w-6xl flex justify-end px-8 sm:px-6">
          <button
            onClick={handleNext}
            disabled={step === 1 ? !role : !avatar || isSubmitting}
            className={`px-8 sm:px-12 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white transition-all duration-300 ${
              (step === 1 ? role : avatar) && !isSubmitting
                ? "bg-[#2ECA7B] hover:bg-[#25A866] shadow-[0_8px_20px_-6px_rgba(46,202,123,0.5)] hover:shadow-[0_12px_24px_-6px_rgba(46,202,123,0.6)] hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Menyimpan..." : "Selanjutnya"}
          </button>
        </div>
      </div>
    </div>
  );
}
