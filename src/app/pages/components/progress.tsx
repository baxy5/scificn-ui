import { Progress } from '@/ui/progress'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { Progress } from '@/ui/progress'

<Progress value={67} label="POWER CORE" />
<Progress value={30} label="FUEL CELLS" />
<Progress value={95} label="SHIELD MATRIX" />`

const installCode = `npx shadcn@latest add @scificn/progress`


const usageCode = `import { Progress } from '@/ui/progress'

export function StatusReadout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '240px' }}>
      <Progress value={72} label="REACTOR OUTPUT" />
      <Progress value={45} label="LIFE SUPPORT" showValue={false} />
    </div>
  )
}`

export default function ProgressPage() {
  return (
    <div>
      <PageHeader
        title="PROGRESS"
        description="ASCII bracket progress bar. Fills with = characters across a 20-char width. Optional label and percentage readout."
        dependencies={['@radix-ui/react-progress']}
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Progress value={67} label="POWER CORE" />
              <Progress value={30} label="FUEL CELLS" />
              <Progress value={95} label="SHIELD MATRIX" />
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

      <Section title="VALUES">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '300px' }}>
          {[0, 25, 50, 75, 100].map((v) => (
            <Progress key={v} value={v} label={`VALUE: ${v}`} />
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'value',     type: 'number',  defaultValue: '0',    description: 'Progress value from 0 to 100. Clamped to range.' },
            { prop: 'label',     type: 'string',  defaultValue: '—',    description: 'Optional label shown above the bar in uppercase muted text.' },
            { prop: 'showValue', type: 'boolean', defaultValue: 'true', description: 'Show the percentage number after the closing bracket.' },
          ]}
        />
      </Section>
    </div>
  )
}
