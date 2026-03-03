import type { Metadata } from 'next'
import { Kbd } from '@/ui/kbd'
import { PageHeader } from '@/app/_components/docs/page-header'
import { Section } from '@/app/_components/docs/section'
import { ComponentPreview } from '@/app/_components/docs/component-preview'
import { CodeBlock } from '@/app/_components/docs/code-block'
import { PropsTable } from '@/app/_components/docs/props-table'

export const metadata: Metadata = {
  title: 'KBD',
  description: 'Keyboard key display element styled as a terminal key cap.',
  alternates: { canonical: '/components/kbd' },
}

const previewCode = `<Kbd>Ctrl</Kbd>
<Kbd>⌘</Kbd>
<Kbd>⇧</Kbd>
<Kbd>Enter</Kbd>`

const usageCode = `import { Kbd } from '@scificn/ui'

export function Example() {
  return (
    <p className="text-sm text-muted">
      Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open command palette.
    </p>
  )
}`

export default function Page() {
  return (
    <div>
      <PageHeader
        title="KBD"
        description="Keyboard key display element styled as a terminal key cap."
      />
      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div className="flex items-center gap-2">
              <Kbd>Ctrl</Kbd>
              <Kbd>⌘</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>Enter</Kbd>
            </div>
          }
        />
      </Section>
      <Section title="INSTALLATION">
        <CodeBlock code="npx shadcn@latest add @scificn/kbd" language="bash" />
      </Section>
      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>
      <Section title="PROPS">
        <PropsTable
          rows={[
            {
              prop: 'children',
              type: 'ReactNode',
              defaultValue: '—',
              description: 'Key label content.',
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
