import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, style, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%' }}>
        {label && (
          <label
            htmlFor={textareaId}
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

        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full bg-[var(--surface)] font-mono text-[0.8rem]',
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
            padding:    '0.5rem 0.75rem',
            resize:     'none',
            caretColor: 'var(--color-green)',
            minHeight:  '80px',
            ...style,
          }}
          {...props}
        />

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
Textarea.displayName = 'Textarea'

export { Textarea }
