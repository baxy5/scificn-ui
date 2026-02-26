import * as React from 'react'
import { cn } from '@/lib/utils'

export type LineChartVariant = 'DEFAULT' | 'ACTIVE' | 'WARNING' | 'CRITICAL'

export interface LineChartSeries {
  id: string
  label: string
  data: number[]
  variant?: LineChartVariant
}

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  series: LineChartSeries[]
  labels: string[]
  title?: string
  height?: number
  min?: number
  max?: number
  showDots?: boolean
  showArea?: boolean
  showGrid?: boolean
  showLegend?: boolean
  animated?: boolean
}

const LEFT   = 40
const RIGHT  = 8
const TOP    = 8
const BOTTOM = 24

const SERIES_COLORS = [
  'var(--color-green)',
  'var(--color-amber)',
  'var(--color-red)',
  'var(--color-blue)',
]

const VARIANT_COLORS: Record<LineChartVariant, string> = {
  DEFAULT:  'var(--text-secondary)',
  ACTIVE:   'var(--color-green)',
  WARNING:  'var(--color-amber)',
  CRITICAL: 'var(--color-red)',
}

function seriesColor(s: LineChartSeries, idx: number): string {
  if (s.variant) return VARIANT_COLORS[s.variant]
  return SERIES_COLORS[idx % SERIES_COLORS.length]
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      className,
      series,
      labels,
      title,
      height    = 160,
      min,
      max,
      showDots  = true,
      showArea  = false,
      showGrid  = true,
      showLegend,
      animated  = true,
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [svgW, setSvgW] = React.useState(500)
    const [drawn, setDrawn] = React.useState(false)

    React.useEffect(() => {
      if (!containerRef.current) return
      const ro = new ResizeObserver(entries => {
        setSvgW(entries[0].contentRect.width)
      })
      ro.observe(containerRef.current)
      return () => ro.disconnect()
    }, [])

    React.useEffect(() => {
      const id = requestAnimationFrame(() => setDrawn(true))
      return () => cancelAnimationFrame(id)
    }, [])

    const allValues = series.flatMap(s => s.data)
    const dataMin = allValues.length > 0 ? Math.min(...allValues) : 0
    const dataMax = allValues.length > 0 ? Math.max(...allValues) : 100
    const minV = min ?? dataMin
    const maxV = max ?? dataMax
    const range = Math.max(maxV - minV, 1)

    const plotW = svgW - LEFT - RIGHT
    const plotH = height - TOP - BOTTOM
    const n = labels.length

    function xPos(i: number) {
      return LEFT + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW)
    }

    function yPos(v: number) {
      return TOP + (1 - (v - minV) / range) * plotH
    }

    function buildLinePath(data: number[]): string {
      return data
        .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xPos(i).toFixed(1)} ${yPos(v).toFixed(1)}`)
        .join(' ')
    }

    function buildAreaPath(data: number[]): string {
      if (data.length === 0) return ''
      const line = buildLinePath(data)
      const firstX = xPos(0).toFixed(1)
      const lastX  = xPos(data.length - 1).toFixed(1)
      const bottomY = (TOP + plotH).toFixed(1)
      return `${line} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`
    }

    const gridFracs = [0, 1 / 3, 2 / 3, 1]
    const showLeg = showLegend ?? series.length > 1
    const step = Math.max(1, Math.ceil(n / 8))

    const shouldAnimate = animated

    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{
          border:     '1px solid var(--border)',
          background: 'var(--surface)',
          fontFamily: 'var(--font-mono)',
          overflow:   'hidden',
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

        <div ref={containerRef} style={{ width: '100%', height: `${height}px` }}>
          <svg width={svgW} height={height} style={{ display: 'block' }}>
            {/* Grid */}
            {showGrid && gridFracs.map((f, gi) => {
              const y = TOP + f * plotH
              const val = minV + (1 - f) * range
              return (
                <g key={gi}>
                  <line
                    x1={LEFT}
                    y1={y.toFixed(1)}
                    x2={(LEFT + plotW).toFixed(1)}
                    y2={y.toFixed(1)}
                    stroke="var(--border)"
                    strokeWidth={0.5}
                  />
                  <text
                    x={LEFT - 4}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={9}
                    fill="var(--text-muted)"
                    fontFamily="var(--font-mono)"
                  >
                    {val.toFixed(0)}
                  </text>
                </g>
              )
            })}

            {/* X-axis labels */}
            {labels.map((label, i) => {
              if (i % step !== 0 && i !== n - 1) return null
              return (
                <text
                  key={i}
                  x={xPos(i)}
                  y={TOP + plotH + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill="var(--text-muted)"
                  fontFamily="var(--font-mono)"
                >
                  {label}
                </text>
              )
            })}

            {/* Series */}
            {series.map((s, si) => {
              if (s.data.length === 0) return null
              const color = seriesColor(s, si)
              const linePath = buildLinePath(s.data)
              const areaPath = buildAreaPath(s.data)

              return (
                <g key={s.id}>
                  {/* Area fill */}
                  {showArea && (
                    <path d={areaPath} fill={color} opacity={0.1} />
                  )}

                  {/* Glow layer */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth={6}
                    opacity={0.12}
                    pathLength={100}
                    strokeDasharray={100}
                    strokeDashoffset={shouldAnimate ? (drawn ? 0 : 100) : 0}
                    style={shouldAnimate ? { transition: 'stroke-dashoffset 0.8s ease' } : undefined}
                  />

                  {/* Main line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth={1.5}
                    pathLength={100}
                    strokeDasharray={100}
                    strokeDashoffset={shouldAnimate ? (drawn ? 0 : 100) : 0}
                    style={shouldAnimate ? { transition: 'stroke-dashoffset 0.8s ease' } : undefined}
                  />

                  {/* Dots */}
                  {showDots && s.data.map((v, i) => (
                    <circle
                      key={i}
                      cx={xPos(i)}
                      cy={yPos(v)}
                      r={3}
                      fill={color}
                      opacity={shouldAnimate ? (drawn ? 1 : 0) : 1}
                      style={shouldAnimate ? { transition: 'opacity 0.8s ease 0.4s' } : undefined}
                    />
                  ))}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Legend */}
        {showLeg && (
          <div
            style={{
              display:    'flex',
              flexWrap:   'wrap',
              gap:        '0.75rem',
              padding:    '0.5rem 0.75rem',
              borderTop:  '1px solid var(--border)',
              background: 'var(--surface-raised)',
            }}
          >
            {series.map((s, si) => {
              const color = seriesColor(s, si)
              return (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <div
                    style={{
                      width:        '0.5rem',
                      height:       '0.5rem',
                      borderRadius: '50%',
                      background:   color,
                      flexShrink:   0,
                    }}
                  />
                  <span
                    style={{
                      fontSize:      '0.6rem',
                      color:         'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)
LineChart.displayName = 'LineChart'

export { LineChart }
