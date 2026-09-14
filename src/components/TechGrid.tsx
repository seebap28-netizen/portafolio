const ICONS: Record<string, { bg: string; mark: string; fg?: string }> = {
  Python: { bg: '#3776AB', mark: 'Py' },
  Django: { bg: '#092E20', mark: 'Dj' },
  Flask: { bg: '#111111', mark: 'Fl' },
  Java: { bg: '#E76F00', mark: 'Ja' },
  Spring: { bg: '#6DB33F', mark: 'Sp' },
  HTML5: { bg: '#E44D26', mark: 'H5' },
  CSS3: { bg: '#264DE4', mark: 'C3' },
  JavaScript: { bg: '#F7DF1E', mark: 'JS', fg: '#111' },
  React: { bg: '#087EA4', mark: 'Re' },
  'Node.js': { bg: '#3C873A', mark: 'No' },
}

export function uniqueStack(items: string[]) {
  const seen = new Set<string>()
  return items.filter((item) => {
    const key = item.trim().toLowerCase()
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function TechGrid({ items }: { items: string[] }) {
  return (
    <div className="tech-grid">
      {uniqueStack(items).map((item) => {
        const icon = ICONS[item] ?? { bg: '#0b1f3a', mark: item.slice(0, 2) }
        return (
          <span className="tech-item" key={item}>
            <span className="tech-mark" style={{ background: icon.bg, color: icon.fg ?? '#fff' }}>
              {icon.mark}
            </span>
            {item}
          </span>
        )
      })}
    </div>
  )
}
