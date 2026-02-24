import { useState } from 'react'
import { SupportPrompt } from '../features/results/components/SupportPrompt'

export const DebugPanel = () => {
  const [open, setOpen] = useState(false)
  const [showSupport, setShowSupport] = useState(false)

  // Only show when sideloaded (unpacked). Chrome Web Store sets update_url.
  if (browser.runtime.getManifest().update_url) return null

  return (
    <>
      {showSupport && (
        <SupportPrompt
          onDismiss={() => setShowSupport(false)}
          onSupported={() => setShowSupport(false)}
        />
      )}

      <div className="fixed bottom-3 right-3 z-50">
        {open && (
          <div className="mb-2 bg-surface border border-border rounded-xl shadow-lg p-2 min-w-[160px] animate-fade-in-up">
            <p className="text-[10px] text-text-muted px-2 py-1 font-semibold uppercase tracking-wider">
              Debug
            </p>
            <button
              onClick={() => {
                setShowSupport(true)
                setOpen(false)
              }}
              className="w-full text-left px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
            >
              Show support modal
            </button>
            <button
              onClick={async () => {
                await browser.storage.local.remove('linkpull_support')
                setOpen(false)
              }}
              className="w-full text-left px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
            >
              Reset support state
            </button>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 bg-warning text-white rounded-full shadow-lg flex items-center justify-center text-sm hover:scale-110 transition-transform"
          title="Debug panel"
        >
          &#x1F527;
        </button>
      </div>
    </>
  )
}
