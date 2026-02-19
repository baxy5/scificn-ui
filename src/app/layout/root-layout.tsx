import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'

export function RootLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        <Topbar />
        <main
          style={{
            flex: 1,
            padding: '2.5rem 3rem',
            maxWidth: '860px',
            width: '100%',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
