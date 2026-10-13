"use client";

import { motion } from "framer-motion";
import { RECOGNITION } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

export default function Recognition() {
  return (
    <section
      id="recognition"
      className="relative z-10 bg-white"
      aria-label={RECOGNITION.title}
    >
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d4a] sm:text-[12px]">
            {RECOGNITION.eyebrow}
          </p>
          <h2 className="font-display text-[32px] font-medium leading-[1.15] tracking-[-0.02em] text-neutral-950 sm:text-[40px] md:text-[46px]">
            {RECOGNITION.title}
          </h2>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6 lg:gap-x-5 xl:gap-x-8"
        >
          {RECOGNITION.items.map((item) => (
            <li
              key={item.alt}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-full items-center justify-center sm:h-14">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logo}
                  alt={item.alt}
                  className="h-10 w-auto max-w-[140px] object-contain object-center sm:h-11"
                  draggable={false}
                />
              </div>
              <p className="mt-3 max-w-[14ch] text-[9px] font-semibold uppercase leading-snug tracking-[0.12em] text-[#7a8a96] sm:mt-4 sm:text-[10px]">
                {item.text}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
