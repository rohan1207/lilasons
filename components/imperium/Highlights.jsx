"use client";

import { useRef } from "react";
import { HIGHLIGHTS } from "@/lib/imperium";
import { GOLD, STONE } from "@/components/imperium/theme";

export default function Highlights({ layout = "scroll" }) {
  const scroller = useRef(null);
  const isGrid = layout === "grid";

  const nudge = (dir) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(300, el.clientWidth * 0.72), behavior: "smooth" });
  };

  return (
    <section
      id="highlights"
      className="scroll-mt-28 border-t border-[var(--imp-stone-deep)] py-14 text-[var(--imp-ink)] sm:py-16 lg:py-20"
      style={{ backgroundColor: STONE }}
      aria-label="Highlights"
    >
      <div className="mx-auto flex max-w-[1500px] items-end justify-between gap-4 px-6 sm:gap-6 sm:px-8 lg:px-12">
        <div className="min-w-0 max-w-[42rem]">
          <div className="flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2a2a2a] sm:text-[12px]">
              Highlights
            </p>
            <span className="h-px w-11 sm:w-14" style={{ backgroundColor: GOLD }} />
          </div>
          <h2
            className="mt-3 text-[clamp(1.55rem,3.4vw,2.85rem)] font-medium leading-[1.08] tracking-[-0.03em]"
            style={{ fontFamily: "var(--imp-display)" }}
          >
            The details that set Imperium apart
          </h2>
        </div>

        {!isGrid ? (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Previous highlights"
              onClick={() => nudge(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--imp-ink)] transition hover:border-[var(--imp-gold)] sm:h-11 sm:w-11"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next highlights"
              onClick={() => nudge(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--imp-ink)] transition hover:border-[var(--imp-gold)] sm:h-11 sm:w-11"
            >
              →
            </button>
          </div>
        ) : null}
      </div>

      {isGrid ? (
        <div className="mx-auto mt-8 grid max-w-[1500px] gap-4 px-6 sm:mt-10 sm:grid-cols-2 sm:gap-6 sm:px-8 lg:grid-cols-3 lg:px-12">
          {HIGHLIGHTS.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-[1.1rem] bg-white shadow-[0_16px_36px_-24px_rgba(27,48,34,0.4)] ring-1 ring-black/[0.04] sm:rounded-[1.2rem]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--imp-stone-deep)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  draggable={false}
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px]" style={{ color: GOLD }}>
                  {item.kicker}
                </p>
                <h3
                  className="mt-2 text-[1.15rem] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--imp-ink)] sm:mt-2.5 sm:text-[1.4rem]"
                  style={{ fontFamily: "var(--imp-display)" }}
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#4a4a4a] sm:mt-2.5 sm:text-[14px]">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div
          ref={scroller}
          className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-6 scroll-pr-6 px-6 pb-2 sm:mt-10 sm:gap-5 sm:scroll-pl-8 sm:scroll-pr-8 sm:px-8 lg:scroll-pl-12 lg:scroll-pr-12 lg:px-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {HIGHLIGHTS.map((item) => (
            <article
              key={item.id}
              className="group flex w-[68vw] max-w-[240px] shrink-0 snap-start flex-col overflow-hidden rounded-[1rem] bg-white shadow-[0_16px_36px_-24px_rgba(27,48,34,0.4)] ring-1 ring-black/[0.04] sm:w-[280px] sm:max-w-none sm:rounded-[1.15rem] lg:w-[300px]"
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-[var(--imp-stone-deep)] sm:aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  draggable={false}
                />
              </div>
              <div className="flex flex-1 flex-col p-3.5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.16em]" style={{ color: GOLD }}>
                  {item.kicker}
                </p>
                <h3
                  className="mt-1.5 text-[1.05rem] font-medium leading-[1.12] tracking-[-0.02em] text-[var(--imp-ink)] sm:mt-2.5 sm:text-[1.45rem] sm:leading-[1.08]"
                  style={{ fontFamily: "var(--imp-display)" }}
                >
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-[#4a4a4a] sm:mt-3 sm:line-clamp-none sm:text-[14px]">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
