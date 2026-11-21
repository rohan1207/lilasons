"use client";

import { useRef } from "react";
import { HIGHLIGHTS } from "@/lib/imperium";
import { GOLD_DARK, PAPER } from "@/components/imperium/theme";

export default function Highlights() {
  const scroller = useRef(null);

  const nudge = (dir) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("[data-highlight-card]");
    const step = card ? card.getBoundingClientRect().width + 8 : el.clientWidth * 0.75;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="highlights"
      className="scroll-mt-28 overflow-x-clip"
      style={{ backgroundColor: PAPER }}
      aria-label="Highlights"
    >
      {/* Title bar */}
      <div
        className="mt-6 px-4 py-4 text-center sm:mt-10 sm:px-6 sm:py-6 lg:mt-12 lg:py-7"
        style={{ backgroundColor: GOLD_DARK }}
      >
        <h2
          className="mx-auto max-w-[22rem] text-[clamp(0.95rem,3.8vw,1.65rem)] font-medium uppercase leading-snug tracking-[0.05em] text-white sm:max-w-none sm:leading-tight sm:tracking-[0.06em]"
          style={{ fontFamily: "var(--imp-display)" }}
        >
          The highlights that set us apart.
        </h2>
      </div>

      {/* Cards + side arrows */}
      <div className="relative pb-6 sm:pb-8">
        <button
          type="button"
          aria-label="Previous highlights"
          onClick={() => nudge(-1)}
          className="absolute left-1.5 top-1/2 z-[2] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 bg-white/95 text-[var(--imp-ink)] shadow-sm transition hover:border-black/30 sm:left-4 sm:h-11 sm:w-11 lg:left-5"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M12.5 5 7.5 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next highlights"
          onClick={() => nudge(1)}
          className="absolute right-1.5 top-1/2 z-[2] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 bg-white/95 text-[var(--imp-ink)] shadow-sm transition hover:border-black/30 sm:right-4 sm:h-11 sm:w-11 lg:right-5"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="m7.5 5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-11 py-2 sm:gap-1.5 sm:px-16 lg:px-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {HIGHLIGHTS.map((item) => (
            <article
              key={item.id}
              data-highlight-card
              className="group relative aspect-[3/4] h-auto w-[68vw] max-w-[260px] shrink-0 snap-center overflow-hidden rounded-[0.85rem] sm:aspect-auto sm:h-[420px] sm:w-[260px] sm:max-w-none sm:rounded-[1rem] md:h-[460px] md:w-[280px] lg:h-[520px] lg:w-[300px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${item.image}?v=4`}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                draggable={false}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                aria-hidden
              />
              <h3
                className="absolute inset-x-0 bottom-0 z-[1] px-3 pb-4 text-center text-[11px] font-medium uppercase leading-snug tracking-[0.04em] text-white sm:px-4 sm:pb-6 sm:text-[13px] lg:text-[14px]"
                style={{ fontFamily: "var(--imp-display)" }}
              >
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
