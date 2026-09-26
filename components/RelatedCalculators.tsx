import Link from "next/link";
import { CalculatorDefinition } from "@/lib/calculators/types";

export function RelatedCalculators({ items }: { items: CalculatorDefinition[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="space-y-3">
      <h2 id="related-heading" className="text-xl font-semibold text-ink-900">
        Related calculators
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/calculators/${c.slug}`}
              className="block rounded-xl border border-ink-300/40 p-4 hover:border-brand-500 hover:bg-brand-50/40"
            >
              <p className="font-medium text-ink-900">{c.name}</p>
              <p className="text-sm text-ink-500">{c.shortDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
