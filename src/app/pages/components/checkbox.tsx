import { Checkbox } from '@/ui/checkbox'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { Checkbox } from '@/ui/checkbox'

<Checkbox label="ENABLE TARGETING" />
<Checkbox label="SHIELD MATRIX" defaultChecked />
<Checkbox label="OFFLINE SYSTEMS" disabled />`

const installCode = `npm install @radix-ui/react-checkbox clsx tailwind-merge`

const usageCode = `import { Checkbox } from '@/ui/checkbox'

export function Example() {
  return (
    <Checkbox
      label="ENABLE AUTO-TARGETING"
      onCheckedChange={(checked) => console.log(checked)}
    />
  )
}`

const controlledCode = `import { useState } from 'react'
import { Checkbox } from '@/ui/checkbox'

export function Controlled() {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox
      label="ENGAGE WARP DRIVE"
      checked={checked}
      onCheckedChange={(v) => setChecked(v === true)}
    />
  )
}`

export default function CheckboxPage() {
  return (
    <div>
      <PageHeader
        title="CHECKBOX"
        description="Binary toggle built on Radix UI. Shows a filled square indicator when checked. Supports optional label with auto-generated ID binding."
        dependencies={['@radix-ui/react-checkbox']}
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Checkbox label="ENABLE TARGETING" />
              <Checkbox label="SHIELD MATRIX" defaultChecked />
              <Checkbox label="OFFLINE SYSTEMS" disabled />
            </div>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/checkbox/checkbox.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="STATES">
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { label: 'Unchecked',         checked: false, disabled: false },
            { label: 'Checked',           checked: true,  disabled: false },
            { label: 'Disabled',          checked: false, disabled: true  },
            { label: 'Checked + Disabled',checked: true,  disabled: true  },
          ].map((state) => (
            <div key={state.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Checkbox defaultChecked={state.checked} disabled={state.disabled} />
              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                {state.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="CONTROLLED">
        <CodeBlock code={controlledCode} />
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'label',            type: 'string',  defaultValue: '—',     description: 'Optional text label rendered next to the checkbox. Auto-generates the id/htmlFor binding.' },
            { prop: 'checked',          type: 'boolean | "indeterminate"', defaultValue: '—', description: 'Controlled checked state.' },
            { prop: 'defaultChecked',   type: 'boolean', defaultValue: 'false', description: 'Initial checked state (uncontrolled).' },
            { prop: 'onCheckedChange',  type: '(checked: boolean | "indeterminate") => void', defaultValue: '—', description: 'Callback fired when the checked state changes.' },
            { prop: 'disabled',         type: 'boolean', defaultValue: 'false', description: 'Disables the checkbox and reduces opacity.' },
            { prop: 'id',               type: 'string',  defaultValue: '—',     description: 'Override the auto-generated id.' },
          ]}
        />
      </Section>
    </div>
  )
}
