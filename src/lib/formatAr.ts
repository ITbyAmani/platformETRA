/** Arabic-Indic numerals and locale-aware formatting (Section 12). */

export function formatArNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return value.toLocaleString('ar-SA', { maximumFractionDigits: 0, ...options })
}

export function formatArPercent(value: number): string {
  return `${value.toLocaleString('ar-SA', { maximumFractionDigits: 0 })}٪`
}

export function formatArCurrency(value: number): string {
  return `${value.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ريال`
}
