import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/ui/card'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `<Card className="w-72">
  <CardHeader>
    <CardTitle>REACTOR CORE</CardTitle>
    <CardDescription>Power generation subsystem alpha</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-[var(--text-secondary)]">
      Output: 1.21 GW · Temp: 847°C · Efficiency: 94%
    </p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="EXEC" size="SM">ENGAGE</Button>
    <Button variant="OUTLINE" size="SM">MONITOR</Button>
  </CardFooter>
</Card>`

const usageCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@scificn/ui'

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MODULE ALPHA</CardTitle>
        <CardDescription>System subsection</CardDescription>
      </CardHeader>
      <CardContent>Content goes here.</CardContent>
      <CardFooter>Footer actions</CardFooter>
    </Card>
  )
}`

export default function CardPage() {
  return (
    <div>
      <PageHeader
        title="CARD"
        description="Surface container with header, content, and footer sections."
      />
      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <Card className="w-72">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>REACTOR CORE</CardTitle>
                  <Badge variant="ACTIVE">ONLINE</Badge>
                </div>
                <CardDescription>Power generation subsystem alpha</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Output: 1.21 GW · Temp: 847°C · Efficiency: 94%
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="EXEC" size="SM">ENGAGE</Button>
                <Button variant="OUTLINE" size="SM">MONITOR</Button>
              </CardFooter>
            </Card>
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
            { prop: 'Card', type: 'HTMLDivElement', defaultValue: '—', description: 'Root card container.' },
            { prop: 'CardHeader', type: 'HTMLDivElement', defaultValue: '—', description: 'Top section with title and description.' },
            { prop: 'CardTitle', type: 'HTMLHeadingElement', defaultValue: '—', description: 'Card heading text.' },
            { prop: 'CardDescription', type: 'HTMLParagraphElement', defaultValue: '—', description: 'Subtitle or descriptive text.' },
            { prop: 'CardContent', type: 'HTMLDivElement', defaultValue: '—', description: 'Main body content area.' },
            { prop: 'CardFooter', type: 'HTMLDivElement', defaultValue: '—', description: 'Bottom action area.' },
          ]}
        />
      </Section>
    </div>
  )
}
