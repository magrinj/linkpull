import { defineExtensionMessaging } from '@webext-core/messaging'
import type { ExtractionOptions, PageContext, ProgressData } from './types'

/** Storage key for extraction results (bypasses message size limits) */
export const RESULT_STORAGE_KEY = 'linkpull_result'

interface ProtocolMap {
  // Sidebar → Content Script
  'get-context'(): PageContext | null
  'start-extraction'(data: ExtractionOptions): { started: boolean }
  'stop-extraction'(): { stopped: boolean }

  // Content Script → Background (lightweight signals only)
  'extraction-progress'(data: ProgressData): void
  'extraction-complete'(data: { postCount: number }): void
  'extraction-error'(data: { message: string }): void

  // Sidebar → Background (state queries)
  'get-progress'(): ProgressData | null
  'reset'(): void
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>()
