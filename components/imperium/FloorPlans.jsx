"use client";

import { useState } from "react";
import { PLANS } from "@/lib/imperium";
import { GOLD, INK, STONE, goldGradient } from "@/components/imperium/theme";

function FeatureIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: GOLD,
    strokeWidth: "1.55",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6 sm:h-7 sm:w-7",
    "aria-hidden": true,
  };

  switch (type) {
    case "square":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="14" rx="1.5" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M4.5 9.2 12 5.5l7.5 3.7L12 12.9 4.5 9.2Z" />
          <path d="M4.5 12.8 12 16.5l7.5-3.7" />
          <path d="M4.5 16.2 12 19.9l7.5-3.7" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 20V9.5L9 6v14" />
          <path d="M9 20V8l6-3.5V20" />
          <path d="M15 20v-8l5 3V20" />
          <path d="M3.5 20h17" />
        </svg>
      );
    default:
      return null;
  }
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 4v10" strokeLinecap="round" />
      <path d="m8 10 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18h14" strokeLinecap="round" />
    </svg>
  );
}

function PlanCarousel({ slides }) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const active = slides[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="relative w-full">
      {/* Desktop stacked peek */}
      <div className="relative hidden md:block">
        <div className="relative mx-auto max-w-[560px] lg:ml-auto lg:mr-8 xl:mr-12">
          {[2, 1].map((offset) => {
            const slide = slides[(index + offset) % total];
            const scale = offset === 1 ? 0.92 : 0.84;
            const x = offset === 1 ? 56 : 100;
            const opacity = offset === 1 ? 0.55 : 0.3;
            return (
              <div
                key={`peek-${offset}-${slide.id}`}
                aria-hidden
                className="absolute inset-y-4 right-0 w-[78%] overflow-hidden rounded-[1.25rem] bg-white shadow-[0_18px_40px_-28px_rgba(27,48,34,0.45)]"
                style={{
                  transform: `translateX(${x}px) scale(${scale})`,
                  opacity,
                  zIndex: 2 - offset,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                  draggable={false}
                />
              </div>
            );
          })}

          <div className="relative z-[3] overflow-hidden rounded-[1.35rem] bg-white shadow-[0_24px_50px_-28px_rgba(27,48,34,0.55)] ring-1 ring-black/[0.04]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.image}
              alt={active.title}
              className="aspect-[4/3] w-full object-contain object-center bg-[#fffdf9] p-2 sm:p-3"
              draggable={false}
            />
          </div>

          <div className="absolute -bottom-5 right-0 z-[4] flex items-center gap-2.5 lg:-bottom-6 lg:right-[-0.25rem]">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous floor plan"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--imp-ink)] shadow-sm transition hover:bg-[#faf6ef]"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12.5 5 7.5 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next floor plan"
              className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm transition hover:brightness-110"
              style={{ backgroundColor: INK }}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m7.5 5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Phone carousel */}
      <div className="md:hidden">
        <div className="overflow-hidden rounded-[1rem] bg-white shadow-[0_14px_32px_-22px_rgba(27,48,34,0.5)] ring-1 ring-black/[0.04]">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTouchStart={(e) => {
              const t = e.touches[0];
              e.currentTarget.dataset.x0 = String(t.clientX);
            }}
            onTouchEnd={(e) => {
              const x0 = Number(e.currentTarget.dataset.x0 || 0);
              const x1 = e.changedTouches[0]?.clientX ?? x0;
              const dx = x1 - x0;
              if (Math.abs(dx) < 40) return;
              if (dx < 0) next();
              else prev();
            }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="aspect-[5/4] w-full object-contain object-center bg-[#fffdf9] p-1.5"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous floor plan"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--imp-ink)] shadow-sm"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12.5 5 7.5 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="min-w-0 text-center">
            <p className="truncate text-[12px] font-medium text-[#5a5a5a]">
              {active.title}
              <span className="text-black/30"> · </span>
              {index + 1}/{total}
            </p>
            <div className="mt-1.5 flex items-center justify-center gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show ${slide.title}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      i === index ? "w-4" : "w-1.5 bg-black/20"
                    }`}
                    style={i === index ? { backgroundColor: INK } : undefined}
                  />
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next floor plan"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
            style={{ backgroundColor: INK }}
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m7.5 5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <p className="mt-6 hidden text-center text-[12px] font-medium text-[#5a5a5a] md:block lg:text-right lg:pr-8 xl:pr-12">
        {active.title}
        <span className="text-black/30"> · </span>
        {index + 1} / {total}
      </p>
    </div>
  );
}

export default function FloorPlans() {
  const titleBefore = PLANS.title.replace(PLANS.titleAccent, "").trim();

  return (
    <section
      id="floor-plans"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--imp-stone-deep)] px-5 py-10 sm:px-8 sm:py-18 lg:px-10 lg:py-22"
      style={{ backgroundColor: STONE }}
      aria-label="Floor plans"
    >
      <div className="relative z-[1] mx-auto max-w-[1500px]">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
          {/* Copy column */}
          <div className="max-w-xl lg:max-w-none">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 sm:w-12" style={{ backgroundColor: GOLD }} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2a2a2a] sm:text-[12px]">
                {PLANS.eyebrow}
              </p>
            </div>

            <h2
              className="mt-3 text-[clamp(1.55rem,4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--imp-ink)]"
              style={{ fontFamily: "var(--imp-display)" }}
            >
              {titleBefore}{" "}
              <em style={{ color: GOLD, fontStyle: "italic" }}>{PLANS.titleAccent}</em>
            </h2>

            <p className="mt-2.5 max-w-[30rem] text-[13px] leading-relaxed text-[#3f3f3f] sm:mt-3 sm:text-[15px]">
              {PLANS.body}
            </p>

            <ul className="mt-5 grid grid-cols-3 gap-2 sm:mt-10 sm:flex sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-0">
              {PLANS.features.map((feature, i) => (
                <li
                  key={feature.id}
                  className={`flex min-w-0 flex-col items-center gap-1.5 rounded-xl bg-white/70 px-1.5 py-2.5 text-center ring-1 ring-black/[0.04] sm:flex-1 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-0 sm:ring-0 ${
                    i > 0 ? "sm:border-l" : ""
                  }`}
                  style={i > 0 ? { borderColor: `${GOLD}55` } : undefined}
                >
                  <FeatureIcon type={feature.icon} />
                  <span className="text-[10px] font-semibold leading-snug text-[var(--imp-ink)] sm:mt-2.5 sm:text-[12px]">
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <a
              href={PLANS.downloadHref}
              download
              className="mt-9 hidden h-12 w-full max-w-[22rem] items-center justify-center gap-2.5 rounded-full px-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-14px_rgba(162,132,77,0.75)] transition hover:brightness-105 md:inline-flex"
              style={{
                background: goldGradient,
              }}
            >
              <DownloadIcon />
              {PLANS.downloadLabel}
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Carousel column */}
          <div className="min-w-0 md:pb-8">
            <PlanCarousel slides={PLANS.slides} />
          </div>
        </div>

        {/* Phone CTA — short pill */}
        <div className="mt-5 flex justify-center md:hidden">
          <a
            href={PLANS.downloadHref}
            download
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-14px_rgba(162,132,77,0.75)] transition hover:brightness-105"
            style={{
              background: goldGradient,
            }}
          >
            <DownloadIcon />
            Download Plan
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
