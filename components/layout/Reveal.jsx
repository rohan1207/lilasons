"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  ...props
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={delay}
      {...props}
    >
      {children}
    </Component>
  );
}

export function RevealStagger({ children, className = "", stagger = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = fadeUp;
