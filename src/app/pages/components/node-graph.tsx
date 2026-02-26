import { NodeGraph } from '@/ui/node-graph'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'
import { useNarrow } from '@/lib/use-narrow'

const networkNodes = [
  { id: 'core',    label: 'CORE',    x: 50, y: 50, status: 'ACTIVE'   as const, sublabel: 'primary' },
  { id: 'nav',     label: 'NAV',     x: 15, y: 20, status: 'ACTIVE'   as const, sublabel: 'online' },
  { id: 'comms',   label: 'COMMS',   x: 85, y: 20, status: 'WARNING'  as const, sublabel: 'degraded' },
  { id: 'life',    label: 'LIFE',    x: 15, y: 80, status: 'ACTIVE'   as const, sublabel: 'nominal' },
  { id: 'sensors', label: 'SENSORS', x: 85, y: 80, status: 'OFFLINE'  as const, sublabel: 'fault' },
]

const networkEdges = [
  { from: 'core', to: 'nav' },
  { from: 'core', to: 'comms' },
  { from: 'core', to: 'life' },
  { from: 'core', to: 'sensors' },
]

const pipelineNodes = [
  { id: 'ingest',  label: 'INGEST',  x: 12, y: 50, status: 'ACTIVE'   as const },
  { id: 'parse',   label: 'PARSE',   x: 35, y: 50, status: 'ACTIVE'   as const },
  { id: 'filter',  label: 'FILTER',  x: 58, y: 25, status: 'WARNING'  as const },
  { id: 'store',   label: 'STORE',   x: 58, y: 75, status: 'ACTIVE'   as const },
  { id: 'emit',    label: 'EMIT',    x: 82, y: 25, status: 'ACTIVE'   as const },
  { id: 'archive', label: 'ARCHIVE', x: 82, y: 75, status: 'NEUTRAL'  as const },
]

const pipelineEdges = [
  { from: 'ingest', to: 'parse',   animated: true  },
  { from: 'parse',  to: 'filter',  animated: true,  label: 'FILTER' },
  { from: 'parse',  to: 'store',   animated: true,  label: 'STORE' },
  { from: 'filter', to: 'emit',    animated: false },
  { from: 'store',  to: 'archive', animated: false },
]

const previewCode = `import { NodeGraph } from '@/ui/node-graph'

const nodes = [
  { id: 'core',  label: 'CORE',  x: 50, y: 50, status: 'ACTIVE' },
  { id: 'nav',   label: 'NAV',   x: 15, y: 20, status: 'ACTIVE' },
  { id: 'comms', label: 'COMMS', x: 85, y: 20, status: 'WARNING' },
]

const edges = [
  { from: 'core', to: 'nav' },
  { from: 'core', to: 'comms' },
]

<NodeGraph nodes={nodes} edges={edges} title="SHIP NETWORK" />`

const installCode = `npx shadcn@latest add @scificn/node-graph`


const usageCode = `import { NodeGraph, type NodeGraphNode, type NodeGraphEdge } from '@/ui/node-graph'

// Node coordinates are 0–100 in both x and y
const nodes: NodeGraphNode[] = [
  { id: 'a', label: 'ALPHA',  x: 20, y: 50, status: 'ACTIVE' },
  { id: 'b', label: 'BETA',   x: 80, y: 50, status: 'WARNING', sublabel: 'check req' },
]

const edges: NodeGraphEdge[] = [
  { from: 'a', to: 'b', animated: true, label: 'DATA' },
]

<NodeGraph
  nodes={nodes}
  edges={edges}
  directed
  title="DATA PIPELINE"
  height={280}
/>`

export default function NodeGraphPage() {
  const narrow = useNarrow()
  return (
    <div>
      <PageHeader
        title="NODE GRAPH"
        description="SVG node-edge graph for visualizing networks, pipelines, and system topologies. Supports directed arrowheads, animated marching-ants edges, per-node status colors, and hover highlights."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <NodeGraph
              nodes={networkNodes}
              edges={networkEdges}
              title="SHIP SUBSYSTEM NETWORK"
              style={{ width: '100%' }}
            />
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="DIRECTED + ANIMATED">
        <NodeGraph
          nodes={pipelineNodes}
          edges={pipelineEdges}
          directed
          title="DATA PIPELINE // DIRECTED + ANIMATED EDGES"
          style={{ width: '100%' }}
        />
      </Section>

      <Section title="VARIANTS">
        <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : '1fr 1fr', gap: '1rem' }}>
          {(['ACTIVE', 'WARNING', 'CRITICAL', 'DEFAULT'] as const).map((v) => (
            <div key={v}>
              <p style={{ marginBottom: '0.35rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                variant=&quot;{v}&quot;
              </p>
              <NodeGraph
                nodes={[
                  { id: 'a', label: 'ALPHA', x: 20, y: 50 },
                  { id: 'b', label: 'BETA',  x: 80, y: 50 },
                ]}
                edges={[{ from: 'a', to: 'b' }]}
                variant={v}
                directed
                height={120}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="NODE STATUS COLORS">
        <NodeGraph
          nodes={[
            { id: 'a', label: 'ACTIVE',   x: 12, y: 50, status: 'ACTIVE'   },
            { id: 'b', label: 'WARNING',  x: 35, y: 50, status: 'WARNING'  },
            { id: 'c', label: 'CRITICAL', x: 58, y: 50, status: 'CRITICAL' },
            { id: 'd', label: 'OFFLINE',  x: 80, y: 50, status: 'OFFLINE'  },
          ]}
          edges={[
            { from: 'a', to: 'b' },
            { from: 'b', to: 'c' },
            { from: 'c', to: 'd' },
          ]}
          title="NODE STATUS STATES"
          height={160}
          style={{ width: '100%' }}
        />
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'nodes',    type: 'NodeGraphNode[]',                         defaultValue: '—',       description: 'Array of nodes. x/y are 0–100 coordinate space.' },
            { prop: 'edges',    type: 'NodeGraphEdge[]',                         defaultValue: '—',       description: 'Array of from/to edge connections.' },
            { prop: 'variant',  type: 'DEFAULT | ACTIVE | WARNING | CRITICAL',   defaultValue: 'ACTIVE',  description: 'Controls default edge and fallback node color.' },
            { prop: 'title',    type: 'string',                                  defaultValue: 'undefined', description: 'Optional header label.' },
            { prop: 'height',   type: 'number',                                  defaultValue: '320',      description: 'SVG height in px.' },
            { prop: 'directed', type: 'boolean',                                 defaultValue: 'false',    description: 'Show arrowheads on edges.' },
            { prop: 'className', type: 'string',                                 defaultValue: '—',        description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>
    </div>
  )
}
