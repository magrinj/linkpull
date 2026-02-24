export const StatCard = ({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) => (
  <div
    className={`bg-surface border rounded-xl p-3 text-center ${highlight ? 'border-accent/25 bg-accent-soft' : 'border-border'}`}
  >
    <p
      className={`font-mono-num text-xl whitespace-nowrap mb-0.5 ${highlight ? 'text-accent' : 'text-text-primary'}`}
    >
      {value}
    </p>
    <p className="text-[10px] text-text-muted uppercase tracking-wider whitespace-nowrap">
      {label}
    </p>
  </div>
)
