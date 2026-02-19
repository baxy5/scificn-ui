import * as React from 'react'
import { cn } from '@/lib/utils'

export type GridPreset =
  | '2-col'
  | '3-col'
  | '4-col'
  | 'sidebar-main'
  | 'main-sidebar'

/**
 * Responsive Tailwind classes for each preset.
 * When `columns` prop is provided these are skipped and a custom
 * grid-template-columns inline style is used instead.
 */
const PRESET_CLASSES: Record<GridPreset, string> = {
  '2-col':        'grid-cols-1 sm:grid-cols-2',
  '3-col':        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4-col':        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  'sidebar-main': 'grid-cols-1 md:grid-cols-[240px_1fr]',
  'main-sidebar': 'grid-cols-1 md:grid-cols-[1fr_240px]',
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  preset?:  GridPreset
  /** Custom CSS grid-template-columns — overrides preset and disables responsive classes */
  columns?: string
  gap?:     string | number
  /** Custom CSS grid-template-rows */
  rows?:    string
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      preset  = '2-col',
      columns,
      gap     = '1rem',
      rows,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          // Use Tailwind responsive classes when no custom columns are set
          !columns && PRESET_CLASSES[preset],
          className
        )}
        style={{
          // Custom columns override via inline style (no responsive behaviour)
          ...(columns ? { gridTemplateColumns: columns } : {}),
          gridTemplateRows: rows,
          gap: typeof gap === 'number' ? `${gap}px` : gap,
          ...style,
        }}
        {...props}
      />
    )
  }
)
Grid.displayName = 'Grid'

export { Grid }
