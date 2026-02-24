import type { TranslationDictionary } from './types'

export const en: TranslationDictionary = {
  'header.title': 'LinkPull',

  'notice.notLinkedin': 'Open LinkedIn to use LinkPull.',
  'notice.wrongPage': 'Navigate to a profile\'s "Activity" page to extract posts.',
  'notice.navigateActivity': 'Go to Activity page',

  'tabs.posts': 'Posts',
  'tabs.profile': 'Profile',
  'tabs.comingSoon': 'Soon',

  'filters.period': 'Period',
  'filters.all': 'All',
  'filters.year': 'Year',
  'filters.sixMonths': '6 mo',
  'filters.threeMonths': '3 mo',
  'filters.custom': 'Custom',
  'filters.minImpressions': 'Min. impressions',
  'filters.minReactions': 'Min. reactions',
  'filters.minComments': 'Min. comments',
  'filters.minReposts': 'Min. reposts',
  'filters.impressionsPlaceholder': '0',
  'filters.periodHelp': 'Filter posts by date range',
  'filters.impressionsHelp': 'Only show posts with at least this many views',
  'filters.reactionsHelp': 'Only show posts with at least this many reactions',
  'filters.commentsHelp': 'Only show posts with at least this many comments',
  'filters.repostsHelp': 'Only show posts with at least this many reposts',
  'filters.engagement': 'Minimum engagement',
  'filters.engagementHelp': 'Filter posts by engagement threshold',
  'filters.from': 'From',
  'filters.to': 'To',

  'extract.start': 'Extract posts',
  'extract.stop': 'Stop extraction',
  'extract.newExtraction': 'New extraction',

  'progress.scrolling': 'Loading posts...',
  'progress.extracting': 'Extracting data...',
  'progress.postsLoaded': '{count} posts loaded',
  'progress.postsExtracted': '{count} extracted',
  'progress.tip0': 'Scanning the feed...',
  'progress.tip1': 'Discovering new posts...',
  'progress.tip2': 'Scrolling through the timeline...',
  'progress.tip3': 'Collecting post data...',
  'progress.tip4': 'Almost there, hang tight...',

  'results.posts': 'Posts',
  'results.impressions': 'Impressions',
  'results.reactions': 'Reactions',
  'results.comments': 'Comments',
  'results.reposts': 'Reposts',
  'results.avgPerPost': 'Avg/post',
  'results.morePosts': '+{count} more posts',
  'results.complete': 'Extraction complete',

  'export.csv': 'CSV',
  'export.json': 'JSON',
  'export.copy': 'Copy',
  'export.copied': 'Copied!',
  'export.options': 'Export options',
  'export.jsonSingle': 'Single file',
  'export.jsonPerPost': 'One per post',
  'export.downloadImages': 'Download images',
  'export.downloadImagesHelp': 'Download post images into the ZIP archive',
  'export.optionsHelp': 'Configure JSON format and image export',
  'export.downloading': 'Downloading images {current}/{total}...',

  'postCard.open': 'Open',

  'media.image': 'IMG',
  'media.video': 'VID',
  'media.article': 'ART',
  'media.poll': 'POLL',
  'media.document': 'DOC',

  'empty.noPosts': 'No posts found',
  'empty.adjustFilters': 'Try adjusting your filters.',

  'error.title': 'Extraction failed',
  'error.retry': 'Retry',

  'support.title': 'Enjoying LinkPull?',
  'support.message':
    'LinkPull is free and open source. If you find it useful, help us maintain it and spread the word!',
  'support.rate': 'Rate on Chrome Store',
  'support.coffee': 'Buy me a coffee',
  'support.dismiss': 'Maybe later',

  'footer.tagline': 'LinkPull v{version} \u00B7 Privacy-first, no server',
  'footer.openSource': 'Open source',
  'footer.support': 'Buy me a coffee',
}
