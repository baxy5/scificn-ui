import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { cn } from '@/lib/utils'
import type { ToastVariant } from './use-toast'

const ToastProvider  = ToastPrimitive.Provider
const ToastViewport  = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn('fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 w-80', className)}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const variantStyles: Record<ToastVariant, { borderColor: string; symbol: string; glow: string }> = {
  STATUS:   { borderColor: 'var(--color-green)',  symbol: '◈', glow: 'var(--glow-green)' },
  WARNING:  { borderColor: 'var(--color-amber)',  symbol: '⚠', glow: 'var(--glow-amber)' },
  CRITICAL: { borderColor: 'var(--color-red)',    symbol: '✕', glow: 'var(--glow-red)' },
  INFO:     { borderColor: 'var(--color-blue)',   symbol: 'ℹ', glow: 'var(--glow-blue)' },
}

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: ToastVariant
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant = 'STATUS', children, ...props }, ref) => {
  const vs = variantStyles[variant]
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex items-start gap-3',
        'border border-l-[3px] rounded-none',
        'bg-[var(--surface-raised)]',
        'p-3',
        'font-mono',
        'data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full',
        'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full',
        className
      )}
      style={{
        borderColor:  'var(--border)',
        borderLeftColor: vs.borderColor,
        boxShadow:    vs.glow,
      }}
      {...props}
    >
      <span
        style={{
          color:      vs.borderColor,
          fontSize:   '0.8rem',
          lineHeight: 1.5,
          flexShrink: 0,
        }}
      >
        {vs.symbol}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      <ToastPrimitive.Close
        style={{
          background:   'transparent',
          border:       'none',
          color:        'var(--text-muted)',
          cursor:       'pointer',
          fontSize:     '0.7rem',
          padding:      '0 2px',
          lineHeight:   1,
          fontFamily:   'var(--font-mono)',
          flexShrink:   0,
          alignSelf:    'flex-start',
        }}
      >
        ✕
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  )
})
Toast.displayName = ToastPrimitive.Root.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, style, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn(className)}
    style={{
      fontSize:      '0.75rem',
      fontWeight:    600,
      color:         'var(--text-secondary)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      ...style,
    }}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, style, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn(className)}
    style={{
      fontSize:   '0.75rem',
      color:      'var(--text-muted)',
      lineHeight: 1.5,
      marginTop:  '0.2rem',
      ...style,
    }}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
}
