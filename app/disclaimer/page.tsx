import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Financial Disclaimer",
  description: "BusinessCalc calculators are for informational purposes, not professional advice.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 prose prose-ink">
      <h1 className="text-3xl font-bold text-ink-900">Financial Disclaimer</h1>
      <p className="mt-4 text-ink-700">
        The calculators on BusinessCalc provide estimates based on the information entered by the
        user and are intended for informational and educational purposes. Results should not be
        treated as professional financial, tax, accounting, legal, or investment advice. Consult a
        qualified professional for decisions specific to your situation.
      </p>
    </div>
  );
}
