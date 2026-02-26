import { Heatmap } from '@/ui/heatmap'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

// 7 days × 24 hours uptime grid — values 0–100
const uptimeData = Array.from({ length: 7 * 24 }, (_, i) => {
  const rand = Math.random()
  // Simulate occasional outages
  const value = rand < 0.05 ? 0 : rand < 0.12 ? Math.round(rand * 600) : 100
  return { value, label: `${Math.floor(i / 24)}d ${i % 24}h: ${value}%` }
})

const weekLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const hourLabels = Array.from({ length: 24 }, (_, i) =>
  i % 6 === 0 ? `${String(i).padStart(2, '0')}h` : ''
)

const previewCode = `import { Heatmap } from '@/ui/heatmap'

// 7 rows × 24 cols — hourly uptime per day
const data = Array.from({ length: 168 }, () => ({
  value: Math.random() < 0.08 ? 0 : 100,
}))

<Heatmap
  data={data}
  columns={24}
  rowLabels={['MON','TUE','WED','THU','FRI','SAT','SUN']}
  title="UPTIME GRID — LAST 7 DAYS"
  variant="GREEN"
/>`

const installCode = `npx shadcn@latest add @scificn/heatmap`


const usageCode = `import { Heatmap, type HeatmapCell } from '@/ui/heatmap'

// Simple number array
const data = [0, 10, 40, 80, 100, 60, 20, 5, 90, 100, 70, 30]

<Heatmap data={data} columns={6} title="ACTIVITY" variant="GREEN" />

// With cell labels (shown as native tooltip on hover)
const labeled: HeatmapCell[] = data.map((v, i) => ({
  value: v,
  label: \`Week \${i + 1}: \${v}%\`,
}))

<Heatmap data={labeled} columns={6} variant="AMBER" />`

export default function HeatmapPage() {
  return (
    <div>
      <PageHeader
        title="HEATMAP"
        description="Grid of colored cells showing density or activity over time. Opacity scales linearly with value. Supports row and column labels."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <Heatmap
              data={uptimeData}
              columns={24}
              rowLabels={weekLabels}
              colLabels={hourLabels}
              title="UPTIME GRID — LAST 7 DAYS"
              variant="GREEN"
              cellSize={18}
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

      <Section title="VARIANTS">
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {(['GREEN', 'AMBER', 'RED'] as const).map((v) => {
            const demo = Array.from({ length: 40 }, (_, i) => ({
              value: Math.round((i / 39) * 100),
            }))
            return (
              <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Heatmap data={demo} columns={10} variant={v} cellSize={20} />
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                  variant=&quot;{v}&quot;
                </span>
              </div>
            )
          })}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'data',       type: 'HeatmapCell[] | number[]', defaultValue: '—',         description: 'Flat array of cells, filled left-to-right, top-to-bottom.' },
            { prop: 'columns',    type: 'number',                   defaultValue: '—',         description: 'Number of columns in the grid.' },
            { prop: 'variant',    type: 'GREEN | AMBER | RED',      defaultValue: '"GREEN"',   description: 'Color scale applied to cell intensity.' },
            { prop: 'max',        type: 'number',                   defaultValue: 'max(data)', description: 'Override the normalization maximum.' },
            { prop: 'cellSize',   type: 'number',                   defaultValue: '16',        description: 'Cell width and height in pixels.' },
            { prop: 'rowLabels',  type: 'string[]',                 defaultValue: 'undefined', description: 'Labels shown to the left of each row.' },
            { prop: 'colLabels',  type: 'string[]',                 defaultValue: 'undefined', description: 'Labels shown above each column.' },
            { prop: 'title',      type: 'string',                   defaultValue: 'undefined', description: 'Header label shown at the top.' },
            { prop: 'className',  type: 'string',                   defaultValue: '—',         description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>

      <Section title="HEATMAPCELL FIELDS">
        <PropsTable
          rows={[
            { prop: 'value', type: 'number', defaultValue: '—',         description: 'Raw value. Normalized against max to compute opacity.' },
            { prop: 'label', type: 'string', defaultValue: 'undefined', description: 'Tooltip text shown on hover (native browser title).' },
          ]}
        />
      </Section>
    </div>
  )
}
