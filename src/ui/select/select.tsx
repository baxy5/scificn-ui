import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@/lib/utils'

const Select       = SelectPrimitive.Root
const SelectGroup  = SelectPrimitive.Group
const SelectValue  = SelectPrimitive.Value

/* ── Trigger ── */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-9 w-full items-center justify-between',
      'border border-[var(--border)] bg-[var(--surface)]',
      'px-3 py-0',
      'text-[0.8rem] font-mono text-[var(--text-secondary)]',
      'rounded-none',
      'outline-none',
      'focus:border-[var(--border-active)] focus:shadow-[var(--glow-green)]',
      'disabled:cursor-not-allowed disabled:opacity-40',
      'data-[placeholder]:text-[var(--text-muted)]',
      'transition-all duration-150',
      '[&>span]:pointer-events-none',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginLeft: '0.5rem' }}>▼</span>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/* ── Content ── */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden',
        'border border-[var(--border)] bg-[var(--surface-raised)]',
        'rounded-none',
        'shadow-[0_8px_24px_#07050F99]',
        position === 'popper' && 'w-[var(--radix-select-trigger-width)]',
        className
      )}
      position={position}
      sideOffset={4}
      {...props}
    >
      <SelectPrimitive.Viewport style={{ padding: '4px 0' }}>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/* ── Label ── */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(className)}
    style={{
      padding:       '0.25rem 0.75rem',
      fontSize:      '0.6rem',
      color:         'var(--text-muted)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    }}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

/* ── Item ── */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center',
      'py-1.5 pl-3 pr-8',
      'text-[0.8rem] font-mono text-[var(--text-secondary)]',
      'outline-none rounded-none',
      'data-[highlighted]:bg-[var(--surface)] data-[highlighted]:text-[var(--color-green)]',
      'data-[highlighted]:shadow-[inset_2px_0_0_var(--color-green)]',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
      'transition-all duration-100',
      className
    )}
    {...props}
  >
    <span style={{ position: 'absolute', right: '0.5rem' }}>
      <SelectPrimitive.ItemIndicator>
        <span style={{ color: 'var(--color-green)', fontSize: '0.6rem' }}>■</span>
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

/* ── Separator ── */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px', className)}
    style={{ background: 'var(--border)' }}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
