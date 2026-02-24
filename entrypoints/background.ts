import { onMessage, RESULT_STORAGE_KEY } from '@/lib/messages'
import type { ProgressData } from '@/lib/types'

export default defineBackground(() => {
  console.log('[LinkPull] Background service worker started')

  // Open sidebar when clicking the extension icon
  browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

  // Only cache lightweight progress (result lives in storage.local)
  let latestProgress: ProgressData | null = null

  onMessage('extraction-progress', ({ data }) => {
    latestProgress = data
  })

  onMessage('extraction-complete', ({ data }) => {
    // Result is already in storage.local — just update progress
    latestProgress = {
      phase: 'complete',
      postsLoaded: data.postCount,
      postsExtracted: data.postCount,
      lastDate: null,
    }
  })

  onMessage('extraction-error', ({ data }) => {
    latestProgress = {
      phase: 'error',
      postsLoaded: latestProgress?.postsLoaded || 0,
      postsExtracted: latestProgress?.postsExtracted || 0,
      lastDate: latestProgress?.lastDate || null,
      error: data.message,
    }
  })

  onMessage('get-progress', () => latestProgress)

  onMessage('reset', async () => {
    latestProgress = null
    await browser.storage.local.remove(RESULT_STORAGE_KEY)
  })
})
