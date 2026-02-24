import { t } from '@/lib/i18n'
import { IconLink } from '../../../components/Icons'
import { getMediaBadges, MediaBadge } from '../../../components/MediaBadge'
import { formatDate, formatNumber } from '../../../utils/format'
import type { LinkedInPost } from '@/lib/types'

export const PostCard = ({ post }: { post: LinkedInPost }) => {
  const badges = getMediaBadges(post)
  return (
    <div className="group border-b border-border py-3 px-1 hover:bg-surface-hover/50 transition-colors rounded-lg cursor-default">
      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] text-text-muted">{formatDate(post.parsedDate)}</span>
            {badges.map((b) => (
              <MediaBadge key={b} type={b} />
            ))}
            {post.postUrl && (
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-accent flex items-center gap-1 text-[10px]"
              >
                {t('postCard.open')} <IconLink />
              </a>
            )}
          </div>
          {post.text && (
            <p className="text-[13px] text-text-primary leading-[1.5] line-clamp-3 whitespace-pre-line mb-2">
              {post.text}
            </p>
          )}
          <div className="flex items-center gap-3 text-[11px] text-text-muted">
            {post.reactions > 0 && <span>&#x1F44D; {post.reactions}</span>}
            {post.comments > 0 && <span>&#x1F4AC; {post.comments}</span>}
            {post.impressions !== null && post.impressions > 0 && (
              <span>&#x1F441; {formatNumber(post.impressions)}</span>
            )}
          </div>
        </div>
        {post.images.length > 0 && (
          <img
            src={post.images[0]}
            alt=""
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
          />
        )}
      </div>
    </div>
  )
}
