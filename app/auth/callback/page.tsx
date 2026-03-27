"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parsePayloadToken = (raw: string | null): string | null => {
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as {
        meta?: { success?: boolean };
        data?: { access_token?: string };
      };

      if (parsed?.meta?.success && parsed?.data?.access_token) {
        return parsed.data.access_token;
      }
      return parsed?.data?.access_token ?? null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const oauthIntent =
      typeof window !== "undefined"
        ? window.localStorage.getItem("oauth_intent")
        : null;

    const queryToken =
      searchParams.get("token") || searchParams.get("access_token");

    const hashParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.hash.replace(/^#/, ""))
        : null;
    const hashToken =
      hashParams?.get("token") || hashParams?.get("access_token");

    // Fallback jika backend mengirim payload JSON di query/hash.
    const payloadToken =
      parsePayloadToken(searchParams.get("data")) ||
      parsePayloadToken(searchParams.get("response")) ||
      parsePayloadToken(searchParams.get("result")) ||
      parsePayloadToken(hashParams?.get("data") ?? null) ||
      parsePayloadToken(hashParams?.get("response") ?? null) ||
      parsePayloadToken(hashParams?.get("result") ?? null);

    const token = queryToken || hashToken || payloadToken;

    if (token) {
      Cookies.set("access_token", token, { expires: 7 });

      if (typeof window !== "undefined") {
        window.localStorage.removeItem("oauth_intent");
      }

      if (oauthIntent === "register") {
        router.replace("/register/avatar");
      } else {
        router.replace("/dashboard/beranda");
      }
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("oauth_intent");
    }

    router.replace("/login?error=auth_failed");
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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          Loading...
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
