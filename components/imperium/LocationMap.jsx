import Link from "next/link";
import { LOCATION_DISTANCES } from "@/lib/imperium";
import { GOLD, ICON_BG, INK, STONE } from "@/components/imperium/theme";

function DistIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: INK,
    strokeWidth: "1.65",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-[15px] w-[15px]",
    "aria-hidden": true,
  };

  switch (type) {
    case "plane":
      return (
        <svg {...common}>
          <path d="M10.5 19.5 8 21l.5-3.5L3 12.5l1.8-.4 4.7 1.7L15 4l1.7.5-3.8 9.6 4.7 1.7.4 1.8-5.5-2.1Z" />
        </svg>
      );
    case "hospital":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M12 8.5v7M8.5 12h7" />
        </svg>
      );
    case "mall":
      return (
        <svg {...common}>
          <path d="M4 9h16l-1.2 10.2A2 2 0 0 1 16.8 21H7.2a2 2 0 0 1-2-1.8L4 9Z" />
          <path d="M8 9V7a4 4 0 0 1 8 0v2" />
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
    case "stadium":
      return (
        <svg {...common}>
          <path d="M4 16c2-4 4.5-6 8-6s6 2 8 6" />
          <path d="M6 16c1.5-2.5 3.2-3.5 6-3.5s4.5 1 6 3.5" />
          <path d="M8.5 9.5 12 7l3.5 2.5M12 7v5.5" />
        </svg>
      );
    default:
      return null;
  }
}

function DistanceList() {
  return (
    <ul className="mt-8 border-t border-black/[0.08] lg:mt-10">
      {LOCATION_DISTANCES.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-3 border-b border-black/[0.08] py-3.5 sm:gap-3.5 sm:py-4"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10"
            style={{ backgroundColor: ICON_BG }}
          >
            <DistIcon type={item.icon} />
          </span>
          <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-[var(--imp-ink)] sm:text-[14px]">
            {item.name}
          </span>
          <span
            aria-hidden
            className="hidden h-5 w-px shrink-0 sm:block"
            style={{ backgroundColor: GOLD }}
          />
          <span
            className="shrink-0 text-[13px] font-semibold tabular-nums sm:min-w-[3.4rem] sm:text-right sm:text-[14px]"
            style={{ color: GOLD }}
          >
            {item.time}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function LocationMap({ linked = true }) {
  return (
    <section
      id="location-map"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--imp-stone-deep)] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-22"
      style={{ backgroundColor: STONE }}
      aria-label="Location map"
    >

      <div className="relative z-[1] mx-auto max-w-[1500px]">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.55fr)] lg:gap-10 xl:gap-12">
          {/* Left column */}
          <div className="max-w-xl lg:max-w-none lg:pt-2">
            <div className="flex items-center gap-3">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-[12px]"
                style={{ color: GOLD }}
              >
                Location Map
              </p>
              <span className="h-px w-11 sm:w-14" style={{ backgroundColor: GOLD }} />
            </div>

            <h2
              className="mt-3 text-[clamp(1.75rem,3.8vw,2.85rem)] font-medium uppercase leading-[1.08] tracking-[-0.02em]"
              style={{ fontFamily: "var(--imp-display)", color: INK }}
            >
              Jalna Road Corridor
            </h2>

            <p className="mt-3 max-w-[28rem] text-[14px] leading-relaxed text-[#3f3f3f] sm:text-[15px]">
              A strategic address with seamless access to key city destinations.
            </p>

            <DistanceList />
          </div>

          {/* Right column — map */}
          <div className="relative min-w-0">
            <div className="overflow-hidden rounded-[1.35rem] bg-[#fffdf9] p-1.5 shadow-[0_22px_50px_-28px_rgba(27,48,34,0.55)] sm:rounded-[1.65rem] sm:p-2">
              <div className="overflow-hidden rounded-[1.15rem] sm:rounded-[1.4rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/location/hero-map.png"
                  alt="Illustrated location map of Imperium Landmark on Jalna Road with nearby landmarks"
                  className="aspect-[16/11] h-auto w-full object-cover object-center sm:aspect-auto"
                  draggable={false}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 sm:mt-4">
              {linked ? (
                <Link
                  href="#connectivity"
                  className="ml-auto inline-flex h-10 items-center gap-2 rounded-full px-5 text-[11px] font-semibold uppercase tracking-[0.14em] shadow-[0_10px_24px_-12px_rgba(27,48,34,0.65)] transition hover:brightness-110 sm:h-11 sm:px-6 sm:text-[12px]"
                  style={{
                    backgroundColor: INK,
                    border: `1.5px solid ${GOLD}`,
                    color: GOLD,
                  }}
                >
                  Full Location
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
