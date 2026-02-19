import { Switch } from '@/ui/switch'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { Switch } from '@/ui/switch'

<Switch label="TARGETING SYSTEM" />
<Switch label="SHIELD MATRIX" defaultChecked />
<Switch label="OFFLINE" disabled />`

const installCode = `npm install @radix-ui/react-switch clsx tailwind-merge`

const usageCode = `import { Switch } from '@/ui/switch'

export function Example() {
  return (
    <Switch
      label="AUTO-PILOT"
      onCheckedChange={(checked) => console.log('auto-pilot:', checked)}
    />
  )
}`

const controlledCode = `import { useState } from 'react'
import { Switch } from '@/ui/switch'

export function Controlled() {
  const [enabled, setEnabled] = useState(false)
  return (
    <Switch
      label="WARP DRIVE"
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  )
}`

export default function SwitchPage() {
  return (
    <div>
      <PageHeader
        title="SWITCH"
        description="Binary toggle built on Radix UI. Displays [OFF] / [ON] text labels instead of a sliding thumb. Green glow on checked state."
        dependencies={['@radix-ui/react-switch']}
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Switch label="TARGETING SYSTEM" />
              <Switch label="SHIELD MATRIX" defaultChecked />
              <Switch label="OFFLINE" disabled />
            </div>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/switch/switch.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="STATES">
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { label: 'OFF',              checked: false, disabled: false },
            { label: 'ON',               checked: true,  disabled: false },
            { label: 'DISABLED OFF',     checked: false, disabled: true  },
            { label: 'DISABLED ON',      checked: true,  disabled: true  },
          ].map((state) => (
            <div key={state.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Switch defaultChecked={state.checked} disabled={state.disabled} />
              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                {state.label}
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
            { prop: 'label',          type: 'string',  defaultValue: '—',     description: 'Optional text label next to the switch. Auto-generates the id/htmlFor binding.' },
            { prop: 'checked',        type: 'boolean', defaultValue: '—',     description: 'Controlled checked state.' },
            { prop: 'defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Initial state (uncontrolled).' },
            { prop: 'onCheckedChange',type: '(checked: boolean) => void', defaultValue: '—', description: 'Callback fired on state change.' },
            { prop: 'disabled',       type: 'boolean', defaultValue: 'false', description: 'Disables the switch and reduces opacity.' },
          ]}
        />
      </Section>
    </div>
  )
}
