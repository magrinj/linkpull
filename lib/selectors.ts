export const SELECTORS = {
  // Post container — only matches rendered (non-occluded) posts
  POST_CONTAINER: 'div.feed-shared-update-v2[data-urn]',
  POST_URN: 'data-urn',

  // Feed item — stable anchor present in BOTH rendered and occluded posts.
  // Used for stagnation detection (counts all items, not just rendered ones).
  FEED_ITEM: '.profile-creator-shared-feed-update__anchor',

  // Author info
  AUTHOR_META_LINK: 'a.update-components-actor__meta-link',
  AUTHOR_NAME: '.update-components-actor__title span[dir="ltr"] span[aria-hidden="true"]',
  AUTHOR_SUB_DESCRIPTION: '.update-components-actor__sub-description span[aria-hidden="true"]',

  // Post text content
  POST_TEXT_SPAN: '.update-components-text span[dir="ltr"]',

  // Social counts — primary selectors (PRD)
  REACTIONS_COUNT: '.social-details-social-counts__social-proof-fallback-number',
  COMMENTS_COUNT: '.social-details-social-counts__comments button span[aria-hidden="true"]',
  REPOSTS_COUNT: '.social-details-social-counts__reposts button span[aria-hidden="true"]',

  // Social counts — fallback (aria-label based, multilingual)
  REACTIONS_ARIA: 'button[aria-label*="réaction"], button[aria-label*="reaction"]',
  COMMENTS_ARIA: 'button[aria-label*="commentaire"], button[aria-label*="comment"]',
  REPOSTS_ARIA: 'button[aria-label*="republication"], button[aria-label*="repost"]',

  // Media
  IMAGE_CONTAINER: '.update-components-image',
  IMAGE_SINGLE: '.update-components-image img',
  VIDEO_CONTAINER: '.update-components-linkedin-video',
  DOCUMENT_CONTAINER: '.update-components-document__container',
  ARTICLE_CONTAINER: 'article.update-components-article',
  POLL_CONTAINER: '.update-components-poll',

  // Impressions (own profile only)
  IMPRESSIONS_CONTAINER: '.content-analytics-entry-point',
  IMPRESSIONS_COUNT: '.ca-entry-point__num-views strong',
  ANALYTICS_LINK: '.analytics-entry-point a[href]',

  // LinkedIn counter
  LINKEDIN_COUNTER: '.scaffold-finite-scroll__content > .visually-hidden[aria-live="polite"]',
} as const
