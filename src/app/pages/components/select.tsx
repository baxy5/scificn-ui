import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from '@/ui/select'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from '@/ui/select'

<Select>
  <SelectTrigger style={{ width: '220px' }}>
    <SelectValue placeholder="SELECT SECTOR..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="alpha">ALPHA-7</SelectItem>
    <SelectItem value="beta">BETA-3</SelectItem>
    <SelectItem value="gamma">GAMMA-9</SelectItem>
  </SelectContent>
</Select>`

const installCode = `npm install @radix-ui/react-select clsx tailwind-merge`

const usageCode = `import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem, SelectLabel, SelectGroup,
} from '@/ui/select'

export function SectorSelect() {
  return (
    <Select onValueChange={(v) => console.log(v)}>
      <SelectTrigger style={{ width: '240px' }}>
        <SelectValue placeholder="SELECT SECTOR..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>INNER SYSTEMS</SelectLabel>
          <SelectItem value="alpha">ALPHA-7</SelectItem>
          <SelectItem value="beta">BETA-3</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>OUTER RIM</SelectLabel>
          <SelectItem value="gamma">GAMMA-9</SelectItem>
          <SelectItem value="delta">DELTA-2</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}`

export default function SelectPage() {
  return (
    <div>
      <PageHeader
        title="SELECT"
        description="Dropdown selector built on Radix UI. Portaled content with green highlighted item indicator. Supports groups, labels, and separators."
        dependencies={['@radix-ui/react-select']}
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <Select>
              <SelectTrigger style={{ width: '220px' }}>
                <SelectValue placeholder="SELECT SECTOR..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alpha">ALPHA-7</SelectItem>
                <SelectItem value="beta">BETA-3</SelectItem>
                <SelectItem value="gamma">GAMMA-9</SelectItem>
                <SelectItem value="delta">DELTA-2</SelectItem>
              </SelectContent>
            </Select>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/select/select.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="ANATOMY">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[
            ['Select',          'Root — manages open/value state.'],
            ['SelectTrigger',   'Button that opens the dropdown. Shows selected value or placeholder.'],
            ['SelectValue',     'Displays the current selected value. Renders placeholder when empty.'],
            ['SelectContent',   'Portaled dropdown list. Positions relative to trigger width.'],
            ['SelectGroup',     'Groups related items together. Pair with SelectLabel.'],
            ['SelectLabel',     'Non-interactive group heading. Uppercase, muted, small.'],
            ['SelectItem',      'Selectable option. Highlights green on hover. Shows ■ when selected.'],
            ['SelectSeparator', 'Horizontal rule between groups.'],
          ].map(([comp, desc]) => (
            <div key={comp} style={{ display: 'flex', gap: '1rem', padding: '0.5rem', border: '1px solid var(--border)', background: 'var(--surface)' }}>
              <code style={{ color: 'var(--color-green)', fontSize: '0.7rem', minWidth: '150px', flexShrink: 0 }}>{comp}</code>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'value',         type: 'string',                    defaultValue: '—',     description: 'Controlled value.' },
            { prop: 'defaultValue',  type: 'string',                    defaultValue: '—',     description: 'Initial value (uncontrolled).' },
            { prop: 'onValueChange', type: '(value: string) => void',   defaultValue: '—',     description: 'Callback when selection changes.' },
            { prop: 'disabled',      type: 'boolean',                   defaultValue: 'false', description: 'Disables the trigger.' },
            { prop: 'placeholder',   type: 'string (on SelectValue)',   defaultValue: '—',     description: 'Text shown when no value is selected.' },
          ]}
        />
      </Section>
    </div>
  )
}
