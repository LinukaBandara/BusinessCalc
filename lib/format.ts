import { OutputFormat } from "./calculators/types";

export function formatValue(value: number, format: OutputFormat): string {
  if (!Number.isFinite(value)) return "—";
  switch (format) {
    case "currency":
      return value.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      });
    case "percent":
      return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
    case "ratio":
      return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
    case "number":
    default:
      return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
}
