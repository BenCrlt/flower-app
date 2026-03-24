const DEV_ORIGINS = ["http://localhost:3000", "http://localhost:5173"] as const;

/**
 * Origines autorisées pour CORS et better-auth (`trustedOrigins`).
 * `FRONTEND_URL` peut contenir plusieurs URLs séparées par des virgules.
 */
export function getTrustedFrontendOrigins(): string[] {
  const extra =
    process.env.FRONTEND_URL?.split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0) ?? [];
  return [...new Set([...DEV_ORIGINS, ...extra])];
}
