import Link from "next/link";
import { IMPERIUM } from "@/lib/imperium";
import { goldGradient } from "@/components/imperium/theme";

export default function HomeHero() {
  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--imp-ink)]"
      aria-label={IMPERIUM.name}
    >
      {/* Desktop — oversized + shifted down so headline clears the crop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${IMPERIUM.hero.desktop}?v=8`}
        alt={IMPERIUM.hero.alt}
        className="absolute left-0 right-0 top-[8%] hidden h-[108%] w-full object-cover object-top md:block"
      />
      {/* Phone — fill viewport; nudge crop so baked-in headline clears the nav */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${IMPERIUM.hero.phone}?v=8`}
        alt={IMPERIUM.hero.alt}
        className="absolute inset-0 h-full w-full object-cover object-[center_12%] md:hidden"
      />

      {/* Soft bottom wash so CTA stays readable */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-black/55 via-black/20 to-transparent sm:h-36"
        aria-hidden
      />

      {/* Phone: Enquiry Now — bottom center */}
      <div className="absolute inset-x-0 bottom-0 z-[2] flex justify-center px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:hidden">
        <Link
          href="/contact"
          className="inline-flex h-11 max-w-full items-center justify-center gap-2 rounded-full px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--imp-ink)] shadow-[0_12px_28px_-14px_rgba(0,0,0,0.5)] transition hover:brightness-105"
          style={{ background: goldGradient }}
        >
          Enquiry Now
          <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Desktop: Enquiry Now — bottom center */}
      <div className="absolute inset-x-0 bottom-0 z-[2] hidden justify-center px-8 pb-10 md:flex lg:pb-12">
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--imp-ink)] shadow-[0_12px_28px_-14px_rgba(0,0,0,0.5)] transition hover:brightness-105"
          style={{ background: goldGradient }}
        >
          Enquiry Now
          <span aria-hidden>→</span>
        </Link>
      </div>

      <h1 className="sr-only">{IMPERIUM.name}</h1>
    </section>
  );
}
