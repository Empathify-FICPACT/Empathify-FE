"use client";

import Image from "next/image";
import Badge from "./badge";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/utils/api";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  is_unlocked: boolean;
  earned_at: string | null;
}

interface BadgesResponse {
  meta: {
    success: boolean;
    message: string;
  };
  data: {
    unlocked: number;
    total: number;
    badges: BadgeItem[];
  };
}

const badgeImageByName: Record<string, string> = {
  Pemula: "/penghargaan/Pemula.svg",
  Penjelajah: "/penghargaan/Penjelajah.svg",
  Jagoan: "/penghargaan/Jagoan.svg",
  Raja: "/penghargaan/Raja.svg",
  Master: "/penghargaan/Master.svg",
};

const formatEarnedDate = (date: string | null) => {
  if (!date) return "Belum diperoleh";

  const formatted = new Date(date);
  if (Number.isNaN(formatted.getTime())) return "Belum diperoleh";

  return formatted.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Penghargaan() {
  const [badgesData, setBadgesData] = useState<BadgesResponse["data"] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBadges = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await apiFetch("/api/v1/badges", {
          method: "GET",
        });

        const json = (await response.json()) as BadgesResponse;

        if (!response.ok || !json.meta?.success) {
          throw new Error(json.meta?.message || "Gagal mengambil badge");
        }

        if (!isMounted) return;
        setBadgesData(json.data);
      } catch (error) {
        if (!isMounted) return;
        setBadgesData(null);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat memuat badge",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBadges();

    return () => {
      isMounted = false;
    };
  }, []);

  const latestUnlockedBadge = useMemo(() => {
    if (!badgesData?.badges?.length) return null;

    const unlocked = badgesData.badges.filter((item) => item.is_unlocked);
    if (unlocked.length === 0) return null;

    return unlocked.sort((a, b) => {
      const dateA = a.earned_at ? new Date(a.earned_at).getTime() : 0;
      const dateB = b.earned_at ? new Date(b.earned_at).getTime() : 0;
      return dateB - dateA;
    })[0];
  }, [badgesData]);

  return (
    <div className="w-full max-w-435 mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start relative">
        {/* Right Sidebar (Lencana) */}
        <Badge
          showMisi={false}
          latestBadge={latestUnlockedBadge}
          badgeSummary={
            badgesData
              ? { unlocked: badgesData.unlocked, total: badgesData.total }
              : undefined
          }
        />

        {/* Main Content (Penghargaan) */}
        <div className="flex-1 w-full order-2 xl:order-1 min-w-0">
          <div className="flex justify-between items-center mb-6 lg:mb-8 mt-2">
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900">
              Penghargaan
            </h1>
          </div>

          {errorMessage && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {(isLoading ? [] : (badgesData?.badges ?? [])).map((item) => {
              const image =
                badgeImageByName[item.name] ?? "/logo/BadgeLevel.svg";
              const percentage = item.is_unlocked ? 100 : 0;
              const progress = item.is_unlocked ? "1 / 1" : "0 / 1";

              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-[20px] p-6 lg:p-8 shadow-sm flex flex-col items-center justify-center text-center"
                >
                  <div className="mb-4">
                    <Image
                      src={image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-contain w-20 h-20 lg:w-24 lg:h-24"
                    />
                  </div>
                  <h3 className="text-[#2cb46c] text-xl lg:text-2xl font-bold mb-4">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    {item.description}
                  </p>

                  <div className="w-full max-w-60 bg-[#d1d5db] rounded-full h-6 lg:h-7 relative flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#2cb46c]"
                      style={{ width: `${percentage}%` }}
                    ></div>
                    <span className="relative z-10 text-[12px] lg:text-sm font-bold text-gray-900">
                      {progress}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Diperoleh: {formatEarnedDate(item.earned_at)}
                  </p>
                </div>
              );
            })}
            {!isLoading && (badgesData?.badges?.length ?? 0) === 0 && (
              <div className="col-span-full rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500">
                Belum ada data badge.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
