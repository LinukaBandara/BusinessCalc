/**
 * Deliberate ad slot placeholders (see brief §34: "AdSense-ready
 * architecture"). Every slot currently renders nothing visible — no ad
 * network is wired up yet — but each is positioned so that turning on
 * AdSense later means filling in the `<ins>`/script tag inside the slot,
 * not restructuring any page. Slots never sit above a calculator's inputs
 * or between the inputs and the result, per the brief's ad-placement rules.
 */
function AdSlot({ id, className = "" }: { id: string; className?: string }) {
  return <div data-ad-slot={id} className={`empty:hidden ${className}`} aria-hidden="true" />;
}

export function AdSlotTop() {
  return <AdSlot id="top" className="mx-auto max-w-6xl px-4 sm:px-6" />;
}

export function AdSlotBetweenSections() {
  return <AdSlot id="between-sections" className="my-8" />;
}

export function AdSlotContent() {
  return <AdSlot id="content" className="my-8" />;
}

export function AdSlotBelowCalculator() {
  return <AdSlot id="below-calculator" className="mt-6" />;
}

export function AdSlotSidebar() {
  return <AdSlot id="sidebar" className="hidden lg:block" />;
}
