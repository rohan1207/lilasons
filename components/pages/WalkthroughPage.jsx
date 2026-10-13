"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { WALKTHROUGHS } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

export default function WalkthroughPage() {
  return (
    <PageShell>
      <section className="bg-white pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1500px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <p className="type-label mb-3 text-[11px] text-neutral-400">
              — Walkthrough
            </p>
            <h1 className="type-heading text-[40px] uppercase leading-[1.02] tracking-[-0.04em] text-neutral-950 sm:text-[56px]">
              Walkthrough&apos;s
            </h1>
            <p className="type-body mt-4 max-w-[44ch] text-[15px] text-neutral-600 sm:text-[16px]">
              Explore Lilasons projects through our walkthrough films — intro
              film and featured developments.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-5">
            {WALKTHROUGHS.map((item, i) => (
              <motion.article
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="surface-card flex flex-col rounded-2xl border border-neutral-200 bg-[#f7f7f7] p-6 sm:p-8"
              >
                <p className="type-label text-[10px] text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="type-heading mt-4 text-[20px] uppercase tracking-[-0.025em] text-neutral-950 sm:text-[22px]">
                  {item.title}
                </h2>
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  {item.projectHref && (
                    <Link
                      href={item.projectHref}
                      className="type-button btn-pill btn-shine inline-flex h-10 items-center justify-center bg-neutral-950 px-5 text-[10px] text-white transition-opacity hover:opacity-85"
                    >
                      View Project
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    className="type-button btn-pill btn-shine inline-flex h-10 items-center justify-center border border-neutral-900 px-5 text-[10px] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                  >
                    Enquire
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
