import { notFound } from "next/navigation";
import { Metadata } from "next";
import { calculators, getCalculatorBySlug, getRelatedCalculators, categoryLabels } from "@/lib/calculators/registry";
import { listCalculators, getListCalculatorBySlug } from "@/lib/calculators/listRegistry";
import { getGuidesForCalculator } from "@/lib/guides/registry";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { ListCalculatorShell } from "@/components/ListCalculatorShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { RelatedGuides } from "@/components/RelatedGuides";
import { AdSlotBelowCalculator } from "@/components/AdSlots";

export function generateStaticParams() {
  return [...calculators.map((c) => ({ slug: c.slug })), ...listCalculators.map((c) => ({ slug: c.slug }))];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const def = getCalculatorBySlug(params.slug) ?? getListCalculatorBySlug(params.slug);
  if (!def) return {};
  return buildMetadata({
    title: def.metaTitle,
    description: def.metaDescription,
    path: `/calculators/${def.slug}`,
  });
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const def = getCalculatorBySlug(params.slug);
  const listDef = def ? undefined : getListCalculatorBySlug(params.slug);
  const active = def ?? listDef;
  if (!active) notFound();

  const related = def
    ? getRelatedCalculators(def)
    : listDef!.relatedSlugs
        .map((slug) => getListCalculatorBySlug(slug))
        .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const relatedGuides = getGuidesForCalculator(active.slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: categoryLabels[active.category], href: `/${active.category}` },
          { name: active.name, href: `/calculators/${active.slug}` },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold text-ink-900">{active.name}</h1>
      <p className="mt-2 max-w-prose text-ink-700">{active.shortDescription}</p>

      <div className="mt-8">
        {def ? <CalculatorShell slug={def.slug} /> : <ListCalculatorShell slug={listDef!.slug} />}
      </div>

      <AdSlotBelowCalculator />

      <section className="mt-12 space-y-3">
        <h2 className="text-xl font-semibold text-ink-900">Formula</h2>
        <p className="rounded-lg bg-ink-900 px-4 py-3 font-mono text-sm text-white">
          {active.formulaDisplay}
        </p>
        <ul className="space-y-1 text-sm text-ink-700">
          {active.variables.map((v) => (
            <li key={v.symbol}>
              <span className="font-medium text-ink-900">{v.name}</span> — {v.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-3">
        <h2 className="text-xl font-semibold text-ink-900">Common mistakes</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-700">
          {active.commonMistakes.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>

      <div className="mt-12">
        <FAQSection items={active.faq} />
      </div>

      <div className="mt-12">
        <RelatedGuides items={relatedGuides} />
      </div>

      <div className="mt-12">
        <RelatedCalculators items={related} />
      </div>

      <p className="mt-12 text-xs text-ink-500 border-t border-ink-300/40 pt-6">
        This calculator provides estimates based on the information you enter and is intended for
        informational and educational purposes only. It is not professional financial, tax,
        accounting, or legal advice.
      </p>
    </div>
  );
}
