"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div 
      className="relative w-full flex-1 flex flex-col items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('/background/bgFree Trial.svg')",
        minHeight: "calc(100vh - 100px)" 
      }}
    >
      <div className="z-10 flex flex-col items-center max-w-md mx-auto -mt-10">
        {/* Character Image */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 mb-2">
          <Image
            src="/pinguin/PinguinLoad.svg"
            alt="Animasi Loading"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* Text Content */}
        <h2 className="text-white text-base sm:text-lg md:text-2xl font-semibold tracking-wide text-center mt-3">
          Tunggu sebentar ya ...
        </h2>
      </div>
    </div>
  );
}
