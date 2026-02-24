export const formatNumber = (n: number): string => {
  if (n >= 10_000_000) return `${Math.round(n / 1_000_000)}M`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 100_000) return `${Math.round(n / 1000)}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export const formatDate = (iso: string | null): string => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export const todayISO = () => new Date().toISOString().split('T')[0]

export const getDateRange = (
  preset: string,
  customStart: string,
  customEnd: string,
): { start: string | null; end: string | null } => {
  const now = new Date()
  switch (preset) {
    case 'year':
      return { start: `${now.getFullYear()}-01-01`, end: todayISO() }
    case '6m': {
      const d = new Date(now)
      d.setMonth(d.getMonth() - 6)
      return { start: d.toISOString().split('T')[0], end: todayISO() }
    }
    case '3m': {
      const d = new Date(now)
      d.setMonth(d.getMonth() - 3)
      return { start: d.toISOString().split('T')[0], end: todayISO() }
    }
    case 'custom':
      return {
        start: customStart || null,
        end: customEnd || todayISO(),
      }
    default:
      return { start: null, end: null }
  }
}
