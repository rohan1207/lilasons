"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { BLOGS, BLOGS_PAGE } from "@/lib/blogs";

const ease = [0.22, 1, 0.36, 1];

function FadeUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function BlogsIndex() {
  return (
    <PageShell>
      <section className="border-b border-neutral-200/80 bg-[#f4f4f2] pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1500px] px-5 pb-12 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
          <FadeUp>
            <p className="type-label mb-2 text-[11px] sm:mb-3 sm:text-[12px]">
              {BLOGS_PAGE.eyebrow}
            </p>
            <p className="type-kicker mb-3 text-[12px] sm:text-[13px]">
              {BLOGS_PAGE.kicker}
            </p>
            <h1 className="type-heading text-[clamp(2.25rem,6vw,4.5rem)] text-neutral-950">
              {BLOGS_PAGE.title}
            </h1>
            <p className="type-body mt-4 max-w-[48ch] text-[14px] sm:mt-5 sm:text-[16px]">
              {BLOGS_PAGE.body}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#f7f7f7]">
        <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-6">
            {BLOGS.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-neutral-200 bg-white shadow-[0_16px_36px_-28px_rgba(0,0,0,0.35)] transition-shadow hover:shadow-[0_22px_44px_-26px_rgba(0,0,0,0.4)] sm:rounded-[1.25rem]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      draggable={false}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-5">
                    <p className="type-label text-[8px] text-neutral-700 sm:text-[10px]">
                      {post.category} · {post.readTime}
                    </p>
                    <h2 className="type-heading mt-1.5 text-[13px] leading-[1.2] text-neutral-950 sm:mt-2 sm:text-[16px] lg:text-[17px]">
                      {post.title}
                    </h2>
                    <p className="type-body mt-1.5 line-clamp-2 flex-1 text-[11px] sm:mt-2 sm:line-clamp-3 sm:text-[13px]">
                      {post.excerpt}
                    </p>
                    <p className="type-label mt-3 text-[8px] text-neutral-700 sm:mt-4 sm:text-[9px]">
                      {post.dateLabel}
                    </p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
