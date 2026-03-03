interface PageHeaderProps {
  title: string
  description: string
  dependencies?: string[]
}

export function PageHeader({ title, description, dependencies }: PageHeaderProps) {
  return (
    <div
      style={{
        marginBottom: '2.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          letterSpacing: '0.08em',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          marginBottom: dependencies && dependencies.length > 0 ? '1rem' : '0',
        }}
      >
        {description}
      </p>
      {dependencies && dependencies.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
            DEPS:
          </span>
          {dependencies.map((dep) => (
            <span
              key={dep}
              style={{
                fontSize: '0.7rem',
                color: 'var(--color-green)',
                border: '1px solid var(--border)',
                padding: '1px 6px',
                letterSpacing: '0.04em',
              }}
            >
              {dep}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
