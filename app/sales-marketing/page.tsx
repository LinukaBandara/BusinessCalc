import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = buildMetadata({
  title: "Sales & Marketing Calculators",
  description: "Calculators for conversion rate, customer acquisition cost, customer lifetime value, and commission.",
  path: "/sales-marketing",
});

export default function SalesMarketingPage() {
  return (
    <CategoryPageContent
      category="sales-marketing"
      intro="Measure what your marketing and sales efforts are actually returning — from conversion rate to CAC and CLV."
    />
  );
}
