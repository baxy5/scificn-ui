import { RadarChart } from '@/ui/radar-chart'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'
import { useNarrow } from '@/lib/use-narrow'

const shipSystems = [
  { axis: 'SHIELDS',  value: 82 },
  { axis: 'WEAPONS',  value: 74 },
  { axis: 'ENGINES',  value: 91 },
  { axis: 'SENSORS',  value: 68 },
  { axis: 'COMMS',    value: 55 },
  { axis: 'LIFE SUP', value: 97 },
]

const crewData = [
  { axis: 'COMBAT',   value: 88 },
  { axis: 'PILOTING', value: 72 },
  { axis: 'SCIENCE',  value: 94 },
  { axis: 'MEDICAL',  value: 61 },
  { axis: 'COMMAND',  value: 79 },
]

const threatData = [
  { axis: 'SPEED',     value: 95 },
  { axis: 'FIREPOWER', value: 88 },
  { axis: 'DEFENSE',   value: 42 },
  { axis: 'STEALTH',   value: 71 },
  { axis: 'RANGE',     value: 63 },
  { axis: 'AGILITY',   value: 85 },
  { axis: 'SHIELDS',   value: 38 },
  { axis: 'CREW',      value: 55 },
]

const previewCode = `import { RadarChart } from '@/ui/radar-chart'

const systems = [
  { axis: 'SHIELDS', value: 82 },
  { axis: 'WEAPONS', value: 74 },
  { axis: 'ENGINES', value: 91 },
  { axis: 'SENSORS', value: 68 },
  { axis: 'COMMS',   value: 55 },
  { axis: 'LIFE SUP',value: 97 },
]

<RadarChart data={systems} title="SHIP SYSTEMS" variant="ACTIVE" />`

const installCode = `npx shadcn@latest add @scificn/radar-chart`


const usageCode = `import { RadarChart, type RadarChartEntry } from '@/ui/radar-chart'

const data: RadarChartEntry[] = [
  { axis: 'SHIELDS', value: 82 },
  { axis: 'WEAPONS', value: 74 },
  { axis: 'ENGINES', value: 91 },
  { axis: 'SENSORS', value: 68 },
]

<RadarChart
  data={data}
  title="SHIP SYSTEMS"
  variant="ACTIVE"
  size={240}
  showGrid
  showLabels
  showValues
/>`

export default function RadarChartPage() {
  const narrow = useNarrow()
  return (
    <div>
      <PageHeader
        title="RADAR CHART"
        description="SVG radar (spider) chart with configurable axes, concentric grid polygons, fade-in animation, and four color variants. Values normalized to 0–100."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RadarChart
                data={shipSystems}
                title="SHIP SYSTEMS // STATUS"
                variant="ACTIVE"
                size={260}
              />
            </div>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="AXIS COUNTS">
        <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem', justifyItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>5 AXES</p>
            <RadarChart data={crewData} size={200} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>6 AXES</p>
            <RadarChart data={shipSystems} size={200} variant="WARNING" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>8 AXES</p>
            <RadarChart data={threatData} size={200} variant="CRITICAL" />
          </div>
        </div>
      </Section>

      <Section title="VARIANTS">
        <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '1rem', justifyItems: 'center' }}>
          {(['ACTIVE', 'WARNING', 'CRITICAL', 'DEFAULT'] as const).map((v) => (
            <div key={v} style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '0.35rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{v}</p>
              <RadarChart data={crewData} variant={v} size={180} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="WITH VALUES">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RadarChart
            data={shipSystems}
            title="SHIP SYSTEMS // SHOW VALUES"
            variant="ACTIVE"
            size={260}
            showValues
          />
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'data',        type: 'RadarChartEntry[]',                        defaultValue: '—',        description: 'Array of { axis, value } entries. value is 0–100.' },
            { prop: 'variant',     type: 'DEFAULT | ACTIVE | WARNING | CRITICAL',    defaultValue: 'ACTIVE',   description: 'Controls polygon color and glow.' },
            { prop: 'title',       type: 'string',                                   defaultValue: 'undefined', description: 'Optional header label.' },
            { prop: 'size',        type: 'number',                                   defaultValue: '240',       description: 'SVG width and height in px.' },
            { prop: 'showGrid',    type: 'boolean',                                  defaultValue: 'true',      description: 'Show concentric polygon grid rings.' },
            { prop: 'showLabels',  type: 'boolean',                                  defaultValue: 'true',      description: 'Show axis labels at vertices.' },
            { prop: 'showValues',  type: 'boolean',                                  defaultValue: 'false',     description: 'Show numeric value near each vertex dot.' },
            { prop: 'className',   type: 'string',                                   defaultValue: '—',         description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>
    </div>
  )
}
