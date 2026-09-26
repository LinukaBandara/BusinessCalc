import { FAQItem } from "@/lib/calculators/types";

export function FAQSection({ items }: { items: FAQItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="space-y-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 id="faq-heading" className="text-xl font-semibold text-ink-900">
        Frequently asked questions
      </h2>
      <div className="divide-y divide-ink-300/40 rounded-xl border border-ink-300/40">
        {items.map((item) => (
          <details key={item.question} className="group p-4">
            <summary className="cursor-pointer list-none font-medium text-ink-900 marker:content-none">
              {item.question}
            </summary>
            <p className="mt-2 text-sm text-ink-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
