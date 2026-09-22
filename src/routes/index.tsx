import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { AvailabilitySection } from "@/components/site/AvailabilitySection";
import { BookingModal } from "@/components/site/BookingModal";
import { AdminDashboardModal } from "@/components/site/AdminDashboardModal";
import { FloatingContact } from "@/components/site/FloatingContact";
import { EnquirySection } from "@/components/site/EnquirySection";
import { Facilities } from "@/components/site/Facilities";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Hero } from "@/components/site/Hero";
import { Location } from "@/components/site/Location";
import { Navbar } from "@/components/site/Navbar";
import { Occasions } from "@/components/site/Occasions";
import { RestaurantSection } from "@/components/site/RestaurantSection";
import { DigitalMenu } from "@/components/site/DigitalMenu";
import { Reviews } from "@/components/site/Reviews";
import { VenueShowcase } from "@/components/site/VenueShowcase";
import { CinematicIntro } from "@/components/site/CinematicIntro";
import { BookingProvider } from "@/context/BookingContext";
import { business } from "@/lib/business";

const title = "Shahi Junction Villa | Marriage Palace & Wedding Resort in Punjab";
const description =
  "Discover Shahi Junction Villa in Sahaipur, Punjab. A premier marriage palace featuring illuminated neoclassical twin domes, royal crimson marquee wedding lawns, and celebrations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EventVenue",
          name: business.name,
          alternateName: [business.legalName, business.namePunjabi],
          description,
          telephone: business.phoneTel,
          hasMap: business.googleMapsUrl,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sahaipur",
            addressLocality: "Sahaipur, Tibber",
            addressRegion: "Punjab",
            postalCode: business.postalCode,
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: business.coordinates.lat,
            longitude: business.coordinates.lng,
          },
          openingHours: "Mo-Su 09:00-23:00",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: business.rating,
            reviewCount: business.reviewCount,
            bestRating: "5",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [introState, setIntroState] = useState<"playing" | "fading" | "finished">("playing");

  return (
    <BookingProvider>
      {/* Cinematic Opening Intro Animation */}
      {introState !== "finished" && (
        <CinematicIntro introState={introState} setIntroState={setIntroState} />
      )}

      <Navbar introState={introState} />
      <main>
        {/* 1. Cinematic Palace Hero */}
        <Hero introState={introState} />

        {/* 2. The Experience / About */}
        <About />

        {/* 3. Venue Showcase: Palace Facade, Lawns, Ballroom, Entrance */}
        <VenueShowcase />

        {/* 4. Confirmed Facilities & Essentials */}
        <Facilities />

        {/* 5. Life's Special Occasions */}
        <Occasions />

        {/* 6. Visual Gallery & Lightbox */}
        <Gallery />

        {/* 7. Live Reservations & Calendar Availability */}
        <AvailabilitySection />

        {/* 8. Also Dine With Us (Separate Restaurant Offering) */}
        <RestaurantSection />

        {/* 8b. Complete Digital Restaurant Menu */}
        <DigitalMenu />

        {/* 9. Verified Guest Ratings & Reviews */}
        <Reviews />

        {/* 10. Location & Direction Hub */}
        <Location />

        {/* 11. Simple Celebration Enquiry Form */}
        <EnquirySection />

        {/* 12. Final Cinematic Palace CTA */}
        <FinalCta />
      </main>

      {/* 13. Dark Olive Footer */}
      <Footer />

      {/* Global Modals & Floating Tools */}
      <BookingModal />
      <AdminDashboardModal />
      <FloatingContact />
    </BookingProvider>
  );
}
