import { Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MobileGate from "@/components/MobileGate";
import StayOnHome from "@/components/StayOnHome";

const interTight = Inter_Tight({
  variable: "--font-tsk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Lilasons Developers | Homes & Flats in Aurangabad",
  description:
    "Lilasons Developers — building your foundation, building your environment. Residential & commercial projects in Aurangabad, Maharashtra.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <StayOnHome>
          <SmoothScroll>
            <MobileGate>{children}</MobileGate>
          </SmoothScroll>
        </StayOnHome>
      </body>
    </html>
  );
}
