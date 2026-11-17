"use client";

import { useState } from "react";
import { PROXIMITY } from "@/lib/imperium";
import { GOLD, INK, PAPER, STONE } from "@/components/imperium/theme";

const CARD = PAPER;

function PlaceIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.55",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-[15px] w-[15px] shrink-0 text-[#2c2c2c]",
    "aria-hidden": true,
  };

  switch (type) {
    case "hospital":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M12 8.5v7M8.5 12h7" />
        </svg>
      );
    case "hotel":
      return (
        <svg {...common}>
          <path d="M3 20V9a2 2 0 0 1 2-2h6v13" />
          <path d="M11 20V7h8a2 2 0 0 1 2 2v11" />
          <path d="M3 20h18M7 11h.01M7 15h.01M15 11h.01M15 15h.01" />
        </svg>
      );
    case "mall":
      return (
        <svg {...common}>
          <path d="M4 9h16l-1.2 10.2A2 2 0 0 1 16.8 21H7.2a2 2 0 0 1-2-1.8L4 9Z" />
          <path d="M8 9V7a4 4 0 0 1 8 0v2" />
        </svg>
      );
    case "plane":
      return (
        <svg {...common}>
          <path d="M10.5 19.5 8 21l.5-3.5L3 12.5l1.8-.4 4.7 1.7L15 4l1.7.5-3.8 9.6 4.7 1.7.4 1.8-5.5-2.1Z" />
        </svg>
      );
    case "stadium":
      return (
        <svg {...common}>
          <path d="M4 16c2-4 4.5-6 8-6s6 2 8 6" />
          <path d="M6 16c1.5-2.5 3.2-3.5 6-3.5s4.5 1 6 3.5" />
          <path d="M8.5 9.5 12 7l3.5 2.5M12 7v5.5" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="16" rx="1" />
          <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
        </svg>
      );
    case "road":
      return (
        <svg {...common}>
          <path d="M9 3 5 21M15 3l4 18M12 7v2M12 12v2M12 17v2" />
        </svg>
      );
    case "pin":
    default:
      return (
        <svg {...common}>
          <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
  }
}

function GoldPin({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="11" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.85" />
      <path
        d="M12 19.2s5.6-4.2 5.6-8.2a5.6 5.6 0 1 0-11.2 0c0 4 5.6 8.2 5.6 8.2Z"
        fill={GOLD}
      />
      <circle cx="12" cy="10.8" r="2" fill={INK} />
    </svg>
  );
}

function WaveDivider() {
  return (
    <svg
      className="absolute inset-x-0 bottom-[-1px] h-[2.6rem] w-full"
      viewBox="0 0 440 54"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 22 C55 48 95 6 150 24 C205 42 250 8 300 26 C350 44 390 14 440 28 L440 54 L0 54 Z"
        fill={STONE}
      />
      <path
        d="M0 22 C55 48 95 6 150 24 C205 42 250 8 300 26 C350 44 390 14 440 28"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.65"
      />
    </svg>
  );
}

function DesktopCard({ item }) {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-[1.15rem] shadow-[0_16px_36px_-22px_rgba(27,48,34,0.5)]"
      style={{ backgroundColor: STONE }}
    >
      <div
        className="relative h-[10.5rem] shrink-0 overflow-hidden lg:h-[11.25rem]"
        style={{ backgroundColor: INK }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(27,48,34,0.28) 0%, rgba(27,48,34,0.78) 72%)",
          }}
        />
        <div className="relative z-[1] flex h-full flex-col items-start justify-center px-5 pb-6">
          <GoldPin className="h-5 w-5" />
          <p
            className="mt-2.5 font-display text-[1.55rem] font-medium uppercase leading-none tracking-[-0.03em] text-white lg:text-[1.7rem]"
            style={{ fontFamily: "var(--imp-display)" }}
          >
            {item.range}
          </p>
        </div>
        <WaveDivider />
      </div>

      <ul className="relative z-[1] flex flex-1 flex-col px-4 pb-3.5 pt-0.5 sm:px-5">
        {item.places.map((place, i) => (
          <li
            key={place.name}
            className={`flex items-center gap-2.5 py-2.5 text-[12.5px] font-medium text-[#2a2a2a] sm:text-[13px] ${
              i > 0 ? "border-t border-black/[0.08]" : ""
            }`}
          >
            <PlaceIcon type={place.icon} />
            <span>{place.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PhoneAccordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="flex flex-col gap-3.5">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-[1.1rem] border border-black/[0.04] shadow-[0_10px_26px_-16px_rgba(27,48,34,0.38)]"
            style={{ backgroundColor: CARD }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center gap-3.5 px-3 py-3.5 text-left"
            >
              <span
                className="flex h-[3.35rem] w-[3.35rem] shrink-0 items-center justify-center rounded-[0.8rem]"
                style={{ backgroundColor: INK }}
              >
                <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" aria-hidden>
                  <path
                    d="M12 21s6.5-4.8 6.5-10a6.5 6.5 0 1 0-13 0c0 5.2 6.5 10 6.5 10Z"
                    fill="none"
                    stroke={GOLD}
                    strokeWidth="1.7"
                  />
                  <circle cx="12" cy="11" r="2.15" fill="none" stroke={GOLD} strokeWidth="1.7" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="block text-[1.28rem] font-medium uppercase leading-none tracking-[-0.03em] text-[var(--imp-ink)]"
                  style={{ fontFamily: "var(--imp-display)" }}
                >
                  {item.range}
                </span>
                <span className="mt-1.5 block text-[12px] leading-snug text-[#3f3f3f]">
                  {item.places.map((p) => p.name).join(", ")}
                </span>
              </span>
              <span
                aria-hidden
                className={`shrink-0 text-[#1a1a1a] transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="border-t border-black/[0.06] px-3.5 pb-3.5 pt-1">
                  {item.places.map((place, i) => (
                    <li
                      key={place.name}
                      className={`flex items-center gap-3 py-2.5 text-[13px] font-medium text-[#2a2a2a] ${
                        i > 0 ? "border-t border-black/[0.06]" : ""
                      }`}
                    >
                      <PlaceIcon type={place.icon} />
                      <span>{place.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Proximity() {
  return (
    <section
      id="connectivity"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--imp-stone-deep)] px-5 py-9 sm:px-8 sm:py-18 lg:px-10 lg:py-22"
      style={{ backgroundColor: STONE }}
      aria-label="Connectivity"
    >
      <div className="relative z-[1] mx-auto max-w-[1480px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="min-w-0 max-w-none lg:max-w-[44rem]">
            <div className="flex items-center gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2a2a2a] sm:text-[12px]">
                Connectivity
              </p>
              <span className="h-px w-11 sm:w-14" style={{ backgroundColor: GOLD }} />
            </div>
            <h2
              className="mt-3 text-[clamp(1.55rem,3.4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[var(--imp-ink)] sm:leading-[1.1]"
              style={{ fontFamily: "var(--imp-display)" }}
            >
              Proximity That Powers{" "}
              <em style={{ color: GOLD, fontStyle: "italic" }}>Business</em>.
            </h2>
          </div>

          <div className="flex max-w-[27rem] items-start gap-4 lg:mt-7 lg:pb-1">
            <span
              aria-hidden
              className="mt-1 hidden h-12 w-px shrink-0 lg:block"
              style={{ backgroundColor: GOLD }}
            />
            <p className="text-[14px] leading-relaxed text-[#3f3f3f] sm:text-[15px]">
              Hospitals, hotels, malls and the airport — all within a short drive of Jalna Road.
            </p>
          </div>
        </div>

        <div className="mt-5 hidden gap-4 md:mt-6 md:grid md:grid-cols-3 md:items-stretch lg:gap-5">
          {PROXIMITY.map((item) => (
            <DesktopCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-5 md:hidden">
          <PhoneAccordion items={PROXIMITY} />
        </div>
      </div>
    </section>
  );
}
