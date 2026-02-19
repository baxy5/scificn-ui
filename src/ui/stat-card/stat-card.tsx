import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const statCardVariants = cva(
  [
    'relative flex flex-col font-mono',
    'border border-solid rounded-none',
  ],
  {
    variants: {
      variant: {
        DEFAULT:  ['border-[var(--border)]'],
        ACTIVE:   ['border-[var(--color-green)]'],
        WARNING:  ['border-[var(--color-amber)]'],
        CRITICAL: ['border-[var(--color-red)]'],
      },
    },
    defaultVariants: { variant: 'DEFAULT' },
  }
)

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  label: string
  value: string | number
  /** Delta text, e.g. "+2.3%" */
  delta?: string
  /** true = positive (▲ green), false = negative (▼ red), undefined = neutral */
  deltaPositive?: boolean
  /** Small status line shown at the bottom of the card */
  sublabel?: string
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      variant = 'DEFAULT',
      label,
      value,
      delta,
      deltaPositive,
      sublabel,
      style,
      ...props
    },
    ref
  ) => {
    const accentColor =
      variant === 'ACTIVE'   ? 'var(--color-green)' :
      variant === 'WARNING'  ? 'var(--color-amber)' :
      variant === 'CRITICAL' ? 'var(--color-red)'   :
      'var(--text-secondary)'

    const accentGlow =
      variant === 'ACTIVE'   ? 'var(--text-glow-green)' :
      variant === 'WARNING'  ? 'var(--text-glow-amber)'  :
      variant === 'CRITICAL' ? 'var(--text-glow-red)'    :
      'none'

    const deltaColor =
      deltaPositive === true  ? 'var(--color-green)' :
      deltaPositive === false ? 'var(--color-red)'   :
      'var(--text-muted)'

    const deltaSymbol =
      deltaPositive === true  ? '▲ ' :
      deltaPositive === false ? '▼ ' :
      '— '

    return (
      <div
        ref={ref}
        className={cn(statCardVariants({ variant }), className)}
        style={{
          padding:    '1rem',
          gap:        '0.4rem',
          background: 'var(--surface)',
          ...style,
        }}
        {...props}
      >
        {/* Label */}
        <div
          style={{
            fontSize:      '0.6rem',
            color:         'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>

        {/* Value */}
        <div
          style={{
            fontSize:      '2rem',
            fontWeight:    700,
            color:         accentColor,
            textShadow:    accentGlow,
            lineHeight:    1,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </div>

        {/* Delta */}
        {delta !== undefined && (
          <div
            style={{
              fontSize:      '0.7rem',
              color:         deltaColor,
              letterSpacing: '0.05em',
            }}
          >
            {deltaSymbol}{delta}
          </div>
        )}

        {/* Sublabel */}
        {sublabel && (
          <div
            style={{
              fontSize:      '0.6rem',
              color:         'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop:     'auto',
              paddingTop:    '0.6rem',
              borderTop:     '1px solid var(--border)',
            }}
          >
            {sublabel}
          </div>
        )}
      </div>
    )
  }
)
StatCard.displayName = 'StatCard'

export { StatCard, statCardVariants }
