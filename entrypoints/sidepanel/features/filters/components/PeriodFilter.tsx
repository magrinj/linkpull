import { t } from '@/lib/i18n'
import { InfoTip } from '../../../components/InfoTip'
import { todayISO } from '../../../utils/format'
import { DatePicker } from './DatePicker'
import type { Settings } from '../../../types'

const periodPresets = [
  { id: 'all', label: t('filters.all') },
  { id: 'year', label: t('filters.year') },
  { id: '6m', label: t('filters.sixMonths') },
  { id: '3m', label: t('filters.threeMonths') },
  { id: 'custom', label: t('filters.custom') },
]

interface PeriodFilterProps {
  settings: Settings
  onUpdateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  onCustomDateStart: (v: string) => void
  onCustomDateEnd: (v: string) => void
}

export const PeriodFilter = ({
  settings,
  onUpdateSetting,
  onCustomDateStart,
  onCustomDateEnd,
}: PeriodFilterProps) => (
  <div className="py-3 border-t border-border">
    <div className="flex items-center mb-2">
      <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
        {t('filters.period')}
      </p>
      <InfoTip text={t('filters.periodHelp')} />
    </div>
    <div className="grid grid-cols-5 gap-1.5">
      {periodPresets.map((p) => (
        <button
          key={p.id}
          onClick={() => onUpdateSetting('periodPreset', p.id)}
          className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${
            settings.periodPreset === p.id
              ? 'chip-active'
              : 'bg-surface border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
    {settings.periodPreset === 'custom' && (
      <div className="flex gap-2 mt-2">
        <div className="flex-1">
          <p className="text-[10px] text-text-muted mb-1">{t('filters.from')}</p>
          <DatePicker
            value={settings.customDateStart}
            onChange={onCustomDateStart}
            placeholder={t('filters.from')}
          />
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-text-muted mb-1">{t('filters.to')}</p>
          <DatePicker
            value={settings.customDateEnd || todayISO()}
            onChange={onCustomDateEnd}
            placeholder={t('filters.to')}
            align="right"
          />
        </div>
      </div>
    )}
  </div>
)
