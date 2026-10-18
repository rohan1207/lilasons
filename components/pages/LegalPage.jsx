"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { BRAND } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

export default function LegalPage({ title, eyebrow, updated, sections }) {
  return (
    <PageShell>
      <section className="border-b border-neutral-200/80 bg-[#f4f4f2] pt-28 sm:pt-32">
        <div className="mx-auto max-w-[900px] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <p className="type-label mb-3 text-[11px] sm:text-[12px]">{eyebrow}</p>
            <h1 className="type-heading text-[clamp(2rem,5vw,3.5rem)] text-neutral-950">
              {title}
            </h1>
            <p className="type-body mt-4 text-[14px]">
              {BRAND.legalName} · Last updated {updated}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[900px] space-y-10 px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="type-heading text-[18px] text-neutral-950 sm:text-[20px]">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="type-body mt-3 text-[14px] sm:text-[15px]">
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="border-t border-neutral-200 pt-8">
            <p className="type-body text-[14px]">
              Questions? Write to{" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="font-medium text-neutral-950 underline underline-offset-4"
              >
                {BRAND.email}
              </a>{" "}
              or visit us at {BRAND.address.full}.
            </p>
            <Link
              href="/contact"
              className="type-button btn-pill btn-shine btn-solid mt-6 inline-flex"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
