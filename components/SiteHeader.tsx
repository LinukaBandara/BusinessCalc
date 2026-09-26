import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-ink-300/40 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-ink-900">
          Business<span className="text-brand-600">Calc</span>
        </Link>
        <nav aria-label="Primary" className="hidden gap-6 text-sm font-medium text-ink-700 sm:flex">
          <Link href="/calculators" className="hover:text-brand-600">
            Calculators
          </Link>
          <Link href="/guides" className="hover:text-brand-600">
            Guides
          </Link>
          <Link href="/about" className="hover:text-brand-600">
            About
          </Link>
          <Link href="/search" className="hover:text-brand-600">
            Search
          </Link>
        </nav>
        <Link
          href="/calculators"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Explore calculators
        </Link>
      </div>
    </header>
  );
}
