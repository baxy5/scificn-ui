import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  showValue?: boolean
  label?: string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, showValue = true, label, ...props }, ref) => {
  const pct     = Math.min(Math.max(value ?? 0, 0), 100)
  const filled  = Math.round((pct / 100) * 20)
  const empty   = 20 - filled
  const barText = '='.repeat(filled) + ' '.repeat(empty)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '100%' }}>
      {label && (
        <span
          style={{
            fontSize:      '0.65rem',
            color:         'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      )}

      <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative w-full overflow-hidden rounded-none', className)}
        value={value}
        {...props}
      >
        {/* Bracket-style visual */}
        <div
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '0.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.75rem',
            color:      'var(--color-green)',
            textShadow: 'var(--text-glow-green)',
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>[</span>
          <span style={{ letterSpacing: '-0.05em', whiteSpace: 'pre' }}>{barText}</span>
          <span style={{ color: 'var(--text-muted)' }}>]</span>
          {showValue && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginLeft: '0.25rem' }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>

        {/* Accessible indicator (visually hidden, only for Radix a11y) */}
        <ProgressPrimitive.Indicator
          style={{
            position:  'absolute',
            width:     '1px',
            height:    '1px',
            overflow:  'hidden',
            clip:      'rect(0,0,0,0)',
            transform: `translateX(-${100 - pct}%)`,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
