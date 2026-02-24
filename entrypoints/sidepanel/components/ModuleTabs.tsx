import { t } from '@/lib/i18n'

export const ModuleTabs = () => (
  <div className="flex gap-1 px-4 pt-3 pb-2">
    <button className="flex-1 py-2 text-sm font-semibold text-accent bg-accent-soft rounded-lg">
      {t('tabs.posts')}
    </button>
    <button
      disabled
      className="flex-1 py-2 text-sm font-medium text-text-muted bg-surface border border-border rounded-lg cursor-not-allowed relative"
    >
      {t('tabs.profile')}
      <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-accent text-white px-1.5 py-0.5 rounded-full font-bold">
        {t('tabs.comingSoon')}
      </span>
    </button>
  </div>
)
