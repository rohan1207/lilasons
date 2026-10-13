import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Domains from "@/components/home/Domains";
import AboutPreview from "@/components/home/AboutPreview";
import Brands from "@/components/home/Brands";
import Metrics from "@/components/home/Metrics";
import SelectedProjects from "@/components/home/SelectedProjects";
import MediaPreview from "@/components/home/MediaPreview";
import ExpandStory from "@/components/home/ExpandStory";
import Subscribe from "@/components/home/Subscribe";
import Recognition from "@/components/home/Recognition";
import Footer from "@/components/home/Footer";

export default function HomeView() {
  return (
    <main className="relative z-0 min-h-dvh bg-[#f7f7f7]">
      <Navbar />
      <Hero />
      <Welcome />
      <Domains />
      <AboutPreview />
      <SelectedProjects />
      <MediaPreview />
      <ExpandStory />
      <Brands />
      <Metrics />
      <Recognition />
      <Subscribe />
      <Footer />
    </main>
  );
}
