import Link from "next/link";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { guides } from "@/lib/guides/registry";
import { categoryLabels } from "@/lib/calculators/registry";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Guides",
  description: "In-depth guides on profit, pricing, business finance, and marketing math, linked to working calculators.",
  path: "/guides",
});

export default function GuidesPage() {
  const byCategory = guides.reduce<Record<string, typeof guides>>((acc, g) => {
    (acc[g.category] ??= []).push(g);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }]} />
      <h1 className="mt-4 text-3xl font-bold text-ink-900">Guides</h1>
      <p className="mt-2 max-w-2xl text-ink-700">
        Plain-English explanations that go deeper than a single calculator — each one links to the
        working tools that put it into practice.
      </p>

      {Object.entries(byCategory).map(([category, items]) => (
        <section key={category} className="mt-10">
          <h2 className="text-xl font-semibold text-ink-900">
            {categoryLabels[category as keyof typeof categoryLabels]}
          </h2>
          <ul className="mt-4 space-y-4">
            {items.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="block rounded-xl border border-ink-300/40 p-5 hover:border-brand-500 hover:bg-brand-50/40">
                  <p className="font-medium text-ink-900">{g.title}</p>
                  <p className="mt-1 text-sm text-ink-500">{g.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
