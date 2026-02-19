import * as React from 'react'
import { cn } from '@/lib/utils'

export type TerminalLineType = 'input' | 'output' | 'warn' | 'error' | 'system'

export interface TerminalLine {
  type?:      TerminalLineType
  text:       string
  timestamp?: string
}

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?:       TerminalLine[]
  prompt?:      string
  title?:       string
  height?:      string | number
  blinkCursor?: boolean
}

function lineColor(type: TerminalLineType = 'output'): string {
  switch (type) {
    case 'input':  return 'var(--color-green)'
    case 'output': return 'var(--text-secondary)'
    case 'warn':   return 'var(--color-amber)'
    case 'error':  return 'var(--color-red)'
    case 'system': return 'var(--text-muted)'
  }
}

function linePrefix(type: TerminalLineType = 'output'): string {
  switch (type) {
    case 'input':  return '>'
    case 'output': return ' '
    case 'warn':   return '⚠'
    case 'error':  return '✕'
    case 'system': return '#'
  }
}

const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  (
    {
      className,
      lines = [],
      prompt = '>',
      title = 'TERMINAL',
      height = '16rem',
      blinkCursor = true,
      style,
      ...props
    },
    ref
  ) => {
    const bodyRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight
      }
    }, [lines])

    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{
          border:      '1px solid var(--border)',
          background:  'var(--surface)',
          fontFamily:  'var(--font-mono)',
          overflow:    'hidden',
          display:     'flex',
          flexDirection: 'column',
          ...style,
        }}
        {...props}
      >
        {/* Title bar */}
        <div
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '0.5rem',
            padding:      '0.4rem 0.75rem',
            borderBottom: '1px solid var(--border)',
            background:   'var(--surface-raised)',
          }}
        >
          <span
            style={{
              fontSize:      '0.6rem',
              color:         'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </span>
          {/* Status dot */}
          <span
            style={{
              marginLeft:   'auto',
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:   'var(--color-green)',
              boxShadow:    'var(--glow-green)',
              animation:    'blink-cursor 2s step-end infinite',
            }}
          />
        </div>

        {/* Output body */}
        <div
          ref={bodyRef}
          style={{
            flex:          1,
            overflowY:     'auto',
            padding:       '0.75rem',
            height,
            display:       'flex',
            flexDirection: 'column',
            gap:           '0.2rem',
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                display:    'flex',
                gap:        '0.5rem',
                fontSize:   '0.75rem',
                lineHeight: 1.6,
                color:      lineColor(line.type),
              }}
            >
              {line.timestamp && (
                <span
                  style={{
                    color:     'var(--text-muted)',
                    flexShrink: 0,
                    fontSize:  '0.65rem',
                  }}
                >
                  {line.timestamp}
                </span>
              )}
              <span style={{ flexShrink: 0, opacity: 0.5, userSelect: 'none' }}>
                {linePrefix(line.type)}
              </span>
              <span style={{ wordBreak: 'break-all' }}>{line.text}</span>
            </div>
          ))}

          {/* Blinking cursor */}
          {blinkCursor && (
            <div
              style={{
                display:    'flex',
                alignItems: 'center',
                fontSize:   '0.75rem',
                marginTop:  '0.1rem',
                gap:        '0.25rem',
              }}
            >
              <span style={{ color: 'var(--text-muted)', userSelect: 'none' }}>{prompt}</span>
              <span
                style={{
                  display:    'inline-block',
                  width:      '0.55rem',
                  height:     '1em',
                  background: 'var(--color-green)',
                  boxShadow:  'var(--glow-green)',
                  animation:  'blink-cursor 1s step-end infinite',
                }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
)
Terminal.displayName = 'Terminal'

export { Terminal }
