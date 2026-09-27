import { CalculatorDefinition } from "./types";

export type { CalculatorDefinition } from "./types";
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
} from "./calculations";

/**
 * Every calculator on the site is defined here once. Pages, the directory,
 * the sitemap, and related-tool links are all generated from this array so
 * new calculators never require a new page template.
 */
export const calculators: CalculatorDefinition[] = [
  {
    slug: "profit-margin",
    name: "Profit Margin Calculator",
    category: "profit-pricing",
    shortDescription: "Find what share of your revenue is actual profit.",
    metaTitle: "Profit Margin Calculator — Formula, Example & Free Tool",
    metaDescription:
      "Calculate profit margin from revenue and cost. See the formula, a worked example, and what your margin actually means for your business.",
    formulaDisplay: "Profit Margin (%) = (Revenue − Cost) ÷ Revenue × 100",
    variables: [
      { symbol: "Revenue", name: "Revenue", description: "Total sales income before any costs are deducted." },
      { symbol: "Cost", name: "Cost", description: "Total cost of producing or delivering what you sold." },
    ],
    inputs: [
      { id: "revenue", label: "Revenue", format: "currency", defaultValue: 10000, min: 0.01 },
      { id: "cost", label: "Cost", format: "currency", defaultValue: 6000, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "profit", label: "Profit", format: "currency" },
      { id: "marginPercent", label: "Profit margin", format: "percent", highlight: true },
    ],
    calculate: calculateProfitMargin,
    interpret: (v) => {
      const m = v.marginPercent;
      if (m < 0) return "You're selling below cost — every sale currently loses money.";
      if (m < 10) return "This is a thin margin. Small cost increases could push you toward a loss.";
      if (m < 25) return "This is a reasonably healthy margin for many product-based businesses.";
      return "This is a strong margin — common in software and high-value services, less common in retail.";
    },
    commonMistakes: [
      "Confusing profit margin with markup — they use the same numbers but different denominators.",
      "Leaving out costs like shipping, payment fees, or labor when totaling 'cost'.",
      "Comparing margins across industries that have very different cost structures.",
    ],
    faq: [
      {
        question: "What is a good profit margin?",
        answer:
          "It depends heavily on the industry. Grocery retailers often run on margins under 5%, while software companies can exceed 70%. Compare your margin to others in your specific industry rather than a universal benchmark.",
      },
      {
        question: "Is profit margin the same as markup?",
        answer:
          "No. Margin divides profit by revenue (price); markup divides profit by cost. A 50% markup on a $100 cost item ($150 price) is only a 33% margin, not 50%.",
      },
      {
        question: "Should I use gross or net figures?",
        answer:
          "This calculator computes gross profit margin when you enter direct cost of goods, or net profit margin when 'cost' includes all operating expenses. Be consistent about which one you're tracking over time.",
      },
    ],
    relatedSlugs: ["markup", "break-even", "roi"],
  },
  {
    slug: "markup",
    name: "Markup Calculator",
    category: "profit-pricing",
    shortDescription: "Work out the markup percentage between cost and selling price.",
    metaTitle: "Markup Calculator — Cost to Price Formula & Example",
    metaDescription:
      "Calculate markup percentage from cost and selling price, see the resulting margin too, and understand how markup differs from profit margin.",
    formulaDisplay: "Markup (%) = (Price − Cost) ÷ Cost × 100",
    variables: [
      { symbol: "Cost", name: "Cost", description: "What the item or service costs you to provide." },
      { symbol: "Price", name: "Price", description: "What you charge the customer." },
    ],
    inputs: [
      { id: "cost", label: "Cost", format: "currency", defaultValue: 50, min: 0.01 },
      { id: "price", label: "Selling price", format: "currency", defaultValue: 75, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "profit", label: "Profit per unit", format: "currency" },
      { id: "markupPercent", label: "Markup", format: "percent", highlight: true },
      { id: "marginPercent", label: "Equivalent margin", format: "percent" },
    ],
    calculate: calculateMarkup,
    interpret: (v) =>
      `A markup of ${v.markupPercent.toFixed(1)}% on cost works out to a ${v.marginPercent.toFixed(
        1
      )}% profit margin on the selling price — markup and margin are never the same number except at 0%.`,
    commonMistakes: [
      "Applying a target margin percentage directly as a markup percentage (they diverge fast at higher rates).",
      "Forgetting that a 100% markup only produces a 50% margin, not a 100% margin.",
      "Not re-checking markup after supplier costs change.",
    ],
    faq: [
      {
        question: "How do I convert markup to margin?",
        answer: "Margin = Markup ÷ (100 + Markup) × 100. For example, a 50% markup equals a 33.3% margin.",
      },
      {
        question: "What markup should I use for retail?",
        answer:
          "Retail markups commonly range from 20% to over 100% depending on category, but the right number depends on your costs, competition, and target margin — not a fixed industry rule.",
      },
    ],
    relatedSlugs: ["profit-margin", "break-even"],
  },
  {
    slug: "roi",
    name: "ROI Calculator",
    category: "business-finance",
    shortDescription: "Measure the return on an investment relative to what it cost.",
    metaTitle: "ROI Calculator — Return on Investment Formula & Example",
    metaDescription:
      "Calculate return on investment (ROI) from an investment cost and the value it returned, with a worked example and guidance on reading the result.",
    formulaDisplay: "ROI (%) = (Return − Cost) ÷ Cost × 100",
    variables: [
      { symbol: "Cost", name: "Investment cost", description: "The total amount put into the investment." },
      { symbol: "Return", name: "Return value", description: "The total value received back from the investment." },
    ],
    inputs: [
      { id: "investmentCost", label: "Investment cost", format: "currency", defaultValue: 1000, min: 0.01 },
      { id: "returnValue", label: "Return value", format: "currency", defaultValue: 1250, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "netGain", label: "Net gain", format: "currency" },
      { id: "roiPercent", label: "ROI", format: "percent", highlight: true },
    ],
    calculate: calculateRoi,
    interpret: (v) =>
      v.roiPercent >= 0
        ? `A ${v.roiPercent.toFixed(1)}% ROI means the investment returned $${(v.roiPercent / 100).toFixed(
            2
          )} for every $1 spent, on top of getting your original cost back.`
        : `A ${v.roiPercent.toFixed(1)}% ROI means this investment lost money — you got back less than you put in.`,
    commonMistakes: [
      "Ignoring the time period — a 20% ROI over 5 years is very different from 20% in one year.",
      "Leaving indirect costs (fees, time, overhead) out of the investment cost.",
      "Comparing ROI across investments without accounting for risk.",
    ],
    faq: [
      {
        question: "What counts as a good ROI?",
        answer:
          "It depends on the timeframe, risk, and alternative uses of the money. A common long-run benchmark for public stock markets is roughly 7–10% annually, but marketing or short-term business ROI is judged differently.",
      },
      {
        question: "Does this calculator account for time?",
        answer:
          "No — this is a simple ROI calculation. If you need an annualized rate over multiple years, use the CAGR calculator instead.",
      },
    ],
    relatedSlugs: ["cagr", "break-even", "profit-margin"],
  },
  {
    slug: "break-even",
    name: "Break-Even Calculator",
    category: "business-finance",
    shortDescription: "Find how many units you need to sell to cover your costs.",
    metaTitle: "Break-Even Calculator — Formula, Units & Revenue",
    metaDescription:
      "Calculate your break-even point in units and revenue from fixed costs, price per unit, and variable cost per unit.",
    formulaDisplay: "Break-Even Units = Fixed Costs ÷ (Price per Unit − Variable Cost per Unit)",
    variables: [
      { symbol: "Fixed Costs", name: "Fixed costs", description: "Costs that don't change with sales volume, e.g. rent, salaries." },
      { symbol: "Price", name: "Price per unit", description: "What you charge for one unit." },
      { symbol: "Variable Cost", name: "Variable cost per unit", description: "The cost that scales directly with each unit sold." },
    ],
    inputs: [
      { id: "fixedCosts", label: "Fixed costs", format: "currency", defaultValue: 10000, min: 0, allowZero: true },
      { id: "pricePerUnit", label: "Price per unit", format: "currency", defaultValue: 50, min: 0.01 },
      { id: "variableCostPerUnit", label: "Variable cost per unit", format: "currency", defaultValue: 30, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "contributionMargin", label: "Contribution margin per unit", format: "currency" },
      { id: "breakEvenUnits", label: "Break-even units", format: "number", highlight: true },
      { id: "breakEvenRevenue", label: "Break-even revenue", format: "currency" },
    ],
    calculate: calculateBreakEven,
    interpret: (v) =>
      `You need to sell about ${Math.ceil(v.breakEvenUnits)} units (roughly $${v.breakEvenRevenue.toLocaleString(
        undefined,
        { maximumFractionDigits: 0 }
      )} in revenue) before fixed costs are covered and any additional sales become profit.`,
    commonMistakes: [
      "Leaving out fixed costs that don't feel 'operational', like insurance or software subscriptions.",
      "Using an average variable cost that hides big differences between product lines.",
      "Forgetting that break-even shifts every time price or costs change.",
    ],
    faq: [
      {
        question: "What if my price is lower than my variable cost?",
        answer:
          "Then you can never break even by selling more — every unit loses money before fixed costs are even considered. You'd need to raise price or cut variable cost first.",
      },
      {
        question: "Does break-even include fixed costs only once?",
        answer:
          "Yes, this calculates the point where cumulative contribution margin equals total fixed costs for the period you're measuring fixed costs over (e.g. monthly fixed costs give a monthly break-even).",
      },
    ],
    relatedSlugs: ["profit-margin", "markup", "roi"],
  },
  {
    slug: "cagr",
    name: "CAGR Calculator",
    category: "business-finance",
    shortDescription: "Find the smoothed annual growth rate between two values over time.",
    metaTitle: "CAGR Calculator — Compound Annual Growth Rate Formula & Example",
    metaDescription:
      "Calculate CAGR (Compound Annual Growth Rate) from a beginning value, ending value, and number of years, with a worked example.",
    formulaDisplay: "CAGR (%) = ((Ending Value ÷ Beginning Value) ^ (1 ÷ Years) − 1) × 100",
    variables: [
      { symbol: "Beginning", name: "Beginning value", description: "The value at the start of the period." },
      { symbol: "Ending", name: "Ending value", description: "The value at the end of the period." },
      { symbol: "Years", name: "Years", description: "The number of years between the two values." },
    ],
    inputs: [
      { id: "beginningValue", label: "Beginning value", format: "currency", defaultValue: 10000, min: 0.01 },
      { id: "endingValue", label: "Ending value", format: "currency", defaultValue: 20000, min: 0, allowZero: true },
      { id: "years", label: "Years", format: "number", defaultValue: 5, min: 0.1 },
    ],
    outputs: [{ id: "cagrPercent", label: "CAGR", format: "percent", highlight: true }],
    calculate: calculateCagr,
    interpret: (v) =>
      `A CAGR of ${v.cagrPercent.toFixed(2)}% is the steady annual growth rate that would take you from the beginning value to the ending value over the period — it smooths out any year-to-year ups and downs.`,
    commonMistakes: [
      "Using CAGR to describe a value that didn't grow smoothly — it hides volatility along the way.",
      "Mixing up the beginning and ending value.",
      "Using a year count that doesn't match the actual time elapsed (e.g. using whole years for a partial-year period).",
    ],
    faq: [
      {
        question: "How is CAGR different from average annual growth?",
        answer:
          "A simple average of yearly growth rates can be misleading with volatile numbers. CAGR instead answers 'what single constant growth rate gets me from start to end,' which better reflects compounding.",
      },
      {
        question: "Can CAGR be negative?",
        answer: "Yes — if the ending value is lower than the beginning value, CAGR will be negative, reflecting a decline.",
      },
    ],
    relatedSlugs: ["roi", "profit-margin"],
  },
  {
    slug: "conversion-rate",
    name: "Conversion Rate Calculator",
    category: "sales-marketing",
    shortDescription: "Find what share of visitors or leads actually convert.",
    metaTitle: "Conversion Rate Calculator — Formula & Example",
    metaDescription:
      "Calculate conversion rate from visitors and conversions, with a worked example and guidance on what counts as a good rate.",
    formulaDisplay: "Conversion Rate (%) = (Conversions ÷ Visitors) × 100",
    variables: [
      { symbol: "Visitors", name: "Visitors", description: "Total visitors, leads, or sessions in the period." },
      { symbol: "Conversions", name: "Conversions", description: "How many of them completed the target action." },
    ],
    inputs: [
      { id: "visitors", label: "Visitors", format: "number", defaultValue: 1000, min: 1 },
      { id: "conversions", label: "Conversions", format: "number", defaultValue: 25, min: 0, allowZero: true },
    ],
    outputs: [{ id: "conversionRatePercent", label: "Conversion rate", format: "percent", highlight: true }],
    calculate: calculateConversionRate,
    interpret: (v) =>
      `${v.conversionRatePercent.toFixed(2)}% of visitors converted. "Good" varies hugely by channel and industry — track this rate over time rather than against a universal benchmark.`,
    commonMistakes: [
      "Counting visits instead of unique visitors, which can understate the real rate.",
      "Comparing conversion rate across channels with very different traffic quality.",
      "Not excluding bot or invalid traffic before calculating.",
    ],
    faq: [
      {
        question: "What's a good conversion rate?",
        answer:
          "It varies widely by industry and channel — ecommerce sites often see 1–4%, while a targeted landing page can exceed 10%. Track your own rate over time rather than chasing a generic number.",
      },
      {
        question: "Should I use sessions or unique visitors?",
        answer:
          "Either works as long as you're consistent — mixing the two between periods will make your trend line misleading.",
      },
    ],
    relatedSlugs: ["customer-acquisition-cost", "customer-lifetime-value", "roi"],
  },
  {
    slug: "customer-acquisition-cost",
    name: "Customer Acquisition Cost Calculator",
    category: "sales-marketing",
    shortDescription: "Find how much it costs, on average, to win one new customer.",
    metaTitle: "CAC Calculator — Customer Acquisition Cost Formula & Example",
    metaDescription:
      "Calculate customer acquisition cost (CAC) from total spend and new customers acquired, with a worked example.",
    formulaDisplay: "CAC = Total Sales & Marketing Spend ÷ New Customers Acquired",
    variables: [
      { symbol: "Spend", name: "Total spend", description: "All sales and marketing spend for the period." },
      { symbol: "New Customers", name: "New customers", description: "New customers acquired in that same period." },
    ],
    inputs: [
      { id: "totalSpend", label: "Total sales & marketing spend", format: "currency", defaultValue: 5000, min: 0, allowZero: true },
      { id: "newCustomers", label: "New customers acquired", format: "number", defaultValue: 50, min: 1 },
    ],
    outputs: [{ id: "cac", label: "Customer acquisition cost", format: "currency", highlight: true }],
    calculate: calculateCac,
    interpret: (v) =>
      `It cost about $${v.cac.toFixed(2)} to acquire each new customer this period. Compare this to Customer Lifetime Value — a healthy business usually needs CLV to be several times higher than CAC.`,
    commonMistakes: [
      "Leaving out salaries and tool costs, and only counting ad spend.",
      "Mixing acquisition spend for a period with customers acquired in a different period.",
      "Never comparing CAC to CLV, which is what actually tells you if the spend is worth it.",
    ],
    faq: [
      {
        question: "What counts as acquisition spend?",
        answer:
          "Ad spend, sales team salaries and commissions, marketing tools, and content or agency costs directly tied to acquiring customers in that period.",
      },
      {
        question: "How does CAC relate to CLV?",
        answer:
          "A common rule of thumb is targeting a CLV:CAC ratio of at least 3:1, though the right ratio depends on your margins and payback timeline.",
      },
    ],
    relatedSlugs: ["customer-lifetime-value", "conversion-rate", "roi"],
  },
  {
    slug: "customer-lifetime-value",
    name: "Customer Lifetime Value Calculator",
    category: "sales-marketing",
    shortDescription: "Estimate the total revenue an average customer generates over time.",
    metaTitle: "CLV Calculator — Customer Lifetime Value Formula & Example",
    metaDescription:
      "Calculate customer lifetime value (CLV) from average purchase value, purchase frequency, and customer lifespan.",
    formulaDisplay: "CLV = Average Purchase Value × Purchase Frequency (per year) × Customer Lifespan (years)",
    variables: [
      { symbol: "Purchase Value", name: "Average purchase value", description: "Average revenue per transaction." },
      { symbol: "Frequency", name: "Purchase frequency", description: "Average purchases per customer per year." },
      { symbol: "Lifespan", name: "Customer lifespan", description: "Average years a customer keeps buying from you." },
    ],
    inputs: [
      { id: "avgPurchaseValue", label: "Average purchase value", format: "currency", defaultValue: 50, min: 0, allowZero: true },
      { id: "purchaseFrequency", label: "Purchases per year", format: "number", defaultValue: 4, min: 0, allowZero: true },
      { id: "customerLifespanYears", label: "Customer lifespan (years)", format: "number", defaultValue: 3, min: 0.1 },
    ],
    outputs: [{ id: "clv", label: "Customer lifetime value", format: "currency", highlight: true }],
    calculate: calculateClv,
    interpret: (v) =>
      `On average, a customer is worth about $${v.clv.toLocaleString(undefined, { maximumFractionDigits: 0 })} over their relationship with your business — this is the ceiling for what you can profitably spend to acquire them.`,
    commonMistakes: [
      "Estimating lifespan from gut feel instead of actual churn/retention data.",
      "Ignoring gross margin — this is revenue-based CLV, not profit-based, unless you adjust purchase value for margin.",
      "Treating CLV as fixed instead of updating it as retention or pricing changes.",
    ],
    faq: [
      {
        question: "Is this profit or revenue CLV?",
        answer:
          "As written, this calculates revenue-based CLV. To estimate profit-based CLV, multiply the result by your average profit margin.",
      },
      {
        question: "How do I estimate customer lifespan?",
        answer: "A simple approximation is 1 ÷ your annual churn rate — e.g. 20% annual churn implies a 5-year average lifespan.",
      },
    ],
    relatedSlugs: ["customer-acquisition-cost", "profit-margin", "conversion-rate"],
  },
  {
    slug: "freelance-rate",
    name: "Freelance Rate Calculator",
    category: "freelancing",
    shortDescription: "Work out the hourly rate you need to charge to hit your income goal.",
    metaTitle: "Freelance Rate Calculator — Set Your Hourly Rate",
    metaDescription:
      "Calculate the hourly rate you need to charge as a freelancer based on your desired income, expenses, and billable hours.",
    formulaDisplay: "Hourly Rate = (Desired Annual Income + Annual Expenses) ÷ (Billable Hours per Week × Weeks per Year)",
    variables: [
      { symbol: "Income", name: "Desired annual income", description: "What you want to take home per year, before tax." },
      { symbol: "Expenses", name: "Annual expenses", description: "Business costs: software, insurance, equipment, etc." },
      { symbol: "Billable Hours", name: "Billable hours per week", description: "Hours you can actually bill, not total working hours." },
      { symbol: "Weeks", name: "Weeks worked per year", description: "Total weeks worked, after subtracting holiday and time off." },
    ],
    inputs: [
      { id: "desiredAnnualIncome", label: "Desired annual income", format: "currency", defaultValue: 60000, min: 0, allowZero: true },
      { id: "annualExpenses", label: "Annual business expenses", format: "currency", defaultValue: 5000, min: 0, allowZero: true },
      { id: "billableHoursPerWeek", label: "Billable hours per week", format: "number", defaultValue: 25, min: 0.1 },
      { id: "weeksPerYear", label: "Weeks worked per year", format: "number", defaultValue: 48, min: 1 },
    ],
    outputs: [
      { id: "totalBillableHours", label: "Total billable hours / year", format: "number" },
      { id: "hourlyRate", label: "Hourly rate to charge", format: "currency", highlight: true },
    ],
    calculate: calculateFreelanceRate,
    interpret: (v) =>
      `You'd need to charge about $${v.hourlyRate.toFixed(2)}/hour across ${Math.round(
        v.totalBillableHours
      )} billable hours a year to hit your income goal after expenses — remember this is pre-tax.`,
    commonMistakes: [
      "Using total working hours instead of billable hours (admin, sales, and unpaid time don't count).",
      "Forgetting self-employment tax and benefits you'd otherwise get from an employer.",
      "Assuming 52 billable weeks a year instead of accounting for holidays and downtime.",
    ],
    faq: [
      {
        question: "Should this rate include tax?",
        answer:
          "No — this calculates your target pre-tax billing rate. Set aside a separate percentage for income and self-employment tax based on your local rules.",
      },
      {
        question: "How many hours a week are realistically billable?",
        answer:
          "Most freelancers can bill 20–30 hours in a 40-hour week once you account for admin, marketing, and finding new clients.",
      },
    ],
    relatedSlugs: ["hourly-rate", "salary-to-hourly"],
  },
  {
    slug: "hourly-rate",
    name: "Hourly Rate Calculator",
    category: "freelancing",
    shortDescription: "Convert an hourly wage into weekly and annual income.",
    metaTitle: "Hourly Rate to Annual Salary Calculator",
    metaDescription:
      "Convert an hourly wage into weekly and annual income based on hours worked per week and weeks worked per year.",
    formulaDisplay: "Annual Income = Hourly Wage × Hours per Week × Weeks per Year",
    variables: [
      { symbol: "Wage", name: "Hourly wage", description: "What you earn per hour." },
      { symbol: "Hours", name: "Hours per week", description: "How many hours you work in a typical week." },
      { symbol: "Weeks", name: "Weeks per year", description: "How many weeks you work per year." },
    ],
    inputs: [
      { id: "hourlyWage", label: "Hourly wage", format: "currency", defaultValue: 25, min: 0, allowZero: true },
      { id: "hoursPerWeek", label: "Hours per week", format: "number", defaultValue: 40, min: 0.1 },
      { id: "weeksPerYear", label: "Weeks per year", format: "number", defaultValue: 52, min: 1 },
    ],
    outputs: [
      { id: "weeklyIncome", label: "Weekly income", format: "currency" },
      { id: "annualIncome", label: "Annual income", format: "currency", highlight: true },
    ],
    calculate: calculateHourlyToAnnual,
    interpret: (v) =>
      `At this rate, you'd earn about $${v.weeklyIncome.toFixed(2)} a week and $${v.annualIncome.toLocaleString(
        undefined,
        { maximumFractionDigits: 0 }
      )} a year, before tax and any unpaid time off.`,
    commonMistakes: [
      "Assuming 52 paid weeks when unpaid time off applies.",
      "Not accounting for overtime pay being different from the base rate.",
      "Forgetting this is gross, pre-tax income.",
    ],
    faq: [
      {
        question: "Does this include overtime?",
        answer: "No — it assumes every hour is paid at the entered hourly wage. Add overtime hours at their own rate separately.",
      },
    ],
    relatedSlugs: ["salary-to-hourly", "freelance-rate"],
  },
  {
    slug: "salary-to-hourly",
    name: "Salary to Hourly Calculator",
    category: "freelancing",
    shortDescription: "Convert an annual salary into an equivalent hourly rate.",
    metaTitle: "Salary to Hourly Calculator — Convert Annual Salary to Hourly Rate",
    metaDescription:
      "Convert an annual salary into an hourly rate based on hours worked per week and weeks worked per year.",
    formulaDisplay: "Hourly Rate = Annual Salary ÷ (Hours per Week × Weeks per Year)",
    variables: [
      { symbol: "Salary", name: "Annual salary", description: "Total gross annual salary." },
      { symbol: "Hours", name: "Hours per week", description: "How many hours are worked in a typical week." },
      { symbol: "Weeks", name: "Weeks per year", description: "How many weeks are worked per year." },
    ],
    inputs: [
      { id: "annualSalary", label: "Annual salary", format: "currency", defaultValue: 52000, min: 0, allowZero: true },
      { id: "hoursPerWeek", label: "Hours per week", format: "number", defaultValue: 40, min: 0.1 },
      { id: "weeksPerYear", label: "Weeks per year", format: "number", defaultValue: 52, min: 1 },
    ],
    outputs: [
      { id: "totalAnnualHours", label: "Total hours / year", format: "number" },
      { id: "hourlyRate", label: "Equivalent hourly rate", format: "currency", highlight: true },
    ],
    calculate: calculateSalaryToHourly,
    interpret: (v) =>
      `A $${v.hourlyRate.toFixed(2)}/hour rate is equivalent to this salary across ${Math.round(
        v.totalAnnualHours
      )} working hours a year — useful for comparing a salaried offer to freelance or contract rates.`,
    commonMistakes: [
      "Using 52 weeks without subtracting unpaid holiday if the salary assumes paid time off already.",
      "Comparing this directly to a freelance rate without adding back the cost of benefits a salary usually includes.",
    ],
    faq: [
      {
        question: "Should I include unpaid holiday in weeks per year?",
        answer:
          "If your salary already covers paid time off, use 52 weeks. If you're comparing to unpaid freelance time, reduce the weeks accordingly.",
      },
    ],
    relatedSlugs: ["hourly-rate", "freelance-rate"],
  },
  {
    slug: "percentage-increase",
    name: "Percentage Increase Calculator",
    category: "business-finance",
    shortDescription: "Find the percentage change between an old and a new value.",
    metaTitle: "Percentage Increase Calculator — Formula & Example",
    metaDescription:
      "Calculate the percentage increase between an old value and a new value, with a worked example.",
    formulaDisplay: "% Increase = (New Value − Old Value) ÷ Old Value × 100",
    variables: [
      { symbol: "Old", name: "Old value", description: "The starting value." },
      { symbol: "New", name: "New value", description: "The value after the change." },
    ],
    inputs: [
      { id: "oldValue", label: "Old value", format: "number", defaultValue: 100, min: undefined },
      { id: "newValue", label: "New value", format: "number", defaultValue: 125, min: undefined },
    ],
    outputs: [{ id: "changePercent", label: "Percentage change", format: "percent", highlight: true }],
    calculate: calculatePercentageIncrease,
    interpret: (v) =>
      v.changePercent >= 0
        ? `That's an increase of ${v.changePercent.toFixed(2)}%.`
        : `That's actually a decrease of ${Math.abs(v.changePercent).toFixed(2)}% — the new value is lower than the old value.`,
    commonMistakes: [
      "Dividing by the new value instead of the old value.",
      "Not noticing a negative result means the value actually decreased.",
    ],
    faq: [
      {
        question: "What if the old value is negative?",
        answer:
          "This calculator divides by the absolute value of the old value so the sign of the result still correctly shows increase vs decrease.",
      },
    ],
    relatedSlugs: ["percentage-decrease", "revenue-growth" ],
  },
  {
    slug: "percentage-decrease",
    name: "Percentage Decrease Calculator",
    category: "business-finance",
    shortDescription: "Find how much a value has dropped, in percentage terms.",
    metaTitle: "Percentage Decrease Calculator — Formula & Example",
    metaDescription:
      "Calculate the percentage decrease between an old value and a new value, with a worked example.",
    formulaDisplay: "% Decrease = (Old Value − New Value) ÷ Old Value × 100",
    variables: [
      { symbol: "Old", name: "Old value", description: "The starting value." },
      { symbol: "New", name: "New value", description: "The value after the change." },
    ],
    inputs: [
      { id: "oldValue", label: "Old value", format: "number", defaultValue: 100, min: undefined },
      { id: "newValue", label: "New value", format: "number", defaultValue: 75, min: undefined },
    ],
    outputs: [{ id: "decreasePercent", label: "Percentage decrease", format: "percent", highlight: true }],
    calculate: calculatePercentageDecrease,
    interpret: (v) =>
      v.decreasePercent >= 0
        ? `That's a decrease of ${v.decreasePercent.toFixed(2)}%.`
        : `That's actually an increase of ${Math.abs(v.decreasePercent).toFixed(2)}% — the new value is higher than the old value.`,
    commonMistakes: [
      "Reporting the decrease as a negative percentage instead of stating it in plain language.",
      "Confusing a percentage-point drop with a percentage decrease — they aren't the same thing.",
    ],
    faq: [
      {
        question: "Is a percentage decrease the same as a percentage point drop?",
        answer:
          "No. Going from 50% to 40% is a 10 percentage-point drop, but a 20% percentage decrease (10 ÷ 50 × 100). These are commonly confused.",
      },
    ],
    relatedSlugs: ["percentage-increase"],
  },
  {
    slug: "gross-profit",
    name: "Gross Profit Calculator",
    category: "profit-pricing",
    shortDescription: "Find the profit left after subtracting the direct cost of goods sold.",
    metaTitle: "Gross Profit Calculator — Formula & Example",
    metaDescription:
      "Calculate gross profit and gross margin from revenue and cost of goods sold, with a worked example.",
    formulaDisplay: "Gross Profit = Revenue − Cost of Goods Sold (COGS)",
    variables: [
      { symbol: "Revenue", name: "Revenue", description: "Total sales income before any costs are deducted." },
      { symbol: "COGS", name: "Cost of goods sold", description: "The direct cost of producing what you sold — materials, direct labor, etc." },
    ],
    inputs: [
      { id: "revenue", label: "Revenue", format: "currency", defaultValue: 10000, min: 0.01 },
      { id: "cogs", label: "Cost of goods sold", format: "currency", defaultValue: 6000, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "grossProfit", label: "Gross profit", format: "currency", highlight: true },
      { id: "grossMarginPercent", label: "Gross margin", format: "percent" },
    ],
    calculate: calculateGrossProfit,
    interpret: (v) =>
      `Gross profit is what's left to cover operating expenses, taxes, and net profit after direct production costs — it doesn't yet account for overhead like rent or marketing.`,
    commonMistakes: [
      "Including operating expenses (rent, marketing, admin) in COGS — those belong in net profit, not gross profit.",
      "Confusing gross profit (a dollar amount) with gross margin (a percentage).",
    ],
    faq: [
      {
        question: "What's the difference between gross profit and net profit?",
        answer:
          "Gross profit only subtracts direct production costs (COGS). Net profit subtracts every expense, including operating costs, interest, and taxes.",
      },
    ],
    relatedSlugs: ["net-profit", "profit-margin", "markup"],
  },
  {
    slug: "net-profit",
    name: "Net Profit Calculator",
    category: "profit-pricing",
    shortDescription: "Find your bottom-line profit after every expense is subtracted.",
    metaTitle: "Net Profit Calculator — Formula & Example",
    metaDescription:
      "Calculate net profit and net margin from revenue and total expenses, with a worked example.",
    formulaDisplay: "Net Profit = Revenue − Total Expenses",
    variables: [
      { symbol: "Revenue", name: "Revenue", description: "Total sales income before any costs are deducted." },
      { symbol: "Total Expenses", name: "Total expenses", description: "Every cost of running the business: COGS, operating expenses, interest, and taxes." },
    ],
    inputs: [
      { id: "revenue", label: "Revenue", format: "currency", defaultValue: 10000, min: 0.01 },
      { id: "totalExpenses", label: "Total expenses", format: "currency", defaultValue: 8000, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "netProfit", label: "Net profit", format: "currency", highlight: true },
      { id: "netMarginPercent", label: "Net margin", format: "percent" },
    ],
    calculate: calculateNetProfit,
    interpret: (v) =>
      v.netProfit >= 0
        ? `The business kept ${v.netMarginPercent.toFixed(1)}% of revenue as profit after every expense.`
        : `Total expenses exceeded revenue — the business operated at a loss for this period.`,
    commonMistakes: [
      "Leaving out one-off or irregular expenses, which understates how variable net profit really is.",
      "Comparing net margin across companies with very different capital structures (debt/interest) without adjusting.",
    ],
    faq: [
      {
        question: "Should taxes be included in total expenses?",
        answer:
          "Yes, for a true net profit figure. If you want profit before tax, use a total expenses figure that excludes tax and label the result accordingly.",
      },
    ],
    relatedSlugs: ["gross-profit", "profit-margin", "break-even"],
  },
  {
    slug: "revenue-growth",
    name: "Revenue Growth Calculator",
    category: "business-finance",
    shortDescription: "Find how much revenue grew (or shrank) between two periods.",
    metaTitle: "Revenue Growth Calculator — Formula & Example",
    metaDescription:
      "Calculate revenue growth rate between two periods, with a worked example and guidance on interpreting the result.",
    formulaDisplay: "Revenue Growth (%) = (Current Revenue − Previous Revenue) ÷ Previous Revenue × 100",
    variables: [
      { symbol: "Previous", name: "Previous period revenue", description: "Revenue from the earlier period." },
      { symbol: "Current", name: "Current period revenue", description: "Revenue from the most recent period." },
    ],
    inputs: [
      { id: "previousRevenue", label: "Previous period revenue", format: "currency", defaultValue: 50000, min: 0.01 },
      { id: "currentRevenue", label: "Current period revenue", format: "currency", defaultValue: 65000, min: 0, allowZero: true },
    ],
    outputs: [{ id: "growthPercent", label: "Revenue growth", format: "percent", highlight: true }],
    calculate: calculateRevenueGrowth,
    interpret: (v) =>
      v.growthPercent >= 0
        ? `Revenue grew ${v.growthPercent.toFixed(1)}% compared to the previous period.`
        : `Revenue declined ${Math.abs(v.growthPercent).toFixed(1)}% compared to the previous period.`,
    commonMistakes: [
      "Comparing periods of different lengths (e.g. a full quarter vs a partial one) without adjusting.",
      "Not accounting for seasonality when comparing consecutive periods instead of the same period last year.",
    ],
    faq: [
      {
        question: "Month-over-month or year-over-year — which should I use?",
        answer:
          "Year-over-year comparisons control for seasonality; month-over-month is more sensitive to short-term swings. Track both if your business is seasonal.",
      },
    ],
    relatedSlugs: ["cagr", "percentage-increase", "roi"],
  },
  {
    slug: "discount",
    name: "Discount Calculator",
    category: "profit-pricing",
    shortDescription: "Find the final price and savings after applying a percentage discount.",
    metaTitle: "Discount Calculator — Final Price & Savings",
    metaDescription:
      "Calculate the final price and amount saved after applying a percentage discount to an original price.",
    formulaDisplay: "Final Price = Original Price − (Original Price × Discount % ÷ 100)",
    variables: [
      { symbol: "Price", name: "Original price", description: "The price before any discount." },
      { symbol: "Discount", name: "Discount percentage", description: "The percentage taken off the original price." },
    ],
    inputs: [
      { id: "originalPrice", label: "Original price", format: "currency", defaultValue: 100, min: 0, allowZero: true },
      { id: "discountPercent", label: "Discount percentage", format: "percent", defaultValue: 20, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "discountAmount", label: "You save", format: "currency" },
      { id: "finalPrice", label: "Final price", format: "currency", highlight: true },
    ],
    calculate: calculateDiscount,
    interpret: (v) => `The discount saves $${v.discountAmount.toFixed(2)}, bringing the price down to $${v.finalPrice.toFixed(2)}.`,
    commonMistakes: [
      "Applying two discounts by adding the percentages instead of applying them one after another (stacked discounts compound, they don't add).",
      "Confusing a percentage-off discount with a fixed dollar-amount discount.",
    ],
    faq: [
      {
        question: "How do I stack two discounts, like 20% then 10%?",
        answer:
          "Apply them one after another, not added together: $100 at 20% off is $80; $80 at a further 10% off is $72 — not $70 (which would be a combined 30%).",
      },
    ],
    relatedSlugs: ["markup", "commission"],
  },
  {
    slug: "commission",
    name: "Commission Calculator",
    category: "sales-marketing",
    shortDescription: "Find how much commission is earned on a sale, and the amount left over.",
    metaTitle: "Commission Calculator — Formula & Example",
    metaDescription:
      "Calculate commission earned from a sale amount and commission rate, plus the net amount remaining.",
    formulaDisplay: "Commission = Sale Amount × Commission Rate ÷ 100",
    variables: [
      { symbol: "Sale", name: "Sale amount", description: "The total value of the sale." },
      { symbol: "Rate", name: "Commission rate", description: "The agreed commission percentage." },
    ],
    inputs: [
      { id: "saleAmount", label: "Sale amount", format: "currency", defaultValue: 1000, min: 0, allowZero: true },
      { id: "commissionRate", label: "Commission rate", format: "percent", defaultValue: 10, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "commissionAmount", label: "Commission earned", format: "currency", highlight: true },
      { id: "netAmount", label: "Net amount (after commission)", format: "currency" },
    ],
    calculate: calculateCommission,
    interpret: (v) =>
      `A ${((v.commissionAmount / (v.commissionAmount + v.netAmount || 1)) * 100).toFixed(0)}% commission on this sale earns $${v.commissionAmount.toFixed(2)}, leaving $${v.netAmount.toFixed(2)} net.`,
    commonMistakes: [
      "Applying commission to net profit instead of the agreed sale amount, unless that's specifically the arrangement.",
      "Forgetting tiered commission structures, where the rate changes above certain thresholds.",
    ],
    faq: [
      {
        question: "Does this handle tiered commission rates?",
        answer:
          "No — this calculates a flat-rate commission. For tiered structures, calculate each tier's portion separately and add the results together.",
      },
    ],
    relatedSlugs: ["discount", "roi"],
  },
  {
    slug: "revenue-per-customer",
    name: "Revenue Per Customer Calculator",
    category: "sales-marketing",
    shortDescription: "Find the average revenue generated by each customer.",
    metaTitle: "Revenue Per Customer Calculator — Formula & Example",
    metaDescription:
      "Calculate average revenue per customer from total revenue and customer count, with a worked example.",
    formulaDisplay: "Revenue Per Customer = Total Revenue ÷ Number of Customers",
    variables: [
      { symbol: "Revenue", name: "Total revenue", description: "Total revenue for the period." },
      { symbol: "Customers", name: "Number of customers", description: "How many customers generated that revenue." },
    ],
    inputs: [
      { id: "totalRevenue", label: "Total revenue", format: "currency", defaultValue: 50000, min: 0, allowZero: true },
      { id: "numberOfCustomers", label: "Number of customers", format: "number", defaultValue: 200, min: 1 },
    ],
    outputs: [{ id: "revenuePerCustomer", label: "Revenue per customer", format: "currency", highlight: true }],
    calculate: calculateRevenuePerCustomer,
    interpret: (v) =>
      `On average, each customer generated $${v.revenuePerCustomer.toFixed(2)} this period — useful for spotting whether growth is coming from more customers or from each customer spending more.`,
    commonMistakes: [
      "Using total signups instead of active/paying customers, which understates the real figure.",
      "Not segmenting by customer type when averages hide very different spending tiers.",
    ],
    faq: [
      {
        question: "How is this different from Customer Lifetime Value?",
        answer:
          "This is a snapshot for one period. CLV projects total revenue over a customer's entire relationship with you, using purchase frequency and expected lifespan.",
      },
    ],
    relatedSlugs: ["customer-lifetime-value", "customer-acquisition-cost"],
  },
  {
    slug: "operating-margin",
    name: "Operating Margin Calculator",
    category: "profit-pricing",
    shortDescription: "Find what share of revenue remains after operating expenses.",
    metaTitle: "Operating Margin Calculator — Formula & Example",
    metaDescription:
      "Calculate operating margin from revenue and operating income, with a worked example and how it differs from net margin.",
    formulaDisplay: "Operating Margin (%) = Operating Income ÷ Revenue × 100",
    variables: [
      { symbol: "Revenue", name: "Revenue", description: "Total sales income before any costs are deducted." },
      { symbol: "Operating Income", name: "Operating income", description: "Revenue minus COGS and operating expenses, before interest and taxes." },
    ],
    inputs: [
      { id: "revenue", label: "Revenue", format: "currency", defaultValue: 10000, min: 0.01 },
      { id: "operatingIncome", label: "Operating income", format: "currency", defaultValue: 1500, min: undefined },
    ],
    outputs: [{ id: "operatingMarginPercent", label: "Operating margin", format: "percent", highlight: true }],
    calculate: calculateOperatingMargin,
    interpret: (v) =>
      v.operatingMarginPercent >= 0
        ? `${v.operatingMarginPercent.toFixed(1)}% of revenue remains after core operating costs, before interest and taxes.`
        : `Operating expenses exceeded revenue — core operations lost money before interest and taxes were even considered.`,
    commonMistakes: [
      "Including interest or tax in operating income — those come after operating margin, not inside it.",
      "Confusing operating margin with net margin, which subtracts everything, including interest and tax.",
    ],
    faq: [
      {
        question: "How does operating margin differ from net profit margin?",
        answer:
          "Operating margin stops before interest and taxes; net profit margin subtracts every expense including those. Operating margin better isolates how efficient the core business is, independent of financing decisions.",
      },
    ],
    relatedSlugs: ["net-profit", "gross-profit", "profit-margin"],
  },
  {
    slug: "price-increase",
    name: "Price Increase Calculator",
    category: "profit-pricing",
    shortDescription: "Find the new price after applying a percentage increase.",
    metaTitle: "Price Increase Calculator — New Price & Amount Added",
    metaDescription:
      "Calculate the new price and amount added after applying a percentage increase to a current price.",
    formulaDisplay: "New Price = Current Price + (Current Price × Increase % ÷ 100)",
    variables: [
      { symbol: "Price", name: "Current price", description: "The price before the increase." },
      { symbol: "Increase", name: "Increase percentage", description: "The percentage being added to the current price." },
    ],
    inputs: [
      { id: "currentPrice", label: "Current price", format: "currency", defaultValue: 100, min: 0, allowZero: true },
      { id: "increasePercent", label: "Increase percentage", format: "percent", defaultValue: 10, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "increaseAmount", label: "Amount added", format: "currency" },
      { id: "newPrice", label: "New price", format: "currency", highlight: true },
    ],
    calculate: calculatePriceIncrease,
    interpret: (v) => `The increase adds $${v.increaseAmount.toFixed(2)}, bringing the price to $${v.newPrice.toFixed(2)}.`,
    commonMistakes: [
      "Applying successive increases by adding percentages instead of compounding them one after another.",
      "Forgetting to check how a price increase affects margin — a higher price doesn't automatically mean more profit if it costs you volume.",
    ],
    faq: [
      {
        question: "How do two price increases compound?",
        answer:
          "Apply them one after another, not added together: a $100 price with a 10% increase becomes $110; a further 5% increase makes it $115.50 — not $115 (which would be a flat 15%).",
      },
    ],
    relatedSlugs: ["discount", "percentage-increase"],
  },
  {
    slug: "target-profit",
    name: "Target Profit Calculator",
    category: "business-finance",
    shortDescription: "Find how many units or how much revenue you need to hit a specific profit goal.",
    metaTitle: "Target Profit Calculator — Units & Revenue Needed",
    metaDescription:
      "Calculate the units and revenue needed to reach a specific profit target, based on fixed costs, price, and variable cost per unit.",
    formulaDisplay: "Units Needed = (Fixed Costs + Target Profit) ÷ (Price per Unit − Variable Cost per Unit)",
    variables: [
      { symbol: "Fixed Costs", name: "Fixed costs", description: "Costs that don't change with sales volume." },
      { symbol: "Target Profit", name: "Target profit", description: "The profit you want to reach, beyond break-even." },
      { symbol: "Price", name: "Price per unit", description: "What you charge for one unit." },
      { symbol: "Variable Cost", name: "Variable cost per unit", description: "The cost that scales directly with each unit sold." },
    ],
    inputs: [
      { id: "fixedCosts", label: "Fixed costs", format: "currency", defaultValue: 10000, min: 0, allowZero: true },
      { id: "targetProfit", label: "Target profit", format: "currency", defaultValue: 5000, min: 0, allowZero: true },
      { id: "pricePerUnit", label: "Price per unit", format: "currency", defaultValue: 50, min: 0.01 },
      { id: "variableCostPerUnit", label: "Variable cost per unit", format: "currency", defaultValue: 30, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "unitsNeeded", label: "Units needed", format: "number", highlight: true },
      { id: "revenueNeeded", label: "Revenue needed", format: "currency" },
    ],
    calculate: calculateTargetProfit,
    interpret: (v) =>
      `You'd need to sell about ${Math.ceil(v.unitsNeeded)} units (roughly $${v.revenueNeeded.toLocaleString(
        undefined,
        { maximumFractionDigits: 0 }
      )} in revenue) to cover fixed costs and hit your profit target.`,
    commonMistakes: [
      "Forgetting this is on top of break-even, not instead of it — it already includes covering fixed costs.",
      "Using an average variable cost that hides big differences between product lines.",
    ],
    faq: [
      {
        question: "How is this different from the Break-Even Calculator?",
        answer:
          "Break-even finds the point where profit is exactly zero. This calculator extends that same logic to a specific profit target above zero.",
      },
    ],
    relatedSlugs: ["break-even", "profit-margin"],
  },
  {
    slug: "commission-split",
    name: "Commission Split Calculator",
    category: "sales-marketing",
    shortDescription: "Split a total commission between two parties by percentage.",
    metaTitle: "Commission Split Calculator — Formula & Example",
    metaDescription:
      "Calculate how a total commission splits between two parties, such as an agent and a broker, by percentage.",
    formulaDisplay: "Party 1 Amount = Total Commission × Split % ÷ 100",
    variables: [
      { symbol: "Total", name: "Total commission", description: "The full commission amount being split." },
      { symbol: "Split %", name: "Party 1 split percentage", description: "The percentage of the commission going to party 1; the rest goes to party 2." },
    ],
    inputs: [
      { id: "totalCommission", label: "Total commission", format: "currency", defaultValue: 1000, min: 0, allowZero: true },
      { id: "partyOneSplitPercent", label: "Party 1 split percentage", format: "percent", defaultValue: 50, min: 0, allowZero: true },
    ],
    outputs: [
      { id: "partyOneAmount", label: "Party 1 amount", format: "currency", highlight: true },
      { id: "partyTwoAmount", label: "Party 2 amount", format: "currency" },
    ],
    calculate: calculateCommissionSplit,
    interpret: (v) =>
      `Party 1 receives $${v.partyOneAmount.toFixed(2)} and party 2 receives $${v.partyTwoAmount.toFixed(2)} from the total commission.`,
    commonMistakes: [
      "Entering a split percentage that already accounts for fees taken off the top elsewhere, double-counting the deduction.",
      "Assuming a 3-way split works the same way — this calculator handles two parties; a third party needs a second calculation.",
    ],
    faq: [
      {
        question: "Can this handle three or more parties?",
        answer:
          "Not directly — run it once for party 1 vs. the remainder, then run it again on that remainder to split it between the other two parties.",
      },
    ],
    relatedSlugs: ["commission", "revenue-per-customer"],
  },
  {
    slug: "payback-period",
    name: "Payback Period Calculator",
    category: "business-finance",
    shortDescription: "Find how long it takes an investment to pay for itself.",
    metaTitle: "Payback Period Calculator — Formula & Example",
    metaDescription:
      "Calculate the payback period for an investment from its initial cost and annual cash flow, with a worked example.",
    formulaDisplay: "Payback Period (years) = Initial Investment ÷ Annual Cash Flow",
    variables: [
      { symbol: "Investment", name: "Initial investment", description: "The upfront cost of the investment." },
      { symbol: "Cash Flow", name: "Annual cash flow", description: "The expected cash generated per year from the investment." },
    ],
    inputs: [
      { id: "initialInvestment", label: "Initial investment", format: "currency", defaultValue: 10000, min: 0, allowZero: true },
      { id: "annualCashFlow", label: "Annual cash flow", format: "currency", defaultValue: 2500, min: 0.01 },
    ],
    outputs: [{ id: "paybackPeriodYears", label: "Payback period (years)", format: "number", highlight: true }],
    calculate: calculatePaybackPeriod,
    interpret: (v) =>
      `It would take about ${v.paybackPeriodYears.toFixed(2)} years of this cash flow to recover the initial investment — this simple version doesn't account for the time value of money.`,
    commonMistakes: [
      "Using an average cash flow that hides early years with much lower returns.",
      "Not discounting future cash flows — this is a simple payback period, not a discounted payback period.",
    ],
    faq: [
      {
        question: "Does this account for the time value of money?",
        answer:
          "No — this is the simple payback period. A discounted payback period would apply a discount rate to future cash flows, which typically lengthens the payback time.",
      },
    ],
    relatedSlugs: ["roi", "break-even"],
  },
];

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getRelatedCalculators(def: CalculatorDefinition): CalculatorDefinition[] {
  return def.relatedSlugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter((c): c is CalculatorDefinition => Boolean(c));
}

export const categoryLabels: Record<CalculatorDefinition["category"], string> = {
  "profit-pricing": "Profit & Pricing",
  "business-finance": "Business Finance",
  "sales-marketing": "Sales & Marketing",
  freelancing: "Freelancing",
};
