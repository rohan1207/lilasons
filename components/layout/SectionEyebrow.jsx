export default function SectionEyebrow({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="block h-px w-5 shrink-0 bg-[#0a0a0a]" />
      <span className="type-label text-[clamp(9px,0.75vw,11px)] text-[#0a0a0a]">
        {children}
      </span>
    </div>
  );
}
