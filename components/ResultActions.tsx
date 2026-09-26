"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function ResultActions({ summary }: { summary: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      trackEvent("result_copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail (permissions, insecure context) — fail silently,
      // the result text is already visible on screen.
    }
  }

  async function handleShare() {
    trackEvent("result_shared");
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ text: summary, url: window.location.href });
        return;
      } catch {
        // User cancelled the native share sheet, or it's unsupported — fall through to copy.
      }
    }
    handleCopy();
  }

  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <div className="flex flex-wrap gap-2 no-print">
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-lg border border-ink-300/60 px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-ink-50"
      >
        {copied ? "Copied!" : "Copy result"}
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="rounded-lg border border-ink-300/60 px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-ink-50"
      >
        Share
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="rounded-lg border border-ink-300/60 px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-ink-50"
      >
        Print
      </button>
    </div>
  );
}
