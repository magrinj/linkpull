import { useEffect, useState } from 'react'

const SUPPORT_KEY = 'linkpull_support'

interface SupportState {
  extractionCount: number
  lastDismissed: number | null
  ratedOrSupported: boolean
}

const DEFAULT_STATE: SupportState = {
  extractionCount: 0,
  lastDismissed: null,
  ratedOrSupported: false,
}

const DISMISS_COOLDOWN_DAYS = 14
const SHOW_AFTER_N_EXTRACTIONS = 2
const SHOW_EVERY_N_EXTRACTIONS = 5

export const useSupportPrompt = (postCount: number) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (postCount < 3) return
    ;(async () => {
      try {
        const stored = await browser.storage.local.get(SUPPORT_KEY)
        const state: SupportState = { ...DEFAULT_STATE, ...stored[SUPPORT_KEY] }

        // Increment extraction count
        state.extractionCount++
        await browser.storage.local.set({ [SUPPORT_KEY]: state })

        // Never show if user already rated/supported
        if (state.ratedOrSupported) return

        // Don't show if dismissed recently
        if (state.lastDismissed) {
          const daysSince = (Date.now() - state.lastDismissed) / (1000 * 60 * 60 * 24)
          if (daysSince < DISMISS_COOLDOWN_DAYS) return
        }

        // Show after Nth extraction, then every M extractions
        if (
          state.extractionCount >= SHOW_AFTER_N_EXTRACTIONS &&
          (state.extractionCount === SHOW_AFTER_N_EXTRACTIONS ||
            (state.extractionCount - SHOW_AFTER_N_EXTRACTIONS) % SHOW_EVERY_N_EXTRACTIONS === 0)
        ) {
          setVisible(true)
        }
      } catch {
        /* ignore */
      }
    })()
  }, [postCount])

  const dismiss = async () => {
    setVisible(false)
    try {
      const stored = await browser.storage.local.get(SUPPORT_KEY)
      const state: SupportState = { ...DEFAULT_STATE, ...stored[SUPPORT_KEY] }
      state.lastDismissed = Date.now()
      await browser.storage.local.set({ [SUPPORT_KEY]: state })
    } catch {
      /* ignore */
    }
  }

  const markSupported = async () => {
    setVisible(false)
    try {
      const stored = await browser.storage.local.get(SUPPORT_KEY)
      const state: SupportState = { ...DEFAULT_STATE, ...stored[SUPPORT_KEY] }
      state.ratedOrSupported = true
      await browser.storage.local.set({ [SUPPORT_KEY]: state })
    } catch {
      /* ignore */
    }
  }

  const forceShow = () => setVisible(true)

  return { visible, dismiss, markSupported, forceShow }
}
