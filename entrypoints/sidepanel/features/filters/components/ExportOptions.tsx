import { t } from '@/lib/i18n'
import { InfoTip } from '../../../components/InfoTip'
import type { Settings } from '../../../types'

interface ExportOptionsProps {
  settings: Settings
  onUpdateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

export const ExportOptions = ({ settings, onUpdateSetting }: ExportOptionsProps) => (
  <div className="py-3 border-t border-border">
    <div className="flex items-center mb-2">
      <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
        {t('export.options')}
      </p>
      <InfoTip text={t('export.optionsHelp')} />
    </div>
    <div className="grid grid-cols-2 gap-1.5 mb-2.5">
      <button
        onClick={() => onUpdateSetting('jsonFormat', 'single')}
        className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${
          settings.jsonFormat === 'single'
            ? 'chip-active'
            : 'bg-surface border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
        }`}
      >
        {t('export.jsonSingle')}
      </button>
      <button
        onClick={() => onUpdateSetting('jsonFormat', 'per-post')}
        className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${
          settings.jsonFormat === 'per-post'
            ? 'chip-active'
            : 'bg-surface border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
        }`}
      >
        {t('export.jsonPerPost')}
      </button>
    </div>
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onUpdateSetting('downloadImages', !settings.downloadImages)}
        className={`w-8 h-[18px] rounded-full relative transition-colors cursor-pointer ${
          settings.downloadImages ? 'bg-accent' : 'bg-border'
        }`}
      >
        <div
          className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform ${
            settings.downloadImages ? 'translate-x-[16px]' : 'translate-x-[2px]'
          }`}
        />
      </div>
      <span className="text-xs text-text-secondary">{t('export.downloadImages')}</span>
      <InfoTip text={t('export.downloadImagesHelp')} />
    </label>
  </div>
)
