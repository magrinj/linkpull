import { t } from '@/lib/i18n'
import { IconStop } from '../../../components/Icons'
import { Spinner } from '../../../components/Spinner'
import { formatDate } from '../../../utils/format'
import type { ProgressData } from '@/lib/types'

interface ExtractingViewProps {
  progress: ProgressData
  tipIndex: number
  tipKeys: readonly string[]
  onStop: () => void
}

export const ExtractingView = ({ progress, tipIndex, tipKeys, onStop }: ExtractingViewProps) => (
  <div className="flex-1 px-4 pb-4 animate-fade-in-up">
    <div className="py-4">
      <div className="flex items-center gap-2 mb-3">
        <Spinner className="w-4 h-4" />
        <p className="text-sm font-semibold text-text-primary">
          {progress.phase === 'scrolling' ? t('progress.scrolling') : t('progress.extracting')}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted mb-1">
        <span>
          {t('progress.postsLoaded', { count: progress.postsLoaded })}
          {progress.postsExtracted > 0 && (
            <span className="text-accent font-medium">
              {' '}
              · {t('progress.postsExtracted', { count: progress.postsExtracted })}
            </span>
          )}
        </span>
        {progress.lastDate && <span>{formatDate(progress.lastDate)}</span>}
      </div>

      <p key={tipIndex} className="text-[11px] text-text-muted italic animate-fade-in-up">
        {t(tipKeys[tipIndex] as Parameters<typeof t>[0])}
      </p>
    </div>

    <button
      onClick={onStop}
      className="w-full py-3 px-4 bg-error/10 hover:bg-error/20 text-error rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors border border-error/20"
    >
      <IconStop />
      {t('extract.stop')}
    </button>
  </div>
)
