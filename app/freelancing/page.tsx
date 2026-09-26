import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = buildMetadata({
  title: "Freelancing Calculators",
  description: "Calculators for setting a freelance rate and converting between hourly and salaried pay.",
  path: "/freelancing",
});

export default function FreelancingPage() {
  return (
    <CategoryPageContent
      category="freelancing"
      intro="Price your time with confidence — set a freelance rate, or convert between hourly and annual pay."
    />
  );
}
