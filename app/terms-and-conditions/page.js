import LegalPage from "@/components/pages/LegalPage";
import { TERMS } from "@/lib/legal";

export const metadata = {
  title: "Terms & Conditions | Lilasons Developers",
  description:
    "Terms of use for the Lilasons Developers website, project information, and enquiries.",
};

export default function Page() {
  return (
    <LegalPage
      title={TERMS.title}
      eyebrow={TERMS.eyebrow}
      updated={TERMS.updated}
      sections={TERMS.sections}
    />
  );
}
