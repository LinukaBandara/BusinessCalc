import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How BusinessCalc handles data, cookies, analytics, and advertising.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 prose prose-ink">
      <h1 className="text-3xl font-bold text-ink-900">Privacy Policy</h1>
      <p className="mt-4 text-ink-700">
        Calculator inputs are processed entirely in your browser and are not sent to or stored on
        our servers. We use aggregate analytics (such as Google Analytics) to understand overall
        site usage, and may use cookies for analytics and, in the future, advertising (such as
        Google AdSense). This policy will be updated with specifics before any such service goes
        live. [Placeholder — replace with your finalized privacy policy before launch, including
        your analytics/ad vendors, data retention, and any applicable regional requirements such
        as GDPR/CCPA.]
      </p>
    </div>
  );
}
