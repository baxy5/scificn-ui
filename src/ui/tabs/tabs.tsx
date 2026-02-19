import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

const Tabs      = TabsPrimitive.Root
const TabsGroup = TabsPrimitive.List  // alias

/* ── List ── */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-end',
      'border-b border-[var(--border)]',
      'w-full gap-0',
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/* ── Trigger ── */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center',
      'px-4 py-2',
      'text-[0.7rem] font-mono font-medium uppercase tracking-widest',
      'border-b-2 border-transparent',
      '-mb-px',
      'text-[var(--text-muted)]',
      'cursor-pointer',
      'outline-none',
      'transition-all duration-150',
      'hover:text-[var(--text-secondary)]',
      'data-[state=active]:text-[var(--color-green)]',
      'data-[state=active]:border-b-[var(--color-green)]',
      'data-[state=active]:[text-shadow:var(--text-glow-green)]',
      'disabled:pointer-events-none disabled:opacity-40',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/* ── Content ── */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4',
      'focus-visible:outline-none',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsGroup, TabsList, TabsTrigger, TabsContent }
