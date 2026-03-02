import { useCallback, useEffect, useRef, useState } from 'react'
import { RESULT_STORAGE_KEY, sendMessage } from '@/lib/messages'
import { getDateRange } from '../../../utils/format'
import type { Settings, SidebarView } from '../../../types'
import type { ExtractionOptions, ExtractionResult, PageContext } from '@/lib/types'

export const useExtraction = (settings: Settings) => {
  const [state, setState] = useState<SidebarView>({ view: 'loading' })
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const tabIdRef = useRef<number | null>(null)

  const startPolling = useCallback((context: PageContext) => {
    if (pollingRef.current) clearInterval(pollingRef.current)
    pollingRef.current = setInterval(async () => {
      try {
        const progress = await sendMessage('get-progress', undefined)

        if (progress?.phase === 'complete') {
          clearInterval(pollingRef.current!)
          pollingRef.current = null
          const stored = await browser.storage.local.get(RESULT_STORAGE_KEY)
          const result = stored[RESULT_STORAGE_KEY] as ExtractionResult | undefined
          if (result) {
            setState({ view: 'results', context: result.context, posts: result.posts })
          }
          return
        }

        if (progress?.phase === 'error') {
          clearInterval(pollingRef.current!)
          pollingRef.current = null
          setState({ view: 'error', message: progress.error || 'Unknown error' })
          return
        }

        if (progress) {
          setState({ view: 'extracting', context, progress })
        }

        // Fallback: check storage.local directly
        const stored = await browser.storage.local.get(RESULT_STORAGE_KEY)
        const result = stored[RESULT_STORAGE_KEY] as ExtractionResult | undefined
        if (result) {
          clearInterval(pollingRef.current!)
          pollingRef.current = null
          setState({ view: 'results', context: result.context, posts: result.posts })
        }
      } catch {
        /* ignore */
      }
    }, 500)
  }, [])

  const checkPageRef = useRef<(attempt?: number) => Promise<void>>(null)

  const checkPage = useCallback(
    async (attempt = 0) => {
      const MAX_RETRIES = 3
      const DELAYS = [800, 1500, 2500]

      try {
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
        if (!tab?.id) {
          setState({ view: 'not-linkedin' })
          return
        }
        if (!tab.url?.includes('linkedin.com')) {
          setState({ view: 'not-linkedin' })
          return
        }

        const isActivityUrl = tab.url.includes('/recent-activity')

        let context: PageContext | null = null
        try {
          context = await sendMessage('get-context', undefined, tab.id)
        } catch {
          if (isActivityUrl) {
            try {
              await browser.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['/content-scripts/content.js'],
              })
              await new Promise((r) => setTimeout(r, 500))
              context = await sendMessage('get-context', undefined, tab.id)
            } catch {
              if (attempt < MAX_RETRIES) {
                setTimeout(() => checkPageRef.current?.(attempt + 1), DELAYS[attempt])
                return
              }
              setState({ view: 'wrong-page', url: tab.url || '' })
              return
            }
          } else {
            setState({ view: 'wrong-page', url: tab.url || '' })
            return
          }
        }

        if (!context) {
          setState({ view: 'wrong-page', url: tab.url || '' })
          return
        }

        // Check if there's an ongoing extraction
        try {
          const progress = await sendMessage('get-progress', undefined)
          if (progress && progress.phase !== 'complete' && progress.phase !== 'error') {
            setState({ view: 'extracting', context, progress })
            startPolling(context)
            return
          }
          if (progress?.phase === 'complete') {
            const stored = await browser.storage.local.get(RESULT_STORAGE_KEY)
            const result = stored[RESULT_STORAGE_KEY] as ExtractionResult | undefined
            if (result) {
              setState({ view: 'results', context: result.context, posts: result.posts })
              return
            }
          }
        } catch {
          /* ignore */
        }

        setState({ view: 'ready', context })

        // If preview is missing (page still loading), retry once after 2s
        if (!context.latestPostPreview && attempt === 0) {
          setTimeout(() => checkPageRef.current?.(1), 2000)
        }
      } catch {
        setState({ view: 'not-linkedin' })
      }
    },
    [startPolling],
  )

  useEffect(() => {
    checkPageRef.current = checkPage
  }, [checkPage])

  useEffect(() => {
    checkPage() // eslint-disable-line react-hooks/set-state-in-effect -- async init, setState is after await
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [checkPage])

  useEffect(() => {
    const listener = () => {
      checkPage()
    }
    browser.tabs.onActivated?.addListener(listener)
    browser.tabs.onUpdated?.addListener((_tabId, changeInfo) => {
      if (changeInfo.status === 'complete') checkPage()
    })
    return () => {
      browser.tabs.onActivated?.removeListener(listener)
    }
  }, [checkPage])

  const handleExtract = async () => {
    if (state.view !== 'ready') return
    const { context } = state

    const { start, end } = getDateRange(
      settings.periodPreset,
      settings.customDateStart,
      settings.customDateEnd,
    )

    const options: ExtractionOptions = {
      dateFilterStart: start,
      dateFilterEnd: end,
      minImpressions: settings.minImpressions > 0 ? settings.minImpressions : null,
      minReactions: settings.minReactions > 0 ? settings.minReactions : null,
      minComments: settings.minComments > 0 ? settings.minComments : null,
      minReposts: settings.minReposts > 0 ? settings.minReposts : null,
    }

    setState({
      view: 'extracting',
      context,
      progress: { phase: 'scrolling', postsLoaded: 0, postsExtracted: 0, lastDate: null },
    })

    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
      if (!tab?.id) return
      tabIdRef.current = tab.id

      // Stop any ongoing extraction + reset background state
      await sendMessage('stop-extraction', undefined, tab.id).catch(() => {})
      await sendMessage('reset', undefined)

      const result = await sendMessage('start-extraction', options, tab.id)
      if (!result?.started) {
        setState({ view: 'error', message: 'Could not start extraction. Try reloading the page.' })
        return
      }
      startPolling(context)
    } catch (err) {
      setState({
        view: 'error',
        message: err instanceof Error ? err.message : 'Failed to start extraction',
      })
    }
  }

  const handleStop = async () => {
    try {
      const tabId = tabIdRef.current
      if (tabId) {
        await sendMessage('stop-extraction', undefined, tabId)
      } else {
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
        if (tab?.id) await sendMessage('stop-extraction', undefined, tab.id)
      }
    } catch {
      /* ignore */
    }
  }

  const handleNewExtraction = async () => {
    tabIdRef.current = null
    await sendMessage('reset', undefined).catch(() => {})
    checkPage()
  }

  const navigateToActivity = async () => {
    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
      if (!tab?.id) return
      let activityUrl = 'https://www.linkedin.com/in/me/recent-activity/all/'
      if (tab.url) {
        const match = tab.url.match(/linkedin\.com\/in\/([^/]+)/)
        if (match) {
          activityUrl = `https://www.linkedin.com/in/${match[1]}/recent-activity/all/`
        }
      }
      await browser.tabs.update(tab.id, { url: activityUrl })
    } catch {
      /* ignore */
    }
  }

  return { state, handleExtract, handleStop, handleNewExtraction, navigateToActivity }
}
