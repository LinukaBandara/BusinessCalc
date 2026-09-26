import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About BusinessCalc",
  description: "What BusinessCalc is, who it's for, and how it makes money.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 prose prose-ink">
      <h1 className="text-3xl font-bold text-ink-900">About BusinessCalc</h1>
      <p className="mt-4 text-ink-700">
        BusinessCalc is a free set of business calculators for profit, pricing, growth, and
        related metrics. It exists because these calculations are genuinely useful but the
        formulas behind them aren&apos;t always clearly explained — most sites either bury the
        formula or skip the explanation entirely.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-ink-900">Who it&apos;s for</h2>
      <p className="mt-2 text-ink-700">
        Small business owners, freelancers, founders, marketers, and students who need a quick,
        correct answer plus enough context to understand what it means.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-ink-900">How calculations are built</h2>
      <p className="mt-2 text-ink-700">
        Each calculator is backed by a standard, documented formula, implemented as a tested
        function and validated against known worked examples. See the{" "}
        <a href="/methodology" className="text-brand-600 underline">
          methodology page
        </a>{" "}
        for details.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-ink-900">How this site makes money</h2>
      <p className="mt-2 text-ink-700">
        BusinessCalc is supported by advertising and, where relevant, affiliate links to business
        tools and services. Ads and affiliate links never appear inside a calculator&apos;s
        inputs or results, and affiliate relationships are disclosed on the{" "}
        <a href="/affiliate-disclosure" className="text-brand-600 underline">
          affiliate disclosure page
        </a>
        .
      </p>
    </div>
  );
}
