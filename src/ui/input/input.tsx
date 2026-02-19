import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  prefix?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefix, id, style, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize:      '0.65rem',
              color:         error ? 'var(--color-amber)' : 'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </label>
        )}

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {prefix && (
            <span
              style={{
                position:     'absolute',
                left:         '0.625rem',
                color:        'var(--text-muted)',
                fontSize:     '0.8rem',
                pointerEvents:'none',
                userSelect:   'none',
              }}
            >
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-9 bg-[var(--surface)] font-mono text-[0.8rem]',
              'border border-[var(--border)]',
              'text-[var(--text-secondary)]',
              'placeholder:text-[var(--text-muted)]',
              'outline-none rounded-none',
              'transition-all duration-150',
              'focus:border-[var(--border-active)] focus:shadow-[var(--glow-green)]',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              error && 'border-[var(--color-amber)] focus:shadow-[var(--glow-amber)]',
              className
            )}
            style={{
              padding: prefix ? '0 0.75rem 0 1.75rem' : '0 0.75rem',
              caretColor: 'var(--color-green)',
              ...style,
            }}
            {...props}
          />
        </div>

        {error && (
          <span
            style={{
              fontSize:      '0.65rem',
              color:         'var(--color-amber)',
              letterSpacing: '0.06em',
            }}
          >
            ⚠ {error}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
