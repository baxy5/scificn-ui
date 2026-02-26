import { Typography } from '@/ui/typography'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `<Typography variant="H1">SYSTEM ONLINE</Typography>
<Typography variant="H2">Subsystem Alpha</Typography>
<Typography variant="H3">Module Status</Typography>
<Typography variant="P">All systems nominal. Awaiting further instructions.</Typography>
<Typography variant="MUTED">Last updated: 2077-03-15 04:22 UTC</Typography>
<Typography variant="CODE">npm install @scificn/ui</Typography>`

const usageCode = `import { Typography } from '@scificn/ui'

export function Example() {
  return (
    <Typography variant="H1">SYSTEM ONLINE</Typography>
  )
}`

export default function TypographyPage() {
  return (
    <div>
      <PageHeader
        title="TYPOGRAPHY"
        description="Type scale components for headings, body text, and code display."
      />
      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div className="flex flex-col gap-3">
              <Typography variant="H1">SYSTEM ONLINE</Typography>
              <Typography variant="H2">Subsystem Alpha</Typography>
              <Typography variant="H3">Module Status</Typography>
              <Typography variant="P">All systems nominal. Awaiting further instructions from command.</Typography>
              <Typography variant="MUTED">Last updated: 2077-03-15 04:22 UTC</Typography>
              <Typography variant="CODE">npm install @scificn/ui</Typography>
            </div>
          }
        />
      </Section>
      <Section title="INSTALLATION">
        <CodeBlock code="npx shadcn@latest add @scificn/typography" language="bash" />
      </Section>
      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>
      <Section title="VARIANTS">
        <div className="flex flex-col gap-4 p-4 border border-[var(--border)]">
          {(['H1','H2','H3','H4','P','LEAD','MUTED','CODE'] as const).map((v) => (
            <div key={v} className="flex items-baseline gap-4">
              <span className="text-[0.65rem] font-mono text-[var(--text-muted)] w-12 shrink-0">{v}</span>
              <Typography variant={v}>The quick brown fox</Typography>
            </div>
          ))}
        </div>
      </Section>
      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'variant', type: '"H1" | "H2" | "H3" | "H4" | "P" | "LEAD" | "MUTED" | "CODE"', defaultValue: '"P"', description: 'Typography style variant.' },
            { prop: 'as', type: 'string', defaultValue: '—', description: 'Override the rendered HTML element.' },
            { prop: 'className', type: 'string', defaultValue: '—', description: 'Additional CSS classes.' },
          ]}
        />
      </Section>
    </div>
  )
}
