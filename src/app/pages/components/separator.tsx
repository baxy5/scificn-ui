import { Separator } from '@/ui/separator'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { Separator } from '@/ui/separator'

<Separator />
<Separator label="SECTION" />
<Separator orientation="vertical" style={{ height: '32px' }} />`

const installCode = `npx shadcn@latest add @scificn/separator`


const usageCode = `import { Separator } from '@/ui/separator'

export function Example() {
  return (
    <div>
      <p>Block A</p>
      <Separator label="— CHECKPOINT —" />
      <p>Block B</p>
    </div>
  )
}`

export default function SeparatorPage() {
  return (
    <div>
      <PageHeader
        title="SEPARATOR"
        description="Thin horizontal or vertical divider built on Radix UI. Optional centered label splits the line for section headers."
        dependencies={['@radix-ui/react-separator']}
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Separator />
              <Separator label="SECTION" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>A</span>
                <Separator orientation="vertical" style={{ height: '32px' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>B</span>
              </div>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Separator />
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>DEFAULT (horizontal)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Separator label="CHECKPOINT" />
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>WITH LABEL</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '40px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LEFT</span>
              <Separator orientation="vertical" style={{ height: '40px' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RIGHT</span>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>VERTICAL</span>
          </div>
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'label',       type: 'string',                       defaultValue: '—',          description: 'Text centered in the separator. Renders flex layout with line-line-text-line-line.' },
            { prop: 'orientation', type: '"horizontal" | "vertical"',    defaultValue: '"horizontal"',description: 'Direction of the separator line.' },
            { prop: 'decorative',  type: 'boolean',                      defaultValue: 'true',       description: 'When true, hidden from accessibility tree.' },
          ]}
        />
      </Section>
    </div>
  )
}
