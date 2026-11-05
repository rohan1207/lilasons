"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND } from "@/lib/brand";

export default function BrandMark({
  href = "/home",
  className = "",
  /** Square wordmark logo — sized for nav / footer / landing */
  imgClassName = "h-11 w-auto max-h-11 object-contain object-left sm:h-14 sm:max-h-14 lg:h-[3.75rem] lg:max-h-[3.75rem]",
  textClassName = "type-logo text-[0.95rem] tracking-[-0.02em] text-neutral-950 sm:text-[1.35rem] lg:text-[1.5rem]",
  asLink = true,
}) {
  const [failed, setFailed] = useState(false);

  const mark = !failed ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND.logo}
      alt={BRAND.name}
      className={imgClassName}
      onError={() => setFailed(true)}
      draggable={false}
    />
  ) : (
    <span className={textClassName}>{BRAND.shortName.toUpperCase()}</span>
  );

  if (!asLink) {
    return <span className={`inline-flex shrink-0 items-center ${className}`}>{mark}</span>;
  }

  return (
    <Link href={href} className={`relative z-20 flex shrink-0 items-center ${className}`}>
      {mark}
    </Link>
  );
}
