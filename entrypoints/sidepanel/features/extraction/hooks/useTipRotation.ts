import { useEffect, useRef, useSyncExternalStore } from 'react'

const TIP_KEYS = [
  'progress.tip0',
  'progress.tip1',
  'progress.tip2',
  'progress.tip3',
  'progress.tip4',
] as const

export const useTipRotation = (active: boolean) => {
  const indexRef = useRef(0)
  const subscribersRef = useRef(new Set<() => void>())

  useEffect(() => {
    if (!active) {
      indexRef.current = 0
      return
    }
    indexRef.current = 0
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % TIP_KEYS.length
      subscribersRef.current.forEach((cb) => cb())
    }, 3500)
    return () => clearInterval(interval)
  }, [active])

  const tipIndex = useSyncExternalStore(
    (cb) => {
      subscribersRef.current.add(cb)
      return () => {
        subscribersRef.current.delete(cb)
      }
    },
    () => indexRef.current,
  )

  return { tipIndex, tipKeys: TIP_KEYS }
}
