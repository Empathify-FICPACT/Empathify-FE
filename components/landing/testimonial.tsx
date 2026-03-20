"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonial() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
      const gap = window.innerWidth >= 1024 ? 24 : 20;
      scrollRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
      const gap = window.innerWidth >= 1024 ? 24 : 20;
      scrollRef.current.scrollBy({ left: (cardWidth + gap), behavior: "smooth" });
    }
  };

  const testimonials = [
    {
      text: "Biasanya susah banget ngajak anak latihan di rumah. Tapi karena bentuknya seperti game, sekarang dia malah minta belajar sendiri setiap hari.",
      name: "Dion",
      avatar: "/avatar/avatar1.svg",
      bgColor: "bg-[#b8f0d5]", // Using a soft mint green fallback
    },
    {
      text: "Anak saya jadi lebih paham ekspresi wajah dan emosi orang lain. Perubahannya terasa banget dalam interaksi sehari-hari",
      name: "Dzaky",
      avatar: "/avatar/avatar2.svg",
      bgColor: "bg-[#fef0c7]", // Soft yellow fallback
    },
    {
      text: "Sejak pakai Empathify, anakku jadi lebih mudah fokus dan mulai berani menyapa orang lain. Latihannya seru, jadi dia gak merasa seperti lagi terapi.",
      name: "Aditri",
      avatar: "/avatar/avatar3.svg",
      bgColor: "bg-[#e0e7ff]", // Soft blue fallback
    },
    {
      text: "Sejak pakai Empathify, anakku jadi lebih mudah fokus dan mulai berani menyapa orang lain. Latihannya seru, jadi dia gak merasa seperti lagi terapi.",
      name: "Satria",
      avatar: "/avatar/avatar4.svg",
      bgColor: "bg-[#e0e7ff]", // Soft blue fallback
    },
  ];

  return (
    <section className="w-full bg-[#f9fafb] py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#3FC07B] mb-3 md:mb-4">
          Kata Mereka tentang Empathify
        </h2>
        <p className="text-[#555555] text-base sm:text-lg md:text-[19px] font-semibold leading-relaxed">
          Cerita pengalaman anak dan orang tua belajar dan <br className="hidden md:block" />
          berkembang bersama kami
        </p>
      </div>

      <div className="max-w-[1150px] mx-auto relative mt-4">
        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          className="flex absolute left-[-12px] md:left-[-16px] lg:left-[-24px] top-[45%] -translate-y-1/2 w-10 h-10 lg:w-[46px] lg:h-[46px] bg-[#1C8A4E] text-white rounded-full items-center justify-center hover:bg-[#16703c] transition-all active:scale-90 duration-200 z-10 shadow-md"
        >
          <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7" />
        </button>

        <button
          onClick={scrollRight}
          className="flex absolute right-[-12px] md:right-[-16px] lg:right-[-24px] top-[45%] -translate-y-1/2 w-10 h-10 lg:w-[46px] lg:h-[46px] bg-[#1C8A4E] text-white rounded-full items-center justify-center hover:bg-[#16703c] transition-all active:scale-90 duration-200 z-10 shadow-md"
        >
          <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7" />
        </button>

        {/* Testimonials Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-5 lg:gap-6 pb-12 pt-4 hide-scrollbar px-4 md:px-0 transition-transform"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testi, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[85vw] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-16px)] bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] snap-start flex flex-col justify-between min-h-[250px]"
            >
              <p className="text-gray-500 text-[15px] lg:text-[16px] leading-relaxed mb-10">
                {testi.text}
              </p>

              <div className="flex justify-between items-end mt-auto">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div
                    className={`w-[44px] h-[44px] lg:w-[52px] lg:h-[52px] rounded-full flex flex-shrink-0 items-center justify-center overflow-hidden border border-gray-100 shadow-sm`}
                  >
                    <Image
                      src={testi.avatar}
                      alt={testi.name}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full "
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[15px] lg:text-[17px] mb-1">
                      {testi.name}
                    </h4>
                    <div className="flex gap-0.5 text-[#ffc107]">
                      {/* 5 Stars SVG */}
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3.5 h-3.5 lg:w-4 lg:h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="flex-shrink-0">
                  <Image
                    src="/icon/TestiIcon.svg"
                    alt="Quote Icon"
                    width={48}
                    height={48}
                    className="w-[36px] h-[36px] lg:w-[46px] lg:h-[46px] object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
