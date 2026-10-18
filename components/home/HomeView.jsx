import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import OfferStrip from "@/components/home/OfferStrip";
import Showcase from "@/components/home/Showcase";
import Domains from "@/components/home/Domains";
import Amenities from "@/components/home/Amenities";
import SelectedProjects from "@/components/home/SelectedProjects";
import MediaPreview from "@/components/home/MediaPreview";
import Brands from "@/components/home/Brands";
import Metrics from "@/components/home/Metrics";
import Recognition from "@/components/home/Recognition";
import ExpandStory from "@/components/home/ExpandStory";
import Footer from "@/components/home/Footer";

export default function HomeView() {
  return (
    <main className="relative z-0 min-h-dvh bg-[#f7f7f7]">
      <Navbar />
      <Hero />
      <OfferStrip />
      <Showcase />
      <Domains />
      <Amenities />
      <SelectedProjects />
      <MediaPreview />
      <Brands />
      <Metrics />
      <Recognition />
      <ExpandStory />
      <Footer />
    </main>
  );
}
