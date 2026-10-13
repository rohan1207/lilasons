/**
 * Full project catalogue from lilasonsdevelopers.in (client-provided).
 */

const IMG = (path) =>
  path.startsWith("http") ? path : `https:${path.startsWith("//") ? path : `//${path}`}`;

export const PROJECTS = [
  {
    id: "amrut-sai-gold-star",
    slug: "amrut-sai-gold-star",
    category: "Residential",
    indexLabel: "01",
    title: "Amrut Sai Gold Star",
    locationLabel: "Golwadi",
    placeLine: "Golwadi, Aurangabad — RERA P51500020039",
    tagline: "Luxurious living in Golwadi",
    summary:
      "Indulge in luxurious living with Amrut Sai Gold Star in Golwadi, Aurangabad, brought to you by Lilasons Developers. This exceptional residential project offers a perfect blend of contemporary architecture and cutting-edge features, promising you a comfortable and opulent lifestyle.",
    brief:
      "Sprawling over a colossal area of 1.76 acres of land, Amrut Sai Gold Star boasts of 9 majestic towers, each towering up to 4 floors. Revel in the grandeur of the 150 exquisite units on offer, ranging in size from a lavish 30.0 Sq.M to an expansive 51.0 Sq.M. Come, experience the epitome of luxury living with Amrut Sai Gold Star!",
    options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"],
    highlights: [
      "Located in Upcoming Posh Area",
      "Children Play Area",
      "Landscape Garden",
      "Jogging Track",
      "Internal Trimix Roads",
      "Automatic Elevators with Power Backup",
      "Rain Water Harvesting",
    ],
    rera: "P51500020039",
    meta: [
      { label: "Typology", value: "Residential Towers" },
      { label: "Location", value: "Golwadi, Paithan Road" },
      { label: "Land", value: "1.76 Acres" },
      { label: "Units", value: "150 Homes" },
      { label: "Options", value: "1–4 BHK" },
    ],
    address: "Gut No. 32, Golwadi, Paithan Road, Aurangabad, Maharashtra",
    image: "/projects/project-marina.jpg",
    alt: "Amrut Sai Gold Star residential development",
    gallery: [
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/WhatsApp%20Image%202019-09-05%20at%209.40.07%20AM%20(2).jpeg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/WhatsApp%20Image%202019-09-05%20at%209.40.08%20AM%20(2).jpeg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/WhatsApp%20Image%202019-09-05%20at%209.40.06%20AM%20(1).jpeg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/WhatsApp%20Image%202019-09-05%20at%209.40.07%20AM%20(1).jpeg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/WhatsApp%20Image%202019-09-05%20at%209.40.08%20AM%20(1).jpeg/:/rs=w:1300,h:800"),
    ],
    href: "/projects/amrut-sai-gold-star",
  },
  {
    id: "asgs-ph-ii-row-house",
    slug: "asgs-ph-ii-row-house",
    category: "Row House",
    indexLabel: "02",
    title: "ASGS PH-II Row House",
    locationLabel: "Golwadi",
    placeLine: "Golwadi, Aurangabad — RERA P51500050887",
    tagline: "32 exclusive row houses",
    summary:
      "Experience luxurious living at Gold Stars' 32 Row Houses, an exquisite residential project in Golwadi, Aurangabad, presented by Lilasons Developers.",
    brief:
      "Spread across a sprawling 1.5 acres of land, this exclusive project offers 32 splendid row houses, each a testament to the perfect blend of contemporary design and modern-day amenities. Every house in Lila's 32 Crown stands tall at 2 floors, with a terrace that offers a breathtaking view of the surroundings. The built-up area of each row house is approximately 2300 Sq ft, providing ample living space for you and your family.",
    options: ["4 BHK Row Houses - Road or Internal Facing Options"],
    highlights: [
      "Located in Upcoming Posh Area",
      "Children Play Area",
      "Landscape Garden",
      "Jogging Track",
      "Internal Trimix Roads",
      "Rain Water Harvesting",
    ],
    rera: "P51500050887",
    meta: [
      { label: "Typology", value: "4 BHK Row Houses" },
      { label: "Location", value: "Golwadi, Paithan Road" },
      { label: "Land", value: "1.5 Acres" },
      { label: "Homes", value: "32 Row Houses" },
      { label: "Built-up", value: "~2300 Sq.Ft" },
    ],
    address: "Gut No. 32, Golwadi, Paithan Road, Aurangabad, Maharashtra",
    image: "/projects/project-palm.jpg",
    alt: "ASGS Phase II row house residences",
    gallery: [
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/2.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/3.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/6.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/1.jpg/:/rs=w:1300,h:800"),
    ],
    href: "/projects/asgs-ph-ii-row-house",
  },
  {
    id: "amrut-sai-plaza-ph-ii",
    slug: "amrut-sai-plaza-ph-ii",
    category: "Residential",
    indexLabel: "03",
    title: "Amrut Sai Plaza PH-II",
    locationLabel: "Railway Station",
    placeLine: "MIDC, Aurangabad — RERA P51500011307",
    tagline: "Luxury living near the railway station",
    summary:
      "Following the monumental success of Sai Plaza Ph-1, Lilasons Developers proudly present Amrut Sai Plaza Ph-2 — an exclusive residential project that redefines luxury living in Aurangabad.",
    brief:
      "Spanning over a colossal area of 3.85 acres, this project offers a total of 304 units that cater to the varied needs of modern-day families. The housing society comprises of 9 majestic towers, each rising up to 4 floors, offering a stunning view of the surroundings. Indulge in a host of premium amenities including a beautiful temple, a water softener plant, and a mesmerizing fountain.",
    options: ["2 BHK", "3 BHK", "3 BHK Duplex Flats", "4 BHK"],
    highlights: [
      "Located walking distance from Railway Station",
      "Children Play Area",
      "Sand Pit",
      "Landscape Garden",
      "Jogging Track",
      "Basketball Court",
      "Tennis Court",
      "Society Temple",
      "Internal Trimix Roads",
      "Automatic Elevators",
      "Rain Water Harvesting",
    ],
    rera: "P51500011307",
    meta: [
      { label: "Typology", value: "Housing Society" },
      { label: "Location", value: "Near Hamalawada, MIDC" },
      { label: "Land", value: "3.85 Acres" },
      { label: "Units", value: "304 Homes" },
      { label: "Options", value: "2–4 BHK & Duplex" },
    ],
    address: "CTS no. 18762, Near Hamalawada, MIDC, Aurangabad, Maharashtra 431005",
    image: "/projects/project-downtown.jpg",
    alt: "Amrut Sai Plaza Phase II residential society",
    gallery: [
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/cut%20section.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/BIRD%60S%20EYE.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/main%20entrance%20gate.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/buliding%20view.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/night%20view.jpg/:/rs=w:1300,h:800"),
    ],
    href: "/projects/amrut-sai-plaza-ph-ii",
  },
  {
    id: "amrut-sai-solitaire",
    slug: "amrut-sai-solitaire",
    category: "Commercial",
    indexLabel: "04",
    title: "Amrut Sai Solitaire",
    locationLabel: "Station Road",
    placeLine: "Railway Station Road, Aurangabad",
    tagline: "Shops & offices in the city centre",
    summary:
      "Amrut Sai Solitaire, located in the heart of Aurangabad, is a commercial development by Shivaji Construction Company. The project offers a range of commercial shops at affordable prices — an ideal investment for businesses of all sizes.",
    brief:
      "Equipped with all the necessary amenities, Amrut Sai Solitaire provides a conducive environment for businesses to thrive. Spread over an area of 0.31 acres, the project offers a total of 57 units — the perfect destination for businesses looking for a strategic location to grow and prosper.",
    options: ["Shops and Office Spaces"],
    highlights: [
      "Located in City Centre",
      "Double Height Shops/Offices",
      "Basement Parking",
      "4-Sided Building Elevation",
      "Air Cooled Common Spaces",
      "Designer Glass Staircase",
      "Panoramic Lift",
      "Fire Fighting Equipment",
    ],
    rera: null,
    meta: [
      { label: "Typology", value: "Commercial" },
      { label: "Location", value: "Station Road" },
      { label: "Land", value: "0.31 Acres" },
      { label: "Units", value: "57 Spaces" },
      { label: "Options", value: "Shops · Offices" },
    ],
    address:
      "Plot No.6, Beside Goldie Cinema, Railway Station Road, Aurangabad, Maharashtra 431005",
    image: "/projects/project-downtown.jpg",
    alt: "Amrut Sai Solitaire commercial development",
    gallery: [
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/Screen%20Shot%202023-03-22%20at%201.34.58%20PM.png/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/Screen%20Shot%202023-03-22%20at%201.35.56%20PM.png/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/AR-03-00794%20copy%2029-04%20(2)-1.JPG/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/Screen%20Shot%202023-03-22%20at%201.34.20%20PM.png/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/Screen%20Shot%202023-03-22%20at%201.36.34%20PM.png/:/rs=w:1300,h:800"),
    ],
    href: "/projects/amrut-sai-solitaire",
  },
  {
    id: "golden-heights",
    slug: "golden-heights",
    category: "Luxury Living",
    indexLabel: "05",
    title: "Golden Heights",
    locationLabel: "Golden City, Itkheda",
    placeLine: "Itkheda, Aurangabad",
    tagline: "Luxurious flats and commercial spaces in Aurangabad's most posh area",
    summary:
      "Welcome to Golden Heights, the pinnacle of luxury living by Shree Amrut Sai Developers. Nestled in the new heart of the city, Golden Heights offers meticulously designed living spaces tailored to modern families' needs.",
    brief:
      "With unmatched elegance, world-class amenities, and convenient connectivity to major hubs, Golden Heights promises a lifestyle of comfort and convenience. From spacious layouts to premium finishes, each residence exudes luxury and style — whether you seek a peaceful abode or a lucrative investment.",
    options: ["Commercial Shops/Offices", "3 BHK", "4 BHK"],
    highlights: [
      "Impressive Main Gate and Lobbies",
      "Automatic Barrier Entry System",
      "Fire Fighting System",
      "High-Speed Lifts",
      "DG Backup for Lifts and Common Area",
      "Refuge Areas",
      "Multi-Purpose Terrace",
      "Multi-Purpose Turf",
      "Open Gym",
      "Solar Lights for Common Areas",
    ],
    rera: null,
    meta: [
      { label: "Typology", value: "Luxury Residences" },
      { label: "Location", value: "Itkheda, Aurangabad" },
      { label: "Options", value: "3 BHK · 4 BHK" },
      { label: "Also", value: "Shops & Offices" },
      { label: "Highlights", value: "Turf · Open Gym · Lifts" },
    ],
    address: "Gut No. 68, Behind Nath Seeds, Itkheda, Aurangabad - 431001",
    image: "/projects/project-hills.jpg",
    alt: "Golden Heights luxury residences in Itkheda",
    gallery: [
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/Commercial%201.png/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/Commercial%202.png/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/Night_view%201.png/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/Night_View%2052.png/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/Top%20view_Day%202.png/:/rs=w:1300,h:800"),
    ],
    href: "/projects/golden-heights",
    whatsapp: true,
  },
  {
    id: "lilasons-golden-estate",
    slug: "lilasons-golden-estate",
    category: "Plotted Development",
    indexLabel: "06",
    title: "Lilasons Golden Estate",
    locationLabel: "Patoda, CSN",
    placeLine: "Patoda, Chhatrapati Sambhaji Nagar",
    tagline: "Unveiling Lilasons Golden Estate — the gateway to peace",
    summary:
      "Lilasons Golden Estate is a thoughtfully planned gated development of premium N.A. plots set amidst the scenic surroundings of Chhatrapati Sambhaji Nagar. Designed for those who value space, peace, and long-term investment.",
    brief:
      "Whether you wish to build your dream home, create a weekend retreat, or make a smart real estate investment, Lilasons Golden Estate offers the perfect opportunity — modern infrastructure, lifestyle amenities, and excellent connectivity. Built for dreams. Backed by trust.",
    overviewSections: [
      {
        title: "Because Your Heart Is Their Home",
        body: "Family is at the center of every dream. The joy they bring to your life inspires you to secure a future filled with comfort, happiness, and stability. Owning a plot at Lilasons Golden Estate is not just a property decision — it is a step toward building a place where memories will grow for generations. Choose with heart. Secure with confidence.",
      },
      {
        title: "Reclaim Your Time, Your Space",
        body: "In today's fast-paced world, moments of peace are rare. At Lilasons Golden Estate, you rediscover the joy of open spaces, fresh air, and meaningful time with family and friends. This is not just land — it is a place to slow down, reconnect, and truly belong. Escape. Belong. Recharge.",
      },
      {
        title: "Healthy Living Starts Here",
        body: "Modern living is about balance between work, relaxation, fitness, and community. Lilasons Golden Estate offers thoughtfully designed amenities that promote an active and fulfilling lifestyle.",
      },
    ],
    options: ["Premium N.A. Plots"],
    highlights: [
      "Gated development",
      "Scenic surroundings",
      "Modern infrastructure",
      "Lifestyle amenities",
      "Excellent connectivity",
    ],
    rera: null,
    meta: [
      { label: "Typology", value: "N.A. Plots" },
      { label: "Location", value: "Patoda, CSN" },
      { label: "Setting", value: "Gated Estate" },
      { label: "Focus", value: "Homes · Retreats · Investment" },
    ],
    address: "Gut No. 18, Beside Sayadri School, Patoda, CSN — Lila Farm, Patoda, Aurangabad Division, Maharashtra, India",
    phone: "9665283030",
    image: "/projects/project-hills.jpg",
    alt: "Lilasons Golden Estate plotted development",
    gallery: [
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/PHOTO-2026-01-06-17-10-11%202.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/PHOTO-2026-01-06-17-10-10.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/PHOTO-2026-01-06-17-10-10%202.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/PHOTO-2026-01-06-17-10-11%203.jpg/:/rs=w:1300,h:800"),
      IMG("//img1.wsimg.com/isteam/ip/789e5f72-fb35-4030-b595-47f459a8a19a/PHOTO-2026-01-06-17-10-11.jpg/:/rs=w:1300,h:800"),
    ],
    href: "/projects/lilasons-golden-estate",
    whatsapp: true,
  },
];

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug || p.id === slug) || null;
}

export const PROJECT_CATEGORIES = [
  "All",
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
];

export function getProjectImages(project) {
  if (!project) return [];
  const list = [];
  const seen = new Set();
  const push = (src) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    list.push(src);
  };
  push(project.image);
  (project.gallery || []).forEach(push);
  return list;
}

export function getAdjacentProjects(slug) {
  const index = PROJECTS.findIndex((p) => p.slug === slug || p.id === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? PROJECTS[index - 1] : null,
    next: index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null,
  };
}

export function getRelatedProjects(slug, limit = 3) {
  const current = getProject(slug);
  if (!current) return [];
  const same = PROJECTS.filter(
    (p) => p.id !== current.id && p.category === current.category,
  );
  const filler = PROJECTS.filter(
    (p) => p.id !== current.id && p.category !== current.category,
  );
  return [...same, ...filler].slice(0, limit);
}

export const PROJECT_NAV = PROJECTS.map((p) => ({
  label: p.title,
  href: p.href,
}));
