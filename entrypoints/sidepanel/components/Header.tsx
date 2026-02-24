import { t } from '@/lib/i18n'
import { IconExtract } from './Icons'

export const Header = () => (
  <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
    <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shadow-sm">
      <IconExtract />
    </div>
    <div className="flex-1">
      <h1 className="text-[15px] font-bold text-text-primary leading-tight tracking-tight">
        {t('header.title')}
      </h1>
    </div>
    <span className="text-[10px] text-text-muted bg-surface border border-border rounded-full px-2 py-0.5">
      v0.1
    </span>
  </div>
)
