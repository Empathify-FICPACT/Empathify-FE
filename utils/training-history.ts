export interface TrainingHistoryItem {
  id: string;
  title: string;
  completedAt: string;
  xp: number;
  correct?: number;
  total?: number;
  reviewData?: {
    scenarios?: unknown[];
    questions?: unknown[];
    answers?: Record<string, unknown>;
    attempts?: unknown[];
  };
}

const TRAINING_ROUTE_BY_TITLE: Record<string, string> = {
  "Cerita Interaktif": "Interaktif",
  "Memahami Emosi": "Emosi",
  "Mengenal Ekspresi": "Ekspresi",
  "Simulasi Percakapan": "SimulasiPercakapan",
};

const STORAGE_KEY = "empathify_training_history";
const MAX_ITEMS = 100;

export function getTrainingHistory(): TrainingHistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as TrainingHistoryItem[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.title === "string" &&
          typeof item.completedAt === "string" &&
          typeof item.xp === "number" &&
          (item.correct === undefined || typeof item.correct === "number") &&
          (item.total === undefined || typeof item.total === "number") &&
          (item.reviewData === undefined ||
            (typeof item.reviewData === "object" && item.reviewData !== null)),
      )
      .sort(
        (a, b) =>
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
      );
  } catch {
    return [];
  }
}

export function getTrainingHistoryItemById(id: string) {
  if (!id) return null;
  return getTrainingHistory().find((item) => item.id === id) ?? null;
}

export function getTrainingRoutePath(title: string | undefined) {
  if (!title) return "Interaktif";
  return TRAINING_ROUTE_BY_TITLE[title] ?? "Interaktif";
}

export function buildTrainingResultHref(item: TrainingHistoryItem) {
  const routePath = getTrainingRoutePath(item.title);
  const params = new URLSearchParams({
    result: "true",
    historyId: item.id,
    xp: String(Number.isFinite(item.xp) ? item.xp : 0),
  });

  if (Number.isFinite(item.correct) && Number.isFinite(item.total)) {
    params.set("correct", String(item.correct));
    params.set("total", String(item.total));
  }

  return `/latihan/${routePath}?${params.toString()}`;
}

export function appendTrainingHistory(
  entry: Omit<TrainingHistoryItem, "id" | "completedAt"> & {
    completedAt?: string;
  },
) {
  if (typeof window === "undefined") return;

  const nextItem: TrainingHistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: entry.title,
    xp: Number.isFinite(entry.xp) ? entry.xp : 0,
    correct: Number.isFinite(entry.correct) ? entry.correct : undefined,
    total: Number.isFinite(entry.total) ? entry.total : undefined,
    reviewData: entry.reviewData,
    completedAt: entry.completedAt ?? new Date().toISOString(),
  };

  const current = getTrainingHistory();
  const merged = [nextItem, ...current].slice(0, MAX_ITEMS);

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  window.dispatchEvent(new Event("training-history-updated"));
}

export function formatHistoryDate(dateIso: string) {
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) return "-";

  const datePart = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${datePart} · ${timePart}`;
}
