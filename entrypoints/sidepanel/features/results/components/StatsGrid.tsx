import { t } from '@/lib/i18n'
import { StatCard } from '../../../components/StatCard'
import { formatNumber } from '../../../utils/format'
import type { ResultsAnalytics } from '../utils/analytics'

interface StatsGridProps {
  postCount: number
  isOwnProfile: boolean
  analytics: ResultsAnalytics
}

export const StatsGrid = ({ postCount, isOwnProfile, analytics }: StatsGridProps) => (
  <div className="grid grid-cols-3 gap-2 py-3">
    <StatCard label={t('results.posts')} value={formatNumber(postCount)} highlight />
    <StatCard
      label={t('results.impressions')}
      value={isOwnProfile ? formatNumber(analytics.totalImpressions) : '\u2013'}
    />
    <StatCard label={t('results.avgPerPost')} value={formatNumber(analytics.avgEngagement)} />
    <StatCard label={t('results.reactions')} value={formatNumber(analytics.totalReactions)} />
    <StatCard label={t('results.comments')} value={formatNumber(analytics.totalComments)} />
    <StatCard label={t('results.reposts')} value={formatNumber(analytics.totalReposts)} />
  </div>
)
