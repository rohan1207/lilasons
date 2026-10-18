"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { MEDIA } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

export default function MediaPage() {
  return (
    <PageShell>
      <section className="bg-white pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1500px] px-5 pb-10 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <p className="type-label mb-3 text-[11px] text-neutral-400">
              — Media
            </p>
            <h1 className="type-heading max-w-[18ch] text-[36px] text-neutral-950 sm:text-[48px] lg:text-[56px]">
              {MEDIA.title}
            </h1>
          </motion.div>

          <ul className="mt-10 flex flex-wrap gap-2 sm:mt-12">
            {MEDIA.events.map((event) => (
              <li
                key={event.title}
                className="chip rounded-full border border-neutral-300 bg-[#f7f7f7] px-4 py-2 text-[12px] font-medium tracking-[-0.01em] text-neutral-700 sm:text-[13px]"
              >
                {event.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto max-w-[1500px] px-5 pb-6 sm:px-8 lg:px-12">
          <h2 className="type-heading text-[24px] text-neutral-950 sm:text-[28px]">
            {MEDIA.beyondTitle}
          </h2>
        </div>

        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-2 px-5 pb-16 sm:grid-cols-2 sm:px-8 sm:pb-20 lg:grid-cols-3 lg:px-12">
          {MEDIA.gallery.map((src, i) => (
            <motion.div
              key={`${src}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.05, ease }}
              className="overflow-hidden rounded-2xl bg-neutral-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Lilasons media ${i + 1}`}
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
