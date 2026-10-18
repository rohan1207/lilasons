import { BRAND } from "@/lib/brand";

export const PRIVACY = {
  eyebrow: "— Legal",
  title: "Privacy Policy",
  updated: "18 October 2026",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        `${BRAND.legalName} (“Lilasons”, “we”, “us”) operates the website at lilasonsdevelopers.in and related enquiry channels. This policy explains how we handle personal information when you browse our site, submit forms, or contact us about homes and commercial spaces in Aurangabad.`,
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: [
        "We may collect your name, email address, phone number, project interest, and message content when you enquire via forms, email, phone, or WhatsApp. Technical data such as browser type and approximate location may be collected through standard web analytics to improve site performance.",
        "We do not knowingly collect sensitive personal data unless you choose to share it in free-text messages.",
      ],
    },
    {
      heading: "How we use information",
      paragraphs: [
        "We use your details to respond to enquiries, schedule site visits or walkthroughs, share project information (including RERA-registered developments), and improve our website and services. We may also send relevant updates if you subscribe to offers.",
      ],
    },
    {
      heading: "Sharing and retention",
      paragraphs: [
        "We do not sell your personal information. We may share data with trusted service partners (for example email or hosting providers) solely to operate our communications, or when required by law. We retain enquiry records as long as needed for business and legal purposes, then delete or anonymise them.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        `You may request access, correction, or deletion of your personal information by writing to ${BRAND.email}. You can also ask us to stop marketing communications at any time.`,
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Office: ${BRAND.address.full}. Email: ${BRAND.email}. Phone: ${BRAND.phones.join(" / ")}.`,
      ],
    },
  ],
};

export const TERMS = {
  eyebrow: "— Legal",
  title: "Terms & Conditions",
  updated: "18 October 2026",
  sections: [
    {
      heading: "Using this website",
      paragraphs: [
        `By accessing the ${BRAND.name} website, you agree to these terms. Content is provided for general information about our company, projects, walkthroughs, media, and blogs in Aurangabad (Chhatrapati Sambhaji Nagar), Maharashtra.`,
      ],
    },
    {
      heading: "Project information",
      paragraphs: [
        "Project descriptions, amenities, unit sizes, images, and timelines are indicative and may change. Always verify RERA registration details, brochures, and agreements before purchasing. Nothing on this site constitutes a binding offer, allotment, or legal advice.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "Text, branding, photographs, and design on this site belong to Lilasons or its licensors. You may not copy, redistribute, or commercially reuse materials without prior written consent.",
      ],
    },
    {
      heading: "Enquiries and communications",
      paragraphs: [
        "Forms, email, and WhatsApp messages are handled in good faith. Response times depend on business hours (Monday to Saturday, 09:00 am – 05:00 pm). We may decline incomplete or inappropriate requests.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "While we aim for accuracy, the site is provided “as is”. Lilasons is not liable for decisions made solely on website content, third-party links, or temporary outages.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of India. Disputes are subject to the jurisdiction of courts in Aurangabad, Maharashtra, unless applicable law requires otherwise.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `For questions about these terms, contact ${BRAND.email} or visit ${BRAND.address.full}.`,
      ],
    },
  ],
};
