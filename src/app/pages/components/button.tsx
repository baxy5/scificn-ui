import { Button } from '@/ui/button'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { Button } from '@/ui/button'

<Button variant="EXEC">EXECUTE</Button>
<Button variant="OUTLINE">STANDBY</Button>
<Button variant="GHOST">CANCEL</Button>
<Button variant="ABORT">ABORT</Button>`

const installCode = `npx shadcn@latest add @scificn/button`


const usageCode = `import { Button } from '@/ui/button'

export function Example() {
  return (
    <Button variant="EXEC" size="MD">
      INITIATE SEQUENCE
    </Button>
  )
}`

const sizesCode = `<Button size="SM">SMALL</Button>
<Button size="MD">MEDIUM</Button>
<Button size="LG">LARGE</Button>`

const asChildCode = `import { Button } from '@/ui/button'
import { Link } from 'react-router-dom'

// Renders as <a> with Button styles
<Button asChild variant="EXEC">
  <Link to="/docs/introduction">READ DOCS</Link>
</Button>`

export default function ButtonPage() {
  return (
    <div>
      <PageHeader
        title="BUTTON"
        description="Interactive trigger element with four semantic variants. Supports asChild for polymorphic rendering via Radix Slot."
        dependencies={['@radix-ui/react-slot', 'class-variance-authority']}
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <>
              <Button variant="EXEC">EXECUTE</Button>
              <Button variant="OUTLINE">STANDBY</Button>
              <Button variant="GHOST">CANCEL</Button>
              <Button variant="ABORT">ABORT</Button>
            </>
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {(['EXEC', 'OUTLINE', 'GHOST', 'ABORT'] as const).map((v) => (
            <div
              key={v}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <Button variant={v}>{v}</Button>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                variant=&quot;{v}&quot;
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="SIZES">
        <ComponentPreview
          code={sizesCode}
          preview={
            <>
              <Button size="SM">SMALL</Button>
              <Button size="MD">MEDIUM</Button>
              <Button size="LG">LARGE</Button>
            </>
          }
        />
      </Section>

      <Section title="AS CHILD">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.7 }}>
          Use <span style={{ color: 'var(--color-green)' }}>asChild</span> to render button styles on any element (e.g. a link).
        </p>
        <CodeBlock code={asChildCode} />
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'variant', type: 'EXEC | OUTLINE | GHOST | ABORT', defaultValue: 'OUTLINE', description: 'Visual style and semantic meaning of the button.' },
            { prop: 'size', type: 'SM | MD | LG', defaultValue: 'MD', description: 'Controls height and horizontal padding.' },
            { prop: 'asChild', type: 'boolean', defaultValue: 'false', description: 'Merge button props onto the child element instead of rendering a <button>.' },
            { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables the button and reduces opacity.' },
            { prop: 'className', type: 'string', defaultValue: '—', description: 'Additional Tailwind classes merged via cn().' },
          ]}
        />
      </Section>
    </div>
  )
}
