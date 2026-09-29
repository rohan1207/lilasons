"use client";

import ScrollExpand from "@/components/home/ScrollExpand";
import { EXPAND } from "@/lib/brand";

export default function ExpandStory() {
  return (
    <section
      id="projects"
      className="relative z-10 bg-[#f7f7f7]"
      aria-label="Lilasons promise"
    >
      <ScrollExpand
        src={EXPAND.image}
        alt={EXPAND.alt}
        title={
          <>
            <span className="scroll-expand__title-kicker">{EXPAND.kicker}</span>
            <span className="scroll-expand__title-main">
              {EXPAND.titleLine1}
              <br />
              {EXPAND.titleLine2}
            </span>
          </>
        }
        scrollHint={EXPAND.hint}
        enabled
        startWidth={40}
        startHeight={54}
        startRadius={20}
        endRadius={0}
        mediaZoom={1.26}
        scrollDistance={1.85}
        holdDistance={0.7}
        scrub={0.38}
        overlayScrim={0.42}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 sm:text-[12px]">
          {EXPAND.overlayEyebrow}
        </p>
        <h2 className="max-w-[16ch] text-[26px] font-bold uppercase leading-[1.06] tracking-[-0.03em] text-white sm:text-[36px] md:text-[46px] lg:text-[52px]">
          {EXPAND.overlayTitle}
          <br />
          {EXPAND.overlayTitle2}
        </h2>
        <p className="mt-4 max-w-[36ch] text-[13px] font-medium leading-[1.55] tracking-[-0.01em] text-white/80 sm:mt-5 sm:text-[15px] md:text-[16px]">
          {EXPAND.overlayBody}
        </p>
      </ScrollExpand>
    </section>
  );
}
