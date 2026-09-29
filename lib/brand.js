/**
 * Real brand content sourced from https://lilasonsdevelopers.in/
 */

export const BRAND = {
  name: "Lilasons Developers",
  shortName: "Lilasons",
  tagline: "Building Your Foundation, Building Your Environment",
  headline: "Excellency Redefined",
  logo: "/lilasons-logo.jpg",
  email: "developers@lilasons.in",
  phones: ["+91 98234 41147", "+91 95273 29363"],
  whatsapp: "+919823441147",
  site: "https://lilasonsdevelopers.in/",
  hours: {
    days: "Monday To Saturday",
    time: "9AM – 5PM",
  },
  address: {
    line1: "Office No. 119, Amrut Sai Solitaire",
    line2: "Beside Goldie Theatre, Railway Station Road",
    city: "Aurangabad (Chhatrapati Sambhaji Nagar)",
    state: "Maharashtra",
    pin: "431001",
    country: "India",
    short: "Aurangabad, Maharashtra",
  },
  social: [
    { label: "Instagram", href: "https://lilasonsdevelopers.in/" },
    { label: "Facebook", href: "https://lilasonsdevelopers.in/" },
    { label: "YouTube", href: "https://lilasonsdevelopers.in/walkthrough" },
  ],
};

export const NAV_PRIMARY = [
  { label: "Home", href: "#home" },
  { label: "Our Company", href: "#about" },
  { label: "Projects", href: "#residences" },
  { label: "Walkthrough", href: "#projects" },
  { label: "Media", href: "https://lilasonsdevelopers.in/media" },
  { label: "Contact", href: "#contact" },
];

export const NAV_ALL = [
  { label: "Home", href: "#home" },
  { label: "Our Company", href: "#about" },
  { label: "Projects", href: "#residences" },
  { label: "Amrut Sai Gold Star", href: "#residences" },
  { label: "ASGS PH-II Row House", href: "#residences" },
  { label: "Amrut Sai Plaza PH-II", href: "#residences" },
  { label: "Amrut Sai Solitaire", href: "#residences" },
  { label: "Golden Heights", href: "#residences" },
  { label: "Lilasons Golden Estate", href: "#residences" },
  { label: "Walkthrough", href: "#projects" },
  { label: "Media", href: "https://lilasonsdevelopers.in/media" },
  { label: "Contact Us", href: "#contact" },
];

export const ABOUT = {
  eyebrow: "— Our Company",
  title: "30 Years and Counting",
  body: "The Lilasons Group, a pioneering entrepreneurial entity since 1971, has an illustrious history rooted in the Indian industry — and a bold expansion into real estate that has shaped Aurangabad’s skyline with residential and commercial landmarks.",
  detail:
    "Drawing on decades of expertise, Lilasons Developers delivers impeccable construction with state-of-the-art design — from family homes to commercial destinations across Chhatrapati Sambhaji Nagar.",
  stats: [
    { label: "Residential schemes across the city" },
    { label: "Homes in new & upcoming areas" },
    { label: "Commercial sale & leasing wing" },
  ],
  wordmark: "Homes",
  cta: "Our Company",
  ctaHref: "https://lilasonsdevelopers.in/our-company",
};

export const DOMAINS = [
  {
    href: "#residences",
    image: "/domains/domain-residences.jpg",
    label: "Flats & Family Homes",
    title: "Residences",
    span: "col",
  },
  {
    href: "#residences",
    image: "/domains/domain-developments.jpg",
    label: "Towers & Societies",
    title: "Developments",
    span: "col",
  },
  {
    href: "#about",
    image: "/domains/domain-interiors.jpg",
    label: "State of the Art Designs",
    title: "Design",
    span: "col",
  },
  {
    href: "#residences",
    image: "/domains/domain-communities.jpg",
    label: "Gated Living & Plots",
    title: "Communities",
    span: "wide",
  },
  {
    href: "#residences",
    image: "/domains/domain-collections.jpg",
    label: "Shops & Office Spaces",
    title: "Commercial",
    span: "narrow",
  },
];

export const PROJECTS = [
  {
    id: "amrut-sai-gold-star",
    category: "Residential",
    indexLabel: "01",
    title: "Amrut Sai Gold Star",
    placeLine: "Golwadi, Aurangabad — RERA P51500020039",
    summary:
      "Luxurious living in Golwadi across 1.76 acres — 9 towers up to 4 floors and 150 units blending contemporary architecture with thoughtful amenities.",
    meta: [
      { label: "Typology", value: "Residential Towers" },
      { label: "Location", value: "Golwadi, Paithan Road" },
      { label: "Land", value: "1.76 Acres" },
      { label: "Units", value: "150 Homes" },
      { label: "Options", value: "1–4 BHK" },
    ],
    image: "/projects/project-marina.jpg",
    alt: "Amrut Sai Gold Star residential development",
    href: "https://lilasonsdevelopers.in/amrut-sai-gold-star",
  },
  {
    id: "asgs-ph-ii-row-house",
    category: "Row House",
    indexLabel: "02",
    title: "ASGS PH-II Row House",
    placeLine: "Golwadi, Aurangabad — RERA P51500050887",
    summary:
      "An exclusive community of 32 row houses on 1.5 acres — each approximately 2300 sq.ft across 2 floors with terrace living in an upcoming posh locale.",
    meta: [
      { label: "Typology", value: "4 BHK Row Houses" },
      { label: "Location", value: "Golwadi, Paithan Road" },
      { label: "Land", value: "1.5 Acres" },
      { label: "Homes", value: "32 Row Houses" },
      { label: "Built-up", value: "~2300 Sq.Ft" },
    ],
    image: "/projects/project-palm.jpg",
    alt: "ASGS Phase II row house residences",
    href: "https://lilasonsdevelopers.in/asgs-ph-ii-row-house",
  },
  {
    id: "amrut-sai-plaza-ph-ii",
    category: "Residential",
    indexLabel: "03",
    title: "Amrut Sai Plaza PH-II",
    placeLine: "MIDC, Aurangabad — RERA P51500011307",
    summary:
      "Following Sai Plaza Phase-1, Phase-2 spans 3.85 acres with 304 units across 9 towers — temple, courts, gardens, and walking distance from the railway station.",
    meta: [
      { label: "Typology", value: "Housing Society" },
      { label: "Location", value: "Near Hamalawada, MIDC" },
      { label: "Land", value: "3.85 Acres" },
      { label: "Units", value: "304 Homes" },
      { label: "Options", value: "2–4 BHK & Duplex" },
    ],
    image: "/projects/project-downtown.jpg",
    alt: "Amrut Sai Plaza Phase II residential society",
    href: "https://lilasonsdevelopers.in/amrut-sai-plaza-ph-ii-1",
  },
  {
    id: "golden-heights",
    category: "Luxury Living",
    indexLabel: "04",
    title: "Golden Heights",
    placeLine: "Itkheda, Aurangabad",
    summary:
      "The pinnacle of luxury living in the new heart of the city — elegant residences with world-class amenities, premium finishes, and seamless connectivity.",
    meta: [
      { label: "Typology", value: "Luxury Residences" },
      { label: "Location", value: "Itkheda, Aurangabad" },
      { label: "Options", value: "3 BHK · 4 BHK" },
      { label: "Also", value: "Shops & Offices" },
      { label: "Highlights", value: "Turf · Open Gym · Lifts" },
    ],
    image: "/projects/project-hills.jpg",
    alt: "Golden Heights luxury residences in Itkheda",
    href: "https://lilasonsdevelopers.in/golden-heights",
  },
];

export const EXPAND = {
  kicker: "Lilasons · Aurangabad",
  titleLine1: "Excellency",
  titleLine2: "Redefined",
  hint: "Scroll to reveal",
  overlayEyebrow: "— Our Promise",
  overlayTitle: "Building your foundation,",
  overlayTitle2: "your environment",
  overlayBody:
    "From thoughtfully planned homes to commercial destinations — Lilasons Developers crafts spaces for families and businesses across Aurangabad.",
  image: "/about/expand-story-hero.jpg",
  alt: "Lilasons Developers premium residential living",
};

export const FOOTER = {
  cta: "Ready to find your next home?",
  workLabel: "Work With Us",
  other: [
    { label: "Our Company", href: "https://lilasonsdevelopers.in/our-company" },
    { label: "Media", href: "https://lilasonsdevelopers.in/media" },
    { label: "Walkthrough", href: "https://lilasonsdevelopers.in/walkthrough" },
  ],
};
