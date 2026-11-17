import HomeHero from "@/components/imperium/HomeHero";
import Highlights from "@/components/imperium/Highlights";
import FloorPlans from "@/components/imperium/FloorPlans";
import Proximity from "@/components/imperium/Proximity";
import LocationMap from "@/components/imperium/LocationMap";
import Legacy from "@/components/imperium/Legacy";
import EnquirySection from "@/components/imperium/EnquirySection";

/** Full Imperium Landmark home experience (no Imperium nav/footer). */
export default function ImperiumHomeEmbed() {
  return (
    <div className="imperium-root">
      <HomeHero />
      <Highlights />
      <FloorPlans />
      <Proximity />
      <LocationMap linked={false} />
      <Legacy />
      <EnquirySection />
    </div>
  );
}
