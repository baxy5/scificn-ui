import { Alert, AlertTitle, AlertDescription } from '@/ui/alert'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { Alert, AlertTitle, AlertDescription } from '@/ui/alert'

<Alert variant="STATUS">
  <AlertTitle>SYSTEM STATUS</AlertTitle>
  <AlertDescription>All subsystems operating within normal parameters.</AlertDescription>
</Alert>`

const installCode = `npx shadcn@latest add @scificn/alert`


const usageCode = `import { Alert, AlertTitle, AlertDescription } from '@/ui/alert'

export function Example() {
  return (
    <Alert variant="WARNING">
      <AlertTitle>WARNING</AlertTitle>
      <AlertDescription>
        Power core temperature exceeding safe threshold.
      </AlertDescription>
    </Alert>
  )
}`

export default function AlertPage() {
  return (
    <div>
      <PageHeader
        title="ALERT"
        description="Full-width contextual message with left accent border. Four semantic variants for status, warning, critical, and info states."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Alert variant="STATUS">
                <AlertTitle>SYSTEM STATUS</AlertTitle>
                <AlertDescription>All subsystems operating within normal parameters.</AlertDescription>
              </Alert>
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

      <Section title="VARIANTS">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(['STATUS', 'WARNING', 'CRITICAL', 'INFO'] as const).map((v) => (
            <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <Alert variant={v}>
                <AlertTitle>{v}</AlertTitle>
                <AlertDescription>
                  {v === 'STATUS'   && 'All systems nominal. Ready for operation.'}
                  {v === 'WARNING'  && 'Elevated power consumption detected. Monitor closely.'}
                  {v === 'CRITICAL' && 'Hull breach imminent. Evacuate affected sector immediately.'}
                  {v === 'INFO'     && 'Scheduled maintenance cycle begins in 48 hours.'}
                </AlertDescription>
              </Alert>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                variant=&quot;{v}&quot;
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'variant',   type: 'STATUS | WARNING | CRITICAL | INFO', defaultValue: 'STATUS', description: 'Controls left border color, glow, and prefix symbol.' },
            { prop: 'className', type: 'string',                              defaultValue: '—',      description: 'Additional classes merged via cn().' },
          ]}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          AlertTitle and AlertDescription extend <code>React.HTMLAttributes&lt;HTMLDivElement&gt;</code>.
        </p>
      </Section>
    </div>
  )
}
