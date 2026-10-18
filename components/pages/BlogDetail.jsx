"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { getAdjacentBlogs, getRelatedBlogs } from "@/lib/blogs";

const ease = [0.22, 1, 0.36, 1];

export default function BlogDetail({ post }) {
  const { prev, next } = getAdjacentBlogs(post.slug);
  const related = getRelatedBlogs(post.slug, 3);

  return (
    <PageShell>
      <article>
        <header className="border-b border-neutral-200/80 bg-[#f4f4f2] pt-28 sm:pt-32">
          <div className="mx-auto max-w-[900px] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-10 lg:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
            >
              <Link
                href="/blogs"
                className="type-label text-[11px] text-neutral-500 transition-colors hover:text-neutral-950"
              >
                ← All blogs
              </Link>
              <p className="type-label mt-6 text-[11px] sm:text-[12px]">
                {post.category} · {post.readTime}
              </p>
              <h1 className="type-heading mt-3 text-[clamp(1.75rem,4.5vw,3rem)] text-neutral-950">
                {post.title}
              </h1>
              <p className="type-body mt-4 max-w-[52ch] text-[15px] sm:text-[16px]">
                {post.excerpt}
              </p>
              <p className="type-label mt-5 text-[10px] text-neutral-400">
                {post.author} · {post.dateLabel}
              </p>
            </motion.div>
          </div>
        </header>

        <div className="bg-white">
          <div className="mx-auto max-w-[900px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="overflow-hidden rounded-[1.25rem] bg-neutral-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.imageAlt}
                className="aspect-[16/9] w-full object-cover"
                draggable={false}
              />
            </motion.div>

            <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="type-heading text-[20px] text-neutral-950 sm:text-[24px]">
                    {section.heading}
                  </h2>
                  <p className="type-body mt-3 text-[15px] leading-[1.75] sm:text-[16px]">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-neutral-200 pt-8 sm:mt-14">
              <Link href="/contact" className="type-button btn-pill btn-shine btn-solid">
                Talk to us
              </Link>
              <Link href="/projects" className="type-button btn-pill btn-shine btn-outline">
                View projects
              </Link>
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <nav
          aria-label="Adjacent articles"
          className="border-t border-neutral-200 bg-[#f7f7f7]"
        >
          <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-px bg-neutral-200 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blogs/${prev.slug}`}
                className="bg-[#f7f7f7] px-5 py-8 transition-colors hover:bg-white sm:px-8"
              >
                <p className="type-label text-[10px] text-neutral-400">Previous</p>
                <p className="type-heading mt-2 text-[16px] text-neutral-950 sm:text-[18px]">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div className="bg-[#f7f7f7] px-5 py-8 sm:px-8" />
            )}
            {next ? (
              <Link
                href={`/blogs/${next.slug}`}
                className="bg-[#f7f7f7] px-5 py-8 text-left transition-colors hover:bg-white sm:px-8 sm:text-right"
              >
                <p className="type-label text-[10px] text-neutral-400">Next</p>
                <p className="type-heading mt-2 text-[16px] text-neutral-950 sm:text-[18px]">
                  {next.title}
                </p>
              </Link>
            ) : (
              <div className="bg-[#f7f7f7] px-5 py-8 sm:px-8" />
            )}
          </div>
        </nav>

        {/* Recommended */}
        {related.length > 0 && (
          <section className="border-t border-neutral-200 bg-white">
            <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
              <p className="type-label mb-2 text-[11px] sm:text-[12px]">
                — Keep reading
              </p>
              <h2 className="type-heading text-[clamp(1.5rem,3vw,2.25rem)] text-neutral-950">
                Recommended reading
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blogs/${item.slug}`}
                    className="group overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-[#f7f7f7]"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5">
                      <p className="type-label text-[9px] text-neutral-400">
                        {item.category}
                      </p>
                      <h3 className="type-heading mt-2 text-[16px] text-neutral-950 sm:text-[17px]">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </PageShell>
  );
}
