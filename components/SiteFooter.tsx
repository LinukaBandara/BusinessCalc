import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink-300/40 bg-ink-900 text-ink-300 no-print">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <p className="text-base font-semibold text-white">BusinessCalc</p>
            <p className="mt-2 text-sm">Free, accurate business calculators.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Calculators</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li><Link href="/calculators/profit-margin" className="hover:text-white">Profit Margin</Link></li>
              <li><Link href="/calculators/markup" className="hover:text-white">Markup</Link></li>
              <li><Link href="/calculators/break-even" className="hover:text-white">Break-Even</Link></li>
              <li><Link href="/calculators/roi" className="hover:text-white">ROI</Link></li>
              <li><Link href="/calculators/cagr" className="hover:text-white">CAGR</Link></li>
              <li><Link href="/guides" className="hover:text-white">All guides</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Company</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/methodology" className="hover:text-white">Methodology</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Legal</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-white">Affiliate disclosure</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs text-ink-500">
          © {new Date().getFullYear()} BusinessCalc. Calculators are for informational and educational
          purposes and are not professional financial, tax, accounting, or legal advice.
        </p>
      </div>
    </footer>
  );
}
