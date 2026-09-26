import Link from "next/link";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { calculators, categoryLabels } from "@/lib/calculators/registry";
import { listCalculators } from "@/lib/calculators/listRegistry";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "All Business Calculators",
  description:
    "Browse every BusinessCalc calculator: profit margin, markup, ROI, break-even, CAGR, and more, organized by category.",
  path: "/calculators",
});

interface DirectoryItem {
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
}

export default function CalculatorsPage() {
  const allItems: DirectoryItem[] = [...calculators, ...listCalculators];
  const byCategory = allItems.reduce<Record<string, DirectoryItem[]>>((acc, c) => {
    (acc[c.category] ??= []).push(c);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Calculators", href: "/calculators" }]} />
      <h1 className="mt-4 text-3xl font-bold text-ink-900">All calculators</h1>
      <p className="mt-2 max-w-2xl text-ink-700">
        Every calculator shows its formula, a worked example, and what the result means — not
        just a number.
      </p>

      {Object.entries(byCategory).map(([category, items]) => (
        <section key={category} className="mt-10">
          <h2 className="text-xl font-semibold text-ink-900">
            {categoryLabels[category as keyof typeof categoryLabels]}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className="rounded-xl border border-ink-300/40 p-5 hover:border-brand-500 hover:bg-brand-50/40"
              >
                <p className="font-medium text-ink-900">{c.name}</p>
                <p className="mt-1 text-sm text-ink-500">{c.shortDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
