interface PropRow {
  prop: string
  type: string
  defaultValue: string
  description: string
}

interface PropsTableProps {
  rows: PropRow[]
}

export function PropsTable({ rows }: PropsTableProps) {
  const thStyle: React.CSSProperties = {
    padding: '0.5rem 0.75rem',
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.12em',
    fontWeight: 600,
    textAlign: 'left',
    borderBottom: '1px solid var(--border)',
    background: 'var(--surface-raised)',
    whiteSpace: 'nowrap',
  }

  const tdStyle: React.CSSProperties = {
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
    borderBottom: '1px solid var(--border)',
    verticalAlign: 'top',
    lineHeight: 1.5,
  }

  return (
    <div style={{ border: '1px solid var(--border)', overflowX: 'auto' }}>
      <table style={{ width: '100%', minWidth: '560px', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)' }}>
        <thead>
          <tr>
            <th style={thStyle}>PROP</th>
            <th style={thStyle}>TYPE</th>
            <th style={thStyle}>DEFAULT</th>
            <th style={{ ...thStyle, width: '100%' }}>DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.prop}
              style={{ background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}
            >
              <td style={{ ...tdStyle, color: 'var(--color-green)', whiteSpace: 'nowrap' }}>
                {row.prop}
              </td>
              <td style={{ ...tdStyle, color: 'var(--color-blue)', whiteSpace: 'nowrap' }}>
                {row.type}
              </td>
              <td style={{ ...tdStyle, color: 'var(--color-amber)', whiteSpace: 'nowrap' }}>
                {row.defaultValue}
              </td>
              <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
