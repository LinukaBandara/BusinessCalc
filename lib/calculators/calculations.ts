import { CalcInputs, CalcResult } from "./types";

/** Guards shared by every calculation function. */
function isFiniteNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

function requireFinite(inputs: CalcInputs, keys: string[]): string | null {
  for (const k of keys) {
    if (!isFiniteNumber(inputs[k])) return `Enter a valid number for ${k}.`;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Profit Margin: ((Revenue - Cost) / Revenue) x 100
// ---------------------------------------------------------------------------
export function calculateProfitMargin(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["revenue", "cost"]);
  if (err) return { ok: false, error: err };
  const revenue = inputs.revenue!;
  const cost = inputs.cost!;

  if (revenue <= 0) return { ok: false, error: "Revenue must be greater than 0." };
  if (cost < 0) return { ok: false, error: "Cost cannot be negative." };

  const profit = revenue - cost;
  const marginPercent = (profit / revenue) * 100;

  return { ok: true, values: { profit, marginPercent } };
}

// ---------------------------------------------------------------------------
// Markup: ((Price - Cost) / Cost) x 100
// ---------------------------------------------------------------------------
export function calculateMarkup(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["cost", "price"]);
  if (err) return { ok: false, error: err };
  const cost = inputs.cost!;
  const price = inputs.price!;

  if (cost <= 0) return { ok: false, error: "Cost must be greater than 0." };
  if (price < 0) return { ok: false, error: "Price cannot be negative." };

  const profit = price - cost;
  const markupPercent = (profit / cost) * 100;
  const marginPercent = price > 0 ? (profit / price) * 100 : 0;

  return { ok: true, values: { profit, markupPercent, marginPercent } };
}

// ---------------------------------------------------------------------------
// ROI: ((Gain - Cost) / Cost) x 100
// ---------------------------------------------------------------------------
export function calculateRoi(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["investmentCost", "returnValue"]);
  if (err) return { ok: false, error: err };
  const investmentCost = inputs.investmentCost!;
  const returnValue = inputs.returnValue!;

  if (investmentCost <= 0) return { ok: false, error: "Investment cost must be greater than 0." };
  if (returnValue < 0) return { ok: false, error: "Return value cannot be negative." };

  const netGain = returnValue - investmentCost;
  const roiPercent = (netGain / investmentCost) * 100;

  return { ok: true, values: { netGain, roiPercent } };
}

// ---------------------------------------------------------------------------
// Break-even (units): Fixed Costs / (Price - Variable Cost per unit)
// ---------------------------------------------------------------------------
export function calculateBreakEven(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["fixedCosts", "pricePerUnit", "variableCostPerUnit"]);
  if (err) return { ok: false, error: err };
  const fixedCosts = inputs.fixedCosts!;
  const pricePerUnit = inputs.pricePerUnit!;
  const variableCostPerUnit = inputs.variableCostPerUnit!;

  if (fixedCosts < 0) return { ok: false, error: "Fixed costs cannot be negative." };
  if (pricePerUnit <= 0) return { ok: false, error: "Price per unit must be greater than 0." };
  if (variableCostPerUnit < 0) return { ok: false, error: "Variable cost cannot be negative." };

  const contributionMargin = pricePerUnit - variableCostPerUnit;
  if (contributionMargin <= 0) {
    return {
      ok: false,
      error: "Price per unit must be greater than variable cost per unit, or you can never break even.",
    };
  }

  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;

  return { ok: true, values: { contributionMargin, breakEvenUnits, breakEvenRevenue } };
}

// ---------------------------------------------------------------------------
// CAGR: ((Ending / Beginning) ^ (1 / years)) - 1, as a percent
// ---------------------------------------------------------------------------
export function calculateCagr(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["beginningValue", "endingValue", "years"]);
  if (err) return { ok: false, error: err };
  const beginningValue = inputs.beginningValue!;
  const endingValue = inputs.endingValue!;
  const years = inputs.years!;

  if (beginningValue <= 0) return { ok: false, error: "Beginning value must be greater than 0." };
  if (endingValue < 0) return { ok: false, error: "Ending value cannot be negative." };
  if (years <= 0) return { ok: false, error: "Number of years must be greater than 0." };

  const ratio = endingValue / beginningValue;
  const cagrPercent = (Math.pow(ratio, 1 / years) - 1) * 100;

  if (!Number.isFinite(cagrPercent)) {
    return { ok: false, error: "Those values produce an undefined result. Check your inputs." };
  }

  return { ok: true, values: { cagrPercent } };
}

// ---------------------------------------------------------------------------
// Conversion Rate: (Conversions / Visitors) x 100
// ---------------------------------------------------------------------------
export function calculateConversionRate(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["visitors", "conversions"]);
  if (err) return { ok: false, error: err };
  const visitors = inputs.visitors!;
  const conversions = inputs.conversions!;

  if (visitors <= 0) return { ok: false, error: "Visitors must be greater than 0." };
  if (conversions < 0) return { ok: false, error: "Conversions cannot be negative." };

  const conversionRatePercent = (conversions / visitors) * 100;

  return { ok: true, values: { conversionRatePercent } };
}

// ---------------------------------------------------------------------------
// Customer Acquisition Cost: Total Spend / New Customers
// ---------------------------------------------------------------------------
export function calculateCac(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["totalSpend", "newCustomers"]);
  if (err) return { ok: false, error: err };
  const totalSpend = inputs.totalSpend!;
  const newCustomers = inputs.newCustomers!;

  if (newCustomers <= 0) return { ok: false, error: "New customers must be greater than 0." };
  if (totalSpend < 0) return { ok: false, error: "Total spend cannot be negative." };

  const cac = totalSpend / newCustomers;

  return { ok: true, values: { cac } };
}

// ---------------------------------------------------------------------------
// Customer Lifetime Value: Avg Purchase Value x Purchase Frequency x Lifespan (years)
// ---------------------------------------------------------------------------
export function calculateClv(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["avgPurchaseValue", "purchaseFrequency", "customerLifespanYears"]);
  if (err) return { ok: false, error: err };
  const avgPurchaseValue = inputs.avgPurchaseValue!;
  const purchaseFrequency = inputs.purchaseFrequency!;
  const customerLifespanYears = inputs.customerLifespanYears!;

  if (avgPurchaseValue < 0) return { ok: false, error: "Average purchase value cannot be negative." };
  if (purchaseFrequency < 0) return { ok: false, error: "Purchase frequency cannot be negative." };
  if (customerLifespanYears <= 0) return { ok: false, error: "Customer lifespan must be greater than 0." };

  const clv = avgPurchaseValue * purchaseFrequency * customerLifespanYears;

  return { ok: true, values: { clv } };
}

// ---------------------------------------------------------------------------
// Freelance Rate: (Desired Income + Expenses) / (Billable Hours/Week x Weeks/Year)
// ---------------------------------------------------------------------------
export function calculateFreelanceRate(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, [
    "desiredAnnualIncome",
    "annualExpenses",
    "billableHoursPerWeek",
    "weeksPerYear",
  ]);
  if (err) return { ok: false, error: err };
  const desiredAnnualIncome = inputs.desiredAnnualIncome!;
  const annualExpenses = inputs.annualExpenses!;
  const billableHoursPerWeek = inputs.billableHoursPerWeek!;
  const weeksPerYear = inputs.weeksPerYear!;

  if (desiredAnnualIncome < 0) return { ok: false, error: "Desired income cannot be negative." };
  if (annualExpenses < 0) return { ok: false, error: "Annual expenses cannot be negative." };
  if (billableHoursPerWeek <= 0) return { ok: false, error: "Billable hours per week must be greater than 0." };
  if (weeksPerYear <= 0) return { ok: false, error: "Weeks worked per year must be greater than 0." };

  const totalBillableHours = billableHoursPerWeek * weeksPerYear;
  const hourlyRate = (desiredAnnualIncome + annualExpenses) / totalBillableHours;

  return { ok: true, values: { totalBillableHours, hourlyRate } };
}

// ---------------------------------------------------------------------------
// Hourly Rate -> Annual Income: Hourly Wage x Hours/Week x Weeks/Year
// ---------------------------------------------------------------------------
export function calculateHourlyToAnnual(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["hourlyWage", "hoursPerWeek", "weeksPerYear"]);
  if (err) return { ok: false, error: err };
  const hourlyWage = inputs.hourlyWage!;
  const hoursPerWeek = inputs.hoursPerWeek!;
  const weeksPerYear = inputs.weeksPerYear!;

  if (hourlyWage < 0) return { ok: false, error: "Hourly wage cannot be negative." };
  if (hoursPerWeek <= 0) return { ok: false, error: "Hours per week must be greater than 0." };
  if (weeksPerYear <= 0) return { ok: false, error: "Weeks per year must be greater than 0." };

  const weeklyIncome = hourlyWage * hoursPerWeek;
  const annualIncome = weeklyIncome * weeksPerYear;

  return { ok: true, values: { weeklyIncome, annualIncome } };
}

// ---------------------------------------------------------------------------
// Salary -> Hourly: Annual Salary / (Hours/Week x Weeks/Year)
// ---------------------------------------------------------------------------
export function calculateSalaryToHourly(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["annualSalary", "hoursPerWeek", "weeksPerYear"]);
  if (err) return { ok: false, error: err };
  const annualSalary = inputs.annualSalary!;
  const hoursPerWeek = inputs.hoursPerWeek!;
  const weeksPerYear = inputs.weeksPerYear!;

  if (annualSalary < 0) return { ok: false, error: "Annual salary cannot be negative." };
  if (hoursPerWeek <= 0) return { ok: false, error: "Hours per week must be greater than 0." };
  if (weeksPerYear <= 0) return { ok: false, error: "Weeks per year must be greater than 0." };

  const totalAnnualHours = hoursPerWeek * weeksPerYear;
  const hourlyRate = annualSalary / totalAnnualHours;

  return { ok: true, values: { totalAnnualHours, hourlyRate } };
}

// ---------------------------------------------------------------------------
// Percentage Increase: (New - Old) / Old x 100
// ---------------------------------------------------------------------------
export function calculatePercentageIncrease(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["oldValue", "newValue"]);
  if (err) return { ok: false, error: err };
  const oldValue = inputs.oldValue!;
  const newValue = inputs.newValue!;

  if (oldValue === 0) return { ok: false, error: "Old value cannot be 0 — percentage change is undefined." };

  const changePercent = ((newValue - oldValue) / Math.abs(oldValue)) * 100;

  return { ok: true, values: { changePercent } };
}

// ---------------------------------------------------------------------------
// Percentage Decrease: (Old - New) / Old x 100
// ---------------------------------------------------------------------------
export function calculatePercentageDecrease(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["oldValue", "newValue"]);
  if (err) return { ok: false, error: err };
  const oldValue = inputs.oldValue!;
  const newValue = inputs.newValue!;

  if (oldValue === 0) return { ok: false, error: "Old value cannot be 0 — percentage change is undefined." };

  const decreasePercent = ((oldValue - newValue) / Math.abs(oldValue)) * 100;

  return { ok: true, values: { decreasePercent } };
}

// ---------------------------------------------------------------------------
// Gross Profit: Revenue - Cost of Goods Sold
// ---------------------------------------------------------------------------
export function calculateGrossProfit(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["revenue", "cogs"]);
  if (err) return { ok: false, error: err };
  const revenue = inputs.revenue!;
  const cogs = inputs.cogs!;

  if (revenue <= 0) return { ok: false, error: "Revenue must be greater than 0." };
  if (cogs < 0) return { ok: false, error: "Cost of goods sold cannot be negative." };

  const grossProfit = revenue - cogs;
  const grossMarginPercent = (grossProfit / revenue) * 100;

  return { ok: true, values: { grossProfit, grossMarginPercent } };
}

// ---------------------------------------------------------------------------
// Net Profit: Revenue - Total Expenses
// ---------------------------------------------------------------------------
export function calculateNetProfit(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["revenue", "totalExpenses"]);
  if (err) return { ok: false, error: err };
  const revenue = inputs.revenue!;
  const totalExpenses = inputs.totalExpenses!;

  if (revenue <= 0) return { ok: false, error: "Revenue must be greater than 0." };
  if (totalExpenses < 0) return { ok: false, error: "Total expenses cannot be negative." };

  const netProfit = revenue - totalExpenses;
  const netMarginPercent = (netProfit / revenue) * 100;

  return { ok: true, values: { netProfit, netMarginPercent } };
}

// ---------------------------------------------------------------------------
// Revenue Growth: (Current - Previous) / Previous x 100
// ---------------------------------------------------------------------------
export function calculateRevenueGrowth(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["previousRevenue", "currentRevenue"]);
  if (err) return { ok: false, error: err };
  const previousRevenue = inputs.previousRevenue!;
  const currentRevenue = inputs.currentRevenue!;

  if (previousRevenue <= 0) return { ok: false, error: "Previous period revenue must be greater than 0." };
  if (currentRevenue < 0) return { ok: false, error: "Current period revenue cannot be negative." };

  const growthPercent = ((currentRevenue - previousRevenue) / previousRevenue) * 100;

  return { ok: true, values: { growthPercent } };
}

// ---------------------------------------------------------------------------
// Discount: Final Price = Price - (Price x Discount% / 100)
// ---------------------------------------------------------------------------
export function calculateDiscount(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["originalPrice", "discountPercent"]);
  if (err) return { ok: false, error: err };
  const originalPrice = inputs.originalPrice!;
  const discountPercent = inputs.discountPercent!;

  if (originalPrice < 0) return { ok: false, error: "Original price cannot be negative." };
  if (discountPercent < 0) return { ok: false, error: "Discount percentage cannot be negative." };
  if (discountPercent > 100) return { ok: false, error: "Discount percentage cannot exceed 100%." };

  const discountAmount = originalPrice * (discountPercent / 100);
  const finalPrice = originalPrice - discountAmount;

  return { ok: true, values: { discountAmount, finalPrice } };
}

// ---------------------------------------------------------------------------
// Commission: Sale Amount x Commission Rate
// ---------------------------------------------------------------------------
export function calculateCommission(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["saleAmount", "commissionRate"]);
  if (err) return { ok: false, error: err };
  const saleAmount = inputs.saleAmount!;
  const commissionRate = inputs.commissionRate!;

  if (saleAmount < 0) return { ok: false, error: "Sale amount cannot be negative." };
  if (commissionRate < 0) return { ok: false, error: "Commission rate cannot be negative." };
  if (commissionRate > 100) return { ok: false, error: "Commission rate cannot exceed 100%." };

  const commissionAmount = saleAmount * (commissionRate / 100);
  const netAmount = saleAmount - commissionAmount;

  return { ok: true, values: { commissionAmount, netAmount } };
}

// ---------------------------------------------------------------------------
// Revenue Per Customer: Total Revenue / Number of Customers
// ---------------------------------------------------------------------------
export function calculateRevenuePerCustomer(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["totalRevenue", "numberOfCustomers"]);
  if (err) return { ok: false, error: err };
  const totalRevenue = inputs.totalRevenue!;
  const numberOfCustomers = inputs.numberOfCustomers!;

  if (totalRevenue < 0) return { ok: false, error: "Total revenue cannot be negative." };
  if (numberOfCustomers <= 0) return { ok: false, error: "Number of customers must be greater than 0." };

  const revenuePerCustomer = totalRevenue / numberOfCustomers;

  return { ok: true, values: { revenuePerCustomer } };
}

// ---------------------------------------------------------------------------
// Operating Margin: Operating Income / Revenue x 100
// ---------------------------------------------------------------------------
export function calculateOperatingMargin(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["revenue", "operatingIncome"]);
  if (err) return { ok: false, error: err };
  const revenue = inputs.revenue!;
  const operatingIncome = inputs.operatingIncome!;

  if (revenue <= 0) return { ok: false, error: "Revenue must be greater than 0." };

  const operatingMarginPercent = (operatingIncome / revenue) * 100;

  return { ok: true, values: { operatingMarginPercent } };
}

// ---------------------------------------------------------------------------
// Price Increase: New Price = Current Price x (1 + Increase% / 100)
// ---------------------------------------------------------------------------
export function calculatePriceIncrease(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["currentPrice", "increasePercent"]);
  if (err) return { ok: false, error: err };
  const currentPrice = inputs.currentPrice!;
  const increasePercent = inputs.increasePercent!;

  if (currentPrice < 0) return { ok: false, error: "Current price cannot be negative." };
  if (increasePercent < 0) return { ok: false, error: "Increase percentage cannot be negative." };

  const increaseAmount = currentPrice * (increasePercent / 100);
  const newPrice = currentPrice + increaseAmount;

  return { ok: true, values: { increaseAmount, newPrice } };
}

// ---------------------------------------------------------------------------
// Target Profit: Units/Revenue needed to hit a specific profit goal
// ---------------------------------------------------------------------------
export function calculateTargetProfit(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, [
    "fixedCosts",
    "targetProfit",
    "pricePerUnit",
    "variableCostPerUnit",
  ]);
  if (err) return { ok: false, error: err };
  const fixedCosts = inputs.fixedCosts!;
  const targetProfit = inputs.targetProfit!;
  const pricePerUnit = inputs.pricePerUnit!;
  const variableCostPerUnit = inputs.variableCostPerUnit!;

  if (fixedCosts < 0) return { ok: false, error: "Fixed costs cannot be negative." };
  if (targetProfit < 0) return { ok: false, error: "Target profit cannot be negative." };
  if (pricePerUnit <= 0) return { ok: false, error: "Price per unit must be greater than 0." };
  if (variableCostPerUnit < 0) return { ok: false, error: "Variable cost cannot be negative." };

  const contributionMargin = pricePerUnit - variableCostPerUnit;
  if (contributionMargin <= 0) {
    return {
      ok: false,
      error: "Price per unit must be greater than variable cost per unit, or the target can never be reached.",
    };
  }

  const unitsNeeded = (fixedCosts + targetProfit) / contributionMargin;
  const revenueNeeded = unitsNeeded * pricePerUnit;

  return { ok: true, values: { unitsNeeded, revenueNeeded } };
}

// ---------------------------------------------------------------------------
// Commission Split: split a total commission between two parties by percentage
// ---------------------------------------------------------------------------
export function calculateCommissionSplit(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["totalCommission", "partyOneSplitPercent"]);
  if (err) return { ok: false, error: err };
  const totalCommission = inputs.totalCommission!;
  const partyOneSplitPercent = inputs.partyOneSplitPercent!;

  if (totalCommission < 0) return { ok: false, error: "Total commission cannot be negative." };
  if (partyOneSplitPercent < 0 || partyOneSplitPercent > 100) {
    return { ok: false, error: "Split percentage must be between 0 and 100." };
  }

  const partyOneAmount = totalCommission * (partyOneSplitPercent / 100);
  const partyTwoAmount = totalCommission - partyOneAmount;

  return { ok: true, values: { partyOneAmount, partyTwoAmount } };
}

// ---------------------------------------------------------------------------
// Payback Period: Initial Investment / Annual Cash Flow
// ---------------------------------------------------------------------------
export function calculatePaybackPeriod(inputs: CalcInputs): CalcResult {
  const err = requireFinite(inputs, ["initialInvestment", "annualCashFlow"]);
  if (err) return { ok: false, error: err };
  const initialInvestment = inputs.initialInvestment!;
  const annualCashFlow = inputs.annualCashFlow!;

  if (initialInvestment < 0) return { ok: false, error: "Initial investment cannot be negative." };
  if (annualCashFlow <= 0) return { ok: false, error: "Annual cash flow must be greater than 0." };

  const paybackPeriodYears = initialInvestment / annualCashFlow;

  return { ok: true, values: { paybackPeriodYears } };
}
