"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Badge from "./badge";
import { apiFetch } from "@/utils/api";

interface MissionItem {
  id: string;
  mission_type: string;
  description: string;
  target_value: number;
  current_value: number;
  is_completed: boolean;
  xp_reward: number;
  completed_at: string | null;
}

interface MissionTodayResponse {
  meta: {
    success: boolean;
    message: string;
  };
  data: {
    date: string;
    missions: MissionItem[];
  };
}

const missionIconByType: Record<string, string> = {
  collect_xp: "/dashboard/MisiIcon.svg",
  complete_exercises: "/dashboard/MisiIcon2.svg",
  chat_pingo: "/pinguin/CaptainPingo.svg",
};

function getMissionIcon(missionType: string): string {
  return missionIconByType[missionType] ?? "/dashboard/MisiIcon.svg";
}

function getTimeToMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diffMs = midnight.getTime() - now.getTime();
  const totalMinutes = Math.max(0, Math.floor(diffMs / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} Jam ${minutes.toString().padStart(2, "0")} Menit`;
}

export default function Misi() {
  const [missions, setMissions] = useState<MissionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(getTimeToMidnight());

  useEffect(() => {
    let isMounted = true;

    const fetchTodayMissions = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await apiFetch("/api/v1/missions/today", {
          method: "GET",
        });

        const json = (await response.json()) as MissionTodayResponse;

        if (!response.ok || !json.meta?.success) {
          throw new Error(json.meta?.message || "Gagal mengambil misi harian");
        }

        if (!isMounted) return;
        setMissions(json.data?.missions ?? []);
      } catch (error) {
        if (!isMounted) return;
        const message =
          error instanceof Error ? error.message : "Terjadi kesalahan";
        setErrorMessage(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTodayMissions();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeToMidnight());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const renderedMissions = useMemo(() => missions, [missions]);

  return (
    <div className="w-full max-w-[1740px] mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start relative">
        {/* Right Sidebar - Badge Only */}
        <Badge showMisi={false} />

        {/* Main Content (Misi Harian) */}
        <div className="flex-1 w-full order-2 xl:order-1 min-w-0">
          <div className="flex justify-between items-center mb-6 lg:mb-8 mt-2">
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900">
              Misi Harian
            </h1>
            <span className="text-sm lg:text-base pr-3 pt-2  mt-4 font-bold text-gray-900">
              {timeLeft}
            </span>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 lg:p-6 shadow-sm flex flex-col gap-6">
            {isLoading && (
              <p className="text-sm lg:text-base text-gray-500">
                Memuat misi harian...
              </p>
            )}

            {!isLoading && errorMessage && (
              <p className="text-sm lg:text-base text-red-500">
                {errorMessage}
              </p>
            )}

            {!isLoading && !errorMessage && renderedMissions.length === 0 && (
              <p className="text-sm lg:text-base text-gray-500">
                Belum ada misi hari ini.
              </p>
            )}

            {!isLoading &&
              !errorMessage &&
              renderedMissions.map((mission, index) => {
                const progress =
                  mission.target_value > 0
                    ? Math.min(
                        100,
                        Math.max(
                          0,
                          Math.round(
                            (mission.current_value / mission.target_value) *
                              100,
                          ),
                        ),
                      )
                    : 0;

                return (
                  <div key={mission.id}>
                    <div className="flex gap-4 items-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={getMissionIcon(mission.mission_type)}
                          alt={mission.description}
                          width={60}
                          height={60}
                          className="object-contain w-10 h-10 lg:w-18 lg:h-18"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <p className="text-sm lg:text-xl text-gray-900 font-semibold leading-snug mb-2">
                          {mission.description}
                        </p>
                        <div className="w-full bg-[#d1d5db] rounded-full h-[22px] lg:h-6 relative flex items-center justify-center overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-[#2cb46c]"
                            style={{ width: `${progress}%` }}
                          ></div>
                          <span className="relative z-10 text-[11px] lg:text-sm font-bold text-gray-900">
                            {mission.current_value}/{mission.target_value}
                          </span>
                        </div>
                        <p className="text-xs lg:text-sm text-gray-500 mt-2 font-semibold">
                          Reward: {mission.xp_reward} XP
                        </p>
                      </div>
                    </div>

                    {index !== renderedMissions.length - 1 && (
                      <hr className="border-gray-100 mt-6" />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
