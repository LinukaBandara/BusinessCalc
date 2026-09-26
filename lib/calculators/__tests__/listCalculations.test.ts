import { describe, it, expect } from "vitest";
import { calculateAverage, calculateWeightedAverage } from "../listCalculations";

describe("calculateAverage", () => {
  it("computes the standard example ([10, 20, 30] -> 20)", () => {
    const result = calculateAverage([{ value: 10, weight: 1 }, { value: 20, weight: 1 }, { value: 30, weight: 1 }]);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.average).toBe(20);
  });

  it("rejects an empty list", () => {
    const result = calculateAverage([]);
    expect(result.ok).toBe(false);
  });

  it("ignores non-finite rows instead of breaking", () => {
    const result = calculateAverage([{ value: 10, weight: 1 }, { value: NaN, weight: 1 }, { value: 30, weight: 1 }]);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.count).toBe(2);
      expect(result.values.average).toBe(20);
    }
  });
});

describe("calculateWeightedAverage", () => {
  it("computes the standard example: (80x0.3 + 90x0.7) = 87", () => {
    const result = calculateWeightedAverage([
      { value: 80, weight: 0.3 },
      { value: 90, weight: 0.7 },
    ]);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.weightedAverage).toBeCloseTo(87, 5);
  });

  it("rejects zero total weight", () => {
    const result = calculateWeightedAverage([
      { value: 80, weight: 0 },
      { value: 90, weight: 0 },
    ]);
    expect(result.ok).toBe(false);
  });

  it("rejects a negative weight", () => {
    const result = calculateWeightedAverage([{ value: 80, weight: -1 }]);
    expect(result.ok).toBe(false);
  });
});
