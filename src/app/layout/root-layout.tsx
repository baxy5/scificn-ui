import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { useNarrow } from '@/lib/use-narrow'

export function RootLayout() {
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
          <Outlet />
        </main>
      </div>
    </div>
  )
}
