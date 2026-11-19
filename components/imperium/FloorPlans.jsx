import { PLANS } from "@/lib/imperium";
import { GOLD, STONE, goldGradient } from "@/components/imperium/theme";

function FeatureIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: GOLD,
    strokeWidth: "1.55",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5 sm:h-7 sm:w-7",
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

export default function FloorPlans() {
  const titleBefore = PLANS.title.replace(PLANS.titleAccent, "").trim();
  const planImage = PLANS.featuredImage || "/floor-plans/featured.png";

  return (
    <section
      id="floor-plans"
      className="relative scroll-mt-24 overflow-x-clip border-t border-[var(--imp-stone-deep)] px-4 py-9 sm:px-8 sm:py-18 lg:px-10 lg:py-22"
      style={{ backgroundColor: STONE }}
      aria-label="Floor plans"
    >
      <div className="relative z-[1] mx-auto max-w-[1500px]">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
          {/* Copy column */}
          <div className="min-w-0 max-w-xl lg:max-w-none">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 shrink-0 sm:w-12" style={{ backgroundColor: GOLD }} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2a2a2a] sm:text-[12px]">
                {PLANS.eyebrow}
              </p>
            </div>

            <h2
              className="mt-3 text-[clamp(1.4rem,6.2vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--imp-ink)]"
              style={{ fontFamily: "var(--imp-display)" }}
            >
              {titleBefore}{" "}
              <em style={{ color: GOLD, fontStyle: "italic" }}>{PLANS.titleAccent}</em>
            </h2>

            <p className="mt-2.5 max-w-[30rem] text-[13px] leading-relaxed text-[#3f3f3f] sm:mt-3 sm:text-[15px]">
              {PLANS.body}
            </p>

            <ul className="mt-5 grid grid-cols-3 gap-1.5 sm:mt-10 sm:flex sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-0">
              {PLANS.features.map((feature, i) => (
                <li
                  key={feature.id}
                  className={`flex min-w-0 flex-col items-center gap-1 rounded-xl bg-white/70 px-1 py-2.5 text-center ring-1 ring-black/[0.04] sm:flex-1 sm:gap-1.5 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-0 sm:ring-0 ${
                    i > 0 ? "sm:border-l" : ""
                  }`}
                  style={i > 0 ? { borderColor: `${GOLD}55` } : undefined}
                >
                  <FeatureIcon type={feature.icon} />
                  <span className="text-[9px] font-semibold leading-snug text-[var(--imp-ink)] sm:mt-2.5 sm:text-[12px]">
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={PLANS.downloadHref}
              download
              className="mt-9 hidden h-12 w-full max-w-[22rem] items-center justify-center gap-2.5 rounded-full px-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-14px_rgba(162,132,77,0.75)] transition hover:brightness-105 md:inline-flex"
              style={{ background: goldGradient }}
            >
              <DownloadIcon />
              {PLANS.downloadLabel}
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Single floor plan image */}
          <div className="mx-auto min-w-0 w-full max-w-[20rem] sm:max-w-[32rem] lg:ml-auto lg:mr-0 lg:max-w-[36rem]">
            <div className="overflow-hidden rounded-[1rem] bg-white p-2 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.04] sm:rounded-[1.35rem] sm:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${planImage}?v=1`}
                alt="Imperium Landmark floor plan"
                className="mx-auto h-auto w-[92%] max-w-full object-contain object-center sm:w-[90%]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center md:hidden">
          <a
            href={PLANS.downloadHref}
            download
            className="inline-flex h-11 max-w-full items-center justify-center gap-2 rounded-full px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-14px_rgba(162,132,77,0.75)] transition hover:brightness-105"
            style={{ background: goldGradient }}
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
