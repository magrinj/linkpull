import { t } from '@/lib/i18n'

const REVIEW_URL = `https://chromewebstore.google.com/detail/${browser.runtime.id}/reviews`
const COFFEE_URL = 'https://buymeacoffee.com/magrinj'

interface SupportPromptProps {
  onDismiss: () => void
  onSupported: () => void
}

export const SupportPrompt = ({ onDismiss, onSupported }: SupportPromptProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in-up px-4">
    <div className="w-full max-w-sm bg-surface border border-border rounded-2xl shadow-xl p-5 animate-scale-in">
      <p className="text-lg text-center mb-1">&#x1F389;</p>
      <h3 className="text-sm font-bold text-text-primary text-center mb-2">{t('support.title')}</h3>
      <p className="text-xs text-text-secondary text-center leading-relaxed mb-4">
        {t('support.message')}
      </p>

      <div className="flex flex-col gap-2">
        <a
          href={REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSupported}
          className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-semibold text-center transition-colors flex items-center justify-center gap-2"
        >
          &#x2B50; {t('support.rate')}
        </a>
        <a
          href={COFFEE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSupported}
          className="w-full py-2.5 bg-surface border border-border hover:border-border-hover text-text-primary rounded-xl text-xs font-semibold text-center transition-colors flex items-center justify-center gap-2"
        >
          &#x2615; {t('support.coffee')}
        </a>
        <button
          onClick={onDismiss}
          className="w-full py-2 text-xs text-text-muted hover:text-text-secondary transition-colors"
        >
          {t('support.dismiss')}
        </button>
      </div>
    </div>
  </div>
)
