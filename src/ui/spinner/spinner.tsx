import * as React from 'react'
import { cn } from '@/lib/utils'

const frames = ['|', '/', '-', '\\'] as const
const sizeMap = { SM: '0.75rem', MD: '0.875rem', LG: '1rem' }

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'SM' | 'MD' | 'LG'
  label?: string
}

function Spinner({ className, size = 'MD', label, style, ...props }: SpinnerProps) {
  const [frame, setFrame] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % frames.length), 120)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className={cn('inline-flex items-center gap-1.5 font-mono', className)}
      style={{ fontSize: sizeMap[size], color: 'var(--color-green)', ...style }}
      aria-label={label ?? 'Loading'}
      role="status"
      {...props}
    >
      <span
        style={{
          display:     'inline-block',
          width:       '1ch',
          textAlign:   'center',
          textShadow:  'var(--text-glow-green)',
          userSelect:  'none',
        }}
        aria-hidden="true"
      >
        {frames[frame]}
      </span>
      {label && (
        <span
          style={{
            letterSpacing: '0.08em',
            color:         'var(--text-muted)',
            animation:     'blink-cursor 1.5s step-end infinite',
          }}
        >
          {label}
        </span>
      )}
    </span>
  )
}

export { Spinner }
