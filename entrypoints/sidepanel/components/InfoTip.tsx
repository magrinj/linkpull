export const InfoTip = ({ text }: { text: string }) => (
  <span className="group relative inline-flex ml-1">
    <span className="w-3.5 h-3.5 rounded-full bg-border text-text-muted text-[9px] font-bold inline-flex items-center justify-center cursor-help group-hover:bg-border-hover group-hover:text-text-secondary transition-colors">
      i
    </span>
    <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-surface-alt border border-border rounded-lg text-[11px] text-text-secondary whitespace-nowrap shadow-lg z-50 pointer-events-none transition-opacity">
      {text}
    </span>
  </span>
)
