"use client";

import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { BRAND, FOOTER, PROJECTS } from "@/lib/brand";

const residential = PROJECTS.filter((p) =>
  ["Residential", "Row House", "Luxury Living", "Plotted Development"].includes(
    p.category,
  ),
);
const commercial = PROJECTS.filter((p) => p.category === "Commercial");

function SocialDot({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/45 text-white transition-colors hover:border-white hover:bg-white/10"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${BRAND.mapsQuery}`;

  return (
    <footer id="contact" className="relative z-10 overflow-hidden text-white">
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FOOTER.background}
          alt=""
          className="h-full w-full scale-105 object-cover object-center brightness-[0.55] contrast-[1.05]"
          draggable={false}
        />
        {/* Heavy scrim so white type stays readable like the reference */}
        <div
          className="absolute inset-0 bg-[#05080f]/55"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/92 to-[#05080f]/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05080f]"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 pb-10 pt-32 sm:px-8 sm:pb-12 sm:pt-40 lg:px-12 lg:pb-14 lg:pt-48">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col lg:col-span-3">
            <BrandMark
              href="/home"
              imgClassName="h-12 w-auto max-w-[240px] object-contain object-left brightness-0 invert sm:h-14 sm:max-w-[280px]"
              textClassName="type-logo text-[1.2rem] tracking-[-0.02em] text-white sm:text-[1.4rem]"
            />
            <p className="mt-5 text-[13px] font-medium tracking-[-0.01em] text-white">
              {BRAND.name}
            </p>
            <p className="mt-1 text-[13px] tracking-[-0.01em] text-white/85">
              {BRAND.address.short}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <SocialDot href={BRAND.whatsappUrl} label="WhatsApp">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M12.04 2c-5.5 0-9.96 4.42-9.96 9.87 0 1.74.46 3.44 1.34 4.94L2 22l5.36-1.4a10 10 0 0 0 4.68 1.18h.01c5.5 0 9.96-4.43 9.96-9.88C22.01 6.42 17.54 2 12.04 2Zm5.8 14.05c-.24.68-1.42 1.25-1.96 1.33-.5.07-1.14.1-1.84-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.43-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.4.26-.28.57-.35.76-.35h.55c.18 0 .42-.06.65.5.24.58.82 2 .89 2.14.07.14.12.3.02.49-.1.2-.14.32-.28.5-.14.17-.3.38-.42.51-.14.14-.28.3-.12.58.16.28.7 1.15 1.5 1.86 1.03.91 1.9 1.2 2.17 1.33.27.14.43.12.59-.07.16-.2.67-.78.85-1.05.18-.27.36-.22.6-.13.25.1 1.57.74 1.84.88.27.13.45.2.52.31.07.11.07.64-.17 1.32Z" />
                </svg>
              </SocialDot>
              <SocialDot href={`mailto:${BRAND.email}`} label="Email">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M4 6.5h16v11H4v-11Z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </SocialDot>
              <SocialDot href={mapsHref} label="Directions">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
                  <circle cx="12" cy="10" r="2.2" />
                </svg>
              </SocialDot>
            </div>

            <p className="mt-auto pt-10 text-[11px] leading-relaxed text-white/70 sm:pt-14">
              {FOOTER.copyright.replace("{year}", String(year))}
            </p>
          </div>

          {/* Residences / Projects */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
              Projects
            </p>
            <ul className="space-y-2.5">
              {residential.map((project) => (
                <li key={project.id}>
                  <Link
                    href={project.href}
                    className="text-[13px] font-medium tracking-[-0.01em] text-white/90 transition-colors hover:text-white"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial + more */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
              Commercial
            </p>
            <ul className="space-y-2.5">
              {(commercial.length ? commercial : PROJECTS.slice(0, 2)).map(
                (project) => (
                  <li key={project.id}>
                    <Link
                      href={project.href}
                      className="text-[13px] font-medium tracking-[-0.01em] text-white/90 transition-colors hover:text-white"
                    >
                      {project.title}
                    </Link>
                  </li>
                ),
              )}
              <li>
                <Link
                  href="/projects"
                  className="text-[13px] font-medium tracking-[-0.01em] text-white/90 transition-colors hover:text-white"
                >
                  View all projects
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
              About Us
            </p>
            <ul className="space-y-2.5">
              {FOOTER.about.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[13px] font-medium tracking-[-0.01em] text-white/90 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
              Contact Us
            </p>
            <div className="space-y-4 text-[13px] font-medium leading-relaxed tracking-[-0.01em] text-white/90">
              <p>
                {BRAND.address.line1}
                <br />
                {BRAND.address.line2}
                <br />
                {BRAND.address.city}, {BRAND.address.state} {BRAND.address.pin}
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="block transition-colors hover:text-white"
              >
                {BRAND.email}
              </a>
              <p>
                {BRAND.phones.map((phone, i) => (
                  <span key={phone}>
                    {i > 0 ? " | " : null}
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-white"
                    >
                      {phone}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp only */}
      <a
        href={BRAND.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Message on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M12.04 2c-5.5 0-9.96 4.42-9.96 9.87 0 1.74.46 3.44 1.34 4.94L2 22l5.36-1.4a10 10 0 0 0 4.68 1.18h.01c5.5 0 9.96-4.43 9.96-9.88C22.01 6.42 17.54 2 12.04 2Zm5.8 14.05c-.24.68-1.42 1.25-1.96 1.33-.5.07-1.14.1-1.84-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.43-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.4.26-.28.57-.35.76-.35h.55c.18 0 .42-.06.65.5.24.58.82 2 .89 2.14.07.14.12.3.02.49-.1.2-.14.32-.28.5-.14.17-.3.38-.42.51-.14.14-.28.3-.12.58.16.28.7 1.15 1.5 1.86 1.03.91 1.9 1.2 2.17 1.33.27.14.43.12.59-.07.16-.2.67-.78.85-1.05.18-.27.36-.22.6-.13.25.1 1.57.74 1.84.88.27.13.45.2.52.31.07.11.07.64-.17 1.32Z" />
        </svg>
      </a>
    </footer>
  );
}
