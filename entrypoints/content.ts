import { extractPosts } from '@/lib/extractor'
import { onMessage, RESULT_STORAGE_KEY, sendMessage } from '@/lib/messages'
import { detectContext } from '@/lib/page-detector'
import type { ProgressData } from '@/lib/types'

/* eslint-disable @typescript-eslint/no-explicit-any */
const lpWindow = window as any
/* eslint-enable @typescript-eslint/no-explicit-any */

export default defineContentScript({
  matches: ['https://www.linkedin.com/in/*/recent-activity/*'],
  main() {
    // Guard against double injection (programmatic + manifest)
    if (lpWindow.__linkpull_loaded) return
    lpWindow.__linkpull_loaded = true

    console.log('[LinkPull] Content script loaded')

    let isExtracting = false

    /** Cancel any ongoing extraction before starting a new one. */
    const cancelOngoing = () => {
      const cancelFn = lpWindow.__linkpull_cancel
      if (cancelFn) {
        cancelFn()
        console.log('[LinkPull] Cancelled previous extraction')
      }
      isExtracting = false
    }

    onMessage('get-context', () => {
      return detectContext()
    })

    onMessage('start-extraction', async ({ data: options }) => {
      // Auto-cancel any stuck/ongoing extraction
      if (isExtracting) {
        cancelOngoing()
      }
      isExtracting = true

      try {
        const context = detectContext()
        if (!context) {
          isExtracting = false
          return { started: false }
        }

        // Start extraction in background (don't await — return immediately)
        ;(async () => {
          try {
            const posts = await extractPosts(
              context.username,
              options,
              (progress: ProgressData) => {
                sendMessage('extraction-progress', progress).catch(() => {})
              },
            )

            console.log(`[LinkPull] Extraction done: ${posts.length} posts. Writing to storage...`)

            // Write result to storage.local (avoids message size limits)
            await browser.storage.local.set({
              [RESULT_STORAGE_KEY]: { posts, context },
            })

            console.log('[LinkPull] Result written to storage.local')

            // Fire-and-forget signal to background (don't await — storage is the source of truth)
            sendMessage('extraction-complete', { postCount: posts.length }).catch(() => {
              console.warn(
                '[LinkPull] extraction-complete message failed (result is in storage.local)',
              )
            })
          } catch (err) {
            await sendMessage('extraction-error', {
              message: err instanceof Error ? err.message : 'Unknown error during extraction',
            }).catch(() => {})
          } finally {
            isExtracting = false
          }
        })()

        return { started: true }
      } catch {
        isExtracting = false
        return { started: false }
      }
    })

    onMessage('stop-extraction', () => {
      const cancelFn = lpWindow.__linkpull_cancel
      if (cancelFn) {
        cancelFn()
        isExtracting = false
        return { stopped: true }
      }
      return { stopped: false }
    })
  },
})
