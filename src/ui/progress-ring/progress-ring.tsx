import * as React from 'react'
import { cn } from '@/lib/utils'

export type ProgressRingVariant = 'DEFAULT' | 'ACTIVE' | 'WARNING' | 'CRITICAL'

export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value:        number
  size?:        number
  strokeWidth?: number
  label?:       string
  showValue?:   boolean
  variant?:     ProgressRingVariant
}

const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  (
    {
      className,
      value       = 0,
      size        = 120,
      strokeWidth = 6,
      label,
      showValue   = true,
      variant     = 'DEFAULT',
      style,
      ...props
    },
    ref
  ) => {
    const pct   = Math.min(Math.max(value, 0), 100)
    const cx    = size / 2
    const cy    = size / 2
    const r     = (size - strokeWidth) / 2
    const circ  = 2 * Math.PI * r
    const offset = circ * (1 - pct / 100)

    const accentColor =
      variant === 'ACTIVE'   ? 'var(--color-green)' :
      variant === 'WARNING'  ? 'var(--color-amber)' :
      variant === 'CRITICAL' ? 'var(--color-red)'   :
      'var(--text-secondary)'

    const textGlow =
      variant === 'ACTIVE'   ? 'var(--text-glow-green)' :
      variant === 'WARNING'  ? 'var(--text-glow-amber)'  :
      variant === 'CRITICAL' ? 'var(--text-glow-red)'    :
      'none'

    const isSmall = size < 80

    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{
          position:       'relative',
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          size,
          height:         size,
          fontFamily:     'var(--font-mono)',
          flexShrink:     0,
          ...style,
        }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          style={{ position: 'absolute', inset: 0 }}
          aria-hidden="true"
        >
          {/* Track ring */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
          />

          {/* Glow layer — wider, low opacity */}
          {pct > 0 && (
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={accentColor}
              strokeWidth={strokeWidth + 8}
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
              opacity={0.12}
            />
          )}

          {/* Main arc */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={accentColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
        </svg>

        {/* Center label */}
        <div
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '0.1rem',
            pointerEvents:  'none',
          }}
        >
          {showValue && (
            <span
              style={{
                fontSize:      isSmall ? '0.7rem' : '1.2rem',
                fontWeight:    700,
                color:         accentColor,
                textShadow:    textGlow,
                lineHeight:    1,
                letterSpacing: '-0.02em',
              }}
            >
              {Math.round(pct)}%
            </span>
          )}
          {label && (
            <span
              style={{
                fontSize:      isSmall ? '0.45rem' : '0.55rem',
                color:         'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textAlign:     'center',
                maxWidth:      r * 1.2,
                lineHeight:    1.2,
              }}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    )
  }
)
ProgressRing.displayName = 'ProgressRing'

export { ProgressRing }
