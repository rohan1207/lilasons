"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import BrandMark from "@/components/BrandMark";
import { BRAND, NAV_PRIMARY, NAV_RESOURCES, PROJECT_NAV } from "@/lib/brand";

const CONTACT = { label: "Contact", href: "/contact" };
const ease = [0.22, 1, 0.36, 1];

export default function Navbar({ forceSolid = false }) {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [solid, setSolid] = useState(forceSolid);

  useEffect(() => {
    if (forceSolid) {
      setSolid(true);
      return;
    }

    const update = () => {
      const hero = document.getElementById("home");
      if (!hero) {
        setSolid(true);
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
  }, [forceSolid, pathname]);

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

  const isActive = (href) => {
    if (href === "/home") return pathname === "/home" || pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

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

          <ul className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-x-5 lg:flex xl:gap-x-7">
            {NAV_PRIMARY.map((link) => (
              <li
                key={link.href + link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children ? setProjectsOpen(true) : setProjectsOpen(false)
                }
                onMouseLeave={() => setProjectsOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`type-label whitespace-nowrap text-[11px] transition-colors xl:text-[12px] ${
                    isActive(link.href)
                      ? "text-[#3b6ea5]"
                      : "text-neutral-900 hover:text-neutral-950"
                  }`}
                >
                  {link.label}
                  {link.children ? (
                    <span className="ml-1 inline-block text-[10px] text-neutral-700">
                      ›
                    </span>
                  ) : null}
                </Link>

                {link.children && projectsOpen && (
                  <div className="absolute left-1/2 top-full z-30 w-[280px] -translate-x-1/2 pt-4">
                    <div className="rounded-2xl border border-neutral-200 bg-[#efefef] px-5 py-4 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)]">
                      <ul className="space-y-2.5">
                        {PROJECT_NAV.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block text-[13px] font-medium tracking-[-0.01em] text-neutral-900 transition-colors hover:text-neutral-950"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="relative z-20 flex items-center gap-3 sm:gap-4">
            <Link
              href={CONTACT.href}
              className="type-button btn-pill btn-shine btn-solid !h-10 sm:!h-10"
            >
              {CONTACT.label}
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300/80 bg-white/55 transition-colors hover:border-neutral-900 hover:bg-white"
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

              <div className="mt-8 flex min-h-0 flex-1 flex-col overflow-auto pb-8 lg:mt-10 lg:flex-row">
                <ul className="w-full space-y-1 border-b border-neutral-200 pb-8 lg:w-[42%] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                  {NAV_PRIMARY.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        onClick={closeMega}
                        className={`block py-2.5 text-[22px] font-medium tracking-[-0.02em] transition-colors sm:text-[26px] ${
                          isActive(link.href)
                            ? "text-[#3b6ea5]"
                            : "text-neutral-800 hover:text-neutral-950"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="w-full bg-[#ebebeb]/60 px-0 py-8 lg:flex-1 lg:px-10 lg:py-2">
                  <p className="type-label mb-4 text-[11px] text-neutral-700">
                    Our Projects
                  </p>
                  <ul className="space-y-3">
                    {PROJECT_NAV.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMega}
                          className={`block text-[16px] font-medium tracking-[-0.015em] transition-colors sm:text-[18px] ${
                            isActive(item.href)
                              ? "text-[#3b6ea5]"
                              : "text-neutral-800 hover:text-neutral-950"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 border-t border-neutral-300/70 pt-8">
                    <p className="type-label mb-4 text-[11px] text-neutral-700">
                      Resources
                    </p>
                    <ul className="space-y-3">
                      {NAV_RESOURCES.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={closeMega}
                            className={`block text-[16px] font-medium tracking-[-0.015em] transition-colors sm:text-[18px] ${
                              isActive(item.href)
                                ? "text-[#3b6ea5]"
                                : "text-neutral-800 hover:text-neutral-950"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 space-y-3 border-t border-neutral-300/70 pt-8">
                    <p className="type-label text-[11px] text-neutral-700">
                      {BRAND.address.short}
                    </p>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="block text-[14px] font-medium text-neutral-800"
                    >
                      {BRAND.email}
                    </a>
                    <Link
                      href={CONTACT.href}
                      onClick={closeMega}
                      className="type-button btn-pill btn-shine btn-solid"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
