'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { useNarrow } from '@/lib/use-narrow'

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isNarrow = useNarrow(768)

  useEffect(() => {
    if (!isNarrow) setSidebarOpen(false)
  }, [isNarrow])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      {isNarrow && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            background: 'rgba(0,0,0,0.5)',
          }}
        />
      )}
      <Sidebar
        isOpen={isNarrow ? sidebarOpen : true}
        onClose={() => setSidebarOpen(false)}
      />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        <Topbar
          onMenuToggle={() => setSidebarOpen(v => !v)}
          isNarrow={isNarrow}
        />
        <main
          style={{
            flex: 1,
            padding: isNarrow ? '1.5rem 1rem' : '2.5rem 3rem',
            width: '100%',
          }}
        >
          {children}
        </main>
        <footer
          style={{
            borderTop: '1px solid var(--color-border)',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
          }}
        >
          <span>ALSO BY THE CREATOR:</span>
          <a
            href="https://www.promptfast.dev/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-green)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              textShadow: '0 0 8px var(--color-green)',
            }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            PROMPTFAST.DEV
          </a>
        </footer>
      </div>
    </div>
  )
}
