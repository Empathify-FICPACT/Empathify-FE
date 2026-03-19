"use client";

import { useState, useEffect } from "react";
import { Menu, FileText, User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Auto-minimize on smaller screens and track if mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile overlay backdrop when expanded */}
      {isMobile && !isMinimized && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMinimized(true)}
        />
      )}
      
      <aside
        className={`${
          isMinimized
            ? "w-[80px] lg:w-[96px] px-3 lg:px-4 sticky top-0"
            : "w-[260px] lg:w-[300px] px-5 lg:px-6 fixed lg:sticky z-50 lg:z-10 shadow-2xl lg:shadow-none left-0 top-0 bottom-0"
        } h-screen bg-white border-r border-gray-100 flex flex-col py-6 lg:py-8 transition-all duration-300 ease-in-out overflow-y-auto`}
      >
        {/* Header / Logo */}
        <div
          className={`flex items-center ${
            isMinimized ? "justify-center" : "justify-between pl-2 pr-1"
          } mb-8 lg:mb-10 h-10`}
        >
          {!isMinimized && (
            <div className="flex items-center gap-2 text-[#1f8d55] font-extrabold text-2xl tracking-tight overflow-hidden whitespace-nowrap">
              <Image
                src="/LogoHijau.svg"
                alt="Empathify Logo"
                width={130}
                height={40}
                className="object-contain object-left w-auto h-auto max-h-8"
                priority
              />
            </div>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-600 hover:text-gray-900 transition-colors p-1"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Dasbor Section */}
        <div className="mb-6 lg:mb-8 flex flex-col items-stretch">
          {!isMinimized ? (
            <h3 className="text-xs lg:text-sm font-bold text-gray-900 mb-3 lg:mb-4 px-2 whitespace-nowrap overflow-hidden">
              Dasbor
            </h3>
          ) : (
            <div className="h-4 mb-3 lg:mb-4" />
          )}
          <nav className="flex flex-col gap-1.5">
            <Link
              href="#"
              className={`flex items-center ${
                isMinimized ? "justify-center px-0" : "gap-3 lg:gap-4 px-3 lg:px-4"
              } bg-[#2cb46c] text-white py-3 lg:py-3.5 rounded-xl font-medium transition-all`}
              title={isMinimized ? "Beranda" : undefined}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-sm lg:text-base">Beranda</span>
              )}
            </Link>
            <Link
              href="#"
              className={`flex items-center ${
                isMinimized ? "justify-center px-0" : "gap-3 lg:gap-4 px-3 lg:px-4"
              } text-gray-400 hover:text-gray-600 hover:bg-gray-50 py-3 lg:py-3.5 rounded-xl font-medium transition-all`}
              title={isMinimized ? "Latihan" : undefined}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-sm lg:text-base">Latihan</span>
              )}
            </Link>
            <Link
              href="#"
              className={`flex items-center ${
                isMinimized ? "justify-center px-0" : "gap-3 lg:gap-4 px-3 lg:px-4"
              } text-gray-400 hover:text-gray-600 hover:bg-gray-50 py-3 lg:py-3.5 rounded-xl font-medium transition-all`}
              title={isMinimized ? "Misi" : undefined}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-sm lg:text-base">Misi</span>
              )}
            </Link>
            <Link
              href="#"
              className={`flex items-center ${
                isMinimized ? "justify-center px-0" : "gap-3 lg:gap-4 px-3 lg:px-4"
              } text-gray-400 hover:text-gray-600 hover:bg-gray-50 py-3 lg:py-3.5 rounded-xl font-medium transition-all`}
              title={isMinimized ? "Penghargaan" : undefined}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-sm lg:text-base">
                  Penghargaan
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Akun Section */}
        <div className="flex flex-col items-stretch mt-auto lg:mt-0">
          {!isMinimized ? (
            <h3 className="text-xs lg:text-sm font-bold text-gray-900 mb-3 lg:mb-4 px-2 whitespace-nowrap overflow-hidden">
              Akun
            </h3>
          ) : (
            <div className="h-4 mb-3 lg:mb-4" />
          )}
          <nav className="flex flex-col gap-1.5">
            <Link
              href="#"
              className={`flex items-center ${
                isMinimized ? "justify-center px-0" : "gap-3 lg:gap-4 px-3 lg:px-4"
              } text-gray-400 hover:text-gray-600 hover:bg-gray-50 py-3 lg:py-3.5 rounded-xl font-medium transition-all`}
              title={isMinimized ? "Profile" : undefined}
            >
              <User className="w-5 h-5 flex-shrink-0" />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-sm lg:text-base">Profile</span>
              )}
            </Link>
            <Link
              href="#"
              className={`flex items-center ${
                isMinimized ? "justify-center px-0" : "gap-3 lg:gap-4 px-3 lg:px-4"
              } text-[#2cb46c] hover:text-[#259b5d] hover:bg-green-50 py-3 lg:py-3.5 rounded-xl font-medium transition-all`}
              title={isMinimized ? "Keluar" : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-sm lg:text-base">Keluar</span>
              )}
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
