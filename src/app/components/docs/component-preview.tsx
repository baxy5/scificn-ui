import { useState, type ReactNode } from 'react'
import { CodeBlock } from './code-block'

interface ComponentPreviewProps {
  preview: ReactNode
  code: string
}

export function ComponentPreview({ preview, code }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<'PREVIEW' | 'CODE'>('PREVIEW')

  const tabStyle = (tab: 'PREVIEW' | 'CODE') => ({
    background: 'transparent',
    border: 'none',
    borderBottom: activeTab === tab
      ? '2px solid var(--color-green)'
      : '2px solid transparent',
    color: activeTab === tab ? 'var(--color-green)' : 'var(--text-muted)',
    fontSize: '0.7rem',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    letterSpacing: '0.1em',
    fontFamily: 'var(--font-mono)',
    textShadow: activeTab === tab ? 'var(--text-glow-green)' : 'none',
    transition: 'all 0.15s',
  })

  return (
    <div style={{ border: '1px solid var(--border)' }}>
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: '0 0.5rem',
        }}
      >
        <button style={tabStyle('PREVIEW')} onClick={() => setActiveTab('PREVIEW')}>
          PREVIEW
        </button>
        <button style={tabStyle('CODE')} onClick={() => setActiveTab('CODE')}>
          CODE
        </button>
      </div>

      {/* Content */}
      {activeTab === 'PREVIEW' ? (
        <div
          style={{
            padding: '2.5rem',
            background: 'var(--background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            minHeight: '120px',
          }}
          className="scanlines"
        >
          {preview}
        </div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  )
}
