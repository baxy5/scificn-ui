import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.4rem 0.75rem',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface-raised)',
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}
        >
          {language.toUpperCase()}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: copied ? 'var(--color-green)' : 'var(--text-muted)',
            fontSize: '0.65rem',
            padding: '2px 8px',
            cursor: 'pointer',
            letterSpacing: '0.08em',
            transition: 'all 0.15s',
            fontFamily: 'var(--font-mono)',
            textShadow: copied ? 'var(--text-glow-green)' : 'none',
            boxShadow: copied ? 'var(--glow-green)' : 'none',
          }}
        >
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>

      {/* Code content */}
      <pre
        style={{
          margin: 0,
          padding: '1rem',
          overflowX: 'auto',
          fontSize: '0.8rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
