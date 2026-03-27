import Cookies from "js-cookie";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://empathify-be-staging.fly.dev";

/**
 * Wrapper untuk fetch API yang secara otomatis menyertakan
 * token Authorization (Bearer) dari Cookies (jika ada).
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = Cookies.get("access_token");

  const headers = new Headers(options.headers || {});

  // Set default content type jika belum di-set dan method-nya bukan GET/HEAD
  // Serta JANGAN set application/json jika body adalah FormData (biarkan browser set otomatis `multipart/form-data`)
  if (
    !headers.has("Content-Type") &&
    options.method &&
    !["GET", "HEAD"].includes(options.method.toUpperCase()) &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  // Sisipkan token otorisasi ke header
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Format URL dengan benar
  const isAbsoluteUrl = endpoint.startsWith("http");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = isAbsoluteUrl ? endpoint : `${BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
}
