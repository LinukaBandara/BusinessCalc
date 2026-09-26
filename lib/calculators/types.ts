export type InputFormat = "currency" | "number" | "percent";
export type OutputFormat = "currency" | "percent" | "number" | "ratio";

export interface CalculatorInputDef {
  id: string;
  label: string;
  format: InputFormat;
  helpText?: string;
  min?: number;
  /** Whether zero is a valid value for this field. */
  allowZero?: boolean;
  defaultValue: number;
}

export interface CalculatorOutputDef {
  id: string;
  label: string;
  format: OutputFormat;
  highlight?: boolean;
}

export type CalcInputs = Record<string, number>;
export type CalcResult = { ok: true; values: Record<string, number> } | { ok: false; error: string };

export interface CalculatorVariable {
  symbol: string;
  name: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorDefinition {
  slug: string;
  name: string;
  category: "profit-pricing" | "business-finance" | "sales-marketing" | "freelancing";
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  formulaDisplay: string;
  variables: CalculatorVariable[];
  inputs: CalculatorInputDef[];
  outputs: CalculatorOutputDef[];
  calculate: (inputs: CalcInputs) => CalcResult;
  interpret: (values: Record<string, number>) => string;
  commonMistakes: string[];
  faq: FAQItem[];
  relatedSlugs: string[];
}
