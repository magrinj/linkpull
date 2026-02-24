import { SELECTORS } from './selectors'
import type { PageContext, PostPreview } from './types'

/**
 * Detect if the current page is the logged-in user's own profile.
 * The `.content-analytics-entry-point` element (impressions) only appears on own posts.
 */
const checkIsOwnProfile = (): boolean => {
  return document.querySelectorAll(SELECTORS.IMPRESSIONS_CONTAINER).length > 0
}

/**
 * Extract the activity type from URL (e.g. "all", "articles", etc.)
 */
const getActivityType = (url: string): string => {
  const match = url.match(/recent-activity\/([^/?#]+)/)
  return match?.[1] || 'all'
}

const parseNumber = (text: string): number => {
  return parseInt(text.replace(/[^\d]/g, ''), 10) || 0
}

/**
 * Extract a preview of the latest post by the profile owner.
 */
const extractLatestPreview = (posts: NodeListOf<Element>, username: string): PostPreview | null => {
  for (const post of Array.from(posts)) {
    const authorLink = post.querySelector(SELECTORS.AUTHOR_META_LINK) as HTMLAnchorElement | null
    if (!authorLink) continue
    if (!authorLink.href.toLowerCase().includes(`/in/${username.toLowerCase()}`)) continue

    // Text
    const textEl =
      post.querySelector('.update-components-text .break-words span[dir="ltr"]') ||
      post.querySelector(SELECTORS.POST_TEXT_SPAN)
    const text = textEl?.textContent?.trim() || ''

    // Date
    const subDesc = post.querySelector(SELECTORS.AUTHOR_SUB_DESCRIPTION)?.textContent?.trim() || ''
    const timeLabel = subDesc.split('\u2022')[0]?.trim() || ''
    let parsedDate: string | null = null
    const match = timeLabel.toLowerCase().match(/(\d+)\s*(h|j|d|sem|w|mois|mo|an|a|y|min|m)/)
    if (match) {
      const now = new Date()
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
      }
      parsedDate = now.toISOString().split('T')[0]
    }

    // Stats
    const reactEl =
      post.querySelector(SELECTORS.REACTIONS_COUNT) || post.querySelector(SELECTORS.REACTIONS_ARIA)
    const reactions = parseNumber(reactEl?.textContent || reactEl?.getAttribute('aria-label') || '')

    const commentsEl =
      post.querySelector(SELECTORS.COMMENTS_COUNT) || post.querySelector(SELECTORS.COMMENTS_ARIA)
    const comments = parseNumber(
      commentsEl?.textContent || commentsEl?.getAttribute('aria-label') || '',
    )

    const impressionsEl = post.querySelector(SELECTORS.IMPRESSIONS_COUNT)
    const impressions = impressionsEl ? parseNumber(impressionsEl.textContent || '') : null

    // First image (check multiple sources — LinkedIn lazy-loads images)
    let imageUrl: string | null = null
    const imgEl = post.querySelector(`${SELECTORS.IMAGE_SINGLE}`) as HTMLImageElement | null
    if (imgEl) {
      const src =
        imgEl.src ||
        imgEl.getAttribute('data-delayed-url') ||
        imgEl.getAttribute('data-src') ||
        imgEl.getAttribute('data-ghost-url') ||
        ''
      if (src && !src.startsWith('data:')) imageUrl = src
    }
    // Fallback: any img inside the post content area
    if (!imageUrl) {
      const fallbackImg = post.querySelector(
        '.update-components-image img, .feed-shared-image img, .update-components-linkedin-video__container img',
      ) as HTMLImageElement | null
      if (fallbackImg) {
        const src = fallbackImg.src || fallbackImg.getAttribute('data-delayed-url') || ''
        if (src && !src.startsWith('data:')) imageUrl = src
      }
    }

    return { text, parsedDate, reactions, comments, impressions, imageUrl }
  }
  return null
}

/**
 * Detect the current page context for the sidebar.
 * Returns null if not on a valid activity page.
 */
export const detectContext = (): PageContext | null => {
  const url = window.location.href

  if (!url.includes('linkedin.com')) return null

  const activityMatch = url.match(/linkedin\.com\/in\/([^/]+)\/recent-activity/)
  if (!activityMatch) return null

  const urlUsername = activityMatch[1]
  const isOwnProfile = checkIsOwnProfile()

  // Extract real profile info from the first post's author link
  const posts = document.querySelectorAll(SELECTORS.POST_CONTAINER)
  let username = urlUsername === 'me' ? 'unknown' : urlUsername
  let fullName = username
  let profileUrl = `https://www.linkedin.com/in/${urlUsername}/`

  for (const post of Array.from(posts)) {
    const authorLink = post.querySelector(SELECTORS.AUTHOR_META_LINK) as HTMLAnchorElement | null
    if (!authorLink) continue

    const rawHref = authorLink.href
    profileUrl = rawHref.split('?')[0]

    const usernameMatch = profileUrl.match(/linkedin\.com\/in\/([^/]+)/)
    username = usernameMatch?.[1] || username

    const nameEl = post.querySelector(SELECTORS.AUTHOR_NAME)
    fullName = nameEl?.textContent?.trim() || username
    break
  }

  const latestPostPreview = extractLatestPreview(posts, username)

  return {
    isOwnProfile,
    username,
    fullName,
    profileUrl,
    activityType: getActivityType(url),
    latestPostPreview,
  }
}
