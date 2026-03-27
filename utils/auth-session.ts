import Cookies from "js-cookie";

const ACCESS_TOKEN_COOKIE = "access_token";
const LOGOUT_GRACE_STORAGE_KEY = "empathify_logout_grace_session";
const TEN_MINUTES_IN_MS = 10 * 60 * 1000;
const ACCESS_TOKEN_EXPIRY_IN_DAYS = 7;

interface LogoutGraceSession {
  token: string;
  expiresAt: number;
}

function readLogoutGraceSession(): LogoutGraceSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(LOGOUT_GRACE_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as LogoutGraceSession;

    if (
      !parsed ||
      typeof parsed.token !== "string" ||
      typeof parsed.expiresAt !== "number"
    ) {
      window.localStorage.removeItem(LOGOUT_GRACE_STORAGE_KEY);
      return null;
    }

    if (parsed.expiresAt <= Date.now()) {
      window.localStorage.removeItem(LOGOUT_GRACE_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(LOGOUT_GRACE_STORAGE_KEY);
    return null;
  }
}

export function saveLogoutGraceSession(token: string) {
  if (typeof window === "undefined") return;
  if (!token) return;

  const payload: LogoutGraceSession = {
    token,
    expiresAt: Date.now() + TEN_MINUTES_IN_MS,
  };

  window.localStorage.setItem(
    LOGOUT_GRACE_STORAGE_KEY,
    JSON.stringify(payload),
  );
}

export function hasValidLogoutGraceSession() {
  return Boolean(readLogoutGraceSession());
}

export function restoreSessionFromLogoutGrace() {
  if (typeof window === "undefined") return false;

  const session = readLogoutGraceSession();
  if (!session) return false;

  Cookies.set(ACCESS_TOKEN_COOKIE, session.token, {
    expires: ACCESS_TOKEN_EXPIRY_IN_DAYS,
  });
  window.localStorage.removeItem(LOGOUT_GRACE_STORAGE_KEY);
  return true;
}

export function clearLogoutGraceSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LOGOUT_GRACE_STORAGE_KEY);
}
