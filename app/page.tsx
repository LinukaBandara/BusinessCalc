import Link from "next/link";
import { calculators } from "@/lib/calculators/registry";

export default function HomePage() {
  const popular = calculators.slice(0, 5);

  return (
    <>
      <section className="border-b border-ink-300/40 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            Free Business Calculators &amp; Tools
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-700 sm:text-lg">
            Calculate profit, pricing, ROI, growth, margins, break-even points, and more with
            simple, accurate calculators.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-700"
            >
              Explore calculators
            </Link>
            <Link
              href="#popular"
              className="rounded-lg border border-ink-300/60 px-6 py-3 font-medium text-ink-700 hover:bg-ink-50"
            >
              Popular calculators
            </Link>
          </div>
        </div>
      </section>

      <section id="popular" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-ink-900">Popular calculators</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((c) => (
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-ink-900">Why use BusinessCalc</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-medium text-ink-900">Every formula shown</p>
            <p className="mt-1 text-sm text-ink-700">
              No black boxes — every calculator shows the exact formula and a worked example.
            </p>
          </div>
          <div>
            <p className="font-medium text-ink-900">Built for real use</p>
            <p className="mt-1 text-sm text-ink-700">
              Handles edge cases like zero and negative values instead of breaking or showing NaN.
            </p>
          </div>
          <div>
            <p className="font-medium text-ink-900">No account required</p>
            <p className="mt-1 text-sm text-ink-700">
              Every calculator works instantly and anonymously, right in your browser.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
