import { NavLink } from 'react-router-dom'

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
    label: 'COMPONENTS',
    items: [
      { label: 'ALERT',     to: '/components/alert' },
      { label: 'BADGE',     to: '/components/badge' },
      { label: 'BUTTON',    to: '/components/button' },
      { label: 'CHECKBOX',  to: '/components/checkbox' },
      { label: 'DIALOG',    to: '/components/dialog' },
      { label: 'INPUT',     to: '/components/input' },
      { label: 'PANEL',     to: '/components/panel' },
      { label: 'PROGRESS',  to: '/components/progress' },
      { label: 'SELECT',    to: '/components/select' },
      { label: 'SEPARATOR', to: '/components/separator' },
      { label: 'SPINNER',   to: '/components/spinner' },
      { label: 'SWITCH',    to: '/components/switch' },
      { label: 'TABS',      to: '/components/tabs' },
      { label: 'TEXTAREA',  to: '/components/textarea' },
      { label: 'TOAST',     to: '/components/toast' },
      { label: 'TOOLTIP',   to: '/components/tooltip' },
    ],
  },
]

export function Sidebar() {
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
