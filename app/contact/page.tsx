import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with the BusinessCalc team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 prose prose-ink">
      <h1 className="text-3xl font-bold text-ink-900">Contact</h1>
      <p className="mt-4 text-ink-700">
        Found a calculation error, broken link, or have a calculator request? Email{" "}
        <a href="mailto:hello@businesscalc.example.com" className="text-brand-600 underline">
          hello@businesscalc.example.com
        </a>{" "}
        [placeholder — replace with your real inbox before launch].
      </p>
    </div>
  );
}
