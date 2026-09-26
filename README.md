# BusinessCalc

Free business calculators, built as a Next.js 14 (App Router) + TypeScript +
Tailwind site designed to grow into a large, genuinely useful organic-search
property.

## What's in this build

- Site shell: header, footer, homepage, global styles/design tokens.
- A reusable **calculator engine** with two page-template patterns:
  - Fixed-field calculators (`app/calculators/[slug]/page.tsx` +
    `CalculatorShell`) driven by `lib/calculators/registry.ts` — 24 of them.
  - List-based calculators (`ListCalculatorShell`, dynamic add/remove rows)
    driven by `lib/calculators/listRegistry.ts` — Average and Weighted
    Average. Both patterns share the same page template, FAQ, breadcrumbs,
    related-guides and related-calculators sections.
- **26 fully working calculators total**, each with validated pure
  calculation functions, unit tests, formula explanation, worked-example
  defaults, common mistakes, FAQ (FAQPage JSON-LD), and related-calculator
  links:
  - Profit & Pricing: Profit Margin, Markup, Gross Profit, Net Profit,
    Discount, Operating Margin, Price Increase
  - Business Finance: ROI, Break-Even, CAGR, Revenue Growth, Target Profit,
    Payback Period, Average, Weighted Average
  - Sales & Marketing: Conversion Rate, Customer Acquisition Cost, Customer
    Lifetime Value, Commission, Revenue Per Customer, Commission Split
  - Freelancing: Freelance Rate, Hourly Rate, Salary to Hourly
  - Business finance: Percentage Increase, Percentage Decrease
  - **Deliberately not built**, to avoid near-duplicate/doorway pages
    (see `93. IMPORTANT SEO SAFETY RULES` in the original brief): Gross
    Margin (same output as Gross Profit's margin), Sales Growth (same
    formula as Revenue Growth), Break-Even Units (already inside
    Break-Even), Required Sales (folded into Target Profit's revenue
    output).
- Calculator directory (`/calculators`) and 4 category landing pages
  (`/profit-pricing`, `/business-finance`, `/sales-marketing`,
  `/freelancing`) — all pull their calculator/guide lists from the
  registries, so nothing needs manual updates when content is added.
- **15 guides** (`/guides`) linked bidirectionally to their calculators and
  category pages, with Article JSON-LD — hitting the original launch
  target of 15.
- Reusable result actions (Copy / Share / Print) on every calculator,
  print-friendly via `@media print` rules in `globals.css`.
- AdSense-ready ad slot components (`components/AdSlots.tsx`) — inert
  placeholders positioned per the brief's ad-placement rules (never above
  or inside a calculator's inputs/result), ready to wire up when an ad
  network is added.
- A lightweight analytics event wrapper (`lib/analytics.ts`) firing
  `calculator_open`, `calculator_calculated`, `calculator_reset`,
  `result_copied`, `result_shared`, and `search_used` — currently a
  console-only stub in development; forwards to `gtag` automatically once
  Google Analytics is wired in.
- Client-side search (`/search`) over every calculator and guide,
  deliberately `noindex` + blocked in `robots.ts` since search result
  pages aren't meaningfully unique content.
- Technical SEO: per-page metadata + canonical URLs (`lib/seo.ts`),
  `robots.ts`, `sitemap.ts` (auto-generated from every registry),
  BreadcrumbList/FAQPage/Article JSON-LD, custom 404.
- Legal/trust pages: about, contact, privacy, terms, disclaimer,
  affiliate-disclosure, methodology (content is placeholder-flagged where
  it needs real business/legal details before launch).

## Not yet built

- Calculation history (localStorage) — the brief allows but doesn't require
  it, and it needs a bit more thought on UX (per-calculator vs. site-wide
  history) before building.
- Currency/unit selection, decimal precision controls.
- Tier-3 calculators beyond the 6 genuinely distinct ones added (Gross
  Margin, Sales Growth, Break-Even Units, and Required Sales were
  deliberately skipped as near-duplicates of existing calculators — see
  the calculator list above).
- Real Search Console verification and an actual AdSense account — the
  README below documents what to plug in once you have those.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run test      # runs all calculation unit tests (vitest)
npm run build     # production build — must pass with zero TS/lint errors
```

**Note:** this codebase was written in an environment with no network
access, so `npm install` / `npm run build` / `npm run test` have not
actually been run against it. The code has been manually checked for
brace balance, consistent typing, and duplicate-slug issues, but you
should run the real toolchain locally before deploying and fix anything
it flags.

## Environment variables

None are required for the current public pages. Update `SITE_URL` in
`lib/seo.ts` to your real production domain before deploying — canonical
URLs, Open Graph URLs, and the sitemap all derive from it. Before adding
analytics or AdSense, set the relevant IDs via `.env.local` and wire them
into `app/layout.tsx`.

## Deployment (Vercel)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import it in Vercel — it auto-detects Next.js, no config needed.
3. Set `SITE_URL` (and any analytics/ad env vars) before the first
   production deploy.
4. After deploy, submit `sitemap.xml` in Google Search Console.

## Adding a new fixed-field calculator

1. Add a pure, tested calculation function to `lib/calculators/calculations.ts`.
2. Add a `CalculatorDefinition` entry to `lib/calculators/registry.ts`.
3. Done — page, metadata, sitemap entry, and directory/category listings
   are generated automatically.

## Adding a new list-based calculator (like Average)

1. Add a pure, tested function to `lib/calculators/listCalculations.ts`
   that takes `ListRow[]` and returns a `CalcResult`.
2. Add a `ListCalculatorDefinition` entry to `lib/calculators/listRegistry.ts`.
3. Done — same page template, sitemap, and listings pick it up
   automatically via `getListCalculatorBySlug`.
