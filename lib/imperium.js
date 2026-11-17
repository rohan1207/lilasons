/** Imperium Landmark — dedicated microsite content */

export const IMPERIUM = {
  name: "Imperium Landmark",
  shortName: "Imperium",
  developer: "Lilasons RR Realty Developers",
  status: "Coming Soon",
  tagline: "Boutique Offices & Retail Spaces",
  city: "Chhatrapati Sambhajinagar",
  cityAlt: "Aurangabad",
  road: "Jalna Road",
  headline: "The landmark of\nChhatrapati Sambhajinagar",
  headlineAccent: "landmark",
  subhead:
    "Boutique offices and premium retail on Jalna Road — a sculptural commercial address for brands that intend to be seen.",
  email: "Sales@lilasonsrrrealty.com",
  phones: ["+91 98234 41147", "+91 95273 29363"],
  whatsapp: "https://wa.me/919823441147",
  planHref: "/floor-plans.pdf",
  brochureHref: "/Imperium%20Landmark.pdf",
  hero: {
    desktop: "/hero.jpg",
    phone: "/hero-phone.jpg",
    alt: "Imperium Landmark illuminated wave façade at dusk on Jalna Road",
  },
  corporateAddress: [
    "Office No. 119, Amrut Sai Solitaire",
    "Beside Goldie Theatre, Railway Station Road",
    "Aurangabad (Chhatrapati Sambhajinagar) 431001",
  ],
  siteAddress: [
    "Imperium Landmark",
    "Jalna Road",
    "Chhatrapati Sambhajinagar, Maharashtra",
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Amenities & Specs", href: "/amenities" },
    { label: "Gallery", href: "/gallery" },
    { label: "Plans", href: "/plans" },
    { label: "Location", href: "/location" },
  ],
};

export const HIGHLIGHTS = [
  {
    id: "airport",
    title: "Just 500 mtrs from the airport",
    body: "A short drive from Chhatrapati Sambhajinagar Airport — arrival and departure without the city crawl.",
    kicker: "01 · Access",
    image: "/highlights/airport.jpg",
  },
  {
    id: "offices",
    title: "Customisable boutique offices",
    body: "Fully designed office suites with room to tailor layouts for teams that want presence, not just square footage.",
    kicker: "02 · Workspace",
    image: "/highlights/offices.jpg",
  },
  {
    id: "amenities",
    title: "Club-class amenities",
    body: "Gym, spa, steam, jacuzzi, amphitheatre and rooftop dining — hospitality folded into a commercial address.",
    kicker: "03 · Lifestyle",
    image: "/highlights/amenities.jpg",
  },
  {
    id: "lobby",
    title: "Double-height arrival",
    body: "A grand lobby in natural stone and marble, with landscaped lounges that set the tone before the lift.",
    kicker: "04 · Arrival",
    image: "/highlights/lobby.jpg",
  },
  {
    id: "retail",
    title: "Street-level showrooms",
    body: "Glass-fronted retail for fashion, automobile and electronics — frontage that works after dark.",
    kicker: "05 · Retail",
    image: "/highlights/retail.jpg",
  },
  {
    id: "facade",
    title: "Illuminated wave façade",
    body: "A sculptural exterior traced with light bands on every floor — a night landmark on Jalna Road.",
    kicker: "06 · Identity",
    image: "/highlights/facade.jpg",
  },
];

export const PROXIMITY = [
  {
    id: "0-2",
    range: "0 – 2 KM",
    image: "/proximity/hospital.jpg",
    places: [
      { name: "Dhoot Hospital", icon: "hospital" },
      { name: "Prozone Mall", icon: "hotel" },
      { name: "Lemon Tree Hotel", icon: "hotel" },
    ],
  },
  {
    id: "2-5",
    range: "2 – 5 KM",
    image: "/proximity/airport.jpg",
    places: [
      { name: "District Hospital", icon: "hospital" },
      { name: "Hyatt Place", icon: "hotel" },
      { name: "Karmgar Chowk", icon: "pin" },
      { name: "Chhatrapati Sambhajinagar Airport", icon: "plane" },
      { name: "A.D.C.A. Cricket Ground", icon: "stadium" },
    ],
  },
  {
    id: "5-10",
    range: "5 – 10 KM",
    image: "/proximity/highway.jpg",
    places: [
      { name: "Mukunewadi", icon: "building" },
      { name: "Ramnagar", icon: "building" },
      { name: "Kranti Chowk", icon: "road" },
    ],
  },
];

export const MAP_LANDMARKS = [
  { id: "airport", label: "Airport", x: 52, y: 14, kind: "airport" },
  { id: "ramnagar", label: "Ramnagar", x: 58, y: 28, kind: "area" },
  { id: "mukundwadi", label: "Mukundwadi", x: 68, y: 26, kind: "area" },
  { id: "district", label: "District Hospital", x: 18, y: 36, kind: "hospital" },
  { id: "hyatt", label: "Hyatt Place", x: 28, y: 48, kind: "hotel" },
  { id: "myworld", label: "My World", x: 22, y: 58, kind: "place" },
  { id: "dhoot", label: "Dhoot Hospital", x: 42, y: 52, kind: "hospital" },
  { id: "prozone", label: "Prozone Mall", x: 58, y: 54, kind: "mall" },
  { id: "site", label: "Imperium Landmark", x: 38, y: 44, kind: "site" },
  { id: "cidco", label: "CIDCO Bus Stand", x: 72, y: 58, kind: "transit" },
  { id: "cricket", label: "A.D.C.A. Cricket Ground", x: 78, y: 48, kind: "sport" },
  { id: "kamgar", label: "Kamgar Chowk", x: 82, y: 62, kind: "area" },
  { id: "lemon", label: "Lemon Tree Hotel", x: 86, y: 70, kind: "hotel" },
];

export const LEGACY = {
  eyebrow: "A project by Lilasons RR",
  title: "All this, backed by a legacy of excellence.",
  image: "/legacy-building.jpg",
  stats: [
    {
      value: "30+",
      label: "Years' legacy",
      icon: "wreath",
    },
    {
      value: "12 Lakh",
      label: "Sq. ft. across developments",
      icon: "layers",
    },
    {
      value: "1500+",
      label: "Spaces. One growing legacy.",
      icon: "skyline",
    },
  ],
};

export const ABOUT = {
  eyebrow: "About Imperium",
  title: "A commercial address designed to be remembered.",
  lead:
    "Imperium Landmark brings retail, boutique offices and rooftop leisure into one sculptural building on Jalna Road — for businesses that want presence in Chhatrapati Sambhajinagar.",
  paragraphs: [
    "Its flowing, wave-shaped façade is traced with illuminated bands on every floor and crowned with greenery along the rooftop edge. At night the building reads as a landmark.",
    "Inside, warm natural stone and marble meet timber panelling, bronze accents and black-framed glass. Greenery runs through the lobby, passages, garden court and rooftop.",
    "From street-level showrooms to fully designed office suites and a ninth-floor lifestyle destination, Imperium is built for brands, teams and guests who expect more than a glass box.",
  ],
  facts: [
    { label: "Typology", value: "Commercial Landmark" },
    { label: "Offer", value: "Showrooms · Offices · Rooftop" },
    { label: "Corridor", value: "Jalna Road" },
    { label: "Status", value: "Upcoming" },
  ],
};

export const AMENITIES = {
  eyebrow: "Amenities & Specs",
  title: "Hospitality built into the workday.",
  titleAccent: "workday",
  body: "Retail, boutique offices and a rooftop destination — finishes and facilities built for workdays that run long and evenings that matter.",
  heroImage: "/amenities/lobby.jpg?v=3",
  groups: [
    {
      id: "arrival",
      title: "Arrival & Retail",
      image: "/amenities/lobby.jpg",
      items: [
        "Grand lobby with marble reception",
        "Landscaped lounge and passages",
        "Garden court with water curtain",
        "Premium showrooms at street level",
        "Dedicated sales office with AV room",
      ],
    },
    {
      id: "workspace",
      title: "Workspace",
      image: "/amenities/office.jpg",
      items: [
        "Boutique office suites",
        "Customisable layouts",
        "Passenger and fire lifts",
        "Stone and timber washrooms",
        "Conference-ready meeting rooms",
      ],
    },
    {
      id: "rooftop",
      title: "Rooftop Destination",
      image: "/amenities/rooftop.jpg",
      items: [
        "Restaurant and bar",
        "Private lounge",
        "Amphitheatre with dining",
        "Cross-fit gym",
        "Couples spa and recovery suite",
        "Steam bath and jacuzzi",
      ],
    },
  ],
};

export const GALLERY = {
  eyebrow: "Gallery",
  title: "Form, light and presence.",
  body: "A first look at Imperium Landmark — façade, arrival, workspace and rooftop life on Jalna Road.",
  slides: [
    {
      src: "/hero.jpg",
      alt: "Night view of the illuminated wave façade",
      caption: "Signature night façade",
    },
    {
      src: "/highlights/facade.jpg",
      alt: "Illuminated wave façade detail",
      caption: "Wave façade at dusk",
    },
    {
      src: "/highlights/lobby.jpg",
      alt: "Double-height lobby arrival",
      caption: "Double-height arrival",
    },
    {
      src: "/highlights/offices.jpg",
      alt: "Boutique office interior",
      caption: "Boutique office suites",
    },
    {
      src: "/highlights/retail.jpg",
      alt: "Street-level showroom frontage",
      caption: "Street-level showrooms",
    },
    {
      src: "/highlights/amenities.jpg",
      alt: "Rooftop lifestyle amenities",
      caption: "Rooftop lifestyle",
    },
    {
      src: "/highlights/airport.jpg",
      alt: "Airport proximity corridor",
      caption: "Airport corridor access",
    },
    {
      src: "/legacy-building.jpg",
      alt: "Curved balcony façade with greenery",
      caption: "Greened terraces",
    },
  ],
};

export const ENQUIRY = {
  eyebrow: "Enquire",
  title: "Ready to claim your space?",
  titleAccent: "space",
  body: "Share a few details and the Lilasons RR sales team will call you back about boutique offices, showrooms or rooftop space at Imperium Landmark.",
};

export const PLANS = {
  eyebrow: "Floor Plans",
  title: "Thoughtfully Planned Spaces",
  titleAccent: "Spaces",
  body: "Efficient layouts, optimal space utilization and modern living comfort.",
  downloadHref: "/floor-plans.pdf",
  downloadLabel: "Download Full Floor Plan",
  features: [
    { id: "layouts", label: "Spacious Layouts", icon: "square" },
    { id: "design", label: "Functional Design", icon: "layers" },
    { id: "configs", label: "Multiple Configurations", icon: "building" },
  ],
  slides: [
    {
      id: "ground",
      title: "Ground Floor Plan",
      image: "/floor-plans/ground.jpg",
    },
    {
      id: "typical",
      title: "Typical Floor Plan",
      image: "/floor-plans/typical.jpg",
    },
    {
      id: "ninth",
      title: "9th Floor Plan",
      image: "/floor-plans/ninth.jpg",
    },
    {
      id: "basement",
      title: "Basement 2 Floor Plan",
      image: "/floor-plans/basement.jpg",
    },
  ],
  cards: [
    {
      title: "Floor plans",
      body: "Detailed layouts for offices and retail plates.",
      href: "/floor-plans.pdf",
      cta: "Download plans",
    },
    {
      title: "Project brochure",
      body: "Façade, amenities and commercial offer in one file.",
      href: "/Imperium%20Landmark.pdf",
      cta: "Download brochure",
    },
  ],
};

export const LOCATION_PAGE = {
  eyebrow: "Location",
  title: "On Jalna Road — between the city and the airport.",
  titleAccent: "Jalna Road",
  body: "Imperium Landmark sits on the Jalna Road corridor with clear routes toward Kranti Chowk, Jalgaon and the airport — close to hospitals, hotels and Prozone Mall.",
  heroImage: "/location/hero-map.png",
  address: "Jalna Road, Chhatrapati Sambhajinagar – 431001",
  corridorTitle: "A corridor built for arrival.",
  corridorBody:
    "From the airport approach to the commercial spine of the city, every route funnels toward a single address — clear, connected and easy to find.",
};

export const CONTACT_PAGE = {
  eyebrow: "Contact Us",
  title: "Talk to us about Imperium.",
  titleAccent: "Imperium",
  body: "Share a name and number — the sales team will call you back about boutique offices, showrooms or rooftop space.",
  heroBody:
    "Visit Lilasons RR Developers, or reach the Imperium sales team by phone, WhatsApp or enquiry form.",
  mapEmbed:
    "https://maps.google.com/maps?q=Amrut+Sai+Solitaire,+Railway+Station+Road,+Aurangabad,+Maharashtra+431001&z=16&output=embed",
  mapsHref: "https://share.google/V44iUHwSGG2e72sme",
  formTitle: "Send an enquiry",
  formBody: "Tell us what you’re looking for — offices, showrooms or rooftop F&B.",
};

export const LOCATION_DISTANCES = [
  {
    id: "airport",
    name: "Chhatrapati Sambhajinagar Airport",
    time: "5 Min",
    icon: "plane",
  },
  {
    id: "district",
    name: "District Hospital",
    time: "4 Min",
    icon: "hospital",
  },
  {
    id: "prozone",
    name: "Prozone Mall",
    time: "6 Min",
    icon: "mall",
  },
  {
    id: "lemon",
    name: "Lemon Tree Hotel",
    time: "8 Min",
    icon: "hotel",
  },
  {
    id: "cricket",
    name: "A.D.C.A. Cricket Ground",
    time: "10 Min",
    icon: "stadium",
  },
];
