import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-mono font-medium uppercase tracking-widest',
    'border border-solid',
    'cursor-pointer select-none',
    'transition-all duration-150',
    'focus-visible:outline-none',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
    'rounded-none',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        EXEC: [
          'bg-transparent',
          'border-[var(--color-green)]',
          'text-[var(--color-green)]',
          'hover:bg-[var(--color-green)]',
          'hover:text-[var(--color-bg)]',
          'hover:shadow-[var(--glow-green)]',
          'focus-visible:shadow-[var(--glow-green)]',
        ],
        GHOST: [
          'bg-transparent',
          'border-transparent',
          'text-[var(--text-secondary)]',
          'hover:text-[var(--color-green)]',
          'hover:border-[var(--border)]',
          'focus-visible:border-[var(--border)]',
        ],
        OUTLINE: [
          'bg-[var(--surface)]',
          'border-[var(--border)]',
          'text-[var(--text-secondary)]',
          'hover:border-[var(--border-active)]',
          'hover:text-[var(--color-green)]',
          'hover:shadow-[var(--glow-green)]',
          'focus-visible:border-[var(--border-active)]',
          'focus-visible:shadow-[var(--glow-green)]',
        ],
        ABORT: [
          'bg-transparent',
          'border-[var(--color-red)]',
          'text-[var(--color-red)]',
          'hover:bg-[var(--color-red)]',
          'hover:text-[var(--color-bg)]',
          'hover:shadow-[var(--glow-red)]',
          'focus-visible:shadow-[var(--glow-red)]',
        ],
      },
      size: {
        SM: 'h-7  px-3  text-[0.65rem] gap-1.5',
        MD: 'h-9  px-4  text-[0.75rem] gap-2',
        LG: 'h-11 px-6  text-[0.875rem] gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'OUTLINE',
      size: 'MD',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
