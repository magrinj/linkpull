export interface LinkedInPost {
  urn: string | null
  postUrl: string | null
  authorName: string
  authorUrl: string
  timeLabel: string
  parsedDate: string | null
  text: string
  reactions: number
  comments: number
  reposts: number
  impressions: number | null
  images: string[]
  hasImage: boolean
  hasVideo: boolean
  hasDocument: boolean
  hasArticle: boolean
  hasPoll: boolean
}

export interface PostPreview {
  text: string
  parsedDate: string | null
  reactions: number
  comments: number
  impressions: number | null
  imageUrl: string | null
}

export interface PageContext {
  isOwnProfile: boolean
  username: string
  fullName: string
  profileUrl: string
  activityType: string
  latestPostPreview: PostPreview | null
}

export interface ExtractionOptions {
  dateFilterStart: string | null
  dateFilterEnd: string | null
  minImpressions: number | null
  minReactions: number | null
  minComments: number | null
  minReposts: number | null
}

export type ExtractionPhase = 'scrolling' | 'extracting' | 'complete' | 'error'

export interface ProgressData {
  phase: ExtractionPhase
  postsLoaded: number
  postsExtracted: number
  lastDate: string | null
  error?: string
}

export interface ExtractionResult {
  posts: LinkedInPost[]
  context: PageContext
}
