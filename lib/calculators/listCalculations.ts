import { CalcResult } from "./types";

export interface ListRow {
  value: number;
  weight: number;
}

function isFiniteNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

// ---------------------------------------------------------------------------
// Average: Sum of values / Count of values
// ---------------------------------------------------------------------------
export function calculateAverage(rows: ListRow[]): CalcResult {
  const values = rows.map((r) => r.value).filter(isFiniteNumber);

  if (values.length === 0) {
    return { ok: false, error: "Enter at least one valid number." };
  }

  const sum = values.reduce((a, b) => a + b, 0);
  const average = sum / values.length;

  return { ok: true, values: { average, count: values.length, sum } };
}

// ---------------------------------------------------------------------------
// Weighted Average: Sum(value x weight) / Sum(weight)
// ---------------------------------------------------------------------------
export function calculateWeightedAverage(rows: ListRow[]): CalcResult {
  const valid = rows.filter((r) => isFiniteNumber(r.value) && isFiniteNumber(r.weight));

  if (valid.length === 0) {
    return { ok: false, error: "Enter at least one valid value and weight." };
  }

  const totalWeight = valid.reduce((a, r) => a + r.weight, 0);
  if (totalWeight <= 0) {
    return { ok: false, error: "Total weight must be greater than 0." };
  }
  if (valid.some((r) => r.weight < 0)) {
    return { ok: false, error: "Weights cannot be negative." };
  }

  const weightedSum = valid.reduce((a, r) => a + r.value * r.weight, 0);
  const weightedAverage = weightedSum / totalWeight;

  return { ok: true, values: { weightedAverage, totalWeight, count: valid.length } };
}
