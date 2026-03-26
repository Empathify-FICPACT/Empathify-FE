"use client";

import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <header className="w-full bg-[#25B868] flex justify-center fixed top-0 z-50">
      <div className="w-full max-w-[1920px] h-[110px] md:h-[110px] flex items-center justify-between px-6 md:px-15">

        {/* KIRI */}
        <div className="flex items-center gap-6 md:gap-10">
          <Image src="/logo.png" alt="Logo" width={140} height={60} />

          {/* DESKTOP MENU */}
          <nav className="hidden min-[1100px]:flex gap-8 text-white text-[18px] md:text-[22px] font-bold">
            {["Beranda", "Layanan", "Edukasi", "Tentang Kami"].map((item) => (
              <a
                key={item}
                href="#"
                className="relative hover:scale-105 transition duration-300 after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* KANAN */}
        <div className="hidden min-[1100px]:flex gap-4">
          <button className="w-[120px] h-[45px] bg-[#E9F8F0] text-[#25B868] text-[18px] font-bold rounded-[12px] transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
            Daftar
          </button>

          <button className="w-[120px] h-[45px] bg-[#FFC200] text-white text-[18px] font-bold rounded-[12px] border-[3px] border-[#FFDE00] transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
            Masuk
          </button>
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="min-[1100px]:hidden text-white text-2xl transition duration-300 hover:scale-110"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`min-[1100px]:hidden absolute top-[90px] w-full bg-[#25B868] flex flex-col items-center gap-6 py-6 transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-5 scale-95 pointer-events-none"
        }`}
      >
        {["Beranda", "Layanan", "Edukasi", "Tentang Kami"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-white text-lg font-bold hover:scale-105 transition"
          >
            {item}
          </a>
        ))}

        <button className="w-[140px] h-[45px] bg-[#E9F8F0] text-[#25B868] font-bold rounded-[12px] hover:scale-105 transition active:scale-95">
          Daftar
        </button>

        <button className="w-[140px] h-[45px] bg-[#FFC200] text-white font-bold rounded-[12px] border-[3px] border-[#FFDE00] hover:scale-105 transition active:scale-95">
          Masuk
        </button>
      </div>
    </header>
  );
}