import { NavLink } from 'react-router-dom'
import { useNarrow } from '@/lib/use-narrow'

const navSections = [
  {
    label: 'GETTING STARTED',
    items: [
      { label: 'INTRODUCTION', to: '/docs/introduction' },
      { label: 'INSTALLATION',  to: '/docs/installation' },
      { label: 'THEMING',       to: '/docs/theming' },
    ],
  },
  {
    label: 'SHOWCASE',
    items: [
      { label: 'EXAMPLES', to: '/showcase' },
    ],
  },
  {
    label: 'COMPONENTS',
    items: [
      { label: 'ALERT',         to: '/components/alert' },
      { label: 'BADGE',         to: '/components/badge' },
      { label: 'BAR CHART',     to: '/components/bar-chart' },
      { label: 'BREADCRUMB',    to: '/components/breadcrumb' },
      { label: 'BUTTON',        to: '/components/button' },
      { label: 'CARD',          to: '/components/card' },
      { label: 'CHECKBOX',      to: '/components/checkbox' },
      { label: 'DIALOG',        to: '/components/dialog' },
      { label: 'GRID',          to: '/components/grid' },
      { label: 'HEATMAP',       to: '/components/heatmap' },
      { label: 'INPUT',         to: '/components/input' },
      { label: 'KBD',           to: '/components/kbd' },
      { label: 'LABEL',         to: '/components/label' },
      { label: 'PANEL',         to: '/components/panel' },
      { label: 'PROGRESS',      to: '/components/progress' },
      { label: 'PROGRESS RING', to: '/components/progress-ring' },
      { label: 'SELECT',        to: '/components/select' },
      { label: 'SEPARATOR',     to: '/components/separator' },
      { label: 'SKELETON',      to: '/components/skeleton' },
      { label: 'SPINNER',       to: '/components/spinner' },
      { label: 'STAT CARD',     to: '/components/stat-card' },
      { label: 'STATUS GRID',   to: '/components/status-grid' },
      { label: 'SWITCH',        to: '/components/switch' },
      { label: 'TABS',          to: '/components/tabs' },
      { label: 'TERMINAL',      to: '/components/terminal' },
      { label: 'TEXTAREA',      to: '/components/textarea' },
      { label: 'TOAST',         to: '/components/toast' },
      { label: 'TOOLTIP',       to: '/components/tooltip' },
      { label: 'TYPOGRAPHY',    to: '/components/typography' },
    ],
  },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isNarrow = useNarrow(768)

  return (
    <nav
      style={{
        width: '220px',
        minHeight: '100vh',
        borderRight: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '0',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        ...(isNarrow
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              zIndex: 100,
              transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.25s ease',
            }
          : {}),
      }}
    >
      {/* Brand */}
      <NavLink
        to="/"
        style={{
          display: 'block',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border)',
          textDecoration: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{
                color: 'var(--color-green)',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textShadow: 'var(--text-glow-green)',
              }}
            >
              SCIFICN/UI
            </div>
            <div
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.65rem',
                marginTop: '2px',
                letterSpacing: '0.08em',
              }}
            >
              RETRO SCI-FI COMPONENTS
            </div>
          </div>
          {isNarrow && (
            <button
              onClick={(e) => { e.preventDefault(); onClose() }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.25rem 0.5rem',
                lineHeight: 1,
              }}
              aria-label="Close menu"
            >
              ✕
            </button>
          )}
        </div>
      </NavLink>

      {/* Nav sections */}
      <div style={{ padding: '1rem 0', flex: 1, overflowY: 'auto' }}>
        {navSections.map((section) => (
          <div key={section.label} style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                padding: '0 1.25rem 0.4rem',
                fontSize: '0.6rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
              }}
            >
              {section.label}
            </div>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={isNarrow ? onClose : undefined}
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '0.3rem 1.25rem',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  color: isActive ? 'var(--color-green)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--surface-raised)' : 'transparent',
                  borderLeft: isActive
                    ? '2px solid var(--color-green)'
                    : '2px solid transparent',
                  letterSpacing: '0.05em',
                  textShadow: isActive ? 'var(--text-glow-green)' : 'none',
                  transition: 'all 0.15s',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}
