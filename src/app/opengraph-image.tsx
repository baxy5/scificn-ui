import { ImageResponse } from 'next/og'

export const alt = 'scificn-ui — Retro Sci-Fi React UI Components'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const BG      = '#07050F'
const BORDER  = '#251d38'
const GREEN   = '#00ed3f'
const TEAL    = '#6DC3BB'
const AMBER   = '#F2963A'
const PINK    = '#B53082'
const TEXT    = '#d4d0e8'
const MUTED   = '#564e72'
const SURFACE = '#0d0a1c'
const SEP     = '#3a2e52'

// CSS circle — avoids special Unicode chars that need external font downloads
function Dot({ color, size: s = 8 }: { color: string; size?: number }) {
  return (
    <div
      style={{
        display: 'flex',
        width: s,
        height: s,
        borderRadius: '50%',
        background: color,
        flexShrink: 0,
      }}
    />
  )
}

// Panel header row
function PanelHeader({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 14px',
        borderBottom: `1px solid ${BORDER}`,
        gap: '8px',
      }}
    >
      <span style={{ fontSize: '10px', color: MUTED, letterSpacing: '2px' }}>{label}</span>
      <div style={{ display: 'flex', flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Dot color={GREEN} size={6} />
        <span style={{ fontSize: '10px', color: GREEN, letterSpacing: '1px' }}>RDY</span>
      </div>
    </div>
  )
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: BG,
          fontFamily: 'monospace',
          border: `1px solid ${BORDER}`,
        }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '52px',
            borderBottom: `1px solid ${BORDER}`,
            padding: '0 52px',
            gap: '20px',
            flexShrink: 0,
          }}
        >
          <span style={{ display: 'flex', color: MUTED, fontSize: '14px', letterSpacing: '3px' }}>SYS:ONLINE</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Dot color={GREEN} />
            <span style={{ display: 'flex', color: GREEN, fontSize: '14px', letterSpacing: '2px' }}>ACTIVE</span>
          </div>
          <div style={{ display: 'flex', flex: 1 }} />
          <span style={{ display: 'flex', color: MUTED, fontSize: '14px', letterSpacing: '3px' }}>SCIFICN.DEV</span>
        </div>

        {/* ── Main content ── */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            padding: '0 52px',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left: title + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div
              style={{
                display: 'flex',
                fontSize: '104px',
                color: GREEN,
                fontWeight: 700,
                letterSpacing: '-3px',
                lineHeight: 1,
                marginBottom: '28px',
              }}
            >
              scificn-ui
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '21px',
                color: TEXT,
                letterSpacing: '5px',
                lineHeight: 1,
                marginBottom: '20px',
              }}
            >
              RETRO SCI-FI REACT UI COMPONENTS
            </div>

            <div style={{ display: 'flex', fontSize: '16px', color: MUTED, letterSpacing: '1.5px', lineHeight: 1.7 }}>
              Copy-paste component library
            </div>
            <div style={{ display: 'flex', fontSize: '16px', color: MUTED, letterSpacing: '1.5px', lineHeight: 1.7 }}>
              for builders who actually read sci-fi.
            </div>
          </div>

          {/* Right: component showcase panels */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '340px',
              flexShrink: 0,
            }}
          >
            {/* Buttons panel */}
            <div style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${BORDER}`, background: SURFACE }}>
              <PanelHeader label="BUTTON" />
              <div style={{ display: 'flex', padding: '14px', gap: '10px' }}>
                <div style={{ display: 'flex', border: `1px solid ${GREEN}`, color: GREEN, fontSize: '11px', letterSpacing: '2px', padding: '6px 14px' }}>EXEC</div>
                <div style={{ display: 'flex', border: `1px solid ${BORDER}`, color: TEXT,  fontSize: '11px', letterSpacing: '2px', padding: '6px 14px' }}>OUTLINE</div>
                <div style={{ display: 'flex', border: `1px solid ${PINK}`,   color: PINK,  fontSize: '11px', letterSpacing: '2px', padding: '6px 14px' }}>ABORT</div>
              </div>
            </div>

            {/* Badges panel */}
            <div style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${BORDER}`, background: SURFACE }}>
              <PanelHeader label="BADGE" />
              <div style={{ display: 'flex', padding: '14px', gap: '8px' }}>
                <div style={{ display: 'flex', background: 'rgba(0,237,63,0.08)',   border: '1px solid rgba(0,237,63,0.3)',   color: GREEN, fontSize: '10px', letterSpacing: '2px', padding: '4px 10px' }}>ACTIVE</div>
                <div style={{ display: 'flex', background: 'rgba(242,150,58,0.08)', border: '1px solid rgba(242,150,58,0.3)', color: AMBER, fontSize: '10px', letterSpacing: '2px', padding: '4px 10px' }}>WARNING</div>
                <div style={{ display: 'flex', background: 'rgba(181,48,130,0.08)', border: '1px solid rgba(181,48,130,0.3)', color: PINK,  fontSize: '10px', letterSpacing: '2px', padding: '4px 10px' }}>CRITICAL</div>
              </div>
            </div>

            {/* Status panel */}
            <div style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${BORDER}`, background: SURFACE }}>
              <PanelHeader label="SYSTEM STATUS" />
              <div style={{ display: 'flex', flexDirection: 'column', padding: '14px', gap: '10px' }}>
                {/* REACTOR */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', fontSize: '10px', color: MUTED, letterSpacing: '2px', width: '58px' }}>REACTOR</span>
                  <div style={{ display: 'flex', flex: 1, height: '3px', background: BORDER }}>
                    <div style={{ display: 'flex', width: '90%', height: '3px', background: GREEN }} />
                  </div>
                  <span style={{ display: 'flex', fontSize: '10px', color: GREEN, letterSpacing: '1px', width: '58px' }}>NOMINAL</span>
                </div>
                {/* SHIELDS */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', fontSize: '10px', color: MUTED, letterSpacing: '2px', width: '58px' }}>SHIELDS</span>
                  <div style={{ display: 'flex', flex: 1, height: '3px', background: BORDER }}>
                    <div style={{ display: 'flex', width: '55%', height: '3px', background: AMBER }} />
                  </div>
                  <span style={{ display: 'flex', fontSize: '10px', color: AMBER, letterSpacing: '1px', width: '58px' }}>DEGRADED</span>
                </div>
                {/* COMMS */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', fontSize: '10px', color: MUTED, letterSpacing: '2px', width: '58px' }}>COMMS</span>
                  <div style={{ display: 'flex', flex: 1, height: '3px', background: BORDER }}>
                    <div style={{ display: 'flex', width: '25%', height: '3px', background: PINK }} />
                  </div>
                  <span style={{ display: 'flex', fontSize: '10px', color: PINK, letterSpacing: '1px', width: '58px' }}>FAULT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '52px',
            borderTop: `1px solid ${BORDER}`,
            padding: '0 52px',
            gap: '0',
            flexShrink: 0,
          }}
        >
          <span style={{ display: 'flex', color: TEAL, fontSize: '12px', letterSpacing: '2px' }}>32 COMPONENTS</span>
          <span style={{ display: 'flex', color: SEP,  fontSize: '18px', padding: '0 16px' }}>·</span>
          <span style={{ display: 'flex', color: TEAL, fontSize: '12px', letterSpacing: '2px' }}>3 THEMES</span>
          <span style={{ display: 'flex', color: SEP,  fontSize: '18px', padding: '0 16px' }}>·</span>
          <span style={{ display: 'flex', color: TEAL, fontSize: '12px', letterSpacing: '2px' }}>ZERO BORDER-RADIUS</span>
          <span style={{ display: 'flex', color: SEP,  fontSize: '18px', padding: '0 16px' }}>·</span>
          <span style={{ display: 'flex', color: TEAL, fontSize: '12px', letterSpacing: '2px' }}>CASSETTE FUTURISM</span>
          <span style={{ display: 'flex', color: SEP,  fontSize: '18px', padding: '0 16px' }}>·</span>
          <span style={{ display: 'flex', color: TEAL, fontSize: '12px', letterSpacing: '2px' }}>RADIX UI</span>
          <span style={{ display: 'flex', color: SEP,  fontSize: '18px', padding: '0 16px' }}>·</span>
          <span style={{ display: 'flex', color: TEAL, fontSize: '12px', letterSpacing: '2px' }}>TAILWIND CSS V4</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
