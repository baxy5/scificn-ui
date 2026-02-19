import { ProgressRing } from '@/ui/progress-ring'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { ProgressRing } from '@/ui/progress-ring'

<ProgressRing value={87} label="REACTOR" variant="ACTIVE" />
<ProgressRing value={61} label="SHIELDS" variant="WARNING" />
<ProgressRing value={23} label="HULL"    variant="CRITICAL" />
<ProgressRing value={50} label="FUEL"    variant="DEFAULT" />`

const installCode = `npm install clsx tailwind-merge`

const usageCode = `import { ProgressRing } from '@/ui/progress-ring'

export function SystemGauges() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <ProgressRing value={87} label="REACTOR" variant="ACTIVE"   size={120} />
      <ProgressRing value={61} label="SHIELDS" variant="WARNING"  size={120} />
      <ProgressRing value={23} label="HULL"    variant="CRITICAL" size={120} />
    </div>
  )
}`

export default function ProgressRingPage() {
  return (
    <div>
      <PageHeader
        title="PROGRESS RING"
        description="SVG circular gauge with a phosphor glow arc. Complements the linear Progress bar. Use for radar readouts, system health gauges, and capacity displays."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <ProgressRing value={87} label="REACTOR" variant="ACTIVE"   />
              <ProgressRing value={61} label="SHIELDS" variant="WARNING"  />
              <ProgressRing value={23} label="HULL"    variant="CRITICAL" />
              <ProgressRing value={50} label="FUEL"    variant="DEFAULT"  />
            </div>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/progress-ring/progress-ring.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="VARIANTS">
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {(['ACTIVE', 'WARNING', 'CRITICAL', 'DEFAULT'] as const).map((v) => (
            <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <ProgressRing value={75} variant={v} />
              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                variant=&quot;{v}&quot;
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="SIZES">
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {([64, 90, 120, 160] as const).map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <ProgressRing value={72} variant="ACTIVE" size={s} />
              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                size={s}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'value',       type: 'number',                               defaultValue: '0',       description: 'Progress value 0–100. Clamped to range.' },
            { prop: 'variant',     type: 'DEFAULT | ACTIVE | WARNING | CRITICAL', defaultValue: 'DEFAULT', description: 'Controls the arc color and center value glow.' },
            { prop: 'size',        type: 'number',                               defaultValue: '120',     description: 'Diameter of the ring in pixels.' },
            { prop: 'strokeWidth', type: 'number',                               defaultValue: '6',       description: 'Width of the SVG stroke in pixels.' },
            { prop: 'label',       type: 'string',                               defaultValue: 'undefined', description: 'Small uppercase label shown below the value in the center.' },
            { prop: 'showValue',   type: 'boolean',                              defaultValue: 'true',    description: 'Show the numeric percentage in the center.' },
            { prop: 'className',   type: 'string',                               defaultValue: '—',       description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>
    </div>
  )
}
