import { formatDate } from '../../../utils/format'
import type { LinkedInPost } from '@/lib/types'

export interface ResultsAnalytics {
  totalReactions: number
  totalComments: number
  totalReposts: number
  totalImpressions: number
  avgEngagement: number
  dateRange: string | null
}

export const computeResultsAnalytics = (posts: LinkedInPost[]): ResultsAnalytics => {
  const totalReactions = posts.reduce((s, p) => s + p.reactions, 0)
  const totalComments = posts.reduce((s, p) => s + p.comments, 0)
  const totalReposts = posts.reduce((s, p) => s + p.reposts, 0)
  const totalImpressions = posts.reduce((s, p) => s + (p.impressions || 0), 0)
  const avgEngagement =
    posts.length > 0 ? Math.round((totalReactions + totalComments) / posts.length) : 0
  const dates = posts
    .map((p) => p.parsedDate)
    .filter(Boolean)
    .sort() as string[]
  const dateRange =
    dates.length >= 2
      ? `${formatDate(dates[0])} \u2192 ${formatDate(dates[dates.length - 1])}`
      : dates.length === 1
        ? formatDate(dates[0])
        : null

  return { totalReactions, totalComments, totalReposts, totalImpressions, avgEngagement, dateRange }
}
