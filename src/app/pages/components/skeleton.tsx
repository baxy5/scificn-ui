import { Skeleton } from '@/ui/skeleton'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `<div className="flex flex-col gap-2 w-64">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-1/2" />
  <Skeleton className="h-20 w-full mt-2" />
</div>`

const usageCode = `import { Skeleton } from '@scificn/ui'

export function Loading() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-64" />
    </div>
  )
}`

export default function SkeletonPage() {
  return (
    <div>
      <PageHeader
        title="SKELETON"
        description="Loading placeholder block that animates with a pulsing glow."
      />
      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div className="flex flex-col gap-2 w-64">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full mt-2" />
            </div>
          }
        />
      </Section>
      <Section title="INSTALLATION">
        <CodeBlock code="npx shadcn@latest add @scificn/skeleton" language="bash" />
      </Section>
      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>
      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'className', type: 'string', defaultValue: '—', description: 'Use Tailwind h-* and w-* to control size.' },
          ]}
        />
      </Section>
    </div>
  )
}
