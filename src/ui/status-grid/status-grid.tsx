import * as React from 'react'
import { cn } from '@/lib/utils'

export type SystemStatus = 'ACTIVE' | 'OFFLINE' | 'WARNING' | 'CRITICAL' | 'SCANNING'

export interface SystemEntry {
  name:    string
  status:  SystemStatus
  /** Optional secondary text shown beside the name */
  detail?: string
}

export interface StatusGridProps extends React.HTMLAttributes<HTMLDivElement> {
  systems:  SystemEntry[]
  title?:   string
  columns?: 1 | 2 | 3
}

function statusColor(s: SystemStatus): string {
  switch (s) {
    case 'ACTIVE':   return 'var(--color-green)'
    case 'OFFLINE':  return 'var(--text-muted)'
    case 'WARNING':  return 'var(--color-amber)'
    case 'CRITICAL': return 'var(--color-red)'
    case 'SCANNING': return 'var(--color-green)'
  }
}

function statusGlow(s: SystemStatus): string {
  switch (s) {
    case 'ACTIVE':   return 'var(--glow-green)'
    case 'SCANNING': return 'var(--glow-green)'
    case 'WARNING':  return 'var(--glow-amber)'
    case 'CRITICAL': return 'var(--glow-red)'
    default:         return 'none'
  }
}

const StatusGrid = React.forwardRef<HTMLDivElement, StatusGridProps>(
  ({ className, systems, title, columns = 1, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{
          border:     '1px solid var(--border)',
          background: 'var(--surface)',
          fontFamily: 'var(--font-mono)',
          overflow:   'hidden',
          ...style,
        }}
        {...props}
      >
        {/* Header */}
        {title && (
          <div
            style={{
              padding:       '0.4rem 0.75rem',
              borderBottom:  '1px solid var(--border)',
              background:    'var(--surface-raised)',
              fontSize:      '0.6rem',
              color:         'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
        )}

        {/* Grid of rows */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {systems.map((system, i) => {
            const color      = statusColor(system.status)
            const glow       = statusGlow(system.status)
            const isScanning = system.status === 'SCANNING'

            // border logic: no bottom border on last row(s), no right on last column
            const totalRows   = Math.ceil(systems.length / columns)
            const rowIndex    = Math.floor(i / columns)
            const colIndex    = i % columns
            const isLastRow   = rowIndex === totalRows - 1
            const isLastCol   = colIndex === columns - 1

            return (
              <div
                key={i}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                  gap:            '0.75rem',
                  padding:        '0.5rem 0.75rem',
                  borderBottom:   isLastRow ? 'none' : '1px solid var(--border)',
                  borderRight:    isLastCol ? 'none' : '1px solid var(--border)',
                }}
              >
                {/* Name + optional detail */}
                <span
                  style={{
                    fontSize:     '0.7rem',
                    color:        'var(--text-secondary)',
                    letterSpacing:'0.06em',
                    textTransform:'uppercase',
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace:   'nowrap',
                  }}
                >
                  {system.name}
                  {system.detail && (
                    <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem', textTransform: 'none' }}>
                      {system.detail}
                    </span>
                  )}
                </span>

                {/* Status dot + label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                  <span
                    style={{
                      display:      'inline-block',
                      width:        '6px',
                      height:       '6px',
                      borderRadius: '50%',
                      background:   color,
                      boxShadow:    glow,
                      animation:    isScanning ? 'blink-cursor 1s step-end infinite' : undefined,
                    }}
                  />
                  <span
                    style={{
                      fontSize:      '0.6rem',
                      color,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {system.status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
StatusGrid.displayName = 'StatusGrid'

export { StatusGrid }
