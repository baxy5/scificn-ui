import { StatCard } from '@/ui/stat-card'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'
import { useNarrow } from '@/lib/use-narrow'

const previewCode = `import { StatCard } from '@/ui/stat-card'

<StatCard label="REACTOR OUTPUT" value="94.7%" delta="+2.3%" deltaPositive sublabel="NOMINAL" variant="ACTIVE" />
<StatCard label="HULL INTEGRITY" value="61%" delta="-8.1%" deltaPositive={false} sublabel="DEGRADED" variant="WARNING" />
<StatCard label="CREW MANIFEST" value="312" sublabel="ALL ABOARD" />
<StatCard label="CORE TEMP" value="4820°K" delta="+320°K" deltaPositive={false} sublabel="CRITICAL" variant="CRITICAL" />`

const installCode = `npm install class-variance-authority clsx tailwind-merge`

const usageCode = `import { StatCard } from '@/ui/stat-card'

export function DashboardMetrics() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
      <StatCard
        label="REACTOR OUTPUT"
        value="94.7%"
        delta="+2.3%"
        deltaPositive
        sublabel="NOMINAL"
        variant="ACTIVE"
      />
      <StatCard
        label="HULL INTEGRITY"
        value="61%"
        delta="-8.1%"
        deltaPositive={false}
        sublabel="DEGRADED"
        variant="WARNING"
      />
    </div>
  )
}`

export default function StatCardPage() {
  const narrow = useNarrow()
  return (
    <div>
      <PageHeader
        title="STAT CARD"
        description="Metric tile for dashboards. Displays a primary value, contextual label, optional delta trend indicator, and a sublabel status line."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'repeat(2, 1fr)', gap: '1rem', width: '100%' }}>
              <StatCard label="REACTOR OUTPUT" value="94.7%"  delta="+2.3%"  deltaPositive        sublabel="NOMINAL"   variant="ACTIVE"   />
              <StatCard label="HULL INTEGRITY" value="61%"    delta="-8.1%"  deltaPositive={false} sublabel="DEGRADED"  variant="WARNING"  />
              <StatCard label="CREW MANIFEST"  value="312"                                         sublabel="ALL ABOARD"                   />
              <StatCard label="CORE TEMP"      value="4820°K" delta="+320°K" deltaPositive={false} sublabel="CRITICAL"  variant="CRITICAL" />
            </div>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/stat-card/stat-card.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="VARIANTS">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {(['DEFAULT', 'ACTIVE', 'WARNING', 'CRITICAL'] as const).map((v) => (
            <div key={v}>
              <StatCard
                label="POWER LEVEL"
                value="88%"
                delta="+4%"
                deltaPositive
                sublabel={v}
                variant={v}
              />
              <span
                style={{
                  display:       'block',
                  marginTop:     '0.5rem',
                  fontSize:      '0.65rem',
                  color:         'var(--text-muted)',
                  letterSpacing: '0.08em',
                }}
              >
                variant=&quot;{v}&quot;
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'label',         type: 'string',                               defaultValue: '—',         description: 'Small uppercase label above the value.' },
            { prop: 'value',         type: 'string | number',                      defaultValue: '—',         description: 'Primary metric displayed large.' },
            { prop: 'delta',         type: 'string',                               defaultValue: 'undefined', description: 'Change indicator text, e.g. "+2.3%".' },
            { prop: 'deltaPositive', type: 'boolean',                              defaultValue: 'undefined', description: 'true = green ▲, false = red ▼, undefined = neutral —.' },
            { prop: 'sublabel',      type: 'string',                               defaultValue: 'undefined', description: 'Footer status line at the bottom of the card.' },
            { prop: 'variant',       type: 'DEFAULT | ACTIVE | WARNING | CRITICAL', defaultValue: 'DEFAULT',   description: 'Controls the border and value accent color.' },
            { prop: 'className',     type: 'string',                               defaultValue: '—',         description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>
    </div>
  )
}
