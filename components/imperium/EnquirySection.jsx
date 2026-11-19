"use client";

import { usePathname } from "next/navigation";
import ContactForm from "@/components/imperium/ContactForm";
import { ENQUIRY, IMPERIUM } from "@/lib/imperium";
import { GOLD, ICON_BG, INK, STONE } from "@/components/imperium/theme";

export default function EnquirySection() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  const titleParts = ENQUIRY.title.split(ENQUIRY.titleAccent);

  return (
    <section
      id="enquire"
      className="relative scroll-mt-24 overflow-x-clip border-t border-[var(--imp-stone-deep)] px-4 py-9 sm:px-8 sm:py-18 lg:px-10 lg:py-22"
      style={{ backgroundColor: STONE }}
      aria-label="Enquiry"
    >
      <svg
        className="pointer-events-none absolute bottom-6 right-8 z-0 hidden w-[240px] opacity-35 sm:block"
        viewBox="0 0 240 50"
        fill="none"
        aria-hidden
      >
        <path
          d="M0 30 C40 10 80 45 120 22 C160 0 195 38 240 18"
          stroke={GOLD}
          strokeWidth="1"
        />
      </svg>

      <div className="relative z-[1] mx-auto max-w-[1500px]">
        <div className="grid items-start gap-5 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">
          <div className="min-w-0 max-w-xl">
            <div className="flex items-center gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2a2a2a] sm:text-[12px]">
                {ENQUIRY.eyebrow}
              </p>
              <span className="h-px w-8 shrink-0 sm:w-14" style={{ backgroundColor: GOLD }} />
            </div>

            <h2
              className="mt-2.5 text-[clamp(1.4rem,6vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--imp-ink)] sm:mt-3"
              style={{ fontFamily: "var(--imp-display)" }}
            >
              {titleParts[0]}
              <em style={{ color: GOLD, fontStyle: "italic" }}>{ENQUIRY.titleAccent}</em>
              {titleParts[1]}
            </h2>

            <p className="mt-2.5 text-[13px] leading-relaxed text-[#3f3f3f] sm:mt-4 sm:text-[15px]">
              {ENQUIRY.body}
            </p>

            {/* Phone: compact contact row */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:hidden">
              <a
                href={`tel:${IMPERIUM.phones[0].replace(/\s/g, "")}`}
                className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-3 text-[12px] font-semibold text-[var(--imp-ink)] ring-1 ring-black/[0.06]"
              >
                Call
              </a>
              <a
                href={IMPERIUM.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-white"
                style={{ backgroundColor: INK }}
              >
                WhatsApp
              </a>
            </div>

            {/* Desktop / tablet contact stack */}
            <div className="mt-8 hidden space-y-2 sm:block">
              <a
                href={`tel:${IMPERIUM.phones[0].replace(/\s/g, "")}`}
                className="flex min-h-12 items-center gap-3 py-1 text-[14px] font-medium text-[var(--imp-ink)] transition hover:opacity-80"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: ICON_BG, color: GOLD }}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A14.5 14.5 0 0 1 4.5 6.5a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {IMPERIUM.phones[0]}
              </a>
              <a
                href={`mailto:${IMPERIUM.email}`}
                className="flex min-h-12 items-center gap-3 py-1 text-[14px] font-medium text-[var(--imp-ink)] transition hover:opacity-80"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: ICON_BG, color: GOLD }}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
                    <path d="m4.5 7 7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="min-w-0 break-all">{IMPERIUM.email}</span>
              </a>
            </div>

            <a
              href={IMPERIUM.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-8 hidden h-11 items-center gap-2 rounded-full px-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition hover:brightness-110 sm:inline-flex"
              style={{ backgroundColor: INK }}
            >
              WhatsApp Us
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="min-w-0 rounded-[1rem] bg-white p-3.5 shadow-[0_18px_40px_-26px_rgba(10,10,10,0.3)] ring-1 ring-black/[0.04] sm:rounded-[1.35rem] sm:p-7 lg:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-[12px]" style={{ color: GOLD }}>
              Send an enquiry
            </p>
            <div className="mt-3.5 sm:mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
