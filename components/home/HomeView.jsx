import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Domains from "@/components/home/Domains";
import AboutPreview from "@/components/home/AboutPreview";
import SelectedProjects from "@/components/home/SelectedProjects";
import ExpandStory from "@/components/home/ExpandStory";
import Footer from "@/components/home/Footer";

export default function HomeView() {
  return (
    <main className="relative z-0 min-h-dvh bg-[#f7f7f7]">
      <Navbar />
      <Hero />

      {/* z-10 so these cover the fixed canvas after the sequence */}
      <Domains />
      <AboutPreview />
      <SelectedProjects />
      <ExpandStory />
      <Footer />
    </main>
  );
}
