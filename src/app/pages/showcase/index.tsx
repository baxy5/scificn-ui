import { Link } from 'react-router-dom'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'

const showcases = [
  {
    id: 'star-wars',
    title: 'IMPERIAL COMMAND INTERFACE',
    theme: 'STAR WARS',
    themeColor: '#1a6dff',
    description:
      'Full-screen Imperial Navy sector command terminal. Features a tactical grid, mission briefing, comm channels, and live system status readouts.',
    components: ['Panel', 'Badge', 'Button', 'Alert', 'Progress', 'Tabs', 'StatCard', 'StatusGrid', 'ProgressRing', 'Grid'],
    path: '/showcase/star-wars',
  },
  {
    id: 'alien',
    title: 'NOSTROMO SHIP MANAGEMENT',
    theme: 'ALIEN',
    themeColor: '#E0D5BE',
    description:
      'USCSS Nostromo crew terminal powered by MU/TH/UR 6000. Features crew vitals, sensor sweep, life support readings, cargo manifest, and emergency systems.',
    components: ['Panel', 'Badge', 'Button', 'Alert', 'Progress', 'Tabs', 'StatCard', 'Terminal', 'StatusGrid', 'ProgressRing', 'Grid'],
    path: '/showcase/alien',
  },
  {
    id: 'sci-fi',
    title: 'NEXUS STATION-7 OPS CONTROL',
    theme: 'SCI-FI',
    themeColor: '#00ed3f',
    description:
      'Deep space station operations terminal. Manage vessel docking, monitor station modules, track crew, and respond to incoming transmissions.',
    components: ['Panel', 'Badge', 'Button', 'Alert', 'Progress', 'Tabs', 'StatCard', 'Terminal', 'StatusGrid', 'ProgressRing', 'Grid'],
    path: '/showcase/sci-fi',
  },
]

export default function ShowcasePage() {
  return (
    <div>
      <PageHeader
        title="SHOWCASE"
        description="Full-page examples built with scificn/ui components. Each showcase demonstrates real-world interface patterns using the design system."
      />

      <Section title="EXAMPLES">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {showcases.map((s) => (
            <Link key={s.id} to={s.path} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  transition: 'border-color 0.15s',
                  cursor: 'pointer',
                  clipPath: 'var(--clip-corner-sm)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = s.themeColor
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                {/* Theme swatch */}
                <div
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    border: `1px solid ${s.themeColor}`,
                    background: `${s.themeColor}18`,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: s.themeColor,
                    fontSize: '0.55rem',
                    letterSpacing: '0.1em',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1.4,
                    whiteSpace: 'pre-line',
                    textShadow: `0 0 8px ${s.themeColor}88`,
                  }}
                >
                  {s.theme}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.06em',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      style={{
                        fontSize: '0.6rem',
                        color: s.themeColor,
                        border: `1px solid ${s.themeColor}`,
                        padding: '1px 6px',
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--font-mono)',
                        textShadow: `0 0 6px ${s.themeColor}88`,
                      }}
                    >
                      {s.theme}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      margin: 0,
                      marginBottom: '0.85rem',
                    }}
                  >
                    {s.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {s.components.map((c) => (
                      <span
                        key={c}
                        style={{
                          fontSize: '0.6rem',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border)',
                          padding: '1px 6px',
                          letterSpacing: '0.08em',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div
                  style={{
                    color: s.themeColor,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em',
                    flexShrink: 0,
                    alignSelf: 'center',
                    textShadow: `0 0 6px ${s.themeColor}88`,
                  }}
                >
                  VIEW →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}
