"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function Header({ buttonText = "Kembali", onButtonClick }: HeaderProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      router.push('/dashboard/latihan');
    }
  };

  return (
    <header className="w-full flex justify-between items-center py-4 px-6 md:px-10 bg-[#F5F5F5] border-b border-gray-200">
      {/* Kiri: Logo */}
      <div 
        className="flex items-center cursor-pointer lg:ml-10" 
        onClick={() => router.push('/dashboard/beranda')}
      >
        <Image
          src="/logo/LogoHijau.svg"
          alt="Empathify Logo"
          width={150}
          height={40}
          className="object-contain h-7 md:h-8 w-auto"
          priority
        />
      </div>

      {/* Kanan: Tombol */}
      <button
        onClick={handleButtonClick}
        className="bg-[#2cb46c] hover:bg-[#259b5d] text-white lg:mr-10 px-6 py-2 md:px-8 md:py-2.5 rounded-xl font-bold transition-all shadow-sm text-sm md:text-base active:scale-95"
      >
        {buttonText}
      </button>
    </header>
  );
}
