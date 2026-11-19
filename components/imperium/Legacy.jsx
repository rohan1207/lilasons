import { LEGACY } from "@/lib/imperium";
import { GOLD, INK, MUTED, PAPER, STONE, STONE_DEEP } from "@/components/imperium/theme";

const CARD = PAPER;
const INK_RGB = "10,10,10";

function StatIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: GOLD,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-[18px] w-[18px] sm:h-5 sm:w-5",
    "aria-hidden": true,
  };

  switch (type) {
    case "wreath":
      return (
        <svg {...common}>
          <path d="M7.2 18.5c-2.2-1.5-3.4-3.8-3.4-6.3C3.8 8.2 6.6 5.2 12 5.2s8.2 3 8.2 7c0 2.5-1.2 4.8-3.4 6.3" />
          <path d="M8 17.8c1.2.9 2.5 1.4 4 1.4s2.8-.5 4-1.4" />
          <path d="M10.2 9.8h3.6v7.6h-1.3v-2.6h-1v2.6h-1.3z" fill={GOLD} stroke="none" />
          <path d="M9.4 9.8h5.2" />
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
    case "skyline":
      return (
        <svg {...common}>
          <path d="M4 19V10l3.2-2.4V19" />
          <path d="M7.2 19V7.2L12 4.5v14.5" />
          <path d="M12 19V8.5l4 3V19" />
          <path d="M16 19v-5.2L20 11v8" />
          <path d="M3.5 19h17" />
        </svg>
      );
    default:
      return null;
  }
}

function TimelineRail({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`relative flex w-10 shrink-0 items-stretch justify-center sm:w-12 lg:w-14 ${className}`}
      style={{ backgroundColor: STONE_DEEP }}
    >
      <div className="relative my-8 w-px lg:my-10" style={{ backgroundColor: `${GOLD}99` }}>
        <span
          className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px]"
          style={{ borderColor: GOLD, backgroundColor: STONE_DEEP }}
        />
        <span
          className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-[3px] border-[1.5px]"
          style={{ borderColor: GOLD, backgroundColor: STONE_DEEP }}
        />
      </div>
    </div>
  );
}

function LegacyBand() {
  return (
    <section
      id="legacy"
      className="relative scroll-mt-24 overflow-hidden px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      style={{ backgroundColor: INK }}
      aria-label="Legacy of excellence"
    >
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 w-full opacity-30"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 50 C120 20 240 70 360 40 C480 10 600 65 720 35 C840 5 960 60 1080 30 C1140 15 1180 40 1200 28 L1200 80 L0 80 Z"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.2"
        />
        <path
          d="M0 62 C150 35 300 75 450 48 C600 20 750 70 900 42 C1050 15 1150 55 1200 40"
          fill="none"
          stroke={GOLD}
          strokeWidth="0.9"
          opacity="0.6"
        />
      </svg>

      <div className="relative z-[1] mx-auto grid max-w-[1500px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <h2
          className="max-w-[18rem] text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium uppercase leading-[1.12] tracking-[0.01em] text-white sm:max-w-[22rem]"
          style={{ fontFamily: "var(--imp-display)" }}
        >
          All this, backed by a{" "}
          <em style={{ color: GOLD, fontStyle: "italic" }}>Legacy of Excellence</em>.
        </h2>

        <ul className="grid gap-6 sm:grid-cols-3 sm:gap-0">
          {LEGACY.stats.map((stat, i) => (
            <li
              key={stat.label}
              className={`flex flex-col items-start sm:px-5 lg:px-7 ${
                i > 0 ? "sm:border-l sm:border-white/15" : ""
              }`}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-[0.7rem] sm:h-11 sm:w-11"
                style={{ backgroundColor: "rgba(197,157,95,0.14)" }}
              >
                <StatIcon type={stat.icon} />
              </span>
              <p
                className="mt-4 text-[1.75rem] font-medium uppercase leading-none tracking-[-0.02em] sm:text-[2rem]"
                style={{ fontFamily: "var(--imp-display)", color: GOLD }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] font-medium text-white/70 sm:text-[14px]">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LegacyCard() {
  return (
    <section
      id="legacy"
      className="relative scroll-mt-24 overflow-x-clip px-4 py-10 sm:px-8 sm:py-18 lg:px-10 lg:py-22"
      style={{ backgroundColor: STONE }}
      aria-label="Legacy of excellence"
    >
      <svg
        className="pointer-events-none absolute -right-6 top-8 z-0 hidden w-[280px] opacity-40 sm:block lg:right-8 lg:w-[360px]"
        viewBox="0 0 360 120"
        fill="none"
        aria-hidden
      >
        <path
          d="M10 70 C60 30 110 95 160 55 C210 15 250 85 310 45 C330 32 350 50 360 42"
          stroke={GOLD}
          strokeWidth="1.1"
        />
      </svg>

      <div className="relative z-[1] mx-auto max-w-[1500px]">
        <div className="overflow-hidden rounded-[1rem] shadow-[0_24px_60px_-30px_rgba(10,10,10,0.35)] sm:rounded-[1.35rem] lg:rounded-[1.5rem]">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            <div
              className="relative min-h-[16rem] overflow-hidden sm:min-h-[22rem] lg:min-h-[26rem] lg:w-[52%]"
              style={{ backgroundColor: INK }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LEGACY.image}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover object-[60%_center] opacity-95 sm:object-[72%_center]"
              />
              <div
                className="absolute inset-0 hidden lg:block"
                style={{
                  background: `linear-gradient(90deg, rgba(${INK_RGB},0.92) 0%, rgba(${INK_RGB},0.72) 38%, rgba(${INK_RGB},0.28) 68%, rgba(${INK_RGB},0.12) 100%)`,
                }}
              />
              <div
                className="absolute inset-0 lg:hidden"
                style={{
                  background: `linear-gradient(180deg, rgba(${INK_RGB},0.45) 0%, rgba(${INK_RGB},0.15) 40%, rgba(${INK_RGB},0.78) 100%)`,
                }}
              />

              <div className="relative z-[1] flex h-full flex-col justify-end px-5 py-7 sm:px-8 sm:py-10 lg:justify-center lg:px-10 lg:py-12 xl:px-12">
                <div className="max-w-[17rem] sm:max-w-[20rem] lg:max-w-[22rem]">
                  <span
                    aria-hidden
                    className="mb-3 block h-px w-10 sm:mb-5 sm:w-14"
                    style={{ backgroundColor: GOLD }}
                  />
                  <h2
                    className="text-[clamp(1.25rem,5.5vw,2.35rem)] font-medium uppercase leading-[1.18] tracking-[0.02em] text-white"
                    style={{ fontFamily: "var(--imp-display)" }}
                  >
                    <span className="block">All this, backed by a</span>
                    <span className="block">
                      <em style={{ color: GOLD, fontStyle: "italic" }}>Legacy of</em>
                    </span>
                    <span className="block">Excellence.</span>
                  </h2>
                  <span
                    aria-hidden
                    className="mt-3 block h-px w-10 sm:mt-5 sm:w-14"
                    style={{ backgroundColor: GOLD }}
                  />
                </div>
              </div>
            </div>

            <TimelineRail className="hidden lg:flex" />

            <div
              className="flex flex-1 flex-col justify-center px-4 py-4 sm:px-8 sm:py-5 lg:px-9 lg:py-6 xl:px-11"
              style={{ backgroundColor: CARD }}
            >
              <ul>
                {LEGACY.stats.map((stat, i) => (
                  <li
                    key={stat.label}
                    className={`flex items-center gap-3 py-4 sm:gap-5 sm:py-6 ${
                      i > 0 ? "border-t border-black/[0.08]" : ""
                    }`}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.7rem] shadow-[0_8px_18px_-10px_rgba(10,10,10,0.2)] sm:h-12 sm:w-12 sm:rounded-[0.8rem]"
                      style={{ backgroundColor: STONE }}
                    >
                      <StatIcon type={stat.icon} />
                    </span>
                    <span
                      aria-hidden
                      className="h-8 w-px shrink-0 sm:h-10"
                      style={{ backgroundColor: GOLD }}
                    />
                    <span className="min-w-0">
                      <span
                        className="block text-[1.4rem] font-medium uppercase leading-none tracking-[-0.02em] sm:text-[1.9rem] lg:text-[2.05rem]"
                        style={{ fontFamily: "var(--imp-display)", color: GOLD }}
                      >
                        {stat.value}
                      </span>
                      <span
                        className="mt-1.5 block text-[12px] font-medium leading-snug sm:text-[14px]"
                        style={{ color: MUTED }}
                      >
                        {stat.label}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Legacy({ variant = "card" }) {
  if (variant === "band") return <LegacyBand />;
  return <LegacyCard />;
}
