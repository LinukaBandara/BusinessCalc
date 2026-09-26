import { CalculatorVariable, FAQItem, CalcResult } from "./types";
import { calculateAverage, calculateWeightedAverage, ListRow } from "./listCalculations";

export interface ListCalculatorDefinition {
  slug: string;
  name: string;
  category: "business-finance" | "profit-pricing" | "sales-marketing" | "freelancing";
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  formulaDisplay: string;
  variables: CalculatorVariable[];
  /** true = each row has a value and a weight; false = each row is just a value. */
  weighted: boolean;
  defaultRows: ListRow[];
  resultLabel: string;
  resultId: string;
  calculate: (rows: ListRow[]) => CalcResult;
  interpret: (values: Record<string, number>) => string;
  commonMistakes: string[];
  faq: FAQItem[];
  relatedSlugs: string[];
}

export const listCalculators: ListCalculatorDefinition[] = [
  {
    slug: "average",
    name: "Average Calculator",
    category: "business-finance",
    shortDescription: "Find the mean of any list of numbers.",
    metaTitle: "Average Calculator — Mean of a List of Numbers",
    metaDescription: "Calculate the average (mean) of a list of numbers, with support for any number of values.",
    formulaDisplay: "Average = Sum of Values ÷ Count of Values",
    variables: [{ symbol: "Values", name: "Values", description: "The list of numbers you want to average." }],
    weighted: false,
    defaultRows: [{ value: 10, weight: 1 }, { value: 20, weight: 1 }, { value: 30, weight: 1 }],
    resultLabel: "Average",
    resultId: "average",
    calculate: calculateAverage,
    interpret: (v) => `The average of ${v.count} value${v.count === 1 ? "" : "s"} is ${v.average.toLocaleString(undefined, { maximumFractionDigits: 2 })}, with a total of ${v.sum.toLocaleString(undefined, { maximumFractionDigits: 2 })}.`,
    commonMistakes: [
      "Using a plain average when the values represent different-sized groups — a weighted average is usually more accurate there.",
      "Including outliers without checking whether they should be excluded or investigated first.",
    ],
    faq: [
      {
        question: "When should I use a weighted average instead?",
        answer:
          "Use a weighted average when some values matter more than others — for example, averaging test scores where each test counts differently toward a final grade.",
      },
    ],
    relatedSlugs: ["weighted-average"],
  },
  {
    slug: "weighted-average",
    name: "Weighted Average Calculator",
    category: "business-finance",
    shortDescription: "Find an average where some values count more than others.",
    metaTitle: "Weighted Average Calculator — Formula & Example",
    metaDescription: "Calculate a weighted average from a list of values and their weights, with a worked example.",
    formulaDisplay: "Weighted Average = Sum(Value × Weight) ÷ Sum(Weight)",
    variables: [
      { symbol: "Value", name: "Value", description: "Each individual number in the list." },
      { symbol: "Weight", name: "Weight", description: "How much that value should count relative to the others." },
    ],
    weighted: true,
    defaultRows: [{ value: 80, weight: 0.3 }, { value: 90, weight: 0.7 }],
    resultLabel: "Weighted average",
    resultId: "weightedAverage",
    calculate: calculateWeightedAverage,
    interpret: (v) => `The weighted average across ${v.count} value${v.count === 1 ? "" : "s"} is ${v.weightedAverage.toLocaleString(undefined, { maximumFractionDigits: 2 })}, using a total weight of ${v.totalWeight.toLocaleString(undefined, { maximumFractionDigits: 2 })}.`,
    commonMistakes: [
      "Forgetting weights don't need to add up to 1 or 100 — this calculator normalizes by the total weight automatically.",
      "Assigning a weight of 0 to a value you meant to include, which silently drops it from the result.",
    ],
    faq: [
      {
        question: "Do my weights need to add up to 100%?",
        answer:
          "No — this calculator divides by the total weight you enter, so weights of 3 and 7 give the same result as weights of 30% and 70%.",
      },
    ],
    relatedSlugs: ["average"],
  },
];

export function getListCalculatorBySlug(slug: string): ListCalculatorDefinition | undefined {
  return listCalculators.find((c) => c.slug === slug);
}
