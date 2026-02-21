import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">HOME</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">SYSTEMS</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>REACTOR</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`

const usageCode = `import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator
} from '@scificn/ui'

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">HOME</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>CURRENT</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`

export default function BreadcrumbDocPage() {
  return (
    <div>
      <PageHeader
        title="BREADCRUMB"
        description="Navigation breadcrumb trail showing current location hierarchy."
      />
      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">HOME</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">SYSTEMS</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>REACTOR</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
            { prop: 'Breadcrumb', type: 'nav element', defaultValue: '—', description: 'Root nav wrapper with aria-label="breadcrumb".' },
            { prop: 'BreadcrumbList', type: 'ol element', defaultValue: '—', description: 'Ordered list of breadcrumb items.' },
            { prop: 'BreadcrumbItem', type: 'li element', defaultValue: '—', description: 'Individual breadcrumb entry.' },
            { prop: 'BreadcrumbLink', type: 'a element', defaultValue: '—', description: 'Clickable breadcrumb link.' },
            { prop: 'BreadcrumbPage', type: 'span element', defaultValue: '—', description: 'Current page indicator (non-clickable).' },
            { prop: 'BreadcrumbSeparator', type: 'li element', defaultValue: '">"', description: 'Separator between items. Children override the default ">" symbol.' },
          ]}
        />
      </Section>
    </div>
  )
}
