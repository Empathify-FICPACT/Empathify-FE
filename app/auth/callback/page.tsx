"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ambil token dari URL parameters (bisa diteruskan dari backend)
    const token = searchParams.get("token") || searchParams.get("access_token");

    if (token) {
      // Simpan token di dalam cookie dengan durasi 7 hari
      Cookies.set("access_token", token, { expires: 7 });
      
      // Redirect ke halaman dashboard
      router.push("/dashboard");
    } else {
      // Jika token tidak ada, redirect kembali ke halaman login dengan error
      router.push("/login?error=auth_failed");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2ECA7B] mx-auto mb-4"></div>
        <p className="text-gray-600">Mengautentikasi...</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
