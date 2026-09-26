import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SearchClient } from "@/components/SearchClient";

// Search results are dynamic and not meaningfully unique per query, so this
// page is intentionally noindex (see brief §28) and blocked in robots.ts.
export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search BusinessCalc calculators and guides.",
  path: "/search",
  noindex: true,
});

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-ink-900">Search</h1>
      <p className="mt-2 text-ink-700">Find a calculator or guide by name.</p>
      <div className="mt-6">
        <SearchClient />
      </div>
    </div>
  );
}
