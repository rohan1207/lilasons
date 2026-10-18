"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BRAND, HOME } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    const subject = encodeURIComponent("Subscribe — housing offers");
    const body = encodeURIComponent(
      `Please add me to offers updates.\n\nEmail: ${email.trim()}`,
    );
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="subscribe"
      className="relative z-10 border-t border-neutral-200/80 bg-white"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="type-label mb-3 text-[11px] text-neutral-700 sm:text-[12px]">
            — Stay Updated
          </p>
          <h2 className="type-heading text-[28px] text-neutral-950 sm:text-[36px]">
            {HOME.subscribeTitle}
          </h2>
          <p className="type-body mx-auto mt-4 max-w-[40ch] text-[15px] sm:text-[16px]">
            {HOME.subscribeBody}
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-stretch sm:justify-center"
          >
            <label className="sr-only" htmlFor="subscribe-email">
              {HOME.subscribePlaceholder}
            </label>
            <input
              id="subscribe-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={HOME.subscribePlaceholder}
              className="h-12 w-full rounded-full border border-neutral-300 bg-white px-5 text-[14px] text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-950 sm:max-w-sm"
            />
            <button
              type="submit"
              className="type-button btn-pill btn-shine btn-solid shrink-0"
            >
              {HOME.subscribeCta}
            </button>
          </form>
          {sent && (
            <p className="mt-4 text-[13px] text-neutral-700">
              Opening your email client to reach {BRAND.email}…
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
