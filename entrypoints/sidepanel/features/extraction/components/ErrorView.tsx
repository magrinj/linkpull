import { t } from '@/lib/i18n'
import { IconWarning } from '../../../components/Icons'

interface ErrorViewProps {
  message: string
  onRetry: () => void
}

export const ErrorView = ({ message, onRetry }: ErrorViewProps) => (
  <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 text-center animate-fade-in-up">
    <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mb-3">
      <IconWarning />
    </div>
    <p className="text-sm font-semibold text-error mb-1">{t('error.title')}</p>
    <p className="text-xs text-text-muted mb-5">{message}</p>
    <button
      onClick={onRetry}
      className="py-2.5 px-6 bg-accent hover:bg-accent-hover text-white rounded-xl text-sm font-semibold transition-colors"
    >
      {t('error.retry')}
    </button>
  </div>
)
