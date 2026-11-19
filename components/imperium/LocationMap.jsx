import { PAPER, STONE } from "@/components/imperium/theme";

export default function LocationMap() {
  return (
    <section
      id="location-map"
      className="scroll-mt-28 overflow-x-clip border-t border-[var(--imp-stone-deep)]"
      style={{ backgroundColor: STONE }}
      aria-label="Location map"
    >
      <div className="mx-auto max-w-[1500px] px-4 pt-8 sm:px-8 sm:pt-12 lg:px-12 lg:pt-14">
        <h2
          className="text-[clamp(1.2rem,4vw,2rem)] font-medium uppercase tracking-[0.06em] text-[var(--imp-ink)]"
          style={{ fontFamily: "var(--imp-display)" }}
        >
          Location Map
        </h2>
      </div>

      <div className="mx-auto mt-4 max-w-[1500px] px-4 pb-8 sm:mt-8 sm:px-8 sm:pb-12 lg:mt-10 lg:px-12 lg:pb-16">
        <div className="overflow-hidden" style={{ backgroundColor: PAPER }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/location/hero-map.png?v=3"
            alt="Illustrated location map of Imperium Landmark on Jalna Road with nearby landmarks"
            className="mx-auto h-auto w-full max-w-full object-contain object-center"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
