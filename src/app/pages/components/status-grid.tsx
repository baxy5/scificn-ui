import { StatusGrid, type SystemEntry } from '@/ui/status-grid'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const demoSystems: SystemEntry[] = [
  { name: 'LIFE SUPPORT',    status: 'ACTIVE'   },
  { name: 'NAVIGATION',      status: 'ACTIVE'   },
  { name: 'WEAPONS ARRAY',   status: 'OFFLINE',  detail: 'maintenance' },
  { name: 'SHIELD EMITTER',  status: 'WARNING',  detail: '61%' },
  { name: 'WARP CORE',       status: 'SCANNING' },
  { name: 'COMM RELAY',      status: 'ACTIVE'   },
  { name: 'HULL PLATING',    status: 'WARNING',  detail: 'sector 7' },
  { name: 'REACTOR COOLANT', status: 'CRITICAL', detail: 'overheat' },
]

const previewCode = `import { StatusGrid, type SystemEntry } from '@/ui/status-grid'

const systems: SystemEntry[] = [
  { name: 'LIFE SUPPORT',   status: 'ACTIVE'   },
  { name: 'NAVIGATION',     status: 'ACTIVE'   },
  { name: 'WEAPONS ARRAY',  status: 'OFFLINE', detail: 'maintenance' },
  { name: 'SHIELD EMITTER', status: 'WARNING', detail: '61%' },
  { name: 'WARP CORE',      status: 'SCANNING' },
  { name: 'COMM RELAY',     status: 'ACTIVE'   },
  { name: 'HULL PLATING',   status: 'WARNING',  detail: 'sector 7' },
  { name: 'REACTOR COOLANT',status: 'CRITICAL', detail: 'overheat' },
]

<StatusGrid systems={systems} title="SHIP SYSTEMS" columns={2} />`

const installCode = `npm install clsx tailwind-merge`

const usageCode = `import { StatusGrid, type SystemEntry } from '@/ui/status-grid'

const systems: SystemEntry[] = [
  { name: 'API GATEWAY',   status: 'ACTIVE' },
  { name: 'DATABASE',      status: 'ACTIVE' },
  { name: 'AUTH SERVICE',  status: 'WARNING', detail: 'latency spike' },
  { name: 'CDN',           status: 'ACTIVE' },
]

<StatusGrid
  systems={systems}
  title="INFRASTRUCTURE"
  columns={2}
/>`

export default function StatusGridPage() {
  return (
    <div>
      <PageHeader
        title="STATUS GRID"
        description="System health board for dashboards. Each row shows a service name with a live status dot and label. Supports 1–3 column layouts."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <StatusGrid
              systems={demoSystems}
              title="SHIP SYSTEMS"
              columns={2}
              style={{ width: '100%' }}
            />
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/status-grid/status-grid.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="COLUMNS">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {([1, 2, 3] as const).map((cols) => (
            <div key={cols}>
              <p style={{ marginBottom: '0.5rem', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                columns={cols}
              </p>
              <StatusGrid
                systems={demoSystems.slice(0, cols * 2)}
                columns={cols}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="STATUSES">
        <StatusGrid
          title="STATUS REFERENCE"
          columns={1}
          style={{ width: '100%' }}
          systems={[
            { name: 'ACTIVE',   status: 'ACTIVE',   detail: 'nominal operation' },
            { name: 'SCANNING', status: 'SCANNING', detail: 'pulsing dot, in progress' },
            { name: 'WARNING',  status: 'WARNING',  detail: 'degraded or partial' },
            { name: 'CRITICAL', status: 'CRITICAL', detail: 'failure or overheat' },
            { name: 'OFFLINE',  status: 'OFFLINE',  detail: 'powered down' },
          ]}
        />
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'systems',  type: 'SystemEntry[]', defaultValue: '—',    description: 'Array of system entries to display.' },
            { prop: 'title',    type: 'string',        defaultValue: 'undefined', description: 'Optional header label shown above the grid.' },
            { prop: 'columns',  type: '1 | 2 | 3',    defaultValue: '1',    description: 'Number of columns in the grid layout.' },
            { prop: 'className',type: 'string',        defaultValue: '—',    description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>

      <Section title="SYSTEMENTRY FIELDS">
        <PropsTable
          rows={[
            { prop: 'name',   type: 'string',                                           defaultValue: '—',         description: 'Service or system name displayed on the left.' },
            { prop: 'status', type: 'ACTIVE | OFFLINE | WARNING | CRITICAL | SCANNING', defaultValue: '—',         description: 'Controls the dot color, glow, and status label.' },
            { prop: 'detail', type: 'string',                                           defaultValue: 'undefined', description: 'Optional muted secondary text shown beside the name.' },
          ]}
        />
      </Section>
    </div>
  )
}
