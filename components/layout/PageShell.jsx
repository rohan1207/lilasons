import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export default function PageShell({ children, solidNav = true }) {
  return (
    <main className="relative z-0 min-h-dvh bg-[#f7f7f7]">
      <Navbar forceSolid={solidNav} />
      {children}
      <Footer />
    </main>
  );
}
