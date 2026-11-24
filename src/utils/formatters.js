export const money = (value) => new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0,
}).format(value)

export function formatToday(date = new Date()) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatOverviewDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).formatToParts(date)
  const part = (type) => parts.find((item) => item.type === type)?.value ?? ''
  return `${part('weekday')}, ${part('day')} ${part('month')}`.toLocaleUpperCase('tr-TR')
}

export function formatTime(date = new Date()) {
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
