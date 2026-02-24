import { t } from '@/lib/i18n'
import { InfoTip } from '../../../components/InfoTip'
import type { Settings } from '../../../types'

interface EngagementFiltersProps {
  settings: Settings
  isOwnProfile: boolean
  onUpdateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

export const EngagementFilters = ({
  settings,
  isOwnProfile,
  onUpdateSetting,
}: EngagementFiltersProps) => (
  <div className="py-3 border-t border-border">
    <div className="flex items-center mb-2">
      <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
        {t('filters.engagement')}
      </p>
      <InfoTip text={t('filters.engagementHelp')} />
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="text-[10px] text-text-muted mb-1 block">
          {t('filters.minReactions')}
        </label>
        <input
          type="number"
          min="0"
          value={settings.minReactions || ''}
          onChange={(e) => onUpdateSetting('minReactions', parseInt(e.target.value) || 0)}
          placeholder="0"
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="text-[10px] text-text-muted mb-1 block">{t('filters.minComments')}</label>
        <input
          type="number"
          min="0"
          value={settings.minComments || ''}
          onChange={(e) => onUpdateSetting('minComments', parseInt(e.target.value) || 0)}
          placeholder="0"
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="text-[10px] text-text-muted mb-1 block">{t('filters.minReposts')}</label>
        <input
          type="number"
          min="0"
          value={settings.minReposts || ''}
          onChange={(e) => onUpdateSetting('minReposts', parseInt(e.target.value) || 0)}
          placeholder="0"
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
        />
      </div>
      {isOwnProfile && (
        <div>
          <label className="text-[10px] text-text-muted mb-1 block">
            {t('filters.minImpressions')}
          </label>
          <input
            type="number"
            min="0"
            value={settings.minImpressions || ''}
            onChange={(e) => onUpdateSetting('minImpressions', parseInt(e.target.value) || 0)}
            placeholder="0"
            className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
          />
        </div>
      )}
    </div>
  </div>
)
