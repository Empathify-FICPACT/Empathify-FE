"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  hasValidLogoutGraceSession,
  restoreSessionFromLogoutGrace,
} from "@/utils/auth-session";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "/layanan" },
  { label: "Tentang Kami", href: "/tentang" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [canQuickLogin, setCanQuickLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCanQuickLogin(hasValidLogoutGraceSession());
  }, []);

  const handleMasukClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canQuickLogin) return;

    event.preventDefault();

    const restored = restoreSessionFromLogoutGrace();
    if (restored) {
      router.push("/dashboard/beranda");
      return;
    }

    setCanQuickLogin(false);
    router.push("/login");
  };

  return (
    <header className="w-full bg-[#25B868] flex justify-center fixed top-0 z-50">
      <div className="w-full max-w-[1920px] h-20 md:h-[88px] flex items-center justify-between px-6 md:px-12">
        {/* KIRI */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" aria-label="Ke beranda">
            <Image
              src="/logo/Logo putih.svg"
              alt="Logo"
              width={150}
              height={60}
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden min-[1100px]:flex gap-8 text-white text-lg md:text-xl font-bold">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative hover:scale-105 transition duration-300 after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* KANAN */}
        <div className="hidden min-[1100px]:flex gap-4">
          <Link
            href="/register"
            className="w-[120px] h-[45px] bg-[#E9F8F0] text-[#25B868] text-[18px] font-bold rounded-[12px] transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95 inline-flex items-center justify-center"
          >
            Daftar
          </Link>

          <Link
            href={canQuickLogin ? "/dashboard/beranda" : "/login"}
            onClick={handleMasukClick}
            className="w-[120px] h-[45px] bg-[#FFC200] text-white text-[18px] font-bold rounded-[12px] border-[3px] border-[#FFDE00] transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95 inline-flex items-center justify-center"
          >
            Masuk
          </Link>
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
        className={`min-[1100px]:hidden absolute top-20 md:top-[88px] w-full bg-[#25B868] flex flex-col items-center gap-6 py-6 transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-5 scale-95 pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="text-white text-lg font-bold hover:scale-105 transition"
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="/register"
          onClick={() => setIsOpen(false)}
          className="w-[140px] h-[45px] bg-[#E9F8F0] text-[#25B868] font-bold rounded-[12px] hover:scale-105 transition active:scale-95 inline-flex items-center justify-center"
        >
          Daftar
        </Link>

        <Link
          href={canQuickLogin ? "/dashboard/beranda" : "/login"}
          onClick={(event) => {
            setIsOpen(false);
            handleMasukClick(event);
          }}
          className="w-[140px] h-[45px] bg-[#FFC200] text-white font-bold rounded-[12px] border-[3px] border-[#FFDE00] hover:scale-105 transition active:scale-95 inline-flex items-center justify-center"
        >
          Masuk
        </Link>
      </div>
    </header>
  );
}
