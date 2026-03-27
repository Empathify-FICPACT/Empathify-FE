export const APP_ERROR_EVENT = "app-error-message";

export function showErrorMessage(message: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(APP_ERROR_EVENT, {
      detail: {
        message: message || "Terjadi kesalahan.",
      },
    }),
  );
}
