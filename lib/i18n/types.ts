export type Locale = 'en' | 'fr'

export type TranslationDictionary = {
  // Header
  'header.title': string

  // Notice
  'notice.notLinkedin': string
  'notice.wrongPage': string
  'notice.navigateActivity': string

  // Tabs
  'tabs.posts': string
  'tabs.profile': string
  'tabs.comingSoon': string

  // Filters
  'filters.period': string
  'filters.all': string
  'filters.year': string
  'filters.sixMonths': string
  'filters.threeMonths': string
  'filters.custom': string
  'filters.minImpressions': string
  'filters.minReactions': string
  'filters.minComments': string
  'filters.minReposts': string
  'filters.impressionsPlaceholder': string
  'filters.periodHelp': string
  'filters.impressionsHelp': string
  'filters.reactionsHelp': string
  'filters.commentsHelp': string
  'filters.repostsHelp': string
  'filters.engagement': string
  'filters.engagementHelp': string
  'filters.from': string
  'filters.to': string

  // Extract
  'extract.start': string
  'extract.stop': string
  'extract.newExtraction': string

  // Progress
  'progress.scrolling': string
  'progress.extracting': string
  'progress.postsLoaded': string
  'progress.postsExtracted': string
  'progress.tip0': string
  'progress.tip1': string
  'progress.tip2': string
  'progress.tip3': string
  'progress.tip4': string

  // Results
  'results.posts': string
  'results.impressions': string
  'results.reactions': string
  'results.comments': string
  'results.reposts': string
  'results.avgPerPost': string
  'results.morePosts': string
  'results.complete': string

  // Export
  'export.csv': string
  'export.json': string
  'export.copy': string
  'export.copied': string
  'export.options': string
  'export.jsonSingle': string
  'export.jsonPerPost': string
  'export.downloadImages': string
  'export.downloadImagesHelp': string
  'export.optionsHelp': string
  'export.downloading': string

  // Post card
  'postCard.open': string

  // Media badges
  'media.image': string
  'media.video': string
  'media.article': string
  'media.poll': string
  'media.document': string

  // Empty state
  'empty.noPosts': string
  'empty.adjustFilters': string

  // Error
  'error.title': string
  'error.retry': string

  // Support prompt
  'support.title': string
  'support.message': string
  'support.rate': string
  'support.coffee': string
  'support.dismiss': string

  // Footer
  'footer.tagline': string
  'footer.openSource': string
  'footer.support': string
}
