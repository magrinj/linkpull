import { useEffect, useState } from 'react'
import type { Settings } from '../types'

const SETTINGS_KEY = 'linkpull_settings'
const DEFAULT_SETTINGS: Settings = {
  periodPreset: 'all',
  customDateStart: '',
  customDateEnd: '',
  minImpressions: 0,
  minReactions: 0,
  minComments: 0,
  minReposts: 0,
  jsonFormat: 'single',
  downloadImages: true,
}

const loadSettings = async (): Promise<Settings> => {
  try {
    const result = await browser.storage.local.get(SETTINGS_KEY)
    if (result[SETTINGS_KEY]) return { ...DEFAULT_SETTINGS, ...result[SETTINGS_KEY] }
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS
}

const saveSettings = (s: Settings) => {
  browser.storage.local.set({ [SETTINGS_KEY]: s }).catch(() => {})
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [settingsLoaded, setSettingsLoaded] = useState(false)

  useEffect(() => {
    loadSettings().then((s) => {
      setSettings(s)
      setSettingsLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (settingsLoaded) saveSettings(settings)
  }, [settings, settingsLoaded])

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleCustomDateStart = (v: string) => {
    updateSetting('customDateStart', v)
    if (settings.customDateEnd && v > settings.customDateEnd) {
      updateSetting('customDateEnd', v)
    }
  }

  const handleCustomDateEnd = (v: string) => {
    updateSetting('customDateEnd', v)
    if (settings.customDateStart && v < settings.customDateStart) {
      updateSetting('customDateStart', v)
    }
  }

  return { settings, updateSetting, handleCustomDateStart, handleCustomDateEnd }
}
