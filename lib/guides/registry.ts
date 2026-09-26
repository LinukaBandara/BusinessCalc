import { GuideDefinition } from "./types";

export const guides: GuideDefinition[] = [
  {
    slug: "how-to-calculate-profit-margin",
    title: "How to Calculate Profit Margin",
    description: "What profit margin measures, how to calculate it, and how to read the result.",
    metaTitle: "How to Calculate Profit Margin (With Examples)",
    metaDescription:
      "A plain-English guide to calculating profit margin, including the formula, a worked example, and how to judge whether a margin is healthy.",
    category: "profit-pricing",
    sections: [
      {
        heading: "What profit margin tells you",
        paragraphs: [
          "Profit margin measures how much of each dollar of revenue is actually profit, after subtracting costs. It's expressed as a percentage, which makes it easy to compare across products, time periods, or competitors — even when their revenue sizes are very different.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "Profit Margin (%) = (Revenue − Cost) ÷ Revenue × 100. Revenue is your total sales income; Cost is what it took to generate that revenue. Depending on which costs you include, you get gross margin (cost of goods sold only) or net margin (every expense).",
          "Example: a product sells for $10,000 in revenue and costs $6,000 to deliver. Profit is $4,000, and margin is $4,000 ÷ $10,000 × 100 = 40%.",
        ],
      },
      {
        heading: "What counts as a healthy margin",
        paragraphs: [
          "There's no universal 'good' margin — it depends heavily on the industry. Grocery retail often runs under 5%, while software businesses can exceed 70%, because their cost structures are fundamentally different. Track your own margin over time and compare against your specific industry rather than a general benchmark.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["profit-margin", "markup", "gross-profit"],
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-01",
  },
  {
    slug: "markup-vs-margin",
    title: "Markup vs Profit Margin: What's the Difference",
    description: "Why markup and margin use the same numbers but give different percentages.",
    metaTitle: "Markup vs Margin — What's the Difference?",
    metaDescription:
      "Markup and profit margin are easy to confuse. This guide explains the difference with a side-by-side example and a formula to convert between them.",
    category: "profit-pricing",
    sections: [
      {
        heading: "Same inputs, different denominator",
        paragraphs: [
          "Markup and margin both start from the same two numbers — cost and price — but divide by different things. Markup divides profit by cost; margin divides profit by price (revenue). That single difference means the two percentages are never equal except at 0%.",
        ],
      },
      {
        heading: "A worked comparison",
        paragraphs: [
          "Take a product that costs $50 and sells for $75. Profit is $25. Markup = $25 ÷ $50 × 100 = 50%. Margin = $25 ÷ $75 × 100 = 33.3%. A 50% markup only produces a 33.3% margin — a common source of pricing mistakes when people use the terms interchangeably.",
        ],
      },
      {
        heading: "Converting between them",
        paragraphs: [
          "Margin = Markup ÷ (100 + Markup) × 100. Markup = Margin ÷ (100 − Margin) × 100. If you're setting a price to hit a target margin, use the second formula rather than applying the margin percentage directly as a markup.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["markup", "profit-margin"],
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-01",
  },
  {
    slug: "how-to-calculate-break-even",
    title: "How to Calculate Your Break-Even Point",
    description: "Find exactly how many units or how much revenue you need to cover fixed costs.",
    metaTitle: "How to Calculate Break-Even Point (With Formula & Example)",
    metaDescription:
      "Learn how to calculate your break-even point in units and revenue, using fixed costs, price, and variable cost per unit.",
    category: "business-finance",
    sections: [
      {
        heading: "Why break-even matters",
        paragraphs: [
          "Your break-even point is the sales level where total revenue exactly equals total costs — no profit, no loss. Everything sold beyond that point contributes to profit. It's one of the fastest ways to sanity-check a pricing or cost decision before committing to it.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "Break-Even Units = Fixed Costs ÷ (Price per Unit − Variable Cost per Unit). The denominator is called the contribution margin — how much each unit contributes toward covering fixed costs once its own variable cost is paid.",
          "Example: $10,000 in fixed costs, a $50 price, and a $30 variable cost per unit gives a $20 contribution margin. Break-even units = $10,000 ÷ $20 = 500 units, or $25,000 in revenue.",
        ],
      },
      {
        heading: "What moves the break-even point",
        paragraphs: [
          "Raising price or cutting variable cost per unit lowers the number of units you need to sell. Raising fixed costs (like rent or salaries) raises it. If price ever drops below variable cost, break-even becomes impossible — every unit sold loses money before fixed costs are even considered.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["break-even", "profit-margin", "markup"],
    publishedAt: "2026-09-05",
    updatedAt: "2026-09-05",
  },
  {
    slug: "roi-explained",
    title: "ROI Explained: How to Calculate and Interpret It",
    description: "What ROI measures, how to calculate it, and its main limitation.",
    metaTitle: "ROI Explained — Formula, Example & Limitations",
    metaDescription:
      "A clear explanation of return on investment (ROI): the formula, a worked example, and why ROI alone doesn't account for time.",
    category: "business-finance",
    sections: [
      {
        heading: "What ROI measures",
        paragraphs: [
          "Return on investment (ROI) measures the gain or loss from an investment relative to what it cost, expressed as a percentage. It's a fast way to compare very different kinds of spending — a marketing campaign, new equipment, a stock purchase — on the same scale.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "ROI (%) = (Return − Cost) ÷ Cost × 100. Example: a $1,000 investment returns $1,250. Net gain is $250, so ROI = $250 ÷ $1,000 × 100 = 25%.",
        ],
      },
      {
        heading: "The limitation: ROI ignores time",
        paragraphs: [
          "A 25% ROI over one month is very different from 25% over five years, but plain ROI doesn't distinguish between them. If you need to compare investments held over different time periods, annualize the return — the CAGR calculator does exactly that for multi-year growth.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["roi", "cagr", "break-even"],
    publishedAt: "2026-09-05",
    updatedAt: "2026-09-05",
  },
  {
    slug: "cagr-explained",
    title: "CAGR Explained: Compound Annual Growth Rate",
    description: "What CAGR is, how it smooths volatility, and when it can mislead.",
    metaTitle: "CAGR Explained — Formula, Example & When It Misleads",
    metaDescription:
      "Understand Compound Annual Growth Rate (CAGR): the formula, a worked example, and why it can hide year-to-year volatility.",
    category: "business-finance",
    sections: [
      {
        heading: "What CAGR is",
        paragraphs: [
          "CAGR answers a specific question: what constant annual growth rate would take a starting value to an ending value over a given number of years? It smooths out any ups and downs along the way into a single, comparable number.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "CAGR (%) = ((Ending Value ÷ Beginning Value) ^ (1 ÷ Years) − 1) × 100. Example: revenue grows from $10,000 to $20,000 over 5 years. CAGR = ((20000 ÷ 10000) ^ (1/5) − 1) × 100 ≈ 14.87%.",
        ],
      },
      {
        heading: "Where CAGR can mislead",
        paragraphs: [
          "Because CAGR only looks at the start and end points, two very different growth paths — one steady, one wildly volatile — can produce the identical CAGR. Use it to summarize a trend, not to assume the actual year-to-year path was smooth.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["cagr", "revenue-growth", "roi"],
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
  },
  {
    slug: "how-to-calculate-customer-acquisition-cost",
    title: "How to Calculate Customer Acquisition Cost (CAC)",
    description: "What to include in CAC, the formula, and how to judge whether it's sustainable.",
    metaTitle: "How to Calculate Customer Acquisition Cost (CAC)",
    metaDescription:
      "Learn how to calculate CAC correctly, what spend to include, and how to compare it against customer lifetime value.",
    category: "sales-marketing",
    sections: [
      {
        heading: "The formula",
        paragraphs: [
          "CAC = Total Sales & Marketing Spend ÷ New Customers Acquired, for the same time period. Example: $5,000 spent in a month that brings in 50 new customers gives a CAC of $100.",
        ],
      },
      {
        heading: "What to include in spend",
        paragraphs: [
          "Ad spend is the obvious one, but a complete CAC also includes sales team salaries and commissions, marketing tools and software, and any agency or content costs directly tied to acquisition. Leaving these out understates the true cost of growth.",
        ],
      },
      {
        heading: "Judging whether CAC is sustainable",
        paragraphs: [
          "CAC alone doesn't tell you if spend is worth it — you need to compare it to Customer Lifetime Value (CLV). A commonly cited target is a CLV:CAC ratio of at least 3:1, though the right ratio depends on your margins and how quickly you need to recover the acquisition cost.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["customer-acquisition-cost", "customer-lifetime-value", "conversion-rate"],
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
  },
  {
    slug: "how-to-set-a-freelance-hourly-rate",
    title: "How to Set Your Freelance Hourly Rate",
    description: "A step-by-step approach to pricing your time as a freelancer.",
    metaTitle: "How to Set a Freelance Hourly Rate",
    metaDescription:
      "A practical guide to setting a freelance hourly rate that covers your income goal, expenses, and realistic billable hours.",
    category: "freelancing",
    sections: [
      {
        heading: "Start from your income goal, not a guess",
        paragraphs: [
          "Rather than guessing a rate, work backward from what you actually need to earn: your target annual income, plus the business expenses a salaried job wouldn't require you to cover yourself (software, insurance, equipment).",
        ],
      },
      {
        heading: "Use billable hours, not total hours",
        paragraphs: [
          "A common mistake is dividing income by total working hours. Only billable hours count toward the rate — admin, proposals, and finding new clients don't get paid directly. Most freelancers can realistically bill 20–30 hours in a 40-hour week.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "Hourly Rate = (Desired Annual Income + Annual Expenses) ÷ (Billable Hours per Week × Weeks Worked per Year). This is a pre-tax figure — set aside a separate percentage for income and self-employment tax based on your local rules.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["freelance-rate", "hourly-rate", "salary-to-hourly"],
    publishedAt: "2026-09-12",
    updatedAt: "2026-09-12",
  },
  {
    slug: "gross-profit-vs-net-profit",
    title: "Gross Profit vs Net Profit: What's the Difference",
    description: "Why these two profit figures tell very different stories about a business.",
    metaTitle: "Gross Profit vs Net Profit — What's the Difference?",
    metaDescription:
      "Gross profit and net profit are often confused. This guide explains what each one subtracts, with a side-by-side worked example.",
    category: "profit-pricing",
    sections: [
      {
        heading: "Two different stopping points",
        paragraphs: [
          "Both figures start from revenue, but they stop subtracting costs at different points. Gross profit only subtracts the direct cost of producing what you sold (COGS). Net profit keeps going — operating expenses, interest, and taxes all come out before you get to net profit.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Revenue: $100,000. COGS: $60,000. Gross profit = $40,000 (40% gross margin). Operating expenses, interest, and tax add up to $30,000. Net profit = $40,000 − $30,000 = $10,000 (10% net margin). The gap between the two numbers is entirely overhead, financing, and tax.",
        ],
      },
      {
        heading: "Why both numbers matter",
        paragraphs: [
          "A healthy gross margin with a weak net margin usually points to bloated overhead, not a pricing problem. A weak gross margin can't be fixed by cutting overhead alone — it points back to production cost or pricing itself. Tracking both tells you where to actually look.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["gross-profit", "net-profit", "operating-margin"],
    publishedAt: "2026-09-14",
    updatedAt: "2026-09-14",
  },
  {
    slug: "operating-margin-explained",
    title: "Operating Margin Explained",
    description: "What operating margin isolates that gross and net margin don't.",
    metaTitle: "Operating Margin Explained — Formula & Example",
    metaDescription:
      "Understand operating margin: what it measures, how it differs from gross and net margin, and a worked example.",
    category: "profit-pricing",
    sections: [
      {
        heading: "What it isolates",
        paragraphs: [
          "Operating margin measures how profitable the core business is, before interest and taxes get involved. Two companies with identical operations but very different debt loads will have similar operating margins but very different net margins — operating margin strips that difference out.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "Operating Margin (%) = Operating Income ÷ Revenue × 100, where Operating Income = Revenue − COGS − Operating Expenses (before interest and tax). Example: $10,000 revenue and $1,500 operating income gives a 15% operating margin.",
        ],
      },
      {
        heading: "Reading a negative operating margin",
        paragraphs: [
          "A negative operating margin means the core business is losing money before financing and tax are even factored in — a more serious signal than a weak net margin, which could simply reflect high interest payments on otherwise healthy operations.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["operating-margin", "net-profit", "gross-profit"],
    publishedAt: "2026-09-15",
    updatedAt: "2026-09-15",
  },
  {
    slug: "how-to-calculate-a-discount",
    title: "How to Calculate a Discount (and Stack Multiple Discounts)",
    description: "The discount formula, and why stacked discounts don't simply add together.",
    metaTitle: "How to Calculate a Discount — Formula & Stacking Rules",
    metaDescription:
      "Learn how to calculate a percentage discount and how to correctly stack multiple discounts, with a worked example.",
    category: "profit-pricing",
    sections: [
      {
        heading: "The basic formula",
        paragraphs: [
          "Final Price = Original Price − (Original Price × Discount % ÷ 100). A $100 item at 20% off saves $20, bringing the price to $80.",
        ],
      },
      {
        heading: "Stacking discounts correctly",
        paragraphs: [
          "A common mistake is adding two discount percentages together. But a 20% discount followed by a further 10% discount is not a 30% total discount — it's applied sequentially: $100 → $80 (20% off) → $72 (10% off $80), a combined discount of 28%, not 30%.",
        ],
      },
      {
        heading: "The reverse problem: price increases",
        paragraphs: [
          "The same sequential logic applies to price increases. If you need to go the other direction — finding a new price after a percentage increase instead of a decrease — use the Price Increase Calculator.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["discount", "price-increase", "markup"],
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
  },
  {
    slug: "how-to-calculate-target-profit",
    title: "How to Calculate Target Profit (Beyond Break-Even)",
    description: "Extend the break-even formula to find sales needed for a specific profit goal.",
    metaTitle: "How to Calculate Target Profit — Formula & Example",
    metaDescription:
      "Learn how to calculate the units and revenue needed to reach a specific profit target, extending the break-even formula.",
    category: "business-finance",
    sections: [
      {
        heading: "Break-even plus a goal",
        paragraphs: [
          "Break-even finds the point where profit is exactly zero. Target profit analysis asks a more useful question: how many units do I need to sell to hit a specific profit number, not just avoid a loss?",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "Units Needed = (Fixed Costs + Target Profit) ÷ (Price per Unit − Variable Cost per Unit). Add the target profit directly into the numerator, alongside fixed costs, then divide by the same contribution margin used in break-even.",
          "Example: $10,000 fixed costs, a $5,000 profit target, a $50 price, and a $30 variable cost give a $20 contribution margin. Units needed = ($10,000 + $5,000) ÷ $20 = 750 units, or $37,500 in revenue.",
        ],
      },
      {
        heading: "Using it for planning",
        paragraphs: [
          "This is useful for setting realistic sales targets tied to an actual profit goal, rather than an arbitrary revenue number pulled from last year's results.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["target-profit", "break-even", "profit-margin"],
    publishedAt: "2026-09-17",
    updatedAt: "2026-09-17",
  },
  {
    slug: "payback-period-explained",
    title: "Payback Period Explained",
    description: "How long an investment takes to pay for itself, and what the simple version leaves out.",
    metaTitle: "Payback Period Explained — Formula & Limitations",
    metaDescription:
      "Understand payback period: the formula, a worked example, and why it doesn't account for the time value of money.",
    category: "business-finance",
    sections: [
      {
        heading: "The formula",
        paragraphs: [
          "Payback Period (years) = Initial Investment ÷ Annual Cash Flow. A $10,000 investment generating $2,500 a year pays for itself in 4 years.",
        ],
      },
      {
        heading: "What it's good for",
        paragraphs: [
          "Payback period is a quick risk filter: shorter paybacks mean less time your capital is exposed. It's especially useful for comparing investments where the main concern is how fast you recover your outlay, not total long-run return.",
        ],
      },
      {
        heading: "What it leaves out",
        paragraphs: [
          "The simple version treats every year's cash flow as equally valuable and ignores anything that happens after payback. A discounted payback period applies a discount rate to future cash flows, and total ROI captures value earned beyond the payback point — use payback period alongside those, not instead of them.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["payback-period", "roi", "break-even"],
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-18",
  },
  {
    slug: "how-to-calculate-revenue-per-customer",
    title: "How to Calculate Revenue Per Customer",
    description: "A simple metric for tracking whether growth is coming from more customers or bigger spend.",
    metaTitle: "How to Calculate Revenue Per Customer",
    metaDescription:
      "Learn how to calculate average revenue per customer and how it differs from customer lifetime value.",
    category: "sales-marketing",
    sections: [
      {
        heading: "The formula",
        paragraphs: [
          "Revenue Per Customer = Total Revenue ÷ Number of Customers, for the same period. It's a simple average, but tracking it over time reveals whether revenue growth is coming from acquiring more customers or from existing customers spending more.",
        ],
      },
      {
        heading: "A snapshot, not a projection",
        paragraphs: [
          "This is a single-period average, not a forecast. If you want to estimate what a customer is worth over their entire relationship with you — not just this period — that's what Customer Lifetime Value (CLV) calculates instead.",
        ],
      },
      {
        heading: "Watch for hidden segments",
        paragraphs: [
          "A single blended average can hide very different customer tiers. If you have both small and large accounts, consider calculating revenue per customer separately for each segment before drawing conclusions.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["revenue-per-customer", "customer-lifetime-value", "customer-acquisition-cost"],
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-19",
  },
  {
    slug: "how-to-split-sales-commission",
    title: "How to Split Sales Commission Between Two Parties",
    description: "A simple approach to dividing a commission fairly between an agent, broker, or referral partner.",
    metaTitle: "How to Split Sales Commission — Formula & Example",
    metaDescription:
      "Learn how to split a total commission between two parties by percentage, with a worked example.",
    category: "sales-marketing",
    sections: [
      {
        heading: "The formula",
        paragraphs: [
          "Party 1 Amount = Total Commission × Split % ÷ 100. Party 2 gets whatever remains. A $1,000 commission split 50/50 gives each party $500; a 60/40 split gives $600 and $400.",
        ],
      },
      {
        heading: "Splitting more than two ways",
        paragraphs: [
          "For three or more parties, split off one party's share first, then run the calculation again on the remainder to divide it between the rest — the math only handles two parties at a time, but you can chain it.",
        ],
      },
      {
        heading: "Agree the split before the sale, not after",
        paragraphs: [
          "Disputes over commission splits are far more common after a deal closes. Document the agreed percentage before the sale happens, ideally alongside the original Commission Calculator figure both parties are splitting from.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["commission-split", "commission"],
    publishedAt: "2026-09-20",
    updatedAt: "2026-09-20",
  },
  {
    slug: "average-vs-weighted-average",
    title: "Average vs Weighted Average: When to Use Each",
    description: "Why a plain average can be misleading when some values matter more than others.",
    metaTitle: "Average vs Weighted Average — When to Use Each",
    metaDescription:
      "Understand the difference between a simple average and a weighted average, with a worked example showing why they diverge.",
    category: "business-finance",
    sections: [
      {
        heading: "When a plain average works",
        paragraphs: [
          "A plain average treats every value equally: Average = Sum of Values ÷ Count of Values. That's the right tool when every value genuinely represents the same weight or importance — like averaging daily sales across a week.",
        ],
      },
      {
        heading: "When it doesn't",
        paragraphs: [
          "A plain average breaks down when values represent different-sized groups or different importance. Averaging a 30-question quiz score with a 3-question quiz score as if they counted equally overstates the smaller quiz's influence.",
        ],
      },
      {
        heading: "The weighted average formula",
        paragraphs: [
          "Weighted Average = Sum(Value × Weight) ÷ Sum(Weight). Example: a score of 80 worth 30% of a grade and a score of 90 worth 70% gives (80×0.3 + 90×0.7) ÷ (0.3+0.7) = 87 — closer to 90 than a plain average of 85 would suggest, correctly reflecting that the second score counted for more.",
        ],
      },
    ],
    relatedCalculatorSlugs: ["average", "weighted-average"],
    publishedAt: "2026-09-21",
    updatedAt: "2026-09-21",
  },
];

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: GuideDefinition["category"]): GuideDefinition[] {
  return guides.filter((g) => g.category === category);
}

export function getGuidesForCalculator(calculatorSlug: string): GuideDefinition[] {
  return guides.filter((g) => g.relatedCalculatorSlugs.includes(calculatorSlug));
}
