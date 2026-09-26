import Link from "next/link";
import { calculators } from "@/lib/calculators/registry";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-ink-900">Page not found</h1>
      <p className="mt-2 text-ink-700">
        That page doesn&apos;t exist. Try one of the calculators below, or browse the full list.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {calculators.slice(0, 4).map((c) => (
          <Link
            key={c.slug}
            href={`/calculators/${c.slug}`}
            className="rounded-lg border border-ink-300/60 px-4 py-2 text-sm hover:bg-ink-50"
          >
            {c.name}
          </Link>
        ))}
      </div>
      <Link href="/calculators" className="mt-6 inline-block text-brand-600 underline">
        Browse all calculators
      </Link>
    </div>
  );
}
