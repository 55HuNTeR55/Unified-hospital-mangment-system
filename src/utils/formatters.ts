export function fmtTime(d: Date): string {
  return d.toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  });
}

export function occColor(pct: number): string {
  return pct >= 90 ? 'var(--critical)' : pct >= 75 ? 'var(--warn)' : 'var(--ok)';
}
