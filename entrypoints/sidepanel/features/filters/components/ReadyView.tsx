import { t } from '@/lib/i18n'
import { IconExtract } from '../../../components/Icons'
import { EngagementFilters } from './EngagementFilters'
import { ExportOptions } from './ExportOptions'
import { LatestPostPreview } from './LatestPostPreview'
import { PeriodFilter } from './PeriodFilter'
import type { Settings } from '../../../types'
import type { PageContext } from '@/lib/types'

interface ReadyViewProps {
  context: PageContext
  settings: Settings
  onUpdateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  onCustomDateStart: (v: string) => void
  onCustomDateEnd: (v: string) => void
  onExtract: () => void
}

export const ReadyView = ({
  context,
  settings,
  onUpdateSetting,
  onCustomDateStart,
  onCustomDateEnd,
  onExtract,
}: ReadyViewProps) => (
  <div className="flex-1 px-4 pb-4 animate-fade-in-up">
    {context.latestPostPreview && <LatestPostPreview preview={context.latestPostPreview} />}

    <PeriodFilter
      settings={settings}
      onUpdateSetting={onUpdateSetting}
      onCustomDateStart={onCustomDateStart}
      onCustomDateEnd={onCustomDateEnd}
    />

    <EngagementFilters
      settings={settings}
      isOwnProfile={context.isOwnProfile}
      onUpdateSetting={onUpdateSetting}
    />

    <ExportOptions settings={settings} onUpdateSetting={onUpdateSetting} />

    <button
      onClick={onExtract}
      className="w-full mt-3 py-3 px-4 bg-accent hover:bg-accent-hover text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
    >
      <IconExtract />
      {t('extract.start')}
    </button>
  </div>
)
