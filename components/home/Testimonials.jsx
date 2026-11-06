import { TESTIMONIALS } from "@/lib/testimonials";

function initials(name) {
  const words = name.split(" ").filter(Boolean);
  return (words[0][0] + (words[1]?.[0] || "")).toUpperCase();
}

function Card({ item, compact = false }) {
  return (
    <article
      className={`flex shrink-0 flex-col rounded-2xl border border-[#e7dfd2] bg-white ${
        compact ? "w-[280px] p-4 sm:w-[300px]" : "w-full p-5"
      }`}
    >
      <p
        className={`type-body text-neutral-700 ${
          compact ? "text-[13px] leading-relaxed" : "text-[14px] leading-relaxed"
        }`}
      >
        “{item.quote}”
      </p>
      <div className="mt-4 flex items-center gap-3 border-t border-[#efe8dc] pt-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c59d5f] text-[12px] font-semibold tracking-wide text-[#0a0a0a]">
          {initials(item.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold tracking-[-0.01em] text-neutral-950">
            {item.name}
          </p>
          <p className="type-label mt-0.5 truncate text-[10px] text-[#8a6a3a]">
            {item.role}
          </p>
        </div>
      </div>
    </article>
  );
}

function Loop({ items, compact, className, axis }) {
  const group =
    axis === "x"
      ? "flex w-max shrink-0 items-stretch gap-3 pr-3"
      : "flex w-full shrink-0 flex-col gap-4 pb-4";

  return (
    <div className={className}>
      <div className={group}>
        {items.map((item) => (
          <Card key={item.id} item={item} compact={compact} />
        ))}
      </div>
      <div className={group} aria-hidden>
        {items.map((item) => (
          <Card key={`${item.id}-loop`} item={item} compact={compact} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const mid = Math.ceil(TESTIMONIALS.length / 2);
  const first = TESTIMONIALS.slice(0, mid);
  const second = TESTIMONIALS.slice(mid);

  return (
    <section
      id="testimonials"
      className="relative z-10 overflow-hidden border-t border-[#e4dccf] bg-[#f6f3ee]"
      aria-label="Testimonials"
    >
      <div className="mx-auto grid max-w-[1500px] items-start gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14 lg:px-12 lg:py-20">
        <div className="max-w-md">
          <p className="type-label text-[11px] text-[#8a6a3a] sm:text-[12px]">
            — From the city
          </p>
          <h2 className="type-heading mt-2 text-[clamp(2rem,4vw,3.4rem)] text-neutral-950">
            Heard around Aurangabad
          </h2>
          <p className="type-body mt-4 text-[14px] text-neutral-700 sm:text-[15px]">
            Shop owners on Station Road, families in Golwadi and Itkheda, and
            plot buyers out at Patoda — notes from people who have already
            sat across the table.
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-3 md:hidden">
            <div className="testimonial-mask-x overflow-hidden">
              <Loop
                items={first}
                compact
                axis="x"
                className="testimonial-x-ltr flex w-max"
              />
            </div>
            <div className="testimonial-mask-x overflow-hidden">
              <Loop
                items={second}
                compact
                axis="x"
                className="testimonial-x-rtl flex w-max"
              />
            </div>
          </div>

          <div className="hidden h-[34rem] grid-cols-2 gap-4 md:grid lg:h-[36rem]">
            <div className="testimonial-mask-y overflow-hidden">
              <Loop
                items={first}
                axis="y"
                className="testimonial-y-down flex flex-col"
              />
            </div>
            <div className="testimonial-mask-y overflow-hidden">
              <Loop
                items={second}
                axis="y"
                className="testimonial-y-up flex flex-col"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
