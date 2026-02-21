import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-[var(--surface-raised)] border border-[var(--border)]',
        'rounded-none',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
