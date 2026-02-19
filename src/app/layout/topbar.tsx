import { useState, useEffect } from 'react'

type Theme = 'sci-fi' | 'star-wars' | 'alien'

const themes: { id: Theme; label: string }[] = [
  { id: 'sci-fi',    label: 'SCI-FI'    },
  { id: 'star-wars', label: 'STAR WARS' },
  { id: 'alien',     label: 'ALIEN'     },
]

function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('scificn-theme') as Theme) ?? 'sci-fi'
  )

  useEffect(() => {
    if (theme === 'sci-fi') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
    localStorage.setItem('scificn-theme', theme)
  }, [theme])

  return [theme, setTheme]
}

function useGitHubStars(repo: string): number | null {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => r.json())
      .then((d: { stargazers_count?: number }) => {
        if (typeof d.stargazers_count === 'number') setStars(d.stargazers_count)
      })
      .catch(() => {})
  }, [repo])

  return stars
}

function GitHubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export function Topbar() {
  const [theme, setTheme] = useTheme()
  const stars = useGitHubStars('baxy5/scificn-ui')

  return (
    <header
      style={{
        height:       '44px',
        borderBottom: '1px solid var(--border)',
        background:   'var(--surface)',
        display:      'flex',
        alignItems:   'center',
        padding:      '0 1.5rem',
        gap:          '1rem',
        position:     'sticky',
        top:          0,
        zIndex:       50,
        flexShrink:   0,
      }}
    >
      {/* Left status */}
      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.08em', flexShrink: 0 }}>
        SYS:ONLINE
      </span>
      <span
        style={{
          color:         'var(--color-green)',
          fontSize:      '0.8rem',
          textShadow:    'var(--text-glow-green)',
          letterSpacing: '0.08em',
          flexShrink:    0,
        }}
      >
        ● ACTIVE
      </span>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Theme switcher */}
      <div
        style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '0',
          border:       '1px solid var(--border)',
          overflow:     'hidden',
        }}
      >
        <span
          style={{
            color:         'var(--text-muted)',
            fontSize:      '0.8rem',
            letterSpacing: '0.1em',
            padding:       '0 0.6rem',
            borderRight:   '1px solid var(--border)',
            height:        '26px',
            display:       'flex',
            alignItems:    'center',
            flexShrink:    0,
          }}
        >
          THEME
        </span>

        {themes.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            style={{
              background:    theme === t.id ? 'rgba(var(--color-green-rgb, 0,237,63), 0.08)' : 'transparent',
              border:        'none',
              borderLeft:    i === 0 ? 'none' : '1px solid var(--border)',
              cursor:        'pointer',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.75rem',
              letterSpacing: '0.06em',
              padding:       '0 0.75rem',
              height:        '26px',
              color:         theme === t.id ? 'var(--color-green)' : 'var(--text-muted)',
              textShadow:    theme === t.id ? 'var(--text-glow-green)' : 'none',
              transition:    'color 0.15s, background 0.15s',
              whiteSpace:    'nowrap',
            }}
            onMouseEnter={(e) => {
              if (theme !== t.id) e.currentTarget.style.color = 'var(--text-secondary)'
            }}
            onMouseLeave={(e) => {
              if (theme !== t.id) e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* GitHub link with live stars */}
      <a
        href="https://github.com/baxy5/scificn-ui"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display:        'flex',
          alignItems:     'center',
          gap:            '0.4rem',
          color:          'var(--text-muted)',
          textDecoration: 'none',
          fontSize:       '0.8rem',
          letterSpacing:  '0.06em',
          fontFamily:     'var(--font-mono)',
          border:         '1px solid var(--border)',
          padding:        '0 0.6rem',
          height:         '26px',
          transition:     'color 0.15s, border-color 0.15s',
          flexShrink:     0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--color-green)'
          e.currentTarget.style.borderColor = 'var(--color-green)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-muted)'
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        <GitHubIcon />
        <span>GITHUB</span>
        <span
          style={{
            color:       'var(--text-muted)',
            borderLeft:  '1px solid var(--border)',
            paddingLeft: '0.4rem',
            marginLeft:  '0.1rem',
          }}
        >
          ★ {stars !== null ? stars.toLocaleString() : '—'}
        </span>
      </a>

      {/* Version */}
      <span
        style={{
          color:         'var(--text-muted)',
          fontSize:      '0.8rem',
          letterSpacing: '0.08em',
          flexShrink:    0,
        }}
      >
        v0.1.0
      </span>
    </header>
  )
}
