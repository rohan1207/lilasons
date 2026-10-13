"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "@/components/layout/SectionEyebrow";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  align = "center",
  dark = false,
}) {
  const isCenter = align === "center";

  return (
    <section
      className={`relative overflow-hidden ${
        dark ? "bg-[#0a0a0a] text-white" : "bg-[#f5f5f3] text-[#0a0a0a]"
      }`}
    >
      {image && (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-[0.18]"
            draggable={false}
          />
          <div
            className={`absolute inset-0 ${
              dark
                ? "bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]"
                : "bg-gradient-to-b from-[#f5f5f3]/90 via-[#f5f5f3]/75 to-[#f5f5f3]"
            }`}
          />
        </div>
      )}

      <div
        className={`relative mx-auto flex max-w-[1600px] flex-col justify-start px-5 pb-10 pt-[max(7.5rem,calc(env(safe-area-inset-top,0px)+6.75rem))] sm:px-8 md:min-h-[min(78vh,720px)] md:justify-end md:px-12 md:pb-20 md:pt-[calc(84px+4rem)] lg:px-14 lg:pt-[calc(96px+4rem)] ${
          isCenter ? "items-center text-center" : "items-start text-left"
        }`}
      >
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={isCenter ? "mb-5 md:mb-8" : "mb-4 md:mb-6"}
          >
            <SectionEyebrow
              className={
                dark ? "[&_span]:bg-white [&_span:last-child]:text-white/70" : ""
              }
            >
              {eyebrow}
            </SectionEyebrow>
          </motion.div>
        )}

        <motion.h1
          className={`font-display max-w-[14ch] font-medium uppercase leading-[0.9] tracking-[-0.03em] ${
            isCenter ? "text-center" : ""
          } text-[clamp(2.25rem,8vw,6.75rem)]`}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className={`mt-4 max-w-2xl text-[clamp(14px,1.2vw,18px)] font-normal leading-relaxed tracking-[-0.01em] md:mt-6 ${
              dark ? "text-white/65" : "text-[#3a3a3a]"
            } ${isCenter ? "text-center" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          className={`mt-7 h-px w-16 md:mt-10 ${dark ? "bg-white/30" : "bg-black/20"}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
          style={{ originX: isCenter ? 0.5 : 0 }}
        />
      </div>
    </section>
  );
}
