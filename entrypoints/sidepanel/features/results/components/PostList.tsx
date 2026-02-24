import { t } from '@/lib/i18n'
import { PostCard } from './PostCard'
import type { LinkedInPost } from '@/lib/types'

interface PostListProps {
  posts: LinkedInPost[]
}

export const PostList = ({ posts }: PostListProps) => {
  const previewPosts = posts.slice(0, 5)
  const remainingCount = Math.max(0, posts.length - 5)

  if (posts.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
        <p className="text-sm text-text-secondary mb-1">{t('empty.noPosts')}</p>
        <p className="text-xs text-text-muted">{t('empty.adjustFilters')}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto -mx-1">
      {previewPosts.map((post, i) => (
        <PostCard key={post.urn || i} post={post} />
      ))}
      {remainingCount > 0 && (
        <div className="flex items-center justify-center py-3 border-t border-border">
          <span className="text-xs font-medium text-text-muted bg-surface border border-border rounded-full px-3 py-1">
            {t('results.morePosts', { count: remainingCount })}
          </span>
        </div>
      )}
    </div>
  )
}
