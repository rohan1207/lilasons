import Link from "next/link";
import { IMPERIUM } from "@/lib/imperium";
import { goldGradient } from "@/components/imperium/theme";

function HeroCtas({ className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <Link
        href="/contact"
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--imp-ink)] shadow-[0_12px_28px_-14px_rgba(0,0,0,0.45)] transition hover:brightness-105 sm:flex-none sm:px-6 sm:text-[12px] md:flex-none"
        style={{
          background: goldGradient,
        }}
      >
        Enquire
        <span aria-hidden>→</span>
      </Link>
      <Link
        href="#highlights"
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/60 bg-black/30 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:bg-white/10 sm:flex-none sm:px-6 sm:text-[12px] md:flex-none"
      >
        View gallery
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export default function HomeHero() {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[var(--imp-ink)]"
      aria-label={IMPERIUM.name}
    >
      {/* Desktop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${IMPERIUM.hero.desktop}?v=5`}
        alt={IMPERIUM.hero.alt}
        className="absolute inset-0 hidden h-full w-full object-cover object-[78%_42%] md:block"
      />
      {/* Phone */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${IMPERIUM.hero.phone}?v=5`}
        alt={IMPERIUM.hero.alt}
        className="absolute inset-0 h-full w-full object-cover object-[62%_38%] md:hidden"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/55 md:bg-gradient-to-r md:from-black/35 md:via-black/10 md:to-transparent"
        aria-hidden
      />

      {/* Phone: logo top-left, CTAs bottom-center */}
      <div className="relative z-[1] flex min-h-[100svh] flex-col justify-between px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[calc(5rem+1.25rem)] sm:px-6 sm:pt-[calc(6rem+1.5rem)] md:hidden">
        <div className="w-[min(58vw,13.5rem)] max-w-[13.5rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/imperium-logo.png?v=7"
            alt={IMPERIUM.name}
            className="h-auto w-full object-contain object-left drop-shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
            draggable={false}
          />
        </div>

        <div className="mx-auto w-full max-w-[22rem]">
          <HeroCtas className="justify-center" />
        </div>
      </div>

      {/* Desktop: logo + CTAs mid-left */}
      <div className="relative z-[1] mx-auto hidden min-h-[100svh] max-w-[1500px] items-center px-8 pt-[calc(6rem+1rem)] md:flex lg:px-10 xl:pt-[calc(7rem+1rem)]">
        <div className="w-full max-w-[22rem] -translate-y-4 lg:max-w-[24rem] lg:-translate-y-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/imperium-logo.png?v=7"
            alt={IMPERIUM.name}
            className="h-auto w-full object-contain object-left drop-shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
            draggable={false}
          />
          <HeroCtas className="mt-7" />
        </div>
      </div>

      <h1 className="sr-only">{IMPERIUM.name}</h1>
    </section>
  );
}
