import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description: "How BusinessCalc discloses affiliate relationships and advertising.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 prose prose-ink">
      <h1 className="text-3xl font-bold text-ink-900">Affiliate Disclosure</h1>
      <p className="mt-4 text-ink-700">
        Some links on BusinessCalc may be affiliate links, meaning we may earn a commission if you
        sign up for or purchase a product through them, at no extra cost to you. We only link to
        tools genuinely relevant to the calculator or guide you're reading, and affiliate status
        never affects a calculation's result.
      </p>
    </div>
  );
}
