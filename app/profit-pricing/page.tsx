import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = buildMetadata({
  title: "Profit & Pricing Calculators",
  description: "Calculators for profit margin, markup, gross profit, net profit, and discounts.",
  path: "/profit-pricing",
});

export default function ProfitPricingPage() {
  return (
    <CategoryPageContent
      category="profit-pricing"
      intro="Work out how much you're really making — from raw profit and margin to how a discount affects your bottom line."
    />
  );
}
