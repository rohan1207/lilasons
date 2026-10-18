"use client";

import { OFFER_STRIP } from "@/lib/brand";

function StripTrack({ ariaHidden }) {
  return (
    <div
      className="offer-strip-track flex w-max shrink-0 items-center gap-8 sm:gap-12 md:gap-16"
      aria-hidden={ariaHidden || undefined}
    >
      {OFFER_STRIP.map((line) => (
        <span key={line} className="flex items-center gap-8 sm:gap-12 md:gap-16">
          <span className="type-heading whitespace-nowrap text-[22px] text-[#fff] sm:text-[32px] md:text-[42px] lg:text-[52px]">
            {line}
          </span>
          <span
            className="inline-block size-2.5 shrink-0 rounded-full bg-[var(--accent)] sm:size-3 md:size-3.5"
            aria-hidden
          />
        </span>
      ))}
    </div>
  );
}

export default function OfferStrip() {
  return (
    <section
      id="offers"
      className="relative z-20 overflow-hidden border-y border-neutral-900 bg-neutral-950"
      aria-label="Current offers"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(197,226,74,0.12)_0%,transparent_18%,transparent_82%,rgba(197,226,74,0.12)_100%)]" />

      <div className="offer-strip-mask relative flex items-center py-4 sm:py-5 md:py-6">
        <div className="offer-strip-row flex w-max">
          <StripTrack />
          <StripTrack ariaHidden />
        </div>
      </div>

      <p className="sr-only">{OFFER_STRIP.join(". ")}</p>
    </section>
  );
}
