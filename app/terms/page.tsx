import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms governing use of BusinessCalc's calculators and content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 prose prose-ink">
      <h1 className="text-3xl font-bold text-ink-900">Terms of Use</h1>
      <p className="mt-4 text-ink-700">
        BusinessCalc's calculators and content are provided for informational and educational
        purposes only, without warranty of any kind. You are responsible for verifying any result
        before relying on it for a business, financial, tax, or legal decision. [Placeholder —
        replace with finalized terms reviewed by counsel before launch.]
      </p>
    </div>
  );
}
