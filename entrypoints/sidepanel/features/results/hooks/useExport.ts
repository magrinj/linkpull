import { useState } from 'react'
import { copyToClipboard, exportCSV, exportJSONPlain, exportZIP } from '@/lib/exporter'
import { t } from '@/lib/i18n'
import type { Settings } from '../../../types'
import type { LinkedInPost, PageContext } from '@/lib/types'

export const useExport = (settings: Settings) => {
  const [copied, setCopied] = useState(false)
  const [exportProgress, setExportProgress] = useState<string | null>(null)

  const handleExportCSV = (posts: LinkedInPost[], username: string) => {
    const date = new Date().toISOString().split('T')[0]
    exportCSV(posts, `linkpull-${username}-${date}.csv`)
  }

  const handleExportJSON = async (posts: LinkedInPost[], context: PageContext) => {
    const date = new Date().toISOString().split('T')[0]
    const username = context.username
    const needsZIP = settings.jsonFormat === 'per-post' || settings.downloadImages

    if (needsZIP) {
      setExportProgress(t('export.downloading', { current: '0', total: '...' }))
      try {
        await exportZIP(posts, `linkpull-${username}-${date}.zip`, {
          downloadImages: settings.downloadImages,
          jsonFormat: settings.jsonFormat,
          context,
          onImageProgress: (current, total) => {
            setExportProgress(
              t('export.downloading', { current: String(current), total: String(total) }),
            )
          },
        })
      } finally {
        setExportProgress(null)
      }
    } else {
      exportJSONPlain(posts, `linkpull-${username}-${date}.json`)
    }
  }

  const handleCopy = async (posts: LinkedInPost[]) => {
    await copyToClipboard(posts)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return { copied, exportProgress, handleExportCSV, handleExportJSON, handleCopy }
}
