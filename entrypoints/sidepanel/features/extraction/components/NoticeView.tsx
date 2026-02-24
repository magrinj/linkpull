import { t } from '@/lib/i18n'
import { IconWarning } from '../../../components/Icons'

interface NoticeViewProps {
  variant: 'not-linkedin' | 'wrong-page'
  onNavigate?: () => void
}

export const NoticeView = ({ variant, onNavigate }: NoticeViewProps) => (
  <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 text-center animate-fade-in-up">
    <IconWarning />
    <p className="text-sm text-text-secondary leading-snug mt-3 mb-4">
      {variant === 'not-linkedin' ? t('notice.notLinkedin') : t('notice.wrongPage')}
    </p>
    {variant === 'wrong-page' && onNavigate && (
      <button
        onClick={onNavigate}
        className="py-2.5 px-5 bg-accent hover:bg-accent-hover text-white rounded-xl text-sm font-semibold transition-colors"
      >
        {t('notice.navigateActivity')}
      </button>
    )}
  </div>
)
