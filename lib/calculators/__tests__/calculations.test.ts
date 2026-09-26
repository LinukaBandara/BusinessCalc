import { describe, it, expect } from "vitest";
import {
  calculateProfitMargin,
  calculateMarkup,
  calculateRoi,
  calculateBreakEven,
  calculateCagr,
  calculateConversionRate,
  calculateCac,
  calculateClv,
  calculateFreelanceRate,
  calculateHourlyToAnnual,
  calculateSalaryToHourly,
  calculatePercentageIncrease,
  calculatePercentageDecrease,
  calculateGrossProfit,
  calculateNetProfit,
  calculateRevenueGrowth,
  calculateDiscount,
  calculateCommission,
  calculateRevenuePerCustomer,
  calculateOperatingMargin,
  calculatePriceIncrease,
  calculateTargetProfit,
  calculateCommissionSplit,
  calculatePaybackPeriod,
} from "../calculations";

describe("calculateProfitMargin", () => {
  it("computes the standard example (1000 revenue, 600 cost -> 40%)", () => {
    const result = calculateProfitMargin({ revenue: 1000, cost: 600 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.profit).toBe(400);
      expect(result.values.marginPercent).toBeCloseTo(40, 5);
    }
  });

  it("rejects zero revenue instead of dividing by zero", () => {
    const result = calculateProfitMargin({ revenue: 0, cost: 100 });
    expect(result.ok).toBe(false);
  });

  it("rejects negative cost", () => {
    const result = calculateProfitMargin({ revenue: 100, cost: -10 });
    expect(result.ok).toBe(false);
  });

  it("handles cost greater than revenue (negative margin) without breaking", () => {
    const result = calculateProfitMargin({ revenue: 100, cost: 150 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.marginPercent).toBeCloseTo(-50, 5);
  });
});

describe("calculateMarkup", () => {
  it("computes the standard example (cost 50, price 75 -> 50% markup)", () => {
    const result = calculateMarkup({ cost: 50, price: 75 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.markupPercent).toBeCloseTo(50, 5);
  });

  it("rejects zero cost", () => {
    const result = calculateMarkup({ cost: 0, price: 50 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateRoi", () => {
  it("computes a positive ROI", () => {
    const result = calculateRoi({ investmentCost: 1000, returnValue: 1250 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.roiPercent).toBeCloseTo(25, 5);
  });

  it("computes a negative ROI (loss) without breaking", () => {
    const result = calculateRoi({ investmentCost: 1000, returnValue: 800 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.roiPercent).toBeCloseTo(-20, 5);
  });

  it("rejects zero investment cost", () => {
    const result = calculateRoi({ investmentCost: 0, returnValue: 100 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateBreakEven", () => {
  it("computes the standard example", () => {
    const result = calculateBreakEven({
      fixedCosts: 10000,
      pricePerUnit: 50,
      variableCostPerUnit: 30,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.contributionMargin).toBe(20);
      expect(result.values.breakEvenUnits).toBe(500);
      expect(result.values.breakEvenRevenue).toBe(25000);
    }
  });

  it("rejects when price does not exceed variable cost", () => {
    const result = calculateBreakEven({
      fixedCosts: 10000,
      pricePerUnit: 20,
      variableCostPerUnit: 30,
    });
    expect(result.ok).toBe(false);
  });
});

describe("calculateCagr", () => {
  it("computes the standard example (10000 -> 20000 over 5 years)", () => {
    const result = calculateCagr({ beginningValue: 10000, endingValue: 20000, years: 5 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.cagrPercent).toBeCloseTo(14.87, 1);
  });

  it("rejects zero years", () => {
    const result = calculateCagr({ beginningValue: 100, endingValue: 200, years: 0 });
    expect(result.ok).toBe(false);
  });

  it("rejects zero or negative beginning value (undefined growth rate)", () => {
    const result = calculateCagr({ beginningValue: 0, endingValue: 200, years: 5 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateConversionRate", () => {
  it("computes the standard example (1000 visitors, 25 conversions -> 2.5%)", () => {
    const result = calculateConversionRate({ visitors: 1000, conversions: 25 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.conversionRatePercent).toBeCloseTo(2.5, 5);
  });

  it("rejects zero visitors", () => {
    const result = calculateConversionRate({ visitors: 0, conversions: 5 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateCac", () => {
  it("computes the standard example (5000 spend, 50 customers -> 100)", () => {
    const result = calculateCac({ totalSpend: 5000, newCustomers: 50 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.cac).toBe(100);
  });

  it("rejects zero new customers", () => {
    const result = calculateCac({ totalSpend: 5000, newCustomers: 0 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateClv", () => {
  it("computes the standard example (50 x 4 x 3 -> 600)", () => {
    const result = calculateClv({ avgPurchaseValue: 50, purchaseFrequency: 4, customerLifespanYears: 3 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.clv).toBe(600);
  });

  it("rejects zero lifespan", () => {
    const result = calculateClv({ avgPurchaseValue: 50, purchaseFrequency: 4, customerLifespanYears: 0 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateFreelanceRate", () => {
  it("computes the standard example", () => {
    const result = calculateFreelanceRate({
      desiredAnnualIncome: 60000,
      annualExpenses: 5000,
      billableHoursPerWeek: 25,
      weeksPerYear: 48,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.totalBillableHours).toBe(1200);
      expect(result.values.hourlyRate).toBeCloseTo(54.17, 1);
    }
  });

  it("rejects zero billable hours per week", () => {
    const result = calculateFreelanceRate({
      desiredAnnualIncome: 60000,
      annualExpenses: 0,
      billableHoursPerWeek: 0,
      weeksPerYear: 48,
    });
    expect(result.ok).toBe(false);
  });
});

describe("calculateHourlyToAnnual", () => {
  it("computes the standard example (25/hr, 40hr/wk, 52wk -> 52000)", () => {
    const result = calculateHourlyToAnnual({ hourlyWage: 25, hoursPerWeek: 40, weeksPerYear: 52 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.annualIncome).toBe(52000);
  });

  it("rejects zero hours per week", () => {
    const result = calculateHourlyToAnnual({ hourlyWage: 25, hoursPerWeek: 0, weeksPerYear: 52 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateSalaryToHourly", () => {
  it("computes the standard example (52000 salary, 40hr/wk, 52wk -> 25/hr)", () => {
    const result = calculateSalaryToHourly({ annualSalary: 52000, hoursPerWeek: 40, weeksPerYear: 52 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.hourlyRate).toBe(25);
  });

  it("rejects zero weeks per year", () => {
    const result = calculateSalaryToHourly({ annualSalary: 52000, hoursPerWeek: 40, weeksPerYear: 0 });
    expect(result.ok).toBe(false);
  });
});

describe("calculatePercentageIncrease", () => {
  it("computes the standard example (100 -> 125 = 25%)", () => {
    const result = calculatePercentageIncrease({ oldValue: 100, newValue: 125 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.changePercent).toBeCloseTo(25, 5);
  });

  it("rejects a zero old value", () => {
    const result = calculatePercentageIncrease({ oldValue: 0, newValue: 50 });
    expect(result.ok).toBe(false);
  });
});

describe("calculatePercentageDecrease", () => {
  it("computes the standard example (100 -> 75 = 25% decrease)", () => {
    const result = calculatePercentageDecrease({ oldValue: 100, newValue: 75 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.decreasePercent).toBeCloseTo(25, 5);
  });

  it("rejects a zero old value", () => {
    const result = calculatePercentageDecrease({ oldValue: 0, newValue: 50 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateGrossProfit", () => {
  it("computes the standard example (10000 revenue, 6000 cogs -> 4000, 40%)", () => {
    const result = calculateGrossProfit({ revenue: 10000, cogs: 6000 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.grossProfit).toBe(4000);
      expect(result.values.grossMarginPercent).toBeCloseTo(40, 5);
    }
  });

  it("rejects zero revenue", () => {
    const result = calculateGrossProfit({ revenue: 0, cogs: 100 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateNetProfit", () => {
  it("computes the standard example (10000 revenue, 8000 expenses -> 2000, 20%)", () => {
    const result = calculateNetProfit({ revenue: 10000, totalExpenses: 8000 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.netProfit).toBe(2000);
      expect(result.values.netMarginPercent).toBeCloseTo(20, 5);
    }
  });

  it("handles expenses exceeding revenue (a loss) without breaking", () => {
    const result = calculateNetProfit({ revenue: 1000, totalExpenses: 1200 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.netProfit).toBe(-200);
  });
});

describe("calculateRevenueGrowth", () => {
  it("computes the standard example (1000 -> 1200 = 20%)", () => {
    const result = calculateRevenueGrowth({ previousRevenue: 1000, currentRevenue: 1200 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.growthPercent).toBeCloseTo(20, 5);
  });

  it("rejects zero previous revenue", () => {
    const result = calculateRevenueGrowth({ previousRevenue: 0, currentRevenue: 500 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateDiscount", () => {
  it("computes the standard example (100 price, 20% off -> 80)", () => {
    const result = calculateDiscount({ originalPrice: 100, discountPercent: 20 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.discountAmount).toBe(20);
      expect(result.values.finalPrice).toBe(80);
    }
  });

  it("rejects a discount over 100%", () => {
    const result = calculateDiscount({ originalPrice: 100, discountPercent: 150 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateCommission", () => {
  it("computes the standard example (1000 sale, 10% commission -> 100)", () => {
    const result = calculateCommission({ saleAmount: 1000, commissionRate: 10 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.commissionAmount).toBe(100);
      expect(result.values.netAmount).toBe(900);
    }
  });

  it("rejects a negative sale amount", () => {
    const result = calculateCommission({ saleAmount: -10, commissionRate: 10 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateRevenuePerCustomer", () => {
  it("computes the standard example (10000 revenue, 200 customers -> 50)", () => {
    const result = calculateRevenuePerCustomer({ totalRevenue: 10000, numberOfCustomers: 200 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.revenuePerCustomer).toBe(50);
  });

  it("rejects zero customers", () => {
    const result = calculateRevenuePerCustomer({ totalRevenue: 10000, numberOfCustomers: 0 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateOperatingMargin", () => {
  it("computes the standard example (10000 revenue, 1500 operating income -> 15%)", () => {
    const result = calculateOperatingMargin({ revenue: 10000, operatingIncome: 1500 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.operatingMarginPercent).toBeCloseTo(15, 5);
  });

  it("rejects zero revenue", () => {
    const result = calculateOperatingMargin({ revenue: 0, operatingIncome: 100 });
    expect(result.ok).toBe(false);
  });

  it("handles a negative operating income (operating loss) without breaking", () => {
    const result = calculateOperatingMargin({ revenue: 10000, operatingIncome: -500 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.operatingMarginPercent).toBeCloseTo(-5, 5);
  });
});

describe("calculatePriceIncrease", () => {
  it("computes the standard example (100 price, 10% increase -> 110)", () => {
    const result = calculatePriceIncrease({ currentPrice: 100, increasePercent: 10 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.increaseAmount).toBe(10);
      expect(result.values.newPrice).toBe(110);
    }
  });

  it("rejects a negative increase percentage", () => {
    const result = calculatePriceIncrease({ currentPrice: 100, increasePercent: -5 });
    expect(result.ok).toBe(false);
  });
});

describe("calculateTargetProfit", () => {
  it("computes the standard example", () => {
    const result = calculateTargetProfit({
      fixedCosts: 10000,
      targetProfit: 5000,
      pricePerUnit: 50,
      variableCostPerUnit: 30,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.unitsNeeded).toBe(750);
      expect(result.values.revenueNeeded).toBe(37500);
    }
  });

  it("rejects when price does not exceed variable cost", () => {
    const result = calculateTargetProfit({
      fixedCosts: 10000,
      targetProfit: 5000,
      pricePerUnit: 20,
      variableCostPerUnit: 30,
    });
    expect(result.ok).toBe(false);
  });
});

describe("calculateCommissionSplit", () => {
  it("computes an even split (1000 total, 50% -> 500/500)", () => {
    const result = calculateCommissionSplit({ totalCommission: 1000, partyOneSplitPercent: 50 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.partyOneAmount).toBe(500);
      expect(result.values.partyTwoAmount).toBe(500);
    }
  });

  it("rejects a split percentage over 100", () => {
    const result = calculateCommissionSplit({ totalCommission: 1000, partyOneSplitPercent: 150 });
    expect(result.ok).toBe(false);
  });
});

describe("calculatePaybackPeriod", () => {
  it("computes the standard example (10000 investment, 2500/yr -> 4 years)", () => {
    const result = calculatePaybackPeriod({ initialInvestment: 10000, annualCashFlow: 2500 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.paybackPeriodYears).toBe(4);
  });

  it("rejects zero annual cash flow", () => {
    const result = calculatePaybackPeriod({ initialInvestment: 10000, annualCashFlow: 0 });
    expect(result.ok).toBe(false);
  });
});
