import { t } from '@/lib/i18n'

interface ResultsHeaderProps {
  dateRange: string | null
}

export const ResultsHeader = ({ dateRange }: ResultsHeaderProps) => (
  <div className="flex items-center gap-3 py-4 border-b border-border">
    <div className="w-10 h-10 rounded-full bg-success-soft flex items-center justify-center flex-shrink-0">
      <svg
        className="w-5 h-5 text-success"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <div>
      <p className="text-sm font-bold text-text-primary">{t('results.complete')}</p>
      {dateRange && <p className="text-[11px] text-text-muted">{dateRange}</p>}
    </div>
  </div>
)
