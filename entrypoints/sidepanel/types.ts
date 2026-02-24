import type { LinkedInPost, PageContext, ProgressData } from '@/lib/types'

export type SidebarView =
  | { view: 'loading' }
  | { view: 'not-linkedin' }
  | { view: 'wrong-page'; url: string }
  | { view: 'ready'; context: PageContext }
  | { view: 'extracting'; context: PageContext; progress: ProgressData }
  | { view: 'results'; context: PageContext; posts: LinkedInPost[] }
  | { view: 'error'; message: string }

export interface Settings {
  periodPreset: string
  customDateStart: string
  customDateEnd: string
  minImpressions: number
  minReactions: number
  minComments: number
  minReposts: number
  jsonFormat: 'single' | 'per-post'
  downloadImages: boolean
}
