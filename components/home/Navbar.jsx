"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrandMark from "@/components/BrandMark";
import { BRAND, NAV_ALL, NAV_PRIMARY } from "@/lib/brand";

const CONTACT = { label: "Contact", href: "#contact" };
const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("home");
      if (!hero) {
        setSolid(false);
        return;
      }
      setSolid(hero.getBoundingClientRect().bottom <= 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const t1 = window.setTimeout(update, 120);
    const t2 = window.setTimeout(update, 700);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!megaOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  const closeMega = () => setMegaOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-out ${
          solid && !megaOpen
            ? "border-b border-neutral-200/80 bg-[#f7f7f7]/95 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="relative mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-10">
          <BrandMark />

          <ul className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-x-6 lg:flex xl:gap-x-8">
            {NAV_PRIMARY.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="type-label whitespace-nowrap text-[11px] text-neutral-500 transition-colors hover:text-neutral-950 xl:text-[12px]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-20 flex items-center gap-3 sm:gap-4">
            <a
              href={CONTACT.href}
              className="type-button btn-pill btn-shine inline-flex h-10 items-center justify-center bg-neutral-950 px-5 text-[11px] text-white transition-opacity hover:opacity-85 sm:px-6"
            >
              {CONTACT.label}
            </a>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300/80 bg-white/40 transition-colors hover:border-neutral-900 hover:bg-white"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-neutral-900" />
                <span className="block h-px w-4 bg-neutral-900" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#f7f7f7]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="mx-auto flex h-full max-w-[1600px] flex-col px-5 py-6 sm:px-8 lg:px-10">
              <div className="flex items-center justify-between">
                <BrandMark />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMega}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 transition-colors hover:border-neutral-900"
                >
                  <span className="absolute h-px w-4 rotate-45 bg-neutral-900" />
                  <span className="absolute h-px w-4 -rotate-45 bg-neutral-900" />
                </button>
              </div>

              <div className="mt-10 flex flex-1 flex-col justify-between pb-8 lg:mt-14 lg:flex-row lg:items-end">
                <ul className="grid max-w-3xl grid-cols-1 gap-x-16 gap-y-3 sm:grid-cols-2">
                  {NAV_ALL.map((link, i) => (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        onClick={closeMega}
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="group flex items-baseline gap-3 py-1"
                      >
                        <span className="type-label w-6 text-[10px] text-neutral-300 transition-colors group-hover:text-neutral-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="type-heading text-[22px] text-neutral-950 transition-opacity group-hover:opacity-60 sm:text-[26px]">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 space-y-4 lg:mt-0 lg:max-w-xs lg:text-right">
                  <p className="type-label text-[11px] text-neutral-400">
                    {BRAND.address.short}
                  </p>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="block text-[14px] font-medium text-neutral-800"
                  >
                    {BRAND.email}
                  </a>
                  <a
                    href={CONTACT.href}
                    onClick={closeMega}
                    className="type-button btn-pill btn-shine inline-flex h-11 items-center justify-center bg-neutral-950 px-8 text-[11px] text-white transition-opacity hover:opacity-85"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
