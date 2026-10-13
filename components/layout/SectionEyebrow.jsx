export default function SectionEyebrow({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="block h-px w-5 shrink-0 bg-[#0a0a0a]" />
      <span className="text-[clamp(9px,0.75vw,11px)] font-semibold uppercase tracking-[0.28em] text-[#0a0a0a]">
        {children}
      </span>
    </div>
  );
}
