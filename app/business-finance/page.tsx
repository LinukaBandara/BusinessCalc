import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = buildMetadata({
  title: "Business Finance Calculators",
  description: "Calculators for ROI, break-even, CAGR, and revenue growth.",
  path: "/business-finance",
});

export default function BusinessFinancePage() {
  return (
    <CategoryPageContent
      category="business-finance"
      intro="Evaluate investments, find your break-even point, and track growth over time with these core finance calculators."
    />
  );
}
