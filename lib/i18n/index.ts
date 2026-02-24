import { en } from './en'
import { fr } from './fr'
import type { Locale, TranslationDictionary } from './types'

const dictionaries: Record<Locale, TranslationDictionary> = { en, fr }

const detectLocale = (): Locale => {
  const browserLang = (navigator?.language ?? 'en').toLowerCase()
  const primary = browserLang.split('-')[0]
  if (primary in dictionaries) return primary as Locale
  return 'en'
}

let currentLocale: Locale = detectLocale()

export type TranslationKey = keyof TranslationDictionary

export const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
  const dict = dictionaries[currentLocale]
  let value = dict[key]
  if (params) {
    for (const [param, replacement] of Object.entries(params)) {
      value = value.replace(new RegExp(`\\{${param}\\}`, 'g'), String(replacement))
    }
  }
  return value
}

export const getLocale = (): Locale => currentLocale

export const setLocale = (locale: Locale): void => {
  currentLocale = locale
}

export type { Locale, TranslationDictionary } from './types'
