"use client";

import BrandMark from "@/components/BrandMark";
import { BRAND, FOOTER } from "@/lib/brand";

function CornerArrow() {
  return (
    <div
      className="relative flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16 md:h-[72px] md:w-[72px]"
      aria-hidden
    >
      <span className="absolute left-0 top-0 h-3.5 w-3.5 border-l border-t border-neutral-950 sm:h-4 sm:w-4" />
      <span className="absolute right-0 top-0 h-3.5 w-3.5 border-r border-t border-neutral-950 sm:h-4 sm:w-4" />
      <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b border-l border-neutral-950 sm:h-4 sm:w-4" />
      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b border-r border-neutral-950 sm:h-4 sm:w-4" />
      <span className="text-[22px] leading-none text-neutral-950 sm:text-[26px]">↘</span>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    const lenis = typeof window !== "undefined" ? window.__tskLenis : null;
    if (lenis) lenis.scrollTo(0, { duration: 1.25 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-neutral-200/80 bg-white"
    >
      <div className="mx-auto max-w-[1500px] px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="flex items-start justify-between gap-6 border-b border-neutral-200 pb-10 sm:pb-12 lg:pb-14">
          <h2 className="type-heading max-w-[14ch] text-[32px] uppercase leading-[1.05] tracking-[-0.035em] text-neutral-950 sm:max-w-[16ch] sm:text-[44px] md:text-[56px] lg:text-[64px] xl:text-[72px]">
            {FOOTER.cta}
          </h2>
          <CornerArrow />
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-neutral-200 py-10 sm:grid-cols-2 sm:gap-8 sm:py-12 lg:grid-cols-4 lg:gap-6 lg:py-14">
          <div className="flex items-start">
            <a
              href={`mailto:${BRAND.email}`}
              className="type-button btn-pill btn-shine inline-flex h-11 items-center gap-2.5 border border-neutral-900 bg-transparent px-5 text-[11px] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white sm:h-12 sm:px-6 sm:text-[12px]"
            >
              <span aria-hidden className="text-[13px] leading-none">
                ↗
              </span>
              {FOOTER.workLabel}
            </a>
          </div>

          <div className="space-y-8">
            <div>
              <p className="type-label mb-3 text-[11px] text-neutral-950 sm:text-[12px]">
                Hello
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="block text-[13px] font-medium tracking-[-0.01em] text-neutral-800 transition-colors hover:text-neutral-950 sm:text-[14px]"
              >
                {BRAND.email}
              </a>
              <a
                href={`tel:${BRAND.phones[0].replace(/\s/g, "")}`}
                className="mt-2 block text-[13px] font-medium tracking-[-0.01em] text-neutral-800 sm:text-[14px]"
              >
                {BRAND.phones[0]}
              </a>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
                    Office
                  </p>
                  <p className="mt-1 text-[13px] font-medium tracking-[-0.01em] text-neutral-800 sm:text-[14px]">
                    {BRAND.address.line1}
                    <br />
                    {BRAND.address.line2}
                    <br />
                    {BRAND.address.city} — {BRAND.address.pin}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="type-label mb-3 text-[11px] text-neutral-950 sm:text-[12px]">
                Opening Hours
              </p>
              <p className="text-[13px] font-medium tracking-[-0.01em] text-neutral-800 sm:text-[14px]">
                {BRAND.hours.days}
              </p>
              <p className="mt-0.5 text-[13px] font-medium tracking-[-0.01em] text-neutral-800 sm:text-[14px]">
                {BRAND.hours.time}
              </p>
            </div>
          </div>

          <div>
            <p className="type-label mb-3 text-[11px] text-neutral-950 sm:text-[12px]">
              Explore
            </p>
            <ul className="space-y-2.5">
              {BRAND.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="type-label text-[11px] text-neutral-600 transition-colors hover:text-neutral-950 sm:text-[12px]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-label mb-3 text-[11px] text-neutral-950 sm:text-[12px]">
              Other
            </p>
            <ul className="space-y-2.5">
              {FOOTER.other.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="type-label text-[11px] text-neutral-600 transition-colors hover:text-neutral-950 sm:text-[12px]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-10">
          <div className="shrink-0">
            <BrandMark href="#home" />
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-500 sm:text-[11px]">
              Developers · Aurangabad
            </span>
          </div>

          <div className="text-left text-[11px] leading-relaxed tracking-[-0.01em] text-neutral-500 sm:text-center sm:text-[12px]">
            <p>
              All content © {BRAND.name} {year}
            </p>
            <p className="mt-0.5">
              Source site{" "}
              <a
                href={BRAND.site}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-neutral-800 underline-offset-2 hover:underline"
              >
                lilasonsdevelopers.in
              </a>
            </p>
          </div>

          <button
            type="button"
            onClick={scrollTop}
            className="type-button btn-pill btn-shine inline-flex h-10 shrink-0 items-center gap-2 border border-neutral-900 bg-transparent px-4 text-[10px] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white sm:h-11 sm:px-5 sm:text-[11px]"
          >
            <span aria-hidden className="text-[12px] leading-none">
              ↑
            </span>
            Back To Top
          </button>
        </div>
      </div>
    </footer>
  );
}
