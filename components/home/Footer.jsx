"use client";

import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import IconArrow from "@/components/IconArrow";
import { BRAND, FOOTER } from "@/lib/brand";

function FooterLink({ href, children, external = false }) {
  const className =
    "type-label text-[11px] text-neutral-700 transition-colors hover:text-neutral-950 sm:text-[12px]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${BRAND.mapsQuery}`;

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative z-10 flex h-auto min-h-0 flex-col overflow-visible border-t border-neutral-200/80 bg-[#f7f7f7] text-neutral-950 lg:h-[calc(100dvh-6rem)] lg:max-h-[calc(100dvh-6rem)] lg:overflow-hidden"
    >
      <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col px-5 py-8 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        {/* Large CTA — single line */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-neutral-300/80 pb-5 sm:gap-6 sm:pb-6 lg:pb-7">
          <h2 className="type-heading max-w-[18ch] text-[clamp(1.35rem,5.5vw,3.25rem)] leading-[1.05] text-neutral-950 sm:max-w-none sm:whitespace-nowrap">
            {FOOTER.cta}
          </h2>

          <Link
            href={FOOTER.workHref}
            aria-label={FOOTER.workLabel}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-neutral-900 text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white sm:h-12 sm:w-12 lg:h-14 lg:w-14"
          >
            <IconArrow dir="se" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </Link>
        </div>

        {/* Columns — fill middle */}
        <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-x-5 gap-y-8 py-7 sm:grid-cols-2 sm:content-center sm:gap-x-10 sm:py-7 lg:grid-cols-12 lg:gap-8 lg:py-8">
          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <Link
              href={FOOTER.workHref}
              className="type-button btn-pill btn-shine btn-outline inline-flex w-fit gap-2 !h-10 !px-5 sm:!h-11"
            >
              <IconArrow dir="ne" className="h-3 w-3" />
              {FOOTER.workLabel}
            </Link>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-4">
            <p className="type-heading text-[13px] text-neutral-950 sm:text-[14px]">
              {FOOTER.helloLabel}
            </p>

            <a
              href={`mailto:${BRAND.email}`}
              className="mt-3 block text-[13px] font-medium tracking-[-0.01em] text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-950 sm:text-[14px]"
            >
              {BRAND.email}
            </a>

            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer"
              className="type-body mt-3 block max-w-[28ch] text-[12px] text-neutral-700 transition-colors hover:text-neutral-800 sm:text-[13px]"
            >
              {BRAND.address.line1}
              <br />
              {BRAND.address.line2}
              <br />
              {BRAND.address.city}
            </a>

            <div className="mt-3 space-y-0.5">
              {BRAND.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="block text-[12px] font-medium tracking-[-0.01em] text-neutral-700 transition-colors hover:text-neutral-950 sm:text-[13px]"
                >
                  {phone}
                </a>
              ))}
            </div>

            <p className="type-heading mt-5 text-[13px] text-neutral-950 sm:mt-6 sm:text-[14px]">
              {FOOTER.hoursLabel}
            </p>
            <p className="type-body mt-1.5 text-[12px] text-neutral-700 sm:text-[13px]">
              {BRAND.hours.days}
              <br />
              {BRAND.hours.time}
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="type-heading text-[13px] text-neutral-950 sm:text-[14px]">
              {FOOTER.exploreLabel}
            </p>
            <ul className="mt-3 space-y-2.5">
              {FOOTER.explore.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="type-heading text-[13px] text-neutral-950 sm:text-[14px]">
              {FOOTER.otherLabel}
            </p>
            <ul className="mt-3 space-y-2.5">
              {FOOTER.other.map((item) => (
                <li key={item.label}>
                  <FooterLink
                    href={item.href}
                    external={item.href.startsWith("http")}
                  >
                    {item.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex shrink-0 flex-col items-start gap-4 border-t border-neutral-300/80 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-5">
          <BrandMark
            href="/home"
            imgClassName="h-8 w-auto max-w-[160px] object-contain object-left sm:h-9 sm:max-w-[180px]"
            textClassName="type-logo text-[0.95rem] tracking-[-0.02em] text-neutral-950"
          />

          <p className="type-label order-last text-[10px] text-neutral-700 sm:order-none sm:text-center sm:text-[11px]">
            {FOOTER.copyright.replace("{year}", String(year))}
          </p>

          <button
            type="button"
            onClick={scrollTop}
            className="type-button btn-pill btn-outline !h-9 gap-1.5 !px-4 text-[10px] sm:!px-5 sm:text-[11px]"
          >
            <IconArrow dir="up" className="h-3 w-3" />
            {FOOTER.backToTop}
          </button>
        </div>
      </div>

      <a
        href={BRAND.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Message on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M12.04 2c-5.5 0-9.96 4.42-9.96 9.87 0 1.74.46 3.44 1.34 4.94L2 22l5.36-1.4a10 10 0 0 0 4.68 1.18h.01c5.5 0 9.96-4.43 9.96-9.88C22.01 6.42 17.54 2 12.04 2Zm5.8 14.05c-.24.68-1.42 1.25-1.96 1.33-.5.07-1.14.1-1.84-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.43-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.4.26-.28.57-.35.76-.35h.55c.18 0 .42-.06.65.5.24.58.82 2 .89 2.14.07.14.12.3.02.49-.1.2-.14.32-.28.5-.14.17-.3.38-.42.51-.14.14-.28.3-.12.58.16.28.7 1.15 1.5 1.86 1.03.91 1.9 1.2 2.17 1.33.27.14.43.12.59-.07.16-.2.67-.78.85-1.05.18-.27.36-.22.6-.13.25.1 1.57.74 1.84.88.27.13.45.2.52.31.07.11.07.64-.17 1.32Z" />
        </svg>
      </a>
    </footer>
  );
}
