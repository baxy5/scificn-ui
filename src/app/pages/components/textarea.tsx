import { Textarea } from '@/ui/textarea'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { Textarea } from '@/ui/textarea'

<Textarea label="MISSION BRIEFING" placeholder="Enter mission details..." />
<Textarea label="TRANSMISSION LOG" error="Message exceeds 512 byte limit." />`

const installCode = `npx shadcn@latest add @scificn/textarea`


const usageCode = `import { Textarea } from '@/ui/textarea'

export function Example() {
  return (
    <Textarea
      label="ENCODED MESSAGE"
      placeholder="PASTE CIPHER TEXT HERE..."
      rows={6}
      onChange={(e) => console.log(e.target.value)}
    />
  )
}`

export default function TextareaPage() {
  return (
    <div>
      <PageHeader
        title="TEXTAREA"
        description="Multi-line text field with optional label and inline error message. Non-resizable by default. Minimum height 80px. Green caret, amber error states."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Textarea label="MISSION BRIEFING" placeholder="Enter mission details..." />
              <Textarea label="TRANSMISSION LOG" error="Message exceeds 512 byte limit." />
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

      <Section title="STATES">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            { label: 'DEFAULT',  props: { label: 'FIELD NOTES', placeholder: 'Enter notes...' } },
            { label: 'ERROR',    props: { label: 'COORDINATES', defaultValue: 'invalid data', error: 'Coordinate format invalid.' } },
            { label: 'DISABLED', props: { label: 'LOCKED RECORD', defaultValue: 'READ ONLY — Access level insufficient.', disabled: true } },
          ].map((state) => (
            <div key={state.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <Textarea {...state.props} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                {state.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'label',    type: 'string',  defaultValue: '—',     description: 'Label text above the textarea. Auto-generates the id/htmlFor binding.' },
            { prop: 'error',    type: 'string',  defaultValue: '—',     description: 'Inline error message below. Turns border and label amber.' },
            { prop: 'rows',     type: 'number',  defaultValue: '—',     description: 'Number of visible text rows (HTML rows attribute).' },
            { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables the textarea and reduces opacity.' },
            { prop: 'id',       type: 'string',  defaultValue: '—',     description: 'Override the auto-generated id.' },
          ]}
        />
      </Section>
    </div>
  )
}
