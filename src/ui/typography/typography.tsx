import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const typographyVariants = cva('font-mono', {
  variants: {
    variant: {
      H1: 'text-3xl font-bold uppercase tracking-[0.15em] text-[var(--color-green)] text-shadow-[var(--text-glow-green)]',
      H2: 'text-2xl font-semibold uppercase tracking-[0.12em] text-[var(--color-green)]',
      H3: 'text-xl font-semibold uppercase tracking-[0.1em] text-[var(--text-secondary)]',
      H4: 'text-base font-medium uppercase tracking-widest text-[var(--text-secondary)]',
      P: 'text-sm leading-relaxed text-[var(--text-secondary)]',
      LEAD: 'text-base leading-relaxed text-[var(--text-secondary)] opacity-90',
      MUTED: 'text-xs text-[var(--text-muted)]',
      CODE: 'text-sm bg-[var(--surface-raised)] border border-[var(--border)] px-1.5 py-0.5 text-[var(--color-green)] inline-block',
    },
  },
  defaultVariants: { variant: 'P' },
})

type VariantElement = {
  H1: 'h1'
  H2: 'h2'
  H3: 'h3'
  H4: 'h4'
  P: 'p'
  LEAD: 'p'
  MUTED: 'p'
  CODE: 'code'
}

const variantTag: VariantElement = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  P: 'p',
  LEAD: 'p',
  MUTED: 'p',
  CODE: 'code',
}

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: keyof React.JSX.IntrinsicElements
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'P', as, children, ...props }, ref) => {
    const Tag = (as ?? variantTag[variant as keyof VariantElement] ?? 'p') as React.ElementType
    return (
      <Tag
        ref={ref}
        className={cn(typographyVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
Typography.displayName = 'Typography'

export { Typography, typographyVariants }
