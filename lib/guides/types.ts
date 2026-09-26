import { CalculatorDefinition } from "../calculators/types";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface GuideDefinition {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  category: CalculatorDefinition["category"];
  sections: GuideSection[];
  relatedCalculatorSlugs: string[];
  publishedAt: string; // ISO date, YYYY-MM-DD
  updatedAt: string; // ISO date, YYYY-MM-DD — only bump when content is actually reviewed/changed
}
