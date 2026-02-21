import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `<Label htmlFor="callsign">CALLSIGN</Label>
<Input id="callsign" placeholder="ENTER CALLSIGN" />`

const usageCode = `import { Label } from '@scificn/ui'

export function Example() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">EMAIL</Label>
      <input id="email" type="email" />
    </div>
  )
}`

export default function LabelPage() {
  return (
    <div>
      <PageHeader
        title="LABEL"
        description="Accessible form label using Radix UI Label primitive."
        dependencies={['@radix-ui/react-label']}
      />
      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-callsign">CALLSIGN</Label>
              <Input id="demo-callsign" placeholder="ENTER CALLSIGN" />
            </div>
          }
        />
      </Section>
      <Section title="INSTALLATION">
        <CodeBlock code="npm install @scificn/ui" language="bash" />
      </Section>
      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>
      <Section title="PROPS">
        <PropsTable
          rows={[
            {
              prop: 'htmlFor',
              type: 'string',
              defaultValue: '—',
              description: 'ID of the associated form control.',
            },
            {
              prop: 'className',
              type: 'string',
              defaultValue: '—',
              description: 'Additional CSS classes.',
            },
          ]}
        />
      </Section>
    </div>
  )
}
