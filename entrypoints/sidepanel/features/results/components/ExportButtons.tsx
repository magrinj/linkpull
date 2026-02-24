import { t } from '@/lib/i18n'
import { IconCheck } from '../../../components/Icons'
import { Spinner } from '../../../components/Spinner'
import type { LinkedInPost, PageContext } from '@/lib/types'

interface ExportButtonsProps {
  posts: LinkedInPost[]
  context: PageContext
  needsZIP: boolean
  copied: boolean
  exportProgress: string | null
  onExportCSV: (posts: LinkedInPost[], username: string) => void
  onExportJSON: (posts: LinkedInPost[], context: PageContext) => void
  onCopy: (posts: LinkedInPost[]) => void
}

export const ExportButtons = ({
  posts,
  context,
  needsZIP,
  copied,
  exportProgress,
  onExportCSV,
  onExportJSON,
  onCopy,
}: ExportButtonsProps) => (
  <div className="py-3 border-b border-border">
    {exportProgress && (
      <div className="flex items-center gap-2 mb-2 text-xs text-accent">
        <Spinner className="w-3 h-3" />
        <span>{exportProgress}</span>
      </div>
    )}
    <div className="flex gap-2">
      <button
        onClick={() => onExportCSV(posts, context.username)}
        disabled={!!exportProgress}
        className="flex-1 py-2 bg-surface border border-border rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors disabled:opacity-50"
      >
        {t('export.csv')}
      </button>
      <button
        onClick={() => onExportJSON(posts, context)}
        disabled={!!exportProgress}
        className="flex-1 py-2 bg-surface border border-border rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors disabled:opacity-50"
      >
        {needsZIP ? 'JSON (ZIP)' : t('export.json')}
      </button>
      <button
        onClick={() => onCopy(posts)}
        disabled={!!exportProgress}
        className="flex-1 py-2 bg-surface border border-border rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
      >
        {copied ? (
          <>
            <IconCheck /> {t('export.copied')}
          </>
        ) : (
          t('export.copy')
        )}
      </button>
    </div>
  </div>
)
