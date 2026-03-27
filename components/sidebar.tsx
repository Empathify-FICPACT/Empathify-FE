"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { clearLogoutGraceSession } from "@/utils/auth-session";

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    Cookies.remove("access_token");
    clearLogoutGraceSession();
    router.push("/");
  };

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
                src="/logo/LogoHijau.svg"
                alt="Empathify Logo"
                width={130}
                height={40}
                className="object-contain object-left w-auto h-auto lg:max-h-8 max-h-6"
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
            <h3 className="text-sm lg:text-2xl font-extrabold text-gray-900 mb-3 lg:mb-4 px-2 whitespace-nowrap overflow-hidden">
              Dasbor
            </h3>
          ) : (
            <div className="h-4 mb-3 lg:mb-4" />
          )}
          <nav className="flex flex-col gap-1.5">
            <Link
              href="/dashboard/beranda"
              className={`flex items-center ${
                isMinimized
                  ? "justify-center px-0"
                  : "gap-3 lg:gap-4 px-3 lg:px-4"
              } py-3 lg:py-3.5 rounded-xl font-medium transition-all ${
                pathname === "/dashboard/beranda"
                  ? "bg-[#2cb46c] text-white"
                  : "text-[#8E8E8E] hover:text-[#259b5d] hover:bg-green-50"
              }`}
              title={isMinimized ? "Beranda" : undefined}
            >
              <Image
                src="/dashboard/berandaIcon.svg"
                alt="Beranda"
                width={30}
                height={30}
                className="w-10 h-10 flex-shrink-0 object-contain"
              />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-base lg:text-xl font-semibold">
                  Beranda
                </span>
              )}
            </Link>
            <Link
              href="/dashboard/latihan"
              className={`flex items-center ${
                isMinimized
                  ? "justify-center px-0"
                  : "gap-3 lg:gap-4 px-3 lg:px-4"
              } py-3 lg:py-3.5 rounded-xl font-medium transition-all ${
                pathname === "/dashboard/latihan"
                  ? "bg-[#2cb46c] text-white"
                  : "text-[#8E8E8E] hover:text-[#259b5d] hover:bg-green-50"
              }`}
              title={isMinimized ? "Latihan" : undefined}
            >
              <Image
                src="/dashboard/LatihanIcon.svg"
                alt="Latihan"
                width={30}
                height={30}
                className="w-10 h-10 flex-shrink-0 object-contain"
              />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-base lg:text-xl font-semibold">
                  Latihan
                </span>
              )}
            </Link>
            <Link
              href="/dashboard/misi"
              className={`flex items-center ${
                isMinimized
                  ? "justify-center px-0"
                  : "gap-3 lg:gap-4 px-3 lg:px-4"
              } py-3 lg:py-3.5 rounded-xl font-medium transition-all ${
                pathname === "/dashboard/misi"
                  ? "bg-[#2cb46c] text-white"
                  : "text-[#8E8E8E] hover:text-[#259b5d] hover:bg-green-50"
              }`}
              title={isMinimized ? "Misi" : undefined}
            >
              <Image
                src="/dashboard/MisiIcon.svg"
                alt="Misi"
                width={30}
                height={30}
                className="w-10 h-10 flex-shrink-0 object-contain"
              />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-base lg:text-xl font-semibold">
                  Misi
                </span>
              )}
            </Link>
            <Link
              href="/dashboard/penghargaan"
              className={`flex items-center ${
                isMinimized
                  ? "justify-center px-0"
                  : "gap-3 lg:gap-4 px-3 lg:px-4"
              } py-3 lg:py-3.5 rounded-xl font-medium transition-all ${
                pathname === "/dashboard/penghargaan"
                  ? "bg-[#2cb46c] text-white"
                  : "text-[#8E8E8E] hover:text-[#259b5d] hover:bg-green-50"
              }`}
              title={isMinimized ? "Penghargaan" : undefined}
            >
              <Image
                src="/dashboard/PenghargaanIcon.svg"
                alt="Penghargaan"
                width={30}
                height={30}
                className="w-10 h-10 flex-shrink-0 object-contain"
              />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-base lg:text-xl font-semibold">
                  Penghargaan
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Akun Section */}
        <div className="flex flex-col items-stretch mt-auto lg:mt-0">
          {!isMinimized ? (
            <h3 className="text-sm lg:text-2xl font-extrabold text-gray-900 mb-3 lg:mb-4 px-2 whitespace-nowrap overflow-hidden">
              Akun
            </h3>
          ) : (
            <div className="h-4 mb-3 lg:mb-4" />
          )}
          <nav className="flex flex-col gap-1.5">
            <Link
              href="/dashboard/profile"
              className={`flex items-center ${
                isMinimized
                  ? "justify-center px-0"
                  : "gap-3 lg:gap-4 px-3 lg:px-4"
              } py-3 lg:py-3.5 rounded-xl font-medium transition-all ${
                pathname === "/dashboard/profile"
                  ? "bg-[#2cb46c] text-white"
                  : "text-[#8E8E8E] hover:text-[#259b5d] hover:bg-green-50"
              }`}
              title={isMinimized ? "Profile" : undefined}
            >
              <Image
                src="/dashboard/ProfileIcon.svg"
                alt="Profile"
                width={30}
                height={30}
                className="w-10 h-10 flex-shrink-0 object-contain"
              />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-base lg:text-xl font-semibold">
                  Profile
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className={`flex items-center ${
                isMinimized
                  ? "justify-center px-0"
                  : "gap-3 lg:gap-4 px-3 lg:px-4"
              } text-[#8E8E8E] hover:text-[#259b5d] hover:bg-green-50 py-3 lg:py-3.5 rounded-xl font-medium transition-all`}
              title={isMinimized ? "Keluar" : undefined}
            >
              <Image
                src="/dashboard/LogoutIcon.svg"
                alt="Keluar"
                width={30}
                height={30}
                className="w-10 h-10 flex-shrink-0 object-contain"
              />
              {!isMinimized && (
                <span className="whitespace-nowrap overflow-hidden text-base lg:text-xl font-semibold">
                  Keluar
                </span>
              )}
            </button>
          </nav>
        </div>
      </aside>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl w-full max-w-[340px] sm:max-w-100 p-5 sm:p-6 lg:p-8 flex flex-col items-center text-center shadow-lg">
            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-3 sm:mb-4 flex items-center justify-center">
              <Image
                src="/pinguin/CaptainPingo.svg"
                alt="Captain Pingo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            <h3 className="text-lg sm:text-[20px] font-bold text-gray-900 mb-4 lg:mb-6">
              Yakin ingin keluar sekarang?
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3.5 bg-[#e6fbf2] text-[#2cb46c] font-bold rounded-xl hover:bg-[#d1f7e4] transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 py-3.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
