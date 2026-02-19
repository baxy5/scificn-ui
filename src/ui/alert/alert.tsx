import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  [
    'relative w-full',
    'border border-solid border-l-[3px]',
    'p-4',
    'font-mono',
    'rounded-none',
  ],
  {
    variants: {
      variant: {
        STATUS: [
          'border-[var(--border)]',
          'border-l-[var(--color-green)]',
          'bg-[var(--surface)]',
        ],
        WARNING: [
          'border-[var(--border)]',
          'border-l-[var(--color-amber)]',
          'bg-[var(--surface)]',
        ],
        CRITICAL: [
          'border-[var(--border)]',
          'border-l-[var(--color-red)]',
          'bg-[var(--surface)]',
        ],
        INFO: [
          'border-[var(--border)]',
          'border-l-[var(--color-blue)]',
          'bg-[var(--surface)]',
        ],
      },
    },
    defaultVariants: { variant: 'STATUS' },
  }
)

const prefixMap = {
  STATUS:   { symbol: '◈', color: 'var(--color-green)', glow: 'var(--text-glow-green)' },
  WARNING:  { symbol: '⚠', color: 'var(--color-amber)', glow: 'var(--text-glow-amber)' },
  CRITICAL: { symbol: '✕', color: 'var(--color-red)',   glow: 'var(--text-glow-red)' },
  INFO:     { symbol: 'ℹ', color: 'var(--color-blue)',  glow: 'var(--text-glow-blue)' },
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'STATUS', children, ...props }, ref) => {
    const v = variant ?? 'STATUS'
    const prefix = prefixMap[v]

    return (
      <div ref={ref} className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <span
            style={{
              color: prefix.color,
              textShadow: prefix.glow,
              fontSize: '0.85rem',
              lineHeight: 1.5,
              flexShrink: 0,
            }}
          >
            {prefix.symbol}
          </span>
          <div style={{ flex: 1 }}>{children}</div>
        </div>
      </div>
    )
  }
)
Alert.displayName = 'Alert'

/* ── AlertTitle ── */
const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, style, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(className)}
      style={{
        fontSize:      '0.75rem',
        fontWeight:    600,
        color:         'var(--text-secondary)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom:  '0.25rem',
        ...style,
      }}
      {...props}
    />
  )
)
AlertTitle.displayName = 'AlertTitle'

/* ── AlertDescription ── */
const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, style, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(className)}
      style={{
        fontSize:   '0.8rem',
        color:      'var(--text-muted)',
        lineHeight: 1.6,
        ...style,
      }}
      {...props}
    />
  )
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription, alertVariants }
