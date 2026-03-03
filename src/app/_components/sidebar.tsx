'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useNarrow } from '@/lib/use-narrow'

const navSections = [
  {
    label: 'GETTING STARTED',
    items: [
      { label: 'INTRODUCTION', href: '/docs/introduction' },
      { label: 'INSTALLATION',  href: '/docs/installation' },
      { label: 'THEMING',       href: '/docs/theming' },
    ],
  },
  {
    label: 'SHOWCASE',
    items: [
      { label: 'EXAMPLES',         href: '/showcase' },
      { label: 'CHARTS',           href: '/showcase/charts' },
      { label: 'MISSION CONTROL',  href: '/showcase/mission-control' },
    ],
  },
  {
    label: 'COMPONENTS',
    items: [
      { label: 'ALERT',         href: '/components/alert' },
      { label: 'BADGE',         href: '/components/badge' },
      { label: 'BAR CHART',     href: '/components/bar-chart' },
      { label: 'BREADCRUMB',    href: '/components/breadcrumb' },
      { label: 'BUTTON',        href: '/components/button' },
      { label: 'CARD',          href: '/components/card' },
      { label: 'CHECKBOX',      href: '/components/checkbox' },
      { label: 'DIALOG',        href: '/components/dialog' },
      { label: 'GRID',          href: '/components/grid' },
      { label: 'HEATMAP',       href: '/components/heatmap' },
      { label: 'INPUT',         href: '/components/input' },
      { label: 'KBD',           href: '/components/kbd' },
      { label: 'LABEL',         href: '/components/label' },
      { label: 'LINE CHART',    href: '/components/line-chart' },
      { label: 'NODE GRAPH',    href: '/components/node-graph' },
      { label: 'PANEL',         href: '/components/panel' },
      { label: 'PROGRESS',      href: '/components/progress' },
      { label: 'PROGRESS RING', href: '/components/progress-ring' },
      { label: 'RADAR CHART',   href: '/components/radar-chart' },
      { label: 'SELECT',        href: '/components/select' },
      { label: 'SEPARATOR',     href: '/components/separator' },
      { label: 'SKELETON',      href: '/components/skeleton' },
      { label: 'SPINNER',       href: '/components/spinner' },
      { label: 'STAT CARD',     href: '/components/stat-card' },
      { label: 'STATUS GRID',   href: '/components/status-grid' },
      { label: 'SWITCH',        href: '/components/switch' },
      { label: 'TABS',          href: '/components/tabs' },
      { label: 'TERMINAL',      href: '/components/terminal' },
      { label: 'TEXTAREA',      href: '/components/textarea' },
      { label: 'TOAST',         href: '/components/toast' },
      { label: 'TOOLTIP',       href: '/components/tooltip' },
      { label: 'TYPOGRAPHY',    href: '/components/typography' },
    ],
  },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isNarrow = useNarrow(768)
  const pathname = usePathname()

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
      <Link
        href="/"
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
      </Link>

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
            {section.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={isNarrow ? onClose : undefined}
                  style={{
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
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </nav>
  )
}
