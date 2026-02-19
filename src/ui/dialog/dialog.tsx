import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

const Dialog        = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal  = DialogPrimitive.Portal
const DialogClose   = DialogPrimitive.Close

/* ── Overlay ── */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    style={{ background: 'rgba(7, 5, 15, 0.88)' }}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/* ── Content ── */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50',
        'translate-x-[-50%] translate-y-[-50%]',
        'w-full max-w-lg',
        'border border-[var(--border)]',
        'bg-[var(--surface-raised)]',
        'rounded-none',
        'shadow-[var(--glow-green)]',
        'focus:outline-none',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      style={{ clipPath: 'var(--clip-corner-md)' }}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        style={{
          position:   'absolute',
          right:      '0.75rem',
          top:        '0.75rem',
          background: 'transparent',
          border:     'none',
          color:      'var(--text-muted)',
          cursor:     'pointer',
          fontSize:   '0.8rem',
          padding:    '2px 4px',
          lineHeight: 1,
          transition: 'color 0.15s',
          fontFamily: 'var(--font-mono)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-red)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        ✕
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

/* ── Header ── */
function DialogHeader({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(className)}
      style={{
        padding:      '1rem',
        borderBottom: '1px solid var(--border)',
        ...style,
      }}
      {...props}
    />
  )
}
DialogHeader.displayName = 'DialogHeader'

/* ── Footer ── */
function DialogFooter({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(className)}
      style={{
        display:   'flex',
        justifyContent: 'flex-end',
        gap:       '0.5rem',
        padding:   '1rem',
        borderTop: '1px solid var(--border)',
        ...style,
      }}
      {...props}
    />
  )
}
DialogFooter.displayName = 'DialogFooter'

/* ── Title ── */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(className)}
    style={{
      fontSize:      '0.85rem',
      fontWeight:    700,
      color:         'var(--text-secondary)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      margin:        0,
      ...style,
    }}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

/* ── Description ── */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(className)}
    style={{
      fontSize:   '0.8rem',
      color:      'var(--text-muted)',
      lineHeight: 1.6,
      marginTop:  '0.25rem',
      ...style,
    }}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

/* ── Body ── */
function DialogBody({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(className)}
      style={{ padding: '1rem', ...style }}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
}
