import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, id, ...props }, ref) => {
  const switchId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem' }}>
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={cn(
          'peer inline-flex items-center shrink-0',
          'h-6 w-14',
          'rounded-none',
          'border border-[var(--border)]',
          'bg-[var(--surface)]',
          'cursor-pointer',
          'focus-visible:outline-none',
          'focus-visible:border-[var(--border-active)]',
          'focus-visible:shadow-[var(--glow-green)]',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'data-[state=checked]:border-[var(--color-green)]',
          'data-[state=checked]:shadow-[var(--glow-green)]',
          'transition-all duration-150',
          'font-mono text-[0.6rem] tracking-widest',
          'relative overflow-hidden',
          className
        )}
        {...props}
      >
        {/* OFF label */}
        <span
          className="absolute left-1.5 select-none"
          style={{
            color:         'var(--text-muted)',
            letterSpacing: '0.04em',
            fontSize:      '0.6rem',
            transition:    'opacity 0.15s',
          }}
          aria-hidden="true"
        >
          [OFF]
        </span>

        <SwitchPrimitive.Thumb asChild>
          {/* Invisible thumb — state is conveyed via root styles + text */}
          <span style={{ display: 'none' }} />
        </SwitchPrimitive.Thumb>

        {/* ON label — shows when checked via CSS */}
        <span
          className="absolute right-1.5 select-none peer-data-[state=unchecked]:opacity-0"
          style={{
            color:         'var(--color-green)',
            textShadow:    'var(--text-glow-green)',
            letterSpacing: '0.04em',
            fontSize:      '0.6rem',
            transition:    'opacity 0.15s',
          }}
          aria-hidden="true"
        >
          [ON]
        </span>
      </SwitchPrimitive.Root>

      {label && (
        <label
          htmlFor={switchId}
          style={{
            fontSize:      '0.75rem',
            color:         'var(--text-secondary)',
            letterSpacing: '0.05em',
            cursor:        'pointer',
            userSelect:    'none',
          }}
        >
          {label}
        </label>
      )}
    </div>
  )
})
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
