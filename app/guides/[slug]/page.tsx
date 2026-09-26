import { notFound } from "next/navigation";
import { Metadata } from "next";
import { guides, getGuideBySlug } from "@/lib/guides/registry";
import { getCalculatorBySlug, categoryLabels } from "@/lib/calculators/registry";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedCalculators } from "@/components/RelatedCalculators";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  return buildMetadata({ title: guide.metaTitle, description: guide.metaDescription, path: `/guides/${guide.slug}` });
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const relatedCalculators = guide.relatedCalculatorSlugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
    author: { "@type": "Organization", name: "BusinessCalc" },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: categoryLabels[guide.category], href: `/${guide.category}` },
          { name: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-ink-900">{guide.title}</h1>
      <p className="mt-2 text-ink-700">{guide.description}</p>
      <p className="mt-1 text-xs text-ink-500">
        Published {guide.publishedAt}
        {guide.updatedAt !== guide.publishedAt && ` · Updated ${guide.updatedAt}`}
      </p>

      <div className="prose prose-ink mt-8 space-y-8">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-ink-900">{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mt-3 text-ink-700 leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-12">
        <RelatedCalculators items={relatedCalculators} />
      </div>
    </div>
  );
}
