import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Methodology",
  description: "How BusinessCalc formulas are chosen, tested, and reviewed.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 prose prose-ink">
      <h1 className="text-3xl font-bold text-ink-900">Methodology</h1>
      <ul className="mt-6 space-y-4 text-ink-700">
        <li>
          <strong className="text-ink-900">Formula selection:</strong> every formula is a
          standard, widely documented business or financial formula — not something invented for
          this site.
        </li>
        <li>
          <strong className="text-ink-900">Testing:</strong> every calculation is implemented as
          a pure function with automated unit tests covering normal inputs, zero values, negative
          values, and boundary conditions (see the test suite in the codebase).
        </li>
        <li>
          <strong className="text-ink-900">Edge cases:</strong> calculators reject inputs that
          would produce an undefined or misleading result (like dividing by zero) with a clear
          message, instead of showing NaN or an infinite value.
        </li>
        <li>
          <strong className="text-ink-900">Review and updates:</strong> content is only marked as
          updated when it has actually been reviewed or materially changed — not on a fixed
          schedule for appearance&apos;s sake.
        </li>
      </ul>
    </div>
  );
}
