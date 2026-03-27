"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiFetch } from "@/utils/api";

interface MissionSummary {
  completed_today: number;
  total_today: number;
}

interface BadgeLatestItem {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  is_unlocked: boolean;
  earned_at: string | null;
}

interface BadgeSummary {
  unlocked: number;
  total: number;
}

interface RightSidebarProps {
  showMisi?: boolean;
  missionSummary?: MissionSummary;
  latestBadge?: BadgeLatestItem | null;
  badgeSummary?: BadgeSummary;
  userTotalXp?: number;
}

interface BadgesResponse {
  meta: {
    success: boolean;
    message: string;
  };
  data: {
    unlocked: number;
    total: number;
    badges: BadgeLatestItem[];
  };
}

interface DashboardMissionsResponse {
  meta: {
    success: boolean;
    message: string;
  };
  data: {
    missions: MissionSummary;
    xp?: {
      total: number;
    };
  };
}

const badgeImageByName: Record<string, string> = {
  Pemula: "/penghargaan/Pemula.svg",
  Penjelajah: "/penghargaan/Penjelajah.svg",
  Jagoan: "/penghargaan/Jagoan.svg",
  Raja: "/penghargaan/Raja.svg",
  Master: "/penghargaan/Master.svg",
};

const xpTargetByBadgeName: Record<string, number> = {
  Penjelajah: 200,
  Jagoan: 500,
  Raja: 1000,
  Master: 2000,
};

export default function RightSidebar({
  showMisi = true,
  missionSummary,
  latestBadge,
  badgeSummary,
  userTotalXp,
}: RightSidebarProps) {
  const [fetchedBadges, setFetchedBadges] = useState<
    BadgesResponse["data"] | null
  >(null);
  const [fetchedMissionSummary, setFetchedMissionSummary] =
    useState<MissionSummary | null>(null);
  const [fetchedUserXp, setFetchedUserXp] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchBadges = async () => {
      try {
        const response = await apiFetch("/api/v1/badges", {
          method: "GET",
        });

        const json = (await response.json()) as BadgesResponse;

        if (!response.ok || !json.meta?.success) {
          throw new Error(json.meta?.message || "Gagal mengambil badge");
        }

        if (!isMounted) return;
        setFetchedBadges(json.data);
      } catch {
        if (!isMounted) return;
        setFetchedBadges(null);
      }
    };

    fetchBadges();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!showMisi || missionSummary) {
      setFetchedMissionSummary(null);
      return;
    }

    let isMounted = true;

    const fetchMissionSummary = async () => {
      try {
        const response = await apiFetch("/api/v1/dashboard", {
          method: "GET",
        });

        const json = (await response.json()) as DashboardMissionsResponse;

        if (!response.ok || !json.meta?.success) {
          throw new Error(json.meta?.message || "Gagal mengambil misi harian");
        }

        if (!isMounted) return;
        setFetchedMissionSummary(json.data?.missions ?? null);
        setFetchedUserXp(
          Number.isFinite(json.data?.xp?.total)
            ? (json.data?.xp?.total ?? 0)
            : 0,
        );
      } catch {
        if (!isMounted) return;
        setFetchedMissionSummary(null);
        setFetchedUserXp(0);
      }
    };

    fetchMissionSummary();

    return () => {
      isMounted = false;
    };
  }, [showMisi, missionSummary]);

  const resolvedMissionSummary = missionSummary ?? fetchedMissionSummary;

  const totalMissions = resolvedMissionSummary?.total_today ?? 0;
  const completedMissions = resolvedMissionSummary?.completed_today ?? 0;
  const missionProgress =
    totalMissions > 0
      ? Math.round((completedMissions / totalMissions) * 100)
      : 0;

  const resolvedBadgeSummary =
    fetchedBadges ??
    (badgeSummary
      ? {
          unlocked: badgeSummary.unlocked,
          total: badgeSummary.total,
          badges: latestBadge ? [latestBadge] : [],
        }
      : null);

  const unlockedCount = resolvedBadgeSummary?.unlocked ?? 0;
  const currentUserXp = Number.isFinite(userTotalXp)
    ? (userTotalXp ?? 0)
    : fetchedUserXp;

  const resolvedFeaturedBadge = useMemo(() => {
    if (fetchedBadges?.badges?.length) {
      const nextLockedBadge = fetchedBadges.badges.find(
        (badge) => !badge.is_unlocked,
      );

      if (nextLockedBadge) return nextLockedBadge;

      const unlocked = fetchedBadges.badges.filter(
        (badge) => badge.is_unlocked,
      );

      if (unlocked.length === 0) return null;

      return unlocked.sort((a, b) => {
        const dateA = a.earned_at ? new Date(a.earned_at).getTime() : 0;
        const dateB = b.earned_at ? new Date(b.earned_at).getTime() : 0;
        return dateB - dateA;
      })[0];
    }

    return latestBadge ?? null;
  }, [fetchedBadges, latestBadge]);

  const featuredBadgeIcon =
    unlockedCount === 0
      ? "/logo/BadgeLevel.svg"
      : resolvedFeaturedBadge
        ? (badgeImageByName[resolvedFeaturedBadge.name] ??
          "/logo/BadgeLevel.svg")
        : "/logo/BadgeLevel.svg";

  const featuredBadgeAlt =
    unlockedCount === 0
      ? "Lencana Terkunci"
      : resolvedFeaturedBadge
        ? `Lencana ${resolvedFeaturedBadge.name}`
        : "Lencana Level";

  const badgeTarget = resolvedFeaturedBadge
    ? resolvedFeaturedBadge.name === "Pemula"
      ? 1
      : (xpTargetByBadgeName[resolvedFeaturedBadge.name] ?? 1)
    : 1;

  const badgeCurrent = resolvedFeaturedBadge
    ? resolvedFeaturedBadge.name === "Pemula"
      ? resolvedFeaturedBadge.is_unlocked
        ? 1
        : 0
      : resolvedFeaturedBadge.is_unlocked
        ? badgeTarget
        : Math.min(currentUserXp, badgeTarget)
    : 0;

  const badgeProgress =
    badgeTarget > 0 ? Math.round((badgeCurrent / badgeTarget) * 100) : 0;

  return (
    <div className="w-full xl:w-112.5 shrink-0 order-1 xl:order-2 block">
      <div className="bg-white border border-gray-200 rounded-[20px] p-5 lg:p-6 shadow-sm">
        <h3 className="text-[#2cb46c] font-bold mb-3 lg:mb-4 text-base md:text-lg lg:text-2xl">
          Lencana
        </h3>
        <div className="flex gap-4 items-center">
          <div className="shrink-0">
            <Image
              src={featuredBadgeIcon}
              alt={featuredBadgeAlt}
              width={48}
              height={56}
              className="object-contain w-10 h-10 lg:w-12 lg:h-14"
            />
          </div>
          <p className="text-sm md:text-sm lg:text-xl text-gray-900 font-bold leading-snug">
            {resolvedFeaturedBadge
              ? `${resolvedFeaturedBadge.name}: ${resolvedFeaturedBadge.description}`
              : "Mulai latihan untuk mendapatkan badge pertamamu!"}
          </p>
        </div>
        <div className="pl-14 lg:pl-16">
          <p className="mt-1 text-xs lg:text-sm text-center text-gray-500">
            {resolvedBadgeSummary?.unlocked ?? 0} /{" "}
            {resolvedBadgeSummary?.total ?? 0} badge terbuka
          </p>
          <div className="mt-3 w-full bg-[#d1d5db] rounded-full h-5.5 lg:h-6 relative flex items-center justify-center overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#2cb46c]"
              style={{ width: `${badgeProgress}%` }}
            ></div>
            <span className="relative z-10 text-[11px] lg:text-xs font-bold text-gray-900">
              {badgeCurrent} / {badgeTarget}
            </span>
          </div>
        </div>
      </div>

      {/* Misi Harian */}
      {showMisi && (
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 mt-5 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-[#2cb46c] font-bold text-base md:text-lg lg:text-2xl">
              Misi Harian
            </h3>
            <Link href="/dashboard/misi">
              <button className="text-sm md:text-sm lg:text-base text-gray-900 font-bold hover:text-green-500 transition-colors">
                Lihat Semua
              </button>
            </Link>
          </div>
          <div className="flex gap-4 items-start">
            <div className="shrink-0 pt-1">
              <Image
                src="/dashboard/MisiIcon.svg"
                alt="Mission Icon"
                width={48}
                height={56}
                className="object-contain w-10 h-10 lg:w-12 lg:h-14"
              />
            </div>
            <div className="grow flex flex-col justify-center">
              <p className="text-sm md:text-sm lg:text-xl text-gray-900 font-bold leading-snug mb-2 lg:mb-3">
                {totalMissions > 0
                  ? `Kamu sudah menyelesaikan ${completedMissions} dari ${totalMissions} misi hari ini.`
                  : "Belum ada misi hari ini"}
              </p>
              <div className="w-full bg-[#d1d5db] rounded-full h-5.5 lg:h-6 relative flex items-center justify-center overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#2cb46c]"
                  style={{ width: `${missionProgress}%` }}
                ></div>
                <span className="relative z-10 text-[11px] lg:text-xs font-bold  text-gray-900">
                  {completedMissions} / {totalMissions}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
