"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND } from "@/lib/brand";

export default function BrandMark({
  href = "/home",
  className = "",
  imgClassName = "h-9 w-auto max-w-[140px] object-contain object-left sm:h-10 sm:max-w-[160px] lg:h-11",
  textClassName = "type-logo text-[1.15rem] tracking-[-0.02em] text-neutral-950 sm:text-[1.35rem] lg:text-[1.5rem]",
}) {
  const [failed, setFailed] = useState(false);

  return (
    <Link href={href} className={`relative z-20 flex shrink-0 items-center ${className}`}>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={BRAND.logo}
          alt={BRAND.name}
          className={imgClassName}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={textClassName}>{BRAND.shortName.toUpperCase()}</span>
      )}
    </Link>
  );
}
