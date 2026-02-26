import { LineChart } from '@/ui/line-chart'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'
import { useNarrow } from '@/lib/use-narrow'

const altitudeData = [420, 418, 421, 419, 422, 420, 417, 419, 423, 421, 418, 420, 422, 419, 421]
const altitudeLabels = altitudeData.map((_, i) => `T+${i * 5}`)

const multiSeries = [
  {
    id: 'reactor',
    label: 'Reactor',
    data: [72, 78, 81, 79, 85, 88, 84, 82, 86, 89, 87, 91, 88, 85, 90],
  },
  {
    id: 'shields',
    label: 'Shields',
    data: [95, 93, 90, 88, 85, 82, 84, 87, 89, 85, 83, 80, 78, 80, 82],
  },
  {
    id: 'engines',
    label: 'Engines',
    data: [60, 62, 65, 68, 70, 72, 69, 71, 74, 76, 73, 75, 78, 80, 77],
  },
]
const multiLabels = altitudeData.map((_, i) => `T+${i * 5}`)

const previewCode = `import { LineChart } from '@/ui/line-chart'

<LineChart
  series={[{ id: 'alt', label: 'ALT KM', data: [420, 418, 421, 419, 422] }]}
  labels={['T+0', 'T+5', 'T+10', 'T+15', 'T+20']}
  title="ISS ALTITUDE TRACK"
  showArea
/>`

const installCode = `npx shadcn@latest add @scificn/line-chart`


const usageCode = `import { LineChart, type LineChartSeries } from '@/ui/line-chart'

// Single series
<LineChart
  series={[{ id: 'power', label: 'POWER', data: [80, 85, 78, 90, 88] }]}
  labels={['MON', 'TUE', 'WED', 'THU', 'FRI']}
  title="POWER OUTPUT"
  variant="ACTIVE"
  showArea
/>

// Multi-series
const series: LineChartSeries[] = [
  { id: 'reactor', label: 'REACTOR', data: [72, 78, 85, 82, 89] },
  { id: 'shields', label: 'SHIELDS', data: [95, 88, 82, 87, 80] },
]

<LineChart
  series={series}
  labels={['T+0', 'T+5', 'T+10', 'T+15', 'T+20']}
  title="SYSTEM LOAD"
  showLegend
/>`

export default function LineChartPage() {
  const narrow = useNarrow()
  return (
    <div>
      <PageHeader
        title="LINE CHART"
        description="SVG line chart with multi-series support, animated draw-on effect, optional area fill, grid lines, and an automatic legend."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <LineChart
              series={[{ id: 'alt', label: 'ALT KM', data: altitudeData }]}
              labels={altitudeLabels}
              title="ISS ALTITUDE TRACK // KM"
              showArea
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

      <Section title="MULTI-SERIES">
        <LineChart
          series={multiSeries}
          labels={multiLabels}
          title="SYSTEM LOAD // MULTI-SERIES"
          showLegend
          style={{ width: '100%' }}
        />
      </Section>

      <Section title="VARIANTS">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(['ACTIVE', 'WARNING', 'CRITICAL', 'DEFAULT'] as const).map((v) => (
            <div key={v}>
              <p style={{ marginBottom: '0.35rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                variant=&quot;{v}&quot;
              </p>
              <LineChart
                series={[{ id: 'a', label: 'SIGNAL', data: altitudeData.slice(0, 8), variant: v }]}
                labels={altitudeLabels.slice(0, 8)}
                showArea={v === 'ACTIVE'}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="OPTIONS">
        <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : '1fr 1fr', gap: '1rem' }}>
          <div>
            <p style={{ marginBottom: '0.35rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              showDots=false showArea=true
            </p>
            <LineChart
              series={[{ id: 'a', label: 'A', data: altitudeData }]}
              labels={altitudeLabels}
              showDots={false}
              showArea
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <p style={{ marginBottom: '0.35rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              showGrid=false showDots=true
            </p>
            <LineChart
              series={[{ id: 'a', label: 'A', data: altitudeData }]}
              labels={altitudeLabels}
              showGrid={false}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'series',      type: 'LineChartSeries[]',                        defaultValue: '—',        description: 'Array of data series. Each has id, label, data[], and optional variant.' },
            { prop: 'labels',      type: 'string[]',                                 defaultValue: '—',        description: 'X-axis labels, same length as each series.data.' },
            { prop: 'title',       type: 'string',                                   defaultValue: 'undefined', description: 'Optional header label.' },
            { prop: 'height',      type: 'number',                                   defaultValue: '160',       description: 'Chart area height in px.' },
            { prop: 'min',         type: 'number',                                   defaultValue: 'min(data)', description: 'Override y-axis minimum.' },
            { prop: 'max',         type: 'number',                                   defaultValue: 'max(data)', description: 'Override y-axis maximum.' },
            { prop: 'showDots',    type: 'boolean',                                  defaultValue: 'true',      description: 'Show circles at data points.' },
            { prop: 'showArea',    type: 'boolean',                                  defaultValue: 'false',     description: 'Fill area under the line.' },
            { prop: 'showGrid',    type: 'boolean',                                  defaultValue: 'true',      description: 'Show horizontal grid lines.' },
            { prop: 'showLegend',  type: 'boolean',                                  defaultValue: 'auto',      description: 'Show legend. Defaults to true when series.length > 1.' },
            { prop: 'animated',    type: 'boolean',                                  defaultValue: 'true',      description: 'Animate the line drawing on mount.' },
            { prop: 'className',   type: 'string',                                   defaultValue: '—',         description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>
    </div>
  )
}
