import { BarChart } from '@/ui/bar-chart'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const horizontalData = [
  { label: 'REACTOR',  value: 87 },
  { label: 'SHIELDS',  value: 61 },
  { label: 'ENGINES',  value: 94 },
  { label: 'COMMS',    value: 32 },
  { label: 'SENSORS',  value: 78 },
]

const verticalData = [
  { label: 'MON', value: 45 },
  { label: 'TUE', value: 78 },
  { label: 'WED', value: 92 },
  { label: 'THU', value: 61 },
  { label: 'FRI', value: 83 },
  { label: 'SAT', value: 38 },
  { label: 'SUN', value: 57 },
]

const previewCode = `import { BarChart } from '@/ui/bar-chart'

const systems = [
  { label: 'REACTOR', value: 87 },
  { label: 'SHIELDS', value: 61 },
  { label: 'ENGINES', value: 94 },
  { label: 'COMMS',   value: 32 },
]

<BarChart data={systems} title="SYSTEM LOAD" orientation="horizontal" />`

const installCode = `npm install clsx tailwind-merge`

const usageCode = `import { BarChart, type BarChartEntry } from '@/ui/bar-chart'

const data: BarChartEntry[] = [
  { label: 'ALPHA',   value: 87 },
  { label: 'BETA',    value: 45 },
  { label: 'GAMMA',   value: 72 },
]

// Horizontal (default)
<BarChart data={data} title="SIGNAL STRENGTH" variant="ACTIVE" />

// Vertical
<BarChart data={data} title="DAILY ACTIVITY" orientation="vertical" variant="WARNING" />`

export default function BarChartPage() {
  return (
    <div>
      <PageHeader
        title="BAR CHART"
        description="CSS-only bar chart. No charting library dependency. Supports horizontal and vertical orientations with four color variants."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <BarChart
              data={horizontalData}
              title="SYSTEM LOAD"
              orientation="horizontal"
              style={{ width: '100%' }}
            />
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/bar-chart/bar-chart.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="ORIENTATIONS">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              orientation=&quot;horizontal&quot;
            </p>
            <BarChart data={horizontalData} title="SYSTEM LOAD" orientation="horizontal" />
          </div>
          <div>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              orientation=&quot;vertical&quot;
            </p>
            <BarChart data={verticalData} title="WEEKLY UPTIME" orientation="vertical" />
          </div>
        </div>
      </Section>

      <Section title="VARIANTS">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(['ACTIVE', 'WARNING', 'CRITICAL', 'DEFAULT'] as const).map((v) => (
            <div key={v}>
              <p style={{ marginBottom: '0.35rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                variant=&quot;{v}&quot;
              </p>
              <BarChart
                data={horizontalData.slice(0, 3)}
                variant={v}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'data',        type: 'BarChartEntry[]',                       defaultValue: '—',            description: 'Array of { label, value } entries.' },
            { prop: 'orientation', type: '"horizontal" | "vertical"',             defaultValue: '"horizontal"', description: 'Bar direction.' },
            { prop: 'variant',     type: 'DEFAULT | ACTIVE | WARNING | CRITICAL', defaultValue: 'ACTIVE',       description: 'Controls bar color and glow.' },
            { prop: 'title',       type: 'string',                                defaultValue: 'undefined',    description: 'Optional header label.' },
            { prop: 'showValues',  type: 'boolean',                               defaultValue: 'true',         description: 'Show value labels beside/above each bar.' },
            { prop: 'max',         type: 'number',                                defaultValue: 'max(data)',    description: 'Override the scale maximum.' },
            { prop: 'className',   type: 'string',                                defaultValue: '—',            description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>
    </div>
  )
}
