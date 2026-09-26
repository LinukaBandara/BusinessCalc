"use client";

/**
 * Minimal analytics wrapper. Right now this just no-ops outside development
 * (where it logs to the console) so calculator components have a stable
 * event-tracking call site. Wire this up to Google Analytics (gtag) once
 * NEXT_PUBLIC_GA_ID is set — see README "Environment variables".
 */
export type AnalyticsEvent =
  | "calculator_open"
  | "calculator_calculated"
  | "calculator_reset"
  | "result_copied"
  | "result_shared"
  | "guide_opened"
  | "related_calculator_clicked"
  | "search_used";

export function trackEvent(event: AnalyticsEvent, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;

  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params);
  }
}
