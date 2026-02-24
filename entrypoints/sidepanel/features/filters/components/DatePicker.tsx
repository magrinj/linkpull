import { useEffect, useRef, useState } from 'react'
import { IconCalendar, IconChevronLeft, IconChevronRight } from '../../../components/Icons'
import { DAYS_SHORT, getDaysInMonth, getFirstDayOfMonth, MONTHS } from '../utils/calendar'

export const DatePicker = ({
  value,
  onChange,
  placeholder,
  align = 'left',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  align?: 'left' | 'right'
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const parsed = value ? new Date(value + 'T00:00:00') : null
  const [viewYear, setViewYear] = useState(parsed?.getFullYear() ?? new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? new Date().getMonth())

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else setViewMonth((m) => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else setViewMonth((m) => m + 1)
  }

  const selectDay = (day: number) => {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onChange(iso)
    setOpen(false)
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const displayValue = parsed
    ? parsed.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''
  const selectedDay =
    parsed && parsed.getFullYear() === viewYear && parsed.getMonth() === viewMonth
      ? parsed.getDate()
      : null
  const today = new Date()
  const todayDay =
    today.getFullYear() === viewYear && today.getMonth() === viewMonth ? today.getDate() : null

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-left flex items-center gap-2 hover:border-border-hover focus:outline-none focus:border-accent transition-colors"
      >
        <IconCalendar />
        <span className={displayValue ? 'text-text-primary text-xs' : 'text-text-muted text-xs'}>
          {displayValue || placeholder || 'Choisir'}
        </span>
      </button>

      {open && (
        <div
          className={`absolute z-50 top-full mt-1 w-[260px] bg-surface-alt border border-border rounded-xl shadow-lg p-3 animate-scale-in ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <IconChevronLeft />
            </button>
            <span className="text-sm font-semibold text-text-primary">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <IconChevronRight />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0 mb-1">
            {DAYS_SHORT.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-text-muted py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0">
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`e-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const isSelected = day === selectedDay
              const isToday = day === todayDay
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDay(day)}
                  className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-accent text-white font-bold'
                      : isToday
                        ? 'text-accent font-semibold hover:bg-surface-hover'
                        : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
