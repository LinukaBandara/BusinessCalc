"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { calculators } from "@/lib/calculators/registry";
import { listCalculators } from "@/lib/calculators/listRegistry";
import { guides } from "@/lib/guides/registry";
import { trackEvent } from "@/lib/analytics";

interface SearchResult {
  type: "calculator" | "guide";
  slug: string;
  title: string;
  description: string;
  href: string;
}

const allResults: SearchResult[] = [
  ...calculators.map((c) => ({
    type: "calculator" as const,
    slug: c.slug,
    title: c.name,
    description: c.shortDescription,
    href: `/calculators/${c.slug}`,
  })),
  ...listCalculators.map((c) => ({
    type: "calculator" as const,
    slug: c.slug,
    title: c.name,
    description: c.shortDescription,
    href: `/calculators/${c.slug}`,
  })),
  ...guides.map((g) => ({
    type: "guide" as const,
    slug: g.slug,
    title: g.title,
    description: g.description,
    href: `/guides/${g.slug}`,
  })),
];

export function SearchClient() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return allResults.filter(
      (r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    const q = query.trim();
    if (q.length >= 2) trackEvent("search_used", { query: q });
  }, [query]);

  return (
    <div>
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search calculators and guides… e.g. profit, ROI, salary"
        className="w-full rounded-lg border border-ink-300/60 px-4 py-3 text-lg focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />

      {query.trim().length >= 2 && (
        <p className="mt-4 text-sm text-ink-500">
          {results.length} result{results.length === 1 ? "" : "s"}
        </p>
      )}

      <ul className="mt-4 space-y-3">
        {results.map((r) => (
          <li key={`${r.type}-${r.slug}`}>
            <Link
              href={r.href}
              className="block rounded-xl border border-ink-300/40 p-4 hover:border-brand-500 hover:bg-brand-50/40"
            >
              <p className="text-xs uppercase tracking-wide text-ink-500">
                {r.type === "calculator" ? "Calculator" : "Guide"}
              </p>
              <p className="mt-1 font-medium text-ink-900">{r.title}</p>
              <p className="mt-1 text-sm text-ink-500">{r.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
