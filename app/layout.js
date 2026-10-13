import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MobileGate from "@/components/MobileGate";

const interTight = Inter_Tight({
  variable: "--font-tsk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-lilasons-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Lilasons Developers | Homes & Flats in Aurangabad",
  description:
    "Lilasons Developers — Excellency Redefined. Building your foundation, building your environment. Residential & commercial projects in Aurangabad, Maharashtra.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <SmoothScroll>
          <MobileGate>{children}</MobileGate>
        </SmoothScroll>
      </body>
    </html>
  );
}
