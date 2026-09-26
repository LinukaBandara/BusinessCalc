import Link from "next/link";
import { GuideDefinition } from "@/lib/guides/types";

export function RelatedGuides({ items }: { items: GuideDefinition[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="guides-heading" className="space-y-3">
      <h2 id="guides-heading" className="text-xl font-semibold text-ink-900">
        Related guides
      </h2>
      <ul className="space-y-2">
        {items.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="text-brand-600 underline hover:text-brand-700">
              {g.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
