import { SELECTORS } from './selectors'
import type { ExtractionOptions, LinkedInPost, ProgressData } from './types'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const parseNumber = (text: string): number => {
  const cleaned = text.replace(/[^\d]/g, '')
  return parseInt(cleaned, 10) || 0
}

const safeQuery = (parent: Element, ...selectors: string[]): Element | null => {
  for (const selector of selectors) {
    const el = parent.querySelector(selector)
    if (el) return el
  }
  return null
}

/**
 * Find the DIRECT author link of a post (not from a nested/reshared post).
 */
const findDirectAuthorLink = (post: Element): HTMLAnchorElement | null => {
  const links = post.querySelectorAll(`${SELECTORS.AUTHOR_META_LINK}`)
  for (const link of Array.from(links)) {
    const closestPost = link.closest('div.feed-shared-update-v2[data-urn]')
    if (closestPost === post) return link as HTMLAnchorElement
  }

  const fallbackLinks = post.querySelectorAll('.update-components-actor a[href*="/in/"]')
  for (const link of Array.from(fallbackLinks)) {
    const closestPost = link.closest('div.feed-shared-update-v2[data-urn]')
    if (closestPost === post) return link as HTMLAnchorElement
  }

  return null
}

/**
 * Parse LinkedIn's relative time labels into ISO dates.
 */
const parseRelativeDate = (label: string): string | null => {
  const now = new Date()
  const lower = label.toLowerCase().trim()
  const match = lower.match(/(\d+)\s*(h|j|d|sem|w|mois|mo|an|a|y|min|m)/)
  if (!match) return null

  const num = parseInt(match[1], 10)
  const unit = match[2]

  switch (unit) {
    case 'min':
    case 'm':
      now.setMinutes(now.getMinutes() - num)
      break
    case 'h':
      now.setHours(now.getHours() - num)
      break
    case 'j':
    case 'd':
      now.setDate(now.getDate() - num)
      break
    case 'sem':
    case 'w':
      now.setDate(now.getDate() - num * 7)
      break
    case 'mois':
    case 'mo':
      now.setMonth(now.getMonth() - num)
      break
    case 'an':
    case 'a':
    case 'y':
      now.setFullYear(now.getFullYear() - num)
      break
    default:
      return null
  }

  return now.toISOString().split('T')[0]
}

/**
 * Extract data from a single post element.
 */
const extractPost = (post: Element): LinkedInPost => {
  const urn = post.getAttribute(SELECTORS.POST_URN) || null
  const postUrl = urn ? `https://www.linkedin.com/feed/update/${urn}/` : null

  const authorLink = findDirectAuthorLink(post)
  const authorUrl = authorLink ? authorLink.href.split('?')[0] : ''
  const authorNameEl = post.querySelector(SELECTORS.AUTHOR_NAME)
  const authorName = authorNameEl?.textContent?.trim() || ''

  const subDesc = post.querySelector(SELECTORS.AUTHOR_SUB_DESCRIPTION)?.textContent?.trim() || ''
  const timeLabel = subDesc.split('\u2022')[0]?.trim() || ''
  const parsedDate = parseRelativeDate(timeLabel)

  const textContainer =
    post.querySelector('.update-components-text .break-words span[dir="ltr"]') ||
    post.querySelector(SELECTORS.POST_TEXT_SPAN)
  let text = ''
  if (textContainer) {
    const clone = textContainer.cloneNode(true) as HTMLElement
    clone.querySelectorAll('br').forEach((br) => br.replaceWith('\n'))
    text = clone.textContent?.trim() || ''
  }

  const reactEl = safeQuery(post, SELECTORS.REACTIONS_COUNT, SELECTORS.REACTIONS_ARIA)
  const reactionsText = reactEl?.textContent || reactEl?.getAttribute('aria-label') || ''
  const reactions = parseNumber(reactionsText)

  const commentsEl = safeQuery(post, SELECTORS.COMMENTS_COUNT, SELECTORS.COMMENTS_ARIA)
  const commentsText = commentsEl?.textContent || commentsEl?.getAttribute('aria-label') || ''
  const comments = parseNumber(commentsText)

  const repostsEl = safeQuery(post, SELECTORS.REPOSTS_COUNT, SELECTORS.REPOSTS_ARIA)
  const repostsText = repostsEl?.textContent || repostsEl?.getAttribute('aria-label') || ''
  const reposts = parseNumber(repostsText)

  const impressionsEl = post.querySelector(SELECTORS.IMPRESSIONS_COUNT)
  const impressions = impressionsEl ? parseNumber(impressionsEl.textContent || '') : null

  const imageEls = post.querySelectorAll(`${SELECTORS.IMAGE_SINGLE}`)
  const images = Array.from(imageEls)
    .map((img) => (img as HTMLImageElement).src)
    .filter((src) => src && !src.startsWith('data:'))

  const hasImage = images.length > 0
  const hasVideo = !!post.querySelector(SELECTORS.VIDEO_CONTAINER)
  const hasDocument = !!post.querySelector(SELECTORS.DOCUMENT_CONTAINER)
  const hasArticle = !!post.querySelector(SELECTORS.ARTICLE_CONTAINER)
  const hasPoll = !!post.querySelector(SELECTORS.POLL_CONTAINER)

  return {
    urn,
    postUrl,
    authorName,
    authorUrl,
    timeLabel,
    parsedDate,
    text,
    reactions,
    comments,
    reposts,
    impressions,
    images,
    hasImage,
    hasVideo,
    hasDocument,
    hasArticle,
    hasPoll,
  }
}

/**
 * Try clicking a "load more" button.
 */
const tryClickLoadMore = (): boolean => {
  const buttons = document.querySelectorAll('button')
  for (const btn of buttons) {
    const text = btn.textContent?.trim() || ''
    if (
      text.startsWith('Afficher plus') ||
      text.startsWith('Show more') ||
      text.startsWith('Charger plus') ||
      text.startsWith('Load more')
    ) {
      btn.click()
      return true
    }
  }
  return false
}

/**
 * Count total feed items (including occluded ones) for progress reporting.
 * Falls back to POST_CONTAINER count if the creator-specific FEED_ITEM
 * selector doesn't match (e.g. on other people's profiles).
 */
const countFeedItems = (): number => {
  const creatorCount = document.querySelectorAll(SELECTORS.FEED_ITEM).length
  if (creatorCount > 0) return creatorCount
  return document.querySelectorAll(SELECTORS.POST_CONTAINER).length
}

/**
 * Extract currently visible (non-occluded) posts from the DOM.
 * Returns only posts not already in `seenUrns`.
 * Sets `pastDateLimit` to true if a post older than dateFilterStart is found.
 */
interface ExtractionBatch {
  posts: LinkedInPost[]
  pastDateLimit: boolean
}

const extractVisiblePosts = (
  options: ExtractionOptions,
  seenUrns: Set<string>,
): ExtractionBatch => {
  const newPosts: LinkedInPost[] = []
  let pastDateLimit = false
  const postEls = document.querySelectorAll(SELECTORS.POST_CONTAINER)

  for (const postEl of Array.from(postEls)) {
    const urn = postEl.getAttribute(SELECTORS.POST_URN) || ''
    if (!urn || seenUrns.has(urn)) continue

    seenUrns.add(urn)
    const post = extractPost(postEl)

    if (options.dateFilterStart && post.parsedDate && post.parsedDate < options.dateFilterStart) {
      pastDateLimit = true
      continue
    }
    if (options.dateFilterEnd && post.parsedDate && post.parsedDate > options.dateFilterEnd)
      continue

    if (options.minImpressions !== null && options.minImpressions > 0) {
      if (post.impressions === null || post.impressions < options.minImpressions) continue
    }

    if (options.minReactions !== null && options.minReactions > 0) {
      if (post.reactions < options.minReactions) continue
    }

    if (options.minComments !== null && options.minComments > 0) {
      if (post.comments < options.minComments) continue
    }

    if (options.minReposts !== null && options.minReposts > 0) {
      if (post.reposts < options.minReposts) continue
    }

    newPosts.push(post)
  }

  return { posts: newPosts, pastDateLimit }
}

/**
 * Quick date check on visible posts — no full extraction, just peek at
 * time labels to detect if we've scrolled past the date filter.
 * Returns true if any visible post is older than `dateStart`.
 */
const hasPastDateLimit = (dateStart: string): boolean => {
  const postEls = document.querySelectorAll(SELECTORS.POST_CONTAINER)
  for (const postEl of Array.from(postEls)) {
    const subDesc =
      postEl.querySelector(SELECTORS.AUTHOR_SUB_DESCRIPTION)?.textContent?.trim() || ''
    const timeLabel = subDesc.split('\u2022')[0]?.trim() || ''
    const parsed = parseRelativeDate(timeLabel)
    if (parsed && parsed < dateStart) return true
  }
  return false
}

/**
 * Two-pass extraction strategy:
 *
 * Pass 1 ("preload"): Scroll fast to the bottom to force LinkedIn to fetch
 *   all post data into its JS cache. No extraction happens here.
 *
 * Pass 2 ("extract"): Scroll back to top, then scroll down at full viewport
 *   speed extracting posts. Since LinkedIn cached the data in pass 1,
 *   posts re-render instantly — no need for slow overlap.
 */
export const extractPosts = async (
  _profileUsername: string,
  options: ExtractionOptions,
  onProgress: (data: ProgressData) => void,
): Promise<LinkedInPost[]> => {
  let cancelled = false
  const cancel = () => {
    cancelled = true
  }
  const isCancelled = () => cancelled

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).__linkpull_cancel = cancel

  try {
    const posts: LinkedInPost[] = []
    const seenUrns = new Set<string>()

    /** Push batch results and return true if we should stop scrolling. */
    const collect = (batch: ExtractionBatch): boolean => {
      posts.push(...batch.posts)
      return batch.pastDateLimit
    }

    // ── Pass 1: fast preload scroll ──────────────────────────────
    // Scroll quickly to force LinkedIn to load all post data into cache.
    window.scrollTo(0, 0)
    await wait(600)

    onProgress({
      phase: 'scrolling',
      postsLoaded: 0,
      postsExtracted: 0,
      lastDate: null,
    })

    let preloadStagnation = 0
    let lastPreloadHeight = 0
    let preloadStep = 0

    while (!isCancelled()) {
      window.scrollBy(0, window.innerHeight * 2)
      preloadStep++

      // Every 10 steps, pause briefly to let LinkedIn render content for date check
      const hasDateFilter = !!options.dateFilterStart
      const isCheckpoint = hasDateFilter && preloadStep % 10 === 0
      await wait(isCheckpoint ? 600 : 200)

      if (isCancelled()) break

      tryClickLoadMore()

      const feedCount = countFeedItems()
      onProgress({
        phase: 'scrolling',
        postsLoaded: feedCount,
        postsExtracted: 0,
        lastDate: null,
      })

      // At checkpoints, test if visible posts are past the date filter
      if (isCheckpoint && hasPastDateLimit(options.dateFilterStart!)) break

      const currentHeight = document.body.scrollHeight
      if (currentHeight > lastPreloadHeight) {
        lastPreloadHeight = currentHeight
        preloadStagnation = 0
      } else {
        preloadStagnation++
      }

      const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 100
      if (atBottom && preloadStagnation >= 3) break
      if (preloadStagnation >= 8) break
    }

    if (isCancelled()) return []

    // ── Pass 2: extract from cached data ─────────────────────────
    window.scrollTo(0, 0)
    await wait(600)

    // Extract posts visible at the top (usually a big batch from cache)
    if (collect(extractVisiblePosts(options, seenUrns))) {
      // Already past date limit from the very first screen
    } else {
      let atBottomCount = 0

      while (!isCancelled()) {
        // Full viewport scroll — posts render instantly from cache
        window.scrollBy(0, window.innerHeight)
        await wait(500)

        if (isCancelled()) break

        if (collect(extractVisiblePosts(options, seenUrns))) break

        onProgress({
          phase: 'extracting',
          postsLoaded: countFeedItems(),
          postsExtracted: posts.length,
          lastDate: posts.at(-1)?.parsedDate || null,
        })

        // Only stop on bottom detection — no stagnation cutoff in pass 2
        // since many posts are already captured from the initial batch
        const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 100

        if (atBottom) {
          atBottomCount++
          if (atBottomCount === 1 && tryClickLoadMore()) {
            await wait(2000)
            if (collect(extractVisiblePosts(options, seenUrns))) break
            continue
          }
          if (atBottomCount >= 2) break
        }
      }
    } // end if (not past date limit from first screen)

    if (cancelled) return []

    // Final extraction pass
    collect(extractVisiblePosts(options, seenUrns))

    console.log(`[LinkPull] Extraction complete:
  Feed items (total): ${countFeedItems()}
  Unique URNs seen: ${seenUrns.size}
  Posts extracted: ${posts.length}`)

    onProgress({
      phase: 'complete',
      postsLoaded: countFeedItems(),
      postsExtracted: posts.length,
      lastDate: posts.at(-1)?.parsedDate || null,
    })

    return posts
  } finally {
    delete (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__linkpull_cancel
    )
  }
}
