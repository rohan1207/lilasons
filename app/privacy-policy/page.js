import LegalPage from "@/components/pages/LegalPage";
import { PRIVACY } from "@/lib/legal";

export const metadata = {
  title: "Privacy Policy | Lilasons Developers",
  description:
    "How Lilasons Developers collects, uses, and protects personal information from website enquiries and visits.",
};

export default function Page() {
  return (
    <LegalPage
      title={PRIVACY.title}
      eyebrow={PRIVACY.eyebrow}
      updated={PRIVACY.updated}
      sections={PRIVACY.sections}
    />
  );
}
