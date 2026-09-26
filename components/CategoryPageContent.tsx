import Link from "next/link";
import { CalculatorDefinition, calculators, categoryLabels } from "@/lib/calculators/registry";
import { listCalculators } from "@/lib/calculators/listRegistry";
import { getGuidesByCategory } from "@/lib/guides/registry";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface CategoryPageContentProps {
  category: CalculatorDefinition["category"];
  intro: string;
}

export function CategoryPageContent({ category, intro }: CategoryPageContentProps) {
  const fixedItems = calculators.filter((c) => c.category === category);
  const listItems = listCalculators.filter((c) => c.category === category);
  const items = [...fixedItems, ...listItems];
  const relatedGuides = getGuidesByCategory(category);
  const label = categoryLabels[category];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: label, href: `/${category}` }]} />
      <h1 className="mt-4 text-3xl font-bold text-ink-900">{label}</h1>
      <p className="mt-2 max-w-2xl text-ink-700">{intro}</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-ink-900">Calculators</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}`} className="rounded-xl border border-ink-300/40 p-5 hover:border-brand-500 hover:bg-brand-50/40">
              <p className="font-medium text-ink-900">{c.name}</p>
              <p className="mt-1 text-sm text-ink-500">{c.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      {relatedGuides.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-ink-900">Guides</h2>
          <ul className="mt-4 space-y-2">
            {relatedGuides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="text-brand-600 underline hover:text-brand-700">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
