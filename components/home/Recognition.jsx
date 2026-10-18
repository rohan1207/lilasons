"use client";

import { motion } from "framer-motion";
import { RECOGNITION } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

export default function Recognition() {
  return (
    <section
      id="recognition"
      className="relative z-10 overflow-hidden border-t border-neutral-200/80 bg-[#f4f4f2]"
      aria-label={RECOGNITION.title.replace("\n", " ")}
    >
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-xl"
          >
            <p className="type-label mb-2 text-[11px] sm:mb-3 sm:text-[12px]">
              {RECOGNITION.eyebrow}
            </p>
            <h2 className="type-heading whitespace-pre-line text-[32px] text-neutral-950 sm:text-[40px] md:text-[48px]">
              {RECOGNITION.title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="type-body max-w-[34ch] text-[14px] sm:text-[15px] lg:pb-1.5"
          >
            {RECOGNITION.body}
          </motion.p>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.12, ease }}
          className="mt-12 grid grid-cols-2 divide-x divide-y divide-neutral-300/90 border border-neutral-300/90 sm:mt-14 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6 lg:divide-y-0"
        >
          {RECOGNITION.items.map((item, i) => (
            <li
              key={item.alt}
              className="group relative flex flex-col items-center justify-center px-4 py-8 text-center sm:px-5 sm:py-10"
            >
              <span className="type-label absolute left-3 top-3 text-[9px] text-neutral-400 sm:left-4 sm:top-4">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex h-11 w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logo}
                  alt={item.alt}
                  className="h-9 w-auto max-w-[120px] object-contain object-center opacity-80 transition-opacity duration-400 group-hover:opacity-100 sm:h-10 sm:max-w-[132px]"
                  draggable={false}
                />
              </div>

              <p className="type-label mt-4 max-w-[12ch] text-[9px] leading-snug text-neutral-500 sm:mt-5 sm:text-[10px]">
                {item.text}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
