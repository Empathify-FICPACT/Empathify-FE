"use client";

import { useEffect, useState } from "react";
import { APP_ERROR_EVENT } from "@/utils/error-message";

interface ErrorEventDetail {
  message: string;
}

export default function ErrorMassage() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const onCustomError = (event: Event) => {
      const customEvent = event as CustomEvent<ErrorEventDetail>;
      const nextMessage = customEvent.detail?.message?.trim();
      if (!nextMessage) return;
      setMessage(nextMessage);
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const nextMessage =
        (reason instanceof Error ? reason.message : String(reason)) ||
        "Terjadi kesalahan pada aplikasi.";
      setMessage(nextMessage);
    };

    const onWindowError = (event: ErrorEvent) => {
      const nextMessage =
        event.error?.message ||
        event.message ||
        "Terjadi kesalahan pada aplikasi.";
      setMessage(nextMessage);
    };

    window.addEventListener(APP_ERROR_EVENT, onCustomError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onWindowError);

    return () => {
      window.removeEventListener(APP_ERROR_EVENT, onCustomError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
      window.removeEventListener("error", onWindowError);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl border border-red-100">
        <h3 className="text-lg font-bold text-red-600 mb-2">Terjadi Error</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => setMessage(null)}
            className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
