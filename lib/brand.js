/**
 * Real Lilasons Developers content — sourced from client site copy.
 */

import { PROJECTS, PROJECT_NAV } from "@/lib/projects";

export { PROJECTS, PROJECT_NAV };

export const BRAND = {
  name: "Lilasons Developers",
  shortName: "Lilasons",
  legalName: "Lilasons Developers",
  tagline: "Building Your Foundation, Building Your Environment",
  headline: "Excellency Redefined",
  logo: "/lilasons-logo.png",
  email: "developers@lilasons.in",
  phones: ["+91 98234 41147", "+91 95273 29363"],
  whatsapp: "919823441147",
  whatsappUrl: "https://wa.me/919823441147",
  site: "https://lilasonsdevelopers.in/",
  hours: {
    days: "Monday To Saturday",
    time: "09:00 am – 05:00 pm",
    note: "Open today",
  },
  address: {
    line1: "Office No. 119, Amrut Sai Solitaire",
    line2: "Beside Goldie Theatre, Railway Station Road",
    building: "Amrut Sai Solitaire, Railway Station Road, MIDC",
    city: "Aurangabad (Chhatrapati Sambhaji Nagar)",
    state: "Maharashtra",
    pin: "431001",
    country: "India",
    short: "Aurangabad, Maharashtra",
    full: "Office No. 119, Amrut Sai Solitaire, Beside Goldie Theatre, Railway Station Road, Aurangabad - 431001",
  },
  mapsQuery:
    "Amrut+Sai+Solitaire,+Railway+Station+Road,+Aurangabad,+Maharashtra+431001",
  social: [
    { label: "Our Company", href: "/our-company" },
    { label: "Walkthrough", href: "/walkthrough" },
    { label: "Media", href: "/media" },
  ],
};

export const NAV_PRIMARY = [
  { label: "Home", href: "/home" },
  { label: "Our Company", href: "/our-company" },
  { label: "Our Projects", href: "/projects", children: PROJECT_NAV },
  { label: "Walkthrough", href: "/walkthrough" },
  { label: "Media", href: "/media" },
  { label: "Contact Us", href: "/contact" },
];

export const NAV_ALL = [
  { label: "Home", href: "/home" },
  { label: "Our Company", href: "/our-company" },
  { label: "Our Projects", href: "/projects" },
  ...PROJECT_NAV,
  { label: "Walkthrough", href: "/walkthrough" },
  { label: "Media", href: "/media" },
  { label: "Contact Us", href: "/contact" },
];

export const HOME = {
  welcomeEyebrow: "Welcome to Lilasons Developers",
  welcomeTitle: "Excellency Redefined as a Harmonious Blend of Trust & Design",
  welcomeBody:
    "There's much to see here. So, take your time, look around, and learn all there is to know about us as a real estate developer. From the Lilasons Group's pioneering legacy since 1971 to homes, row houses, commercial spaces, and plotted estates across Aurangabad — we hope you enjoy our site and take a moment to explore our flats for sale.",
  welcomeCta: "Find out more",
  welcomeCtaHref: "/our-company",
  welcomePanels: [
    {
      label: "AURANGABAD",
      image: "/welcome/welcome-aurangabad.jpg",
      alt: "Lilasons Developers residential living in Aurangabad",
    },
    {
      label: "MAHARASHTRA",
      image: "/welcome/welcome-estate.jpg",
      alt: "Lilasons gated communities and estates in Maharashtra",
    },
  ],
  subscribeTitle: "Subscribe",
  subscribeBody:
    "Sign up for exciting offers for all housing options.",
  subscribePlaceholder: "Email Address",
  subscribeCta: "Sign up",
};

/** Premium signature strip — directly under hero */
export const SHOWCASE = {
  title: "Homes shaped by trust.",
  subtitle: "Exceptional residences for a more human tomorrow.",
  body: "From thoughtfully planned towers to gated estates across Aurangabad — Lilasons crafts spaces where families grow, light settles, and lasting value begins.",
  cta: "Book a viewing",
  ctaHref: "/contact",
  heroImage: "/about/expand-story-hero.jpg",
  heroAlt: "Lilasons premium residential living",
  heroAccentTop: "Places people belong",
  heroAccentBottom: "Natural light · lasting value",
  sideImage: "/domains/domain-interiors.jpg",
  sideAlt: "Elevated living interiors by Lilasons",
  sideAccent: "Elevated living, naturally.",
  detailImage: "/welcome/welcome-estate.jpg",
  detailAlt: "Lilasons estate craft and material detail",
  detailLines: ["Light", "Space", "People", "Place", "Longer lives"],
  stats: [
    { value: "30", suffix: "+", label: "Years of excellence" },
    { value: "540", suffix: "+", label: "Homes & spaces" },
  ],
};

/** Urgency offer marquee — home running strip */
export const OFFER_STRIP = [
  "Hurry – Offer Ends Soon!",
  "Reserve Early & Save More!",
  "Avail Pre Launch Benefits",
  "Get Huge Discount On Booking",
  "Exclusive Offer For Limited Period",
];

/** Lifestyle amenities — expanding hover strip on home */
export const AMENITIES = {
  eyebrow: "— Lifestyle",
  title: "Spaces crafted for\neveryday living",
  moreLabel: "30+ more",
  cta: "Explore All",
  ctaHref: "/projects",
  items: [
    {
      id: "fitness",
      label: "Fitness",
      image: "/amenities/fitness.jpg",
      alt: "Premium residential fitness center",
    },
    {
      id: "club",
      label: "Clubhouse",
      image: "/amenities/club.jpg",
      alt: "Elegant community clubhouse lounge",
    },
    {
      id: "garden",
      label: "Garden",
      image: "/amenities/garden.jpg",
      alt: "Landscaped residential garden courtyard",
    },
    {
      id: "pool",
      label: "Pool",
      image: "/amenities/pool.jpg",
      alt: "Luxury residential swimming pool",
    },
    {
      id: "lounge",
      label: "Lounge",
      image: "/amenities/lounge.jpg",
      alt: "Covered outdoor waiting lounge",
    },
  ],
};

/** Decades of trust — split media + metrics stage */
export const METRICS = {
  badge: "Since 1971 · Lilasons Group",
  title: "Three houses. Decades of trust for lasting homes.",
  body: "Every Lilasons address is backed by a pioneering group legacy — residences, growth corridors, and commercial spaces across Aurangabad, held to one standard of craft.",
  cta: "Explore Our Brands",
  ctaHref: "/our-company",
  video: "/video.mp4",
  videoPoster: "/about/expand-story-hero.jpg",
  cards: [
    {
      id: "years",
      label: "Years of excellence",
      value: 30,
      suffix: "+",
    },
    {
      id: "homes",
      label: "Homes & spaces planned",
      value: 540,
      suffix: "+",
    },
    {
      id: "projects",
      label: "Active developments",
      value: 6,
      suffix: "",
    },
  ],
};

/** Legacy / trust marks — logo + short line only */
export const RECOGNITION = {
  eyebrow: "— Awards & Achievements",
  title: "Recognized for\nExcellence",
  body: "Marks of trust earned across decades — heritage, compliance, craft, and care.",
  items: [
    {
      logo: "/recognition/1971.svg",
      alt: "1971",
      text: "Since 1971",
    },
    {
      logo: "/recognition/rera.svg",
      alt: "RERA",
      text: "RERA Registered",
    },
    {
      logo: "/recognition/kangaro.svg",
      alt: "Kangaro",
      text: "Kangaro Heritage",
    },
    {
      logo: "/recognition/khajuraho.svg",
      alt: "Khajuraho",
      text: "Khajuraho Brand",
    },
    {
      logo: "/recognition/cares.svg",
      alt: "Lilasons Cares",
      text: "Lilasons Cares",
    },
    {
      logo: "/recognition/design.svg",
      alt: "Design",
      text: "State of the Art",
    },
  ],
};

export const ABOUT = {
  eyebrow: "— Our Company",
  title: "About Us",
  subtitle: "30 Years and Counting",
  heroImage: "/about/expand-story-hero.jpg",
  storyImage: "/about/dubai-tower.jpg",
  presenceImage: "/welcome/welcome-aurangabad.jpg",
  storyLead: "A pioneering group shaping Aurangabad’s skyline with trust and design.",
  storyHeading: "Rooted in legacy,\nreaching for excellence.",
  paragraphs: [
    "The Lilasons Group, a pioneering entrepreneurial entity since 1971, has an illustrious history rooted in the dynamic Indian beer industry, with world-renowned brands such as Kangaro and Khajuraho. With a visionary spirit that inspires constant evolution, the group has expanded its horizons into diverse fields, including Stainless Steel, Aluminium, and floriculture, emblematic of its commitment to innovation and excellence.",
    "In a bold move that reflected the group's forward-thinking ethos, the Lilasons Group ventured into the burgeoning real estate market, drawing on its expertise in managing apartment buildings. Starting with the largest project in Aurangabad at the time, the group has since maintained the heights of success, erecting stunning residential and commercial buildings that embellish the city skyline.",
    "Undoubtedly, the competitive and challenging real estate industry demands a deep understanding of the market and a steadfast commitment to delivering impeccable construction services. The Lilasons Group has consistently demonstrated its unwavering dedication to these ideals, driving its upward trajectory and cementing its reputation as a trailblazer in the real estate sphere.",
  ],
  designTitle: "State of the Art Designs",
  designBody:
    "Our associates of architects and designers have created spectacular designs. Make sure to check out our completed projects.",
  caresTitle: "Lilasons Cares",
  caresBody:
    "Lilasons Charitable Trust is a non-profit trust established solely for extending a helping hand to the needy. In the field of health, Lilasons has donated fully automated Ambulances to hospitals in the region. Lilasons directors have actively taken part in development of hospitals and schools in the city. We also developed a one-kilometer long jogging track spread across an eight-acre area full of amazing flora.",
  stats: [
    { value: "1971", label: "Group founded" },
    { value: "30+", label: "Years of excellence" },
    { value: "6", label: "Active developments" },
    { value: "1", label: "City — Aurangabad" },
  ],
  values: [
    {
      title: "State of the Art Design",
      body: "Associates of architects and designers craft spectacular residential and commercial spaces across Aurangabad.",
    },
    {
      title: "Impeccable Construction",
      body: "A steadfast commitment to quality, market understanding, and delivering homes families can trust.",
    },
    {
      title: "Lilasons Cares",
      body: "Through Lilasons Charitable Trust we support hospitals, schools, and community spaces including a one-kilometer jogging track.",
    },
    {
      title: "Legacy of Trust",
      body: "From Kangaro and Khajuraho to real estate landmarks — a pioneering ethos since 1971.",
    },
  ],
  milestones: [
    { year: "1971", label: "Lilasons Group founded — pioneering spirit begins" },
    { year: "1980s", label: "Iconic brands Kangaro & Khajuraho establish national reputation" },
    { year: "1990s", label: "Diversification into stainless steel, aluminium & floriculture" },
    { year: "2000s", label: "Entry into real estate — landmark projects reshape Aurangabad" },
    { year: "Today", label: "Homes, row houses, commercial & estates across the city" },
  ],
  wordmark: "Homes",
  cta: "Our Company",
  ctaHref: "/our-company",
  body: "The Lilasons Group, a pioneering entrepreneurial entity since 1971, has an illustrious history rooted in the Indian industry — and a bold expansion into real estate that has shaped Aurangabad's skyline with residential and commercial landmarks.",
  detail:
    "Drawing on decades of expertise, Lilasons Developers delivers impeccable construction with state-of-the-art design — from family homes to commercial destinations across Chhatrapati Sambhaji Nagar.",
};

export const BRANDS = [
  {
    name: "Shree Amrut Sai Developers",
    role: "Residential Schemes",
    body: "A successful company involved in huge Residential Schemes in the City.",
    image: "/projects/project-marina.jpg",
    focus: ["Residences", "Societies", "Family Homes"],
  },
  {
    name: "Amrut Sai Gold Star",
    role: "Upcoming Areas",
    body: "A company established to cater to the housing needs in new and upcoming areas of the City.",
    image: "/projects/project-palm.jpg",
    focus: ["Row Houses", "New Corridors", "Lifestyle"],
  },
  {
    name: "Shivaji Construction Company",
    role: "Commercial Wing",
    body: "This wing caters to the selling and leasing of commercial properties.",
    image: "/projects/project-downtown.jpg",
    focus: ["Shops", "Offices", "Leasing"],
  },
];

export const DOMAINS = [
  {
    href: "/projects/amrut-sai-gold-star",
    image: "/domains/domain-residences.jpg",
    label: "Flats & Family Homes",
    title: "Residences",
    span: "col",
  },
  {
    href: "/projects/amrut-sai-plaza-ph-ii",
    image: "/domains/domain-developments.jpg",
    label: "Towers & Societies",
    title: "Developments",
    span: "col",
  },
  {
    href: "/our-company",
    image: "/domains/domain-interiors.jpg",
    label: "State of the Art Designs",
    title: "Design",
    span: "col",
  },
  {
    href: "/projects/lilasons-golden-estate",
    image: "/domains/domain-communities.jpg",
    label: "Gated Living & Plots",
    title: "Communities",
    span: "wide",
  },
  {
    href: "/projects/amrut-sai-solitaire",
    image: "/domains/domain-collections.jpg",
    label: "Shops & Office Spaces",
    title: "Commercial",
    span: "narrow",
  },
];

export const WALKTHROUGHS = [
  {
    id: "lilasons-intro",
    title: "Lilasons Intro Video",
    href: "/walkthrough#lilasons-intro",
  },
  {
    id: "amrut-sai-gold-star",
    title: "Amrut Sai Gold Star",
    href: "/walkthrough#amrut-sai-gold-star",
    projectHref: "/projects/amrut-sai-gold-star",
  },
  {
    id: "amrut-sai-solitaire",
    title: "Amrut Sai Solitaire",
    href: "/walkthrough#amrut-sai-solitaire",
    projectHref: "/projects/amrut-sai-solitaire",
  },
];

const MEDIA_IMG = (path) =>
  path.startsWith("http") ? path : `https:${path.startsWith("//") ? path : `//${path}`}`;

export const MEDIA = {
  title: "Discover life at a Lilasons Developers property",
  beyondTitle: "Beyond the Office",
  events: [
    { title: "Republic Day Celebration" },
    { title: "Ram Mandir Celebrations at ASGS on 22.01.24" },
    { title: "Club House Opening @ Sai Plaza PH-II" },
    { title: "Cricket Match" },
    { title: "Navratri Dandiya Celebration" },
    { title: "Ganpati Celebration" },
  ],
  gallery: [
    MEDIA_IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/WhatsApp%20Image%202024-01-29%20at%2001.44.11.jpeg/:/rs=w:1300,h:800"),
    MEDIA_IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/WhatsApp%20Image%202024-01-29%20at%2001.49.24.jpeg/:/rs=w:1300,h:800"),
    MEDIA_IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/PHOTO-2021-04-20-15-32-04.jpg/:/rs=w:1300,h:800"),
    MEDIA_IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/PHOTO-2023-10-18-21-13-57.jpg/:/rs=w:1300,h:800"),
    MEDIA_IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/PHOTO-2023-03-06-10-03-11.jpg/:/rs=w:1300,h:800"),
  ],
};

export const CONTACT = {
  title: "Contact Us",
  intro: "Better yet, see us in person!",
  body: "We love our customers, so feel free to visit anytime.",
  whatsappLabel: "Message us on WhatsApp",
};

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
  workLabel: "Work with us",
  workHref: "/contact",
  helloLabel: "Hello",
  exploreLabel: "Explore",
  otherLabel: "Other",
  hoursLabel: "Opening Hours",
  backToTop: "Back to top",
  explore: [
    { label: "Our Company", href: "/our-company" },
    { label: "Our Projects", href: "/projects" },
    { label: "Walkthrough", href: "/walkthrough" },
    { label: "Media", href: "/media" },
  ],
  other: [
    { label: "Contact Us", href: "/contact" },
    { label: "Subscribe", href: "/home#subscribe" },
    { label: "WhatsApp", href: "https://wa.me/919823441147" },
  ],
  copyright: "All content © {year} Lilasons Developers",
  background: "/footer/footer-skyline-dark.jpg",
};
