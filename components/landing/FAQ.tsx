"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FAQ() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleStart = () => {
    if (isLoggedIn) {
      router.push("/latihan-bicara");
    } else {
      router.push("/auth");
    }
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      q: "Apakah orang tua perlu mendampingi anak saat menggunakan Empathify?",
      a: "Pendampingan orang tua disarankan, terutama pada tahap awal penggunaan, untuk membantu anak beradaptasi dan memahami cara menggunakan platform.",
    },
    {
      q: "Siapa saja yang dapat menggunakan Empathify?",
      a: "Empathify ditujukan untuk anak usia dini hingga sekolah dasar, khususnya anak dengan autisme dan ADHD, serta dapat digunakan oleh orang tua sebagai media pendamping belajar di rumah.",
    },
    {
      q: "Bagaimana cara kerja Empathify?",
      a: "Empathify menyediakan berbagai aktivitas interaktif seperti simulasi percakapan, pengenalan emosi, dan cerita interaktif. Setiap aktivitas dilengkapi dengan umpan balik untuk membantu anak memahami materi dengan lebih baik.",
    },
    {
      q: "Apakah Empathify aman digunakan oleh anak?",
      a: "Ya, seluruh konten dalam Empathify dirancang dengan mempertimbangkan keamanan dan kenyamanan anak, serta menggunakan pendekatan yang ramah dan tidak menekan.",
    },

    {
      q: "Apakah Empathify berbayar?",
      a: "Empathify dirancang agar dapat diakses secara gratis, sehingga lebih banyak anak dan keluarga dapat memperoleh manfaat dari platform ini.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 ">
      {/* <div className="bg-[#096CF6] rounded-[25px] sm:rounded-[35px] md:rounded-[45px] grid grid-cols-1 md:grid-cols-[3fr_2fr] items-center overflow-hidden relative w-full max-w-none">
          <img 
            src="/BGFAQ.svg" 
            alt="" 
            className="absolute right-0 bottom-0 w-auto  object-contain pointer-events-none"
          />
          <div className="p-6 sm:p-8 md:p-10 lg:pl-20 text-white max-w-full text-left relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] max-w-full font-bold leading-tight">
              Setiap anak berhak berkembang sesuai potensinya
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-[1.35rem] max-w-full mt-4 sm:mt-5 md:mt-6 mb-5 sm:mb-6">
              Pendampingan yang tepat, perkembangan mereka bisa terlihat lebih
              cepat. SpeakBuddy hadir untuk mendampingi si Kecil belajar bicara
              dengan cara yang menyenangkan dan mudah.
            </p>
            <a
              onClick={handleStart}
              className="inline-flex items-center text-sm sm:text-base md:text-lg lg:text-[1.2rem] gap-2 bg-[#FECB08] text-black font-semibold px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 rounded-full hover:bg-[#e5b607] transition-all duration-300 hover:scale-105"
            >
              Mulai bersama SpeakBuddy
              <span className="ml-2 sm:ml-3 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  fill="black"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div> */}

      <div className="text-center">
        <h3 className="text-2xl text-[#25B868] sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold pt-8 sm:pt-10 md:pt-12 lg:pt-14">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="rounded-2xl bg-[#f9fafb] mt-2 overflow-hidden max-w-4xl mx-auto pt-5 sm:pt-6 md:pt-7">
        {faqs.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-bold text-black text-base sm:text-lg md:text-xl lg:text-[1.2rem] pr-4">
                  {item.q}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-black transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-4.5 md:pb-5 text-black font-semibold text-sm sm:text-base lg:text-lg leading-relaxed">
                  {item.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
