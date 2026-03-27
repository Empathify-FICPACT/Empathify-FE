"use client";

import Badge from "./badge";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/utils/api";
import {
  formatHistoryDate,
  getTrainingHistory,
  type TrainingHistoryItem,
} from "@/utils/training-history";

interface DashboardResponse {
  meta: {
    success: boolean;
    message: string;
  };
  data: {
    user: {
      id: string;
      name: string;
      gender: string;
      avatar_id: number;
      streak: number;
    };
    xp: {
      total: number;
    };
    features: {
      conversation: {
        total_sessions: number;
        avg_score: number;
      };
      expression: {
        total_sessions: number;
        avg_score: number;
      };
      emotion: {
        total_sessions: number;
        avg_score: number;
      };
      story: {
        total_sessions: number;
        avg_score: number;
      };
    };
    missions: {
      completed_today: number;
      total_today: number;
    };
    badges: {
      unlocked: number;
      total: number;
      latest:
        | {
            id: string;
            name: string;
            description: string;
            icon_url: string;
            is_unlocked: boolean;
            earned_at: string;
          }[]
        | null;
    };
  };
}

interface FeatureItem {
  key: string;
  title: string;
  avgScore: number;
  totalSessions: number;
}

export default function Beranda() {
  const [dashboard, setDashboard] = useState<DashboardResponse["data"] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [riwayatLatihan, setRiwayatLatihan] = useState<TrainingHistoryItem[]>(
    [],
  );

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await apiFetch("/api/v1/dashboard", {
          method: "GET",
        });

        const json = (await response.json()) as DashboardResponse;

        if (!response.ok || !json.meta?.success) {
          throw new Error(
            json.meta?.message || "Gagal mengambil data dashboard",
          );
        }

        if (!isMounted) return;
        setDashboard(json.data);
      } catch (error) {
        if (!isMounted) return;
        setDashboard(null);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat memuat dashboard",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const loadHistory = () => {
      setRiwayatLatihan(getTrainingHistory());
    };

    loadHistory();
    window.addEventListener("training-history-updated", loadHistory);

    return () => {
      window.removeEventListener("training-history-updated", loadHistory);
    };
  }, []);

  const featureItems = useMemo<FeatureItem[]>(() => {
    if (!dashboard) return [];

    return [
      {
        key: "story",
        title: "Cerita Interaktif",
        avgScore: dashboard.features.story.avg_score,
        totalSessions: dashboard.features.story.total_sessions,
      },
      {
        key: "emotion",
        title: "Memahami Emosi",
        avgScore: dashboard.features.emotion.avg_score,
        totalSessions: dashboard.features.emotion.total_sessions,
      },
      {
        key: "expression",
        title: "Mengenal Ekspresi",
        avgScore: dashboard.features.expression.avg_score,
        totalSessions: dashboard.features.expression.total_sessions,
      },
      {
        key: "conversation",
        title: "Simulasi Percakapan",
        avgScore: dashboard.features.conversation.avg_score,
        totalSessions: dashboard.features.conversation.total_sessions,
      },
    ];
  }, [dashboard]);

  const chartLabels = ["Story", "Emosi", "Eksp", "Chat"];

  const chartValues = featureItems.map((item) =>
    Math.min(100, Math.max(0, Math.round(item.avgScore))),
  );

  const latestBadge = dashboard?.badges?.latest?.[0] ?? null;

  const getRoutePath = (title: string | undefined) => {
    if (!title) return "Interaktif";
    if (title === "Cerita Interaktif") return "Interaktif";
    if (title === "Memahami Emosi") return "Emosi";
    if (title === "Mengenal Ekspresi") return "Ekspresi";
    if (title === "Simulasi Percakapan") return "SimulasiPercakapan";
    return "Interaktif";
  };

  return (
    <div className="w-full max-w-435 mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start relative">
        {/* Right Sidebar Component */}
        <Badge
          showMisi={true}
          missionSummary={dashboard?.missions}
          latestBadge={latestBadge}
          badgeSummary={dashboard?.badges}
        />

        {/* Main Content */}
        <div className="flex-1 w-full order-2 xl:order-1 min-w-0">
          <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1">
            Halo, {isLoading ? "..." : (dashboard?.user.name ?? "Pengguna")}
          </h2>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Selamat Pagi!
          </h1>

          {errorMessage && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Yellow Banner */}
          <div className="bg-[#FFF9E6] rounded-[20px] p-4 lg:px-7 py-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm border border-[#fef0b3]">
            <p className="text-base lg:text-[22px] font-medium text-black">
              Sudahkah kamu latihan hari ini? Pingo menunggu kamu
            </p>
            <Link href="/dashboard/latihan">
              <button className="bg-[#ffc107] hover:bg-[#ffb300] text-white font-bold  mx-auto block md:mx-0 py-1 md:py-2 px-8 md:px-12  rounded-full border-[5px] border-[#FFDE00] shadow-md hover:shadow-lg transition-all text-base md:text-lg lg:text-lg">
                Yuk Latihan !
              </button>
            </Link>
          </div>

          <h2 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-4">
            Progress Kamu
          </h2>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
            <span>Total XP:</span>
            <span className="text-[#2cb46c] font-bold">
              {dashboard?.xp.total ?? 0} XP
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Chart Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8 flex-1 shadow-sm flex flex-col justify-end">
              <div className="flex items-end justify-between h-40 mb-4 gap-2 lg:gap-4 px-2">
                {(isLoading ? [0, 0, 0, 0] : chartValues).map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center flex-1 group"
                  >
                    <div
                      className="w-full max-w-7 bg-[#2cb46c] rounded-full"
                      style={{
                        height: `${h}%`,
                        minHeight: h > 0 ? "28px" : "0",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center px-1">
                {chartLabels.map((d, i) => (
                  <span
                    key={i}
                    className="text-[14px] font-bold text-gray-500 text-center flex-1"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Today's Training Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8 flex-1 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-500 mb-6">
                Latihan Hari Ini
              </h3>
              <div className="flex flex-col gap-6">
                {(isLoading ? [] : featureItems).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#e6fbf2] flex items-center justify-center shrink-0">
                        <Image
                          src="/icon/IconList.svg"
                          alt="Latihan"
                          width={24}
                          height={24}
                        />
                      </div>
                      <span className="text-sm md:text-sm lg:text-xl font-semibold text-gray-900">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-sm md:text-sm lg:text-lg font-medium text-gray-400">
                      {item.totalSessions} Sesi
                    </span>
                  </div>
                ))}
                {!isLoading && featureItems.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Belum ada data latihan.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Training History Header */}
          <div className="flex justify-between items-center mb-4 mt-8">
            <h2 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900">
              Riwayat Latihan
            </h2>
            <Link href="/dashboard/riwayat">
              <button className="text-base md:text-base lg:text-lg pr-6 font-semibold text-gray-900 hover:text-[#2cb46c] transition-colors">
                Lihat Semua
              </button>
            </Link>
          </div>

          {/* Training History List */}
          <div className="bg-white border border-gray-200 rounded-3xl flex flex-col shadow-sm">
            {riwayatLatihan.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className={`flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 gap-6 ${
                  idx !== Math.min(riwayatLatihan.length, 3) - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-6 flex-1 w-full">
                  <div className="w-13 h-13 rounded-xl bg-[#e6fbf2] flex items-center justify-center shrink-0">
                    <Image
                      src="/icon/IconList.svg"
                      alt="Icon"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 w-full">
                    <div>
                      <p className="text-base font-medium text-gray-400 mb-1">
                        Latihan
                      </p>
                      <p className="text-sm md:text-sm lg:text-xl font-semibold text-gray-900 leading-snug">
                        {item.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-400 mb-1">
                        Tanggal
                      </p>
                      <p className="text-sm md:text-sm lg:text-xl font-medium text-gray-900 leading-snug">
                        {formatHistoryDate(item.completedAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-400 mb-1">
                        Total XP
                      </p>
                      <p className="text-sm md:text-sm lg:text-xl font-semibold text-gray-900 leading-snug">
                        {item.xp}
                      </p>
                    </div>
                  </div>
                </div>
                <Link href={`/latihan/${getRoutePath(item.title)}?review=true`}>
                  <button className="text-sm md:text-sm lg:text-xl px-8 py-3 w-full lg:w-auto bg-[#2cb46c] text-white font-bold rounded-xl hover:bg-[#259b5c] transition-colors whitespace-nowrap">
                    Lihat
                  </button>
                </Link>
              </div>
            ))}
            {!isLoading && riwayatLatihan.length === 0 && (
              <div className="p-6 text-sm text-gray-500">
                Belum ada riwayat latihan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
