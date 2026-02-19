import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '@/lib/utils'

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  label?: string
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = 'horizontal', decorative = true, label, style, ...props },
    ref
  ) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '0.75rem',
            width:      '100%',
            ...style,
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span
            style={{
              fontSize:      '0.6rem',
              color:         'var(--text-muted)',
              letterSpacing: '0.12em',
              whiteSpace:    'nowrap',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>
      )
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 rounded-none',
          orientation === 'horizontal'
            ? 'h-px w-full'
            : 'h-full w-px',
          className
        )}
        style={{
          background: 'var(--border)',
          ...style,
        }}
        {...props}
      />
    )
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
