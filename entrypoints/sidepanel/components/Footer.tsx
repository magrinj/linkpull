import { t } from '@/lib/i18n'

export const Footer = () => (
  <div className="mt-auto px-4 py-3 border-t border-border">
    <p className="text-[10px] text-text-muted text-center mb-1.5">
      {t('footer.tagline', { version: '0.1' })}
    </p>
    <div className="flex items-center justify-center gap-3 text-[10px]">
      <a
        href="https://github.com/magrinj/linkpull"
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-muted hover:text-text-secondary transition-colors"
      >
        {t('footer.openSource')}
      </a>
      <span className="text-text-muted/50">&middot;</span>
      <a
        href="https://buymeacoffee.com/magrinj"
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-muted hover:text-text-secondary transition-colors"
      >
        {t('footer.support')}
      </a>
    </div>
  </div>
)
