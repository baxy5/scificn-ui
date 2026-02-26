import * as React from 'react'
import { cn } from '@/lib/utils'

export type RadarChartVariant = 'DEFAULT' | 'ACTIVE' | 'WARNING' | 'CRITICAL'

export interface RadarChartEntry {
  axis: string
  value: number  // 0–100
}

export interface RadarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: RadarChartEntry[]
  variant?: RadarChartVariant
  title?: string
  size?: number
  showGrid?: boolean
  showLabels?: boolean
  showValues?: boolean
}

const VARIANT_COLORS: Record<RadarChartVariant, string> = {
  DEFAULT:  'var(--text-secondary)',
  ACTIVE:   'var(--color-green)',
  WARNING:  'var(--color-amber)',
  CRITICAL: 'var(--color-red)',
}

const LABEL_PAD = 36

const RadarChart = React.forwardRef<HTMLDivElement, RadarChartProps>(
  (
    {
      className,
      data,
      variant    = 'ACTIVE',
      title,
      size       = 240,
      showGrid   = true,
      showLabels = true,
      showValues = false,
      style,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false)
    React.useEffect(() => {
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    }, [])

    const color = VARIANT_COLORS[variant]
    const cx = size / 2
    const cy = size / 2
    const r  = size / 2 - LABEL_PAD
    const N  = data.length

    function axisAngle(i: number) {
      return (i / N) * 2 * Math.PI - Math.PI / 2
    }

    function gridPolygon(frac: number): string {
      return data
        .map((_, i) => {
          const a = axisAngle(i)
          return `${(cx + frac * r * Math.cos(a)).toFixed(2)},${(cy + frac * r * Math.sin(a)).toFixed(2)}`
        })
        .join(' ')
    }

    const points = data.map((entry, i) => {
      const a    = axisAngle(i)
      const frac = Math.max(0, Math.min(1, entry.value / 100))
      return {
        x:     cx + frac * r * Math.cos(a),
        y:     cy + frac * r * Math.sin(a),
        ax:    cx + r * Math.cos(a),
        ay:    cy + r * Math.sin(a),
        a,
        label: entry.axis,
        value: entry.value,
      }
    })

    const dataPolygon = points.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')

    function labelAnchor(a: number): React.SVGAttributes<SVGTextElement>['textAnchor'] {
      const c = Math.cos(a)
      if (Math.abs(c) < 0.3) return 'middle'
      return c > 0 ? 'start' : 'end'
    }

    function labelBaseline(a: number): React.SVGAttributes<SVGTextElement>['dominantBaseline'] {
      const s = Math.sin(a)
      if (s < -0.7) return 'auto'
      if (s > 0.7)  return 'hanging'
      return 'middle'
    }

    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{
          border:     '1px solid var(--border)',
          background: 'var(--surface)',
          fontFamily: 'var(--font-mono)',
          overflow:   'hidden',
          display:    'inline-block',
          ...style,
        }}
        {...props}
      >
        {title && (
          <div
            style={{
              padding:       '0.4rem 0.75rem',
              borderBottom:  '1px solid var(--border)',
              background:    'var(--surface-raised)',
              fontSize:      '0.6rem',
              color:         'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
        )}

        <svg width={size} height={size} style={{ display: 'block' }}>
          {/* Grid polygons */}
          {showGrid && [1 / 3, 2 / 3, 1].map((frac, gi) => (
            <polygon
              key={gi}
              points={gridPolygon(frac)}
              stroke="var(--border)"
              fill="none"
              strokeWidth={0.5}
              strokeDasharray="2 2"
            />
          ))}

          {/* Axis lines */}
          {points.map((p, i) => (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.ax.toFixed(2)}
              y2={p.ay.toFixed(2)}
              stroke="var(--border)"
              strokeWidth={0.5}
            />
          ))}

          {/* Data polygon group (animated fade-in) */}
          <g
            style={{
              opacity:    visible ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            {/* Glow */}
            <polygon
              points={dataPolygon}
              stroke={color}
              strokeWidth={6}
              fill="none"
              opacity={0.1}
            />

            {/* Main polygon */}
            <polygon
              points={dataPolygon}
              stroke={color}
              strokeWidth={1.5}
              fill={color}
              fillOpacity={0.15}
            />

            {/* Vertex dots */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x.toFixed(2)}
                cy={p.y.toFixed(2)}
                r={3}
                fill={color}
              />
            ))}

            {/* Value labels */}
            {showValues && points.map((p, i) => (
              <text
                key={i}
                x={(p.x + Math.cos(p.a) * 10).toFixed(2)}
                y={(p.y + Math.sin(p.a) * 10).toFixed(2)}
                textAnchor={labelAnchor(p.a)}
                dominantBaseline="middle"
                fontSize={8}
                fill={color}
                fontFamily="var(--font-mono)"
              >
                {p.value}
              </text>
            ))}
          </g>

          {/* Axis labels */}
          {showLabels && points.map((p, i) => {
            const lx = cx + (r + 8) * Math.cos(p.a)
            const ly = cy + (r + 8) * Math.sin(p.a)
            return (
              <text
                key={i}
                x={lx.toFixed(2)}
                y={ly.toFixed(2)}
                textAnchor={labelAnchor(p.a)}
                dominantBaseline={labelBaseline(p.a)}
                fontSize={9}
                fill="var(--text-muted)"
                fontFamily="var(--font-mono)"
              >
                {p.label.toUpperCase()}
              </text>
            )
          })}
        </svg>
      </div>
    )
  }
)
RadarChart.displayName = 'RadarChart'

export { RadarChart }
