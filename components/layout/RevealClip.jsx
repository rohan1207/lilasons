"use client";

import { motion } from "framer-motion";

/** Clip-path reveal — premium text / block entrance */
export default function RevealClip({
  children,
  className = "",
  delay = 0,
  as = "div",
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
