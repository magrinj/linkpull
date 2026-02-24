import { t } from '@/lib/i18n'
import type { LinkedInPost } from '@/lib/types'

export const MediaBadge = ({ type }: { type: string }) => {
  const colors: Record<string, string> = {
    IMG: 'bg-badge-img/20 text-badge-img',
    VID: 'bg-badge-vid/20 text-badge-vid',
    ART: 'bg-badge-art/20 text-badge-art',
    POLL: 'bg-badge-poll/20 text-badge-poll',
    DOC: 'bg-badge-doc/20 text-badge-doc',
  }
  return (
    <span
      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${colors[type] || 'bg-border text-text-muted'}`}
    >
      {type}
    </span>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const getMediaBadges = (post: LinkedInPost): string[] => {
  const badges: string[] = []
  if (post.hasImage) badges.push(t('media.image'))
  if (post.hasVideo) badges.push(t('media.video'))
  if (post.hasArticle) badges.push(t('media.article'))
  if (post.hasPoll) badges.push(t('media.poll'))
  if (post.hasDocument) badges.push(t('media.document'))
  return badges
}
