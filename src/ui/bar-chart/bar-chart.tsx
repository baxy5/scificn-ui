import * as React from 'react'
import { cn } from '@/lib/utils'

export type BarChartVariant = 'DEFAULT' | 'ACTIVE' | 'WARNING' | 'CRITICAL'

export interface BarChartEntry {
  label: string
  value: number
}

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data:          BarChartEntry[]
  orientation?:  'horizontal' | 'vertical'
  variant?:      BarChartVariant
  title?:        string
  showValues?:   boolean
  /** Override the max value for scaling. Defaults to max(data). */
  max?:          number
}

const VERTICAL_CHART_HEIGHT = 144  // px — 9rem

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      className,
      data,
      orientation = 'horizontal',
      variant     = 'ACTIVE',
      title,
      showValues  = true,
      max,
      style,
      ...props
    },
    ref
  ) => {
    const computedMax = max ?? Math.max(...data.map((d) => d.value), 1)

    const accentColor =
      variant === 'ACTIVE'   ? 'var(--color-green)' :
      variant === 'WARNING'  ? 'var(--color-amber)' :
      variant === 'CRITICAL' ? 'var(--color-red)'   :
      'var(--text-secondary)'

    const accentGlow =
      variant === 'ACTIVE'   ? 'var(--glow-green)' :
      variant === 'WARNING'  ? 'var(--glow-amber)'  :
      variant === 'CRITICAL' ? 'var(--glow-red)'    :
      'none'

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
        {/* Title bar */}
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

        {orientation === 'horizontal' ? (
          /* ── Horizontal bars ── */
          <div
            style={{
              padding:       '0.75rem',
              display:       'flex',
              flexDirection: 'column',
              gap:           '0.5rem',
            }}
          >
            {data.map((entry, i) => {
              const pct = Math.max((entry.value / computedMax) * 100, 0)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {/* Label */}
                  <span
                    style={{
                      fontSize:      '0.6rem',
                      color:         'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      width:         'clamp(3rem, 20%, 7rem)',
                      flexShrink:    0,
                      overflow:      'hidden',
                      textOverflow:  'ellipsis',
                      whiteSpace:    'nowrap',
                    }}
                  >
                    {entry.label}
                  </span>

                  {/* Track */}
                  <div
                    style={{
                      flex:       1,
                      height:     '0.65rem',
                      background: 'var(--surface-raised)',
                      border:     '1px solid var(--border)',
                      position:   'relative',
                      overflow:   'hidden',
                    }}
                  >
                    <div
                      style={{
                        position:   'absolute',
                        top:        0,
                        left:       0,
                        bottom:     0,
                        width:      `${pct}%`,
                        background: accentColor,
                        boxShadow:  accentGlow,
                        opacity:    0.85,
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>

                  {/* Value */}
                  {showValues && (
                    <span
                      style={{
                        fontSize:      '0.6rem',
                        color:         accentColor,
                        letterSpacing: '0.04em',
                        width:         '3rem',
                        textAlign:     'right',
                        flexShrink:    0,
                      }}
                    >
                      {entry.value}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          /* ── Vertical bars ── */
          <div>
            {/* Bar area */}
            <div
              style={{
                display:    'flex',
                alignItems: 'flex-end',
                gap:        '0.4rem',
                height:     VERTICAL_CHART_HEIGHT,
                padding:    '0.75rem 0.75rem 0',
              }}
            >
              {data.map((entry, i) => {
                const pct    = Math.max((entry.value / computedMax) * 100, 0)
                const barPx  = Math.round((pct / 100) * VERTICAL_CHART_HEIGHT)

                return (
                  <div
                    key={i}
                    style={{
                      flex:           1,
                      height:         VERTICAL_CHART_HEIGHT,
                      display:        'flex',
                      flexDirection:  'column',
                      alignItems:     'center',
                      justifyContent: 'flex-end',
                      gap:            '0.2rem',
                    }}
                  >
                    {/* Value above bar */}
                    {showValues && (
                      <span
                        style={{
                          fontSize:      '0.5rem',
                          color:         accentColor,
                          letterSpacing: '0.04em',
                          flexShrink:    0,
                        }}
                      >
                        {entry.value}
                      </span>
                    )}

                    {/* Bar */}
                    <div
                      style={{
                        width:      '100%',
                        height:     barPx > 0 ? barPx : 0,
                        minHeight:  entry.value > 0 ? 2 : 0,
                        background: accentColor,
                        boxShadow:  accentGlow,
                        opacity:    0.85,
                        flexShrink: 0,
                        transition: 'height 0.4s ease',
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Labels row */}
            <div
              style={{
                display:      'flex',
                gap:          '0.4rem',
                padding:      '0.25rem 0.75rem 0.75rem',
                borderTop:    '1px solid var(--border)',
                marginTop:    '0.25rem',
              }}
            >
              {data.map((entry, i) => (
                <div
                  key={i}
                  style={{
                    flex:          1,
                    textAlign:     'center',
                    fontSize:      '0.5rem',
                    color:         'var(--text-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    overflow:      'hidden',
                    textOverflow:  'ellipsis',
                    whiteSpace:    'nowrap',
                  }}
                >
                  {entry.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)
BarChart.displayName = 'BarChart'

export { BarChart }
