import * as React from 'react'
import { cn } from '@/lib/utils'

export type NodeGraphVariant = 'DEFAULT' | 'ACTIVE' | 'WARNING' | 'CRITICAL'
export type NodeStatus = 'ACTIVE' | 'OFFLINE' | 'WARNING' | 'CRITICAL' | 'NEUTRAL'

export interface NodeGraphNode {
  id: string
  label: string
  x: number       // 0–100 coordinate space
  y: number
  status?: NodeStatus
  sublabel?: string
}

export interface NodeGraphEdge {
  from: string
  to: string
  label?: string
  animated?: boolean
}

export interface NodeGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: NodeGraphNode[]
  edges: NodeGraphEdge[]
  variant?: NodeGraphVariant
  title?: string
  height?: number
  directed?: boolean
}

const VARIANT_COLORS: Record<NodeGraphVariant, string> = {
  DEFAULT:  'var(--text-secondary)',
  ACTIVE:   'var(--color-green)',
  WARNING:  'var(--color-amber)',
  CRITICAL: 'var(--color-red)',
}

const STATUS_COLOR: Record<NodeStatus, string> = {
  ACTIVE:   'var(--color-green)',
  OFFLINE:  'var(--border)',
  WARNING:  'var(--color-amber)',
  CRITICAL: 'var(--color-red)',
  NEUTRAL:  'var(--text-muted)',
}

const NODE_W = 100
const NODE_H = 36

const NodeGraph = React.forwardRef<HTMLDivElement, NodeGraphProps>(
  (
    {
      className,
      nodes,
      edges,
      variant  = 'ACTIVE',
      title,
      height   = 320,
      directed = false,
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [svgW, setSvgW] = React.useState(600)
    const [hovered, setHovered] = React.useState<string | null>(null)

    React.useEffect(() => {
      if (!containerRef.current) return
      const ro = new ResizeObserver(entries => {
        setSvgW(entries[0].contentRect.width)
      })
      ro.observe(containerRef.current)
      return () => ro.disconnect()
    }, [])

    const color = VARIANT_COLORS[variant]
    const markerId = `arrow-${variant}`

    function nodePx(node: NodeGraphNode) {
      return (node.x / 100) * svgW
    }

    function nodePy(node: NodeGraphNode) {
      return (node.y / 100) * height
    }

    function edgeEndpoints(fromNode: NodeGraphNode, toNode: NodeGraphNode) {
      const fx = nodePx(fromNode)
      const fy = nodePy(fromNode)
      const tx = nodePx(toNode)
      const ty = nodePy(toNode)
      const dx = tx - fx
      const dy = ty - fy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 1) return { x1: fx, y1: fy, x2: tx, y2: ty }

      const ux = dx / dist
      const uy = dy / dist
      const hw = NODE_W / 2
      const hh = NODE_H / 2

      const tW = Math.abs(ux) > 0.001 ? hw / Math.abs(ux) : Infinity
      const tH = Math.abs(uy) > 0.001 ? hh / Math.abs(uy) : Infinity
      const t  = Math.min(tW, tH)

      return {
        x1: fx + ux * t,
        y1: fy + uy * t,
        x2: tx - ux * t,
        y2: ty - uy * t,
      }
    }

    const nodeMap = new Map(nodes.map(n => [n.id, n]))
    const hasAnimatedEdge = edges.some(e => e.animated)

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
            <defs>
              {directed && (
                <marker
                  id={markerId}
                  markerWidth="6"
                  markerHeight="6"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M 0 0 L 6 3 L 0 6 Z" fill={color} />
                </marker>
              )}
            </defs>

            {hasAnimatedEdge && (
              <style>{`
                @keyframes nodeGraphDash { to { stroke-dashoffset: -8; } }
              `}</style>
            )}

            {/* Edges */}
            {edges.map((edge, ei) => {
              const fromNode = nodeMap.get(edge.from)
              const toNode   = nodeMap.get(edge.to)
              if (!fromNode || !toNode) return null

              const { x1, y1, x2, y2 } = edgeEndpoints(fromNode, toNode)
              const mx = (x1 + x2) / 2
              const my = (y1 + y2) / 2

              return (
                <g key={ei}>
                  <line
                    x1={x1.toFixed(1)}
                    y1={y1.toFixed(1)}
                    x2={x2.toFixed(1)}
                    y2={y2.toFixed(1)}
                    stroke={color}
                    strokeWidth={1}
                    opacity={0.5}
                    strokeDasharray={edge.animated ? '4 4' : undefined}
                    markerEnd={directed ? `url(#${markerId})` : undefined}
                    style={edge.animated
                      ? { animation: 'nodeGraphDash 0.5s linear infinite' }
                      : undefined}
                  />
                  {edge.label && (
                    <text
                      x={mx.toFixed(1)}
                      y={my.toFixed(1)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={8}
                      fill="var(--text-muted)"
                      fontFamily="var(--font-mono)"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const cx = nodePx(node)
              const cy = nodePy(node)
              const isHovered   = hovered === node.id
              const statusColor = node.status ? STATUS_COLOR[node.status] : color

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'default' }}
                >
                  {/* Background */}
                  <rect
                    x={(cx - NODE_W / 2).toFixed(1)}
                    y={(cy - NODE_H / 2).toFixed(1)}
                    width={NODE_W}
                    height={NODE_H}
                    fill="var(--surface-raised)"
                  />
                  {/* Hover tint */}
                  {isHovered && (
                    <rect
                      x={(cx - NODE_W / 2).toFixed(1)}
                      y={(cy - NODE_H / 2).toFixed(1)}
                      width={NODE_W}
                      height={NODE_H}
                      fill={statusColor}
                      fillOpacity={0.12}
                    />
                  )}
                  {/* Border */}
                  <rect
                    x={(cx - NODE_W / 2).toFixed(1)}
                    y={(cy - NODE_H / 2).toFixed(1)}
                    width={NODE_W}
                    height={NODE_H}
                    fill="none"
                    stroke={statusColor}
                    strokeWidth={isHovered ? 1.5 : 1}
                  />

                  {/* Label */}
                  <text
                    x={cx.toFixed(1)}
                    y={(node.sublabel ? cy - 5 : cy).toFixed(1)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fill={statusColor}
                    fontFamily="var(--font-mono)"
                    fontWeight="600"
                  >
                    {node.label.toUpperCase()}
                  </text>

                  {/* Sublabel */}
                  {node.sublabel && (
                    <text
                      x={cx.toFixed(1)}
                      y={(cy + 8).toFixed(1)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={8}
                      fill="var(--text-muted)"
                      fontFamily="var(--font-mono)"
                    >
                      {node.sublabel}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    )
  }
)
NodeGraph.displayName = 'NodeGraph'

export { NodeGraph }
