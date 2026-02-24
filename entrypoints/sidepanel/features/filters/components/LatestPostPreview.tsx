import { formatDate, formatNumber } from '../../../utils/format'
import type { PostPreview } from '@/lib/types'

export const LatestPostPreview = ({ preview }: { preview: PostPreview }) => (
  <div className="py-3 border-t border-border">
    <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">
      Dernier post
    </p>
    <div className="bg-surface border border-border rounded-lg p-3 flex gap-3">
      <div className="flex-1 min-w-0">
        {preview.parsedDate && (
          <p className="text-[10px] text-text-muted mb-1">{formatDate(preview.parsedDate)}</p>
        )}
        {preview.text && (
          <p className="text-[12px] text-text-secondary leading-[1.5] line-clamp-3 whitespace-pre-line mb-2">
            {preview.text}
          </p>
        )}
        <div className="flex items-center gap-3 text-[10px] text-text-muted">
          {preview.reactions > 0 && <span>&#x1F44D; {preview.reactions}</span>}
          {preview.comments > 0 && <span>&#x1F4AC; {preview.comments}</span>}
          {preview.impressions !== null && preview.impressions > 0 && (
            <span>&#x1F441; {formatNumber(preview.impressions)}</span>
          )}
        </div>
      </div>
      {preview.imageUrl && (
        <img
          src={preview.imageUrl}
          alt=""
          referrerPolicy="no-referrer"
          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
        />
      )}
    </div>
  </div>
)
