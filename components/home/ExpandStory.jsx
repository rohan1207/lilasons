"use client";

import { useState } from "react";
import ScrollExpand from "@/components/home/ScrollExpand";
import { BRAND, EXPAND, HOME } from "@/lib/brand";

export default function ExpandStory() {
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
        overlayScrim={0.58}
      >
        <div className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
          <p className="type-label mb-3 text-[11px] text-white/85 sm:text-[12px]">
            {EXPAND.overlayEyebrow}
          </p>
          <h2 className="type-heading whitespace-pre-line text-[26px] text-white sm:text-[36px] md:text-[44px] lg:text-[50px]">
            {`${EXPAND.overlayTitle}\n${EXPAND.overlayTitle2}`}
          </h2>
          <p
            className="mt-4 max-w-[38ch] text-[13px] font-medium leading-[1.65] tracking-[-0.01em] text-white sm:mt-5 sm:text-[15px] md:text-[16px]"
            style={{ textShadow: "0 1px 18px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.35)" }}
          >
            {EXPAND.overlayBody}
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:flex-row sm:items-stretch sm:justify-center"
          >
            <label className="sr-only" htmlFor="promise-subscribe-email">
              {HOME.subscribePlaceholder}
            </label>
            <input
              id="promise-subscribe-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={HOME.subscribePlaceholder}
              className="h-12 w-full rounded-full border border-white/35 bg-white/95 px-5 text-[14px] text-neutral-950 outline-none backdrop-blur-sm transition-colors placeholder:text-neutral-700 focus:border-white sm:max-w-[16rem]"
            />
            <button
              type="submit"
              className="type-button btn-pill btn-shine btn-solid shrink-0 !bg-white !text-neutral-950 hover:!opacity-90"
            >
              {HOME.subscribeCta}
            </button>
          </form>
          {sent && (
            <p className="mt-3 text-[12px] text-white/85 sm:text-[13px]">
              Opening your email client to reach {BRAND.email}…
            </p>
          )}
        </div>
      </ScrollExpand>
    </section>
  );
}
