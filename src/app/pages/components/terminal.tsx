import { Terminal, type TerminalLine } from '@/ui/terminal'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const demoLines: TerminalLine[] = [
  { type: 'system', text: 'SCIFICN OPERATING SYSTEM v4.1.0', timestamp: '00:00:01' },
  { type: 'system', text: 'Initializing subsystems...', timestamp: '00:00:02' },
  { type: 'input',  text: 'connect --host 192.168.1.1 --port 8080', timestamp: '00:00:04' },
  { type: 'output', text: 'Establishing secure channel...', timestamp: '00:00:05' },
  { type: 'output', text: 'Connection established. Handshake OK.', timestamp: '00:00:06' },
  { type: 'input',  text: 'scan --deep --target bridge', timestamp: '00:00:10' },
  { type: 'warn',   text: 'Anomalous reading on deck 7. Possible interference.', timestamp: '00:00:11' },
  { type: 'output', text: 'Scan complete. 14 nodes found, 2 unresponsive.', timestamp: '00:00:14' },
  { type: 'error',  text: 'NODE-07 timeout. Retry limit exceeded.', timestamp: '00:00:15' },
  { type: 'input',  text: 'status --all', timestamp: '00:00:20' },
]

const previewCode = `import { Terminal, type TerminalLine } from '@/ui/terminal'

const lines: TerminalLine[] = [
  { type: 'system', text: 'SCIFICN OS v4.1.0', timestamp: '00:00:01' },
  { type: 'input',  text: 'scan --deep --target bridge', timestamp: '00:00:10' },
  { type: 'warn',   text: 'Anomalous reading on deck 7.', timestamp: '00:00:11' },
  { type: 'error',  text: 'NODE-07 timeout. Retry limit exceeded.', timestamp: '00:00:15' },
]

<Terminal lines={lines} title="MISSION LOG" height="14rem" />`

const installCode = `npm install clsx tailwind-merge`

const usageCode = `import { Terminal, type TerminalLine } from '@/ui/terminal'

const [log, setLog] = React.useState<TerminalLine[]>([
  { type: 'system', text: 'System ready.' },
])

function sendCommand(cmd: string) {
  setLog(prev => [
    ...prev,
    { type: 'input',  text: cmd,               timestamp: now() },
    { type: 'output', text: 'Acknowledged.',    timestamp: now() },
  ])
}

<Terminal lines={log} title="COMMAND FEED" height="20rem" />`

export default function TerminalPage() {
  return (
    <div>
      <PageHeader
        title="TERMINAL"
        description="Scrollable log and output block. Supports five line types with distinct colors, optional timestamps, and a blinking cursor."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <Terminal lines={demoLines} title="MISSION LOG" height="14rem" style={{ width: '100%' }} />
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/terminal/terminal.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="LINE TYPES">
        <Terminal
          lines={[
            { type: 'system', text: 'System message — boot info, section headers.' },
            { type: 'input',  text: 'User input — commands typed at the prompt.' },
            { type: 'output', text: 'Standard output — normal response text.' },
            { type: 'warn',   text: 'Warning — degraded state, non-fatal.' },
            { type: 'error',  text: 'Error — failure, timeout, or critical fault.' },
          ]}
          title="LINE TYPE REFERENCE"
          height="auto"
          blinkCursor={false}
          style={{ width: '100%' }}
        />
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'lines',       type: 'TerminalLine[]', defaultValue: '[]',        description: 'Array of log entries. Each has type, text, and optional timestamp.' },
            { prop: 'title',       type: 'string',         defaultValue: '"TERMINAL"', description: 'Label shown in the title bar.' },
            { prop: 'prompt',      type: 'string',         defaultValue: '">"',        description: 'Prompt symbol shown beside the blinking cursor.' },
            { prop: 'height',      type: 'string | number', defaultValue: '"16rem"',   description: 'Height of the scrollable output area.' },
            { prop: 'blinkCursor', type: 'boolean',        defaultValue: 'true',       description: 'Show the blinking block cursor at the end of the log.' },
            { prop: 'className',   type: 'string',         defaultValue: '—',          description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>

      <Section title="TERMINALLINE FIELDS">
        <PropsTable
          rows={[
            { prop: 'text',      type: 'string',                               defaultValue: '—',       description: 'The line content.' },
            { prop: 'type',      type: 'input | output | warn | error | system', defaultValue: '"output"', description: 'Controls prefix symbol and text color.' },
            { prop: 'timestamp', type: 'string',                               defaultValue: 'undefined', description: 'Optional timestamp shown in muted color at the start.' },
          ]}
        />
      </Section>
    </div>
  )
}
