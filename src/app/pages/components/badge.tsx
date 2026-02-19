import { Badge } from '@/ui/badge'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { Badge } from '@/ui/badge'

<Badge variant="ACTIVE">ONLINE</Badge>
<Badge variant="SCANNING">SCANNING</Badge>
<Badge variant="WARNING">WARNING</Badge>
<Badge variant="CRITICAL">CRITICAL</Badge>
<Badge variant="OFFLINE">OFFLINE</Badge>`

const installCode = `npm install class-variance-authority clsx tailwind-merge`

const usageCode = `import { Badge } from '@/ui/badge'

export function StatusBar() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Badge variant="ACTIVE">REACTOR ONLINE</Badge>
      <Badge variant="WARNING">SHIELD LOW</Badge>
      <Badge variant="CRITICAL">HULL BREACH</Badge>
    </div>
  )
}`

export default function BadgePage() {
  return (
    <div>
      <PageHeader
        title="BADGE"
        description="Compact status indicator with semantic variants. Monospace font, uppercase, minimal padding. SCANNING variant includes a blink animation."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <>
              <Badge variant="ACTIVE">ONLINE</Badge>
              <Badge variant="SCANNING">SCANNING</Badge>
              <Badge variant="WARNING">WARNING</Badge>
              <Badge variant="CRITICAL">CRITICAL</Badge>
              <Badge variant="OFFLINE">OFFLINE</Badge>
            </>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/badge/badge.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="VARIANTS">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1rem',
          }}
        >
          {(['ACTIVE', 'SCANNING', 'WARNING', 'CRITICAL', 'OFFLINE'] as const).map((v) => (
            <div
              key={v}
              style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                gap:            '0.75rem',
                padding:        '1.25rem',
                border:         '1px solid var(--border)',
                background:     'var(--surface)',
              }}
            >
              <Badge variant={v}>{v}</Badge>
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
            { prop: 'variant',   type: 'ACTIVE | SCANNING | WARNING | CRITICAL | OFFLINE', defaultValue: 'ACTIVE', description: 'Controls color, glow, and animated prefix symbol.' },
            { prop: 'className', type: 'string',                                            defaultValue: '—',      description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>
    </div>
  )
}
