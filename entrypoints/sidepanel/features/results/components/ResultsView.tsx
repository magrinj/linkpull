import { t } from '@/lib/i18n'
import { useExport } from '../hooks/useExport'
import { useSupportPrompt } from '../hooks/useSupportPrompt'
import { computeResultsAnalytics } from '../utils/analytics'
import { ExportButtons } from './ExportButtons'
import { PostList } from './PostList'
import { ResultsHeader } from './ResultsHeader'
import { StatsGrid } from './StatsGrid'
import { SupportPrompt } from './SupportPrompt'
import type { Settings } from '../../../types'
import type { LinkedInPost, PageContext } from '@/lib/types'

interface ResultsViewProps {
  posts: LinkedInPost[]
  context: PageContext
  settings: Settings
  onNewExtraction: () => void
}

export const ResultsView = ({ posts, context, settings, onNewExtraction }: ResultsViewProps) => {
  const { copied, exportProgress, handleExportCSV, handleExportJSON, handleCopy } =
    useExport(settings)
  const {
    visible: showSupport,
    dismiss: dismissSupport,
    markSupported,
  } = useSupportPrompt(posts.length)
  const analytics = computeResultsAnalytics(posts)
  const needsZIP = settings.jsonFormat === 'per-post' || settings.downloadImages

  return (
    <div className="flex-1 flex flex-col px-4 pb-4 animate-fade-in-up">
      {showSupport && <SupportPrompt onDismiss={dismissSupport} onSupported={markSupported} />}
      <ResultsHeader dateRange={analytics.dateRange} />

      <StatsGrid
        postCount={posts.length}
        isOwnProfile={context.isOwnProfile}
        analytics={analytics}
      />

      <ExportButtons
        posts={posts}
        context={context}
        needsZIP={needsZIP}
        copied={copied}
        exportProgress={exportProgress}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
        onCopy={handleCopy}
      />

      <PostList posts={posts} />

      <button
        onClick={onNewExtraction}
        className="mt-3 w-full py-2.5 bg-surface border border-border rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
      >
        {t('extract.newExtraction')}
      </button>
    </div>
  )
}
