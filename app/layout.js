import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MobileGate from "@/components/MobileGate";

const interTight = Inter_Tight({
  variable: "--font-tsk",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-lilasons-display",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

export const metadata = {
  title: "Lilasons RR Realty Developers | Homes & Flats in Aurangabad",
  description:
    "Lilasons RR Realty Developers — Excellency Redefined. Building a Better Tomorrow. Residential & commercial projects in Aurangabad, Maharashtra.",
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
