/**
 * Single source of truth for Shah Junction Villa.
 * Positioned primarily as a Marriage Palace / Wedding & Event Venue.
 * Verified directly from the official Google Maps listing:
 * https://maps.app.goo.gl/TB73yXrVohNo6cWWA
 */
export const business = {
  name: "Shahi Junction Villa",
  alternateName: "Shah Junction Villa",
  legalName: "Shahi Junction Villa Marriage Palace",
  namePunjabi: "ਸ਼ਾਹੀ ਜੰਕਸ਼ਨ ਵਿਲਾ",
  type: "Marriage Palace & Wedding Venue",
  tagline: "Where Royal Celebrations Begin",
  subTagline: "An elegant destination for weddings, celebrations and unforgettable gatherings.",
  locality: "Sahaipur, Tibber, Gurdaspur, Punjab",
  address: "Sahaipur, Punjab 143529",
  district: "Gurdaspur",
  state: "Punjab",
  postalCode: "143529",
  plusCode: "WCP8+9Q Sahaipur, Punjab",
  coordinates: {
    lat: 31.9358877,
    lng: 75.4169728,
  },
  phoneDisplay: "087280 60036",
  phoneTel: "+918728060036",
  rating: "4.0",
  reviewCount: 251,
  openingHours: "Open Daily until 11:00 PM",
  services: [
    "Wedding Celebrations",
    "Grand Receptions",
    "Outdoor Lawn Ceremonies",
    "Indoor Banquet Hall",
    "On-Site Parking",
    "Dining Hospitality",
  ] as const,
  googleMapsUrl: "https://maps.app.goo.gl/TB73yXrVohNo6cWWA",
  instagramUrl: "https://www.instagram.com/shahjunction2017/",
  instagramHandle: "@shahjunction2017",
} as const;

export const directionsUrl = business.googleMapsUrl;
export const reviewsUrl = business.googleMapsUrl;
export const instagramUrl = business.instagramUrl;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Venue", href: "#venue" },
  { label: "Facilities", href: "#facilities" },
  { label: "Occasions", href: "#occasions" },
  { label: "Gallery", href: "#gallery" },
  { label: "Restaurant", href: "#restaurant" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#location" },
] as const;
