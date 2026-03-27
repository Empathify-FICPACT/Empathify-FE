"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !passwordConfirm) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    if (!accepted) {
      setError("Anda harus menyetujui syarat & ketentuan.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://empathify-be-staging.fly.dev/api/v1/auth/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, password }),
        },
      );
      const data = await res.json();

      if (!res.ok || !data.meta?.success) {
        throw new Error(data.meta?.message || "Registrasi gagal");
      }

      const token = data.data.access_token;
      Cookies.set("access_token", token, { expires: 7 }); // expires in 7 days

      router.push("/register/avatar");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan sistem.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("oauth_intent", "register");
    }
    const callbackUrl = `${window.location.origin}/auth/callback`;
    const authUrl = `https://empathify-be-staging.fly.dev/api/v1/auth/google/?redirect_uri=${encodeURIComponent(callbackUrl)}`;
    window.location.href = authUrl;
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center font-sans bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background/Login.svg')" }}
    >
      {/* Header (Close btn, Logo & Daftar btn) */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 py-4 md:px-8 md:py-6 z-20">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Close Icon */}
          <Link href="/">
            <button
              aria-label="Tutup"
              className="p-2 text-white hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Link>

          {/* Logo */}
          <div className="relative h-6 md:h-9 w-30 md:w-37.5">
            <Image
              src="/logo/Logo putih.svg"
              alt="Empathify Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </div>

        {/* Login Button */}
        <Link href="/login">
          <button className="bg-[#E9F8F0] text-[#2ECA7B] px-5 py-2 md:px-8 md:py-2.5 rounded-2xl shadow-xl font-bold hover:bg-green-50 transition-colors text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-white">
            Masuk
          </button>
        </Link>
      </div>

      {/* Main Register Card */}
      <div className="relative z-10 w-[92%] max-w-85 sm:max-w-112.5 md:max-w-117.5 bg-white rounded-2xl p-6 sm:p-10 shadow-xl mx-auto mt-12 sm:mt-16 md:mt-0">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8 tracking-tight">
          Daftar Akun
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-200">
            {error}
          </div>
        )}

        <form className="space-y-3 sm:space-y-4" onSubmit={handleRegister}>
          {/* Name Input */}
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan Nama "
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 outline-none focus:border-[#2ECA7B] focus:ring-1 focus:ring-[#2ECA7B] text-gray-700 placeholder:text-gray-500 text-xs sm:text-sm transition-all"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email"
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 outline-none focus:border-[#2ECA7B] focus:ring-1 focus:ring-[#2ECA7B] text-gray-700 placeholder:text-gray-500 text-xs sm:text-sm transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Kata Sandi"
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl border   border-gray-200 outline-none focus:border-[#2ECA7B] focus:ring-1 focus:ring-[#2ECA7B] text-gray-700 placeholder:text-gray-500 text-xs sm:text-sm transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Konfirmasi Kata Sandi"
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl border   border-gray-200 outline-none focus:border-[#2ECA7B] focus:ring-1 focus:ring-[#2ECA7B] text-gray-700 placeholder:text-gray-500 text-xs sm:text-sm transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-xs sm:text-sm mt-1 pb-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="peer appearance-none w-4 h-4 border border-gray-200 rounded checked:bg-[#2ECA7B] checked:border-[#2ECA7B] transition-colors cursor-pointer"
                />
                <svg
                  className="absolute w-3 h-3 text-white left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-gray-400 group-hover:text-gray-600 transition font-medium">
                Saya menyetujui Syarat & Ketentuan yang berlaku
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#2ECA7B] hover:bg-[#25a866] text-white font-bold py-2.5 sm:py-3.5 px-4 rounded-xl transition-colors shadow-sm text-sm sm:text-base mt-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-6">
          <div className="grow border-t border-gray-100"></div>
          <span className="shrink-0 mx-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            ATAU
          </span>
          <div className="grow border-t border-gray-100"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 bg-gray-50/80 border border-gray-200 hover:bg-gray-100 text-gray-800 font-bold py-3.5 px-4 rounded-xl transition-colors mb-6 shadow-sm"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

        {/* Footer Text */}
        <p className="text-center text-[10px] sm:text-[11px] md:text-xs text-gray-400 leading-relaxed max-w-[95%] mx-auto mt-4 sm:mt-0">
          Dengan masuk, kamu menyetujui{" "}
          <a
            href="#"
            className="font-semibold text-gray-500 hover:text-gray-700 hover:underline"
          >
            Kebijakan Privasi
          </a>{" "}
          dan{" "}
          <a
            href="#"
            className="font-semibold text-gray-500 hover:text-gray-700 hover:underline"
          >
            Syarat & Ketentuan
          </a>{" "}
          Empathify.
        </p>
      </div>
    </div>
  );
}
