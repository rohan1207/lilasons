import { PROXIMITY } from "@/lib/imperium";
import { GOLD_DARK, MUTED, PAPER, STONE } from "@/components/imperium/theme";

export default function Proximity() {
  return (
    <section
      id="connectivity"
      className="scroll-mt-28 overflow-x-clip border-t border-[var(--imp-stone-deep)] px-4 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      style={{ backgroundColor: STONE }}
      aria-label="Connectivity"
    >
      <div className="relative mx-auto max-w-[1100px] pt-7 sm:pt-6">
        {/* Overlapping ribbon title */}
        <div className="absolute left-1/2 top-0 z-[2] w-[min(100%,calc(100%-0.5rem))] max-w-[36rem] -translate-x-1/2 -translate-y-1/2 px-0 sm:w-[min(92%,36rem)]">
          <div
            className="px-3 py-2.5 text-center sm:px-6 sm:py-3.5"
            style={{ backgroundColor: GOLD_DARK }}
          >
            <h2
              className="text-[clamp(0.78rem,3.4vw,1.15rem)] font-medium uppercase leading-snug tracking-[0.05em] text-white"
              style={{ fontFamily: "var(--imp-display)" }}
            >
              Proximity that powers business.
            </h2>
          </div>
        </div>

        {/* Bordered card */}
        <div
          className="rounded-[1rem] border border-black/15 px-4 pb-7 pt-9 sm:rounded-[1.35rem] sm:px-8 sm:pb-10 sm:pt-12 lg:px-10"
          style={{ backgroundColor: PAPER }}
        >
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-0">
            {PROXIMITY.map((column, i) => (
              <div
                key={column.id}
                className={`min-w-0 sm:px-6 lg:px-8 ${
                  i > 0
                    ? "border-t border-black/10 pt-5 sm:border-l sm:border-t-0 sm:pt-0"
                    : ""
                }`}
              >
                <p
                  className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[var(--imp-ink)] sm:text-[14px]"
                  style={{ fontFamily: "var(--imp-sans)" }}
                >
                  {column.range}
                </p>
                <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
                  {column.places.map((place) => (
                    <li
                      key={place.name}
                      className="flex items-start gap-2.5 text-[13px] leading-snug sm:text-[14px]"
                      style={{ color: MUTED }}
                    >
                      <span
                        className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-current opacity-70"
                        aria-hidden
                      />
                      <span className="min-w-0 break-words">{place.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
