"use client";

import { motion } from "framer-motion";
import { BRANDS } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

export default function Brands() {
  return (
    <section
      id="brands"
      className="relative z-10 border-t border-neutral-200/80 bg-[#f7f7f7]"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease }}
          className="mb-10 sm:mb-12"
        >
          <p className="type-label mb-2 text-[11px] text-neutral-700 sm:text-[12px]">
            — Our Brands
          </p>
          <h2 className="type-heading text-[28px] text-neutral-950 sm:text-[36px] lg:text-[44px]">
            Under the Lilasons Group
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {BRANDS.map((brand, i) => (
            <motion.article
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.08, ease }}
              className={`surface-card rounded-2xl border border-neutral-200 bg-white px-4 py-5 sm:px-7 sm:py-10 lg:px-8 ${
                i === BRANDS.length - 1 && BRANDS.length % 2 === 1
                  ? "col-span-2 sm:col-span-1"
                  : ""
              }`}
            >
              <p className="type-label mb-3 text-[10px] text-neutral-700 sm:mb-4">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="type-heading text-[15px] text-neutral-950 sm:text-[20px] lg:text-[22px]">
                {brand.name}
              </h3>
              <p className="type-body mt-3 text-[12px] sm:mt-4 sm:text-[15px]">
                {brand.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
