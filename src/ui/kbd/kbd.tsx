import * as React from 'react'
import { cn } from '@/lib/utils'

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center',
        'font-mono text-[0.7rem] font-medium uppercase tracking-widest',
        'px-1.5 py-0.5 min-w-[1.4rem]',
        'border border-[var(--border)] bg-[var(--surface-raised)]',
        'text-[var(--text-secondary)]',
        'rounded-none',
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
)
Kbd.displayName = 'Kbd'

export { Kbd }
