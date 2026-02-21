import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
  Badge,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  StatCard,
  StatusGrid,
  ProgressRing,
  Grid,
} from '@/ui'
import type { SystemStatus } from '@/ui/status-grid'

type BadgeVariant = 'ACTIVE' | 'OFFLINE' | 'WARNING' | 'CRITICAL' | 'SCANNING'

const TACTICAL_MAP = `  GRID: YAVIN SYSTEM // COORDINATES: 17-G / 22-H
  ┌─────────────────────────────────────────────┐
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  ★  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │  ← YAVIN (GAS GIANT)
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  ·  ·  ⊕  ·  ·  ·  ·  ·  ·  ·  · │  ← YAVIN IV [TARGET]
  │  ·  ·  ·  ·  ·  ·  ·  ·  ▲  ·  ·  ·  ·  · │  ← DEATH STAR [DS-1]
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  ·  ·  ✕  ·  ·  ·  ·  ·  ·  ·  · │  ← REBEL FLEET
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  └─────────────────────────────────────────────┘
  LOCK: [TARGET CONFIRMED] // FIRING RANGE: IN RANGE // T-MINUS: 04:12`

const comms = [
  {
    from: 'LORD VADER',
    msg: 'Destroy that station. Nothing else matters.',
    time: '19:42:07',
    variant: 'CRITICAL' as BadgeVariant,
  },
  {
    from: 'MOFF TARKIN',
    msg: 'Fire when ready. Make an example of them.',
    time: '19:38:21',
    variant: 'ACTIVE' as BadgeVariant,
  },
  {
    from: 'BRIDGE OFFICER',
    msg: 'Rebel fleet emerging from hyperspace in sector 7.',
    time: '19:35:14',
    variant: 'WARNING' as BadgeVariant,
  },
  {
    from: 'SCANNER OPS',
    msg: 'Target lock confirmed. Yavin IV is within firing range.',
    time: '19:31:00',
    variant: 'ACTIVE' as BadgeVariant,
  },
]

const manifest = [
  { unit: 'DEATH STAR I', class: 'BATTLESTATION', crew: '1,186,295', status: 'ACTIVE' as BadgeVariant },
  { unit: 'ISD DEVASTATOR', class: 'STAR DESTROYER', crew: '37,085', status: 'ACTIVE' as BadgeVariant },
  { unit: 'ISD AVENGER', class: 'STAR DESTROYER', crew: '37,085', status: 'ACTIVE' as BadgeVariant },
  { unit: 'TIE SQUADRON VI', class: 'FIGHTER WING', crew: '72', status: 'SCANNING' as BadgeVariant },
  { unit: 'STORMTROOPER BN.7', class: 'GROUND FORCES', crew: '820', status: 'OFFLINE' as BadgeVariant },
  { unit: 'ISD EXECUTOR', class: 'SUPER STAR DEST.', crew: '279,144', status: 'SCANNING' as BadgeVariant },
]

const activeUnits = [
  { name: 'AT-AT WALKER', status: 'ACTIVE' as BadgeVariant },
  { name: 'TIE FIGHTER', status: 'ACTIVE' as BadgeVariant },
  { name: 'TIE INTERCEPTOR', status: 'SCANNING' as BadgeVariant },
  { name: 'STAR DESTROYER', status: 'ACTIVE' as BadgeVariant },
  { name: 'LAMBDA SHUTTLE', status: 'OFFLINE' as BadgeVariant },
  { name: 'PROBE DROID', status: 'ACTIVE' as BadgeVariant },
]

function useNarrow(threshold = 900): boolean {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < threshold
  )
  useEffect(() => {
    const handle = () => setNarrow(window.innerWidth < threshold)
    window.addEventListener('resize', handle, { passive: true })
    return () => window.removeEventListener('resize', handle)
  }, [threshold])
  return narrow
}

export default function StarWarsShowcase() {
  const [orderSent, setOrderSent] = useState(false)
  const [countdown, setCountdown] = useState('04:12')
  const narrow = useNarrow()

  // Apply star-wars theme on mount, restore previous on unmount
  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-theme')
    document.documentElement.setAttribute('data-theme', 'star-wars')
    return () => {
      if (prev) {
        document.documentElement.setAttribute('data-theme', prev)
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }
  }, [])

  // Fake countdown timer
  useEffect(() => {
    const start = Date.now()
    const totalMs = (4 * 60 + 12) * 1000
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, totalMs - elapsed)
      const m = Math.floor(remaining / 60000)
      const s = Math.floor((remaining % 60000) / 1000)
      setCountdown(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
      if (remaining === 0) clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <title>Star Wars Theme — scificn-ui</title>
      <meta name="description" content="Live demo of the Star Wars theme: blue hologram glow, Imperial Navy sector command terminal built with scificn-ui components." />
      <meta property="og:title" content="Star Wars Theme — scificn-ui" />
      <meta property="og:description" content="Live demo of the Star Wars theme: blue hologram glow, Imperial Navy sector command terminal built with scificn-ui components." />
      <meta property="og:url" content="https://www.scificn.dev/showcase/star-wars" />
      <meta property="twitter:title" content="Star Wars Theme — scificn-ui" />
      <meta property="twitter:description" content="Live demo of the Star Wars theme: blue hologram glow, Imperial Navy sector command terminal built with scificn-ui components." />
      <link rel="canonical" href="https://www.scificn.dev/showcase/star-wars" />
      <div
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* ── TOP COMMAND BAR ── */}
      <header
        style={{
          height: '44px',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.25rem',
          gap: '0.75rem',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          flexShrink: 0,
        }}
      >
        <Link
          to="/showcase"
          style={{
            textDecoration: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-green)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          ◄ SHOWCASE
        </Link>

        <span style={{ color: 'var(--border)', flexShrink: 0 }}>│</span>

        <span
          style={{
            color: 'var(--color-green)',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textShadow: 'var(--text-glow-green)',
            flexShrink: 0,
          }}
        >
          IMPERIAL NAVY
        </span>
        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}
        >
          // DS-1 ORBITAL // SECTOR-7G COMMAND
        </span>

        <div style={{ flex: 1 }} />

        <Badge variant="ACTIVE">SECURE CHANNEL</Badge>
        <Badge variant="SCANNING">ENCRYPTED</Badge>

        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            flexShrink: 0,
          }}
        >
          0 BBY // CLASSIFIED
        </span>
      </header>

      {/* ── MAIN 3-COLUMN GRID ── */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: narrow ? '1fr' : '272px 1fr 256px',
          gap: '1px',
          background: 'var(--border)',
          overflow: narrow ? 'visible' : 'hidden',
        }}
      >
        {/* ── LEFT: MISSION OPS ── */}
        <div
          style={{
            background: 'var(--background)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
            overflowY: 'auto',
          }}
        >
          {/* Alerts */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>MISSION OPS</PanelTitle>
              <div style={{ marginLeft: 'auto' }}>
                <Badge variant="CRITICAL">PRIORITY ALPHA</Badge>
              </div>
            </PanelHeader>
            <PanelContent style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <Alert variant="CRITICAL">
                <AlertTitle>TARGET ACQUIRED</AlertTitle>
                <AlertDescription>
                  Rebel base detected at Yavin IV. Firing solution computed and locked.
                </AlertDescription>
              </Alert>
              <Alert variant="WARNING">
                <AlertTitle>REBEL FLEET INBOUND</AlertTitle>
                <AlertDescription>
                  Hostile X-Wing squadron approaching. T-minus {countdown}.
                </AlertDescription>
              </Alert>
            </PanelContent>
          </Panel>

          {/* Objectives */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>OBJECTIVES</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {[
                  { label: 'SCAN SECTOR 7G', done: true },
                  { label: 'ESTABLISH COMM LINK', done: true },
                  { label: 'LOCK TARGET COORDINATES', done: true },
                  { label: 'CHARGE SUPERLASER', done: false },
                  { label: 'AWAIT VADER CLEARANCE', done: false },
                  { label: 'EXECUTE FIRING SOLUTION', done: false },
                ].map((obj, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.7rem',
                      color: obj.done ? 'var(--color-green)' : 'var(--text-muted)',
                      textShadow: obj.done ? 'var(--text-glow-green)' : 'none',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <span style={{ flexShrink: 0 }}>{obj.done ? '■' : '□'}</span>
                    <span
                      style={{
                        textDecoration: obj.done ? 'line-through' : 'none',
                        opacity: obj.done ? 0.6 : 1,
                      }}
                    >
                      {obj.label}
                    </span>
                  </div>
                ))}
              </div>
            </PanelContent>
          </Panel>

          {/* Intel */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>SECTOR INTEL</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <Alert variant="INFO">
                <AlertTitle>YAVIN ANALYSIS</AlertTitle>
                <AlertDescription>
                  1 gas giant, 3 moons. Yavin IV: no planetary shields. Exhaust port
                  identified at grid 0-0-8-7. Diameter: 2m.
                </AlertDescription>
              </Alert>
            </PanelContent>
          </Panel>

          {/* Status summary */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>FORCE READOUT</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <Alert variant="STATUS">
                <AlertTitle>DARK SIDE ONLINE</AlertTitle>
                <AlertDescription>
                  Lord Vader's presence confirmed on bridge. All officers comply.
                </AlertDescription>
              </Alert>
            </PanelContent>
          </Panel>
        </div>

        {/* ── CENTER: TACTICAL GRID ── */}
        <div
          style={{
            background: 'var(--background)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
            overflowY: 'auto',
          }}
        >
          <Panel notch="md" style={{ flex: 1 }}>
            <PanelHeader>
              <PanelTitle>TACTICAL GRID // SECTOR-7G</PanelTitle>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                <Badge variant="SCANNING">LIVE FEED</Badge>
              </div>
            </PanelHeader>
            <PanelContent style={{ padding: 0 }}>
              <Tabs defaultValue="tactical">
                <TabsList
                  style={{ padding: '0 1rem', background: 'var(--surface-raised)' }}
                >
                  <TabsTrigger value="tactical">TACTICAL</TabsTrigger>
                  <TabsTrigger value="comms">COMMS</TabsTrigger>
                  <TabsTrigger value="manifest">MANIFEST</TabsTrigger>
                </TabsList>

                {/* TACTICAL TAB */}
                <TabsContent value="tactical" style={{ margin: 0, padding: '1rem' }}>
                  {/* Key metrics */}
                  <Grid preset="3-col" gap="0.75rem" style={{ marginBottom: '1rem' }}>
                    <StatCard label="TARGET LOCK"       value="100%"    variant="CRITICAL" sublabel="YAVIN IV"   />
                    <StatCard label="T-MINUS IMPACT"    value={countdown} variant="WARNING" sublabel="COUNTDOWN" />
                    <StatCard label="SUPERLASER CHARGE" value="94%"     variant="ACTIVE"   sublabel="READY"      />
                  </Grid>

                  {/* ASCII Map */}
                  <div
                    style={{
                      padding: '1rem',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      marginBottom: '1rem',
                      overflowX: 'auto',
                    }}
                  >
                    <pre
                      style={{
                        margin: 0,
                        fontSize: '0.62rem',
                        color: 'var(--color-green)',
                        textShadow: 'var(--text-glow-green)',
                        lineHeight: 1.5,
                        letterSpacing: '0.02em',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {TACTICAL_MAP}
                    </pre>
                  </div>

                </TabsContent>

                {/* COMMS TAB */}
                <TabsContent value="comms" style={{ margin: 0, padding: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {comms.map((msg, i) => (
                      <Alert key={i} variant={msg.variant === 'ACTIVE' ? 'STATUS' : msg.variant === 'WARNING' ? 'WARNING' : 'CRITICAL'}>
                        <AlertTitle>
                          <span
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <span>{msg.from}</span>
                            <span
                              style={{
                                color: 'var(--text-muted)',
                                fontWeight: 400,
                                fontSize: '0.65rem',
                              }}
                            >
                              {msg.time}
                            </span>
                          </span>
                        </AlertTitle>
                        <AlertDescription>{msg.msg}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </TabsContent>

                {/* MANIFEST TAB */}
                <TabsContent value="manifest" style={{ margin: 0, padding: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {/* Header row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 90px 100px',
                        gap: '0.75rem',
                        padding: '0.375rem 0.75rem',
                        fontSize: '0.58rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.12em',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <span>UNIT</span>
                      <span>CLASS</span>
                      <span style={{ textAlign: 'right' }}>CREW</span>
                      <span style={{ textAlign: 'right' }}>STATUS</span>
                    </div>

                    {manifest.map((unit, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr 90px 100px',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.5rem 0.75rem',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          fontSize: '0.7rem',
                        }}
                      >
                        <span
                          style={{ color: 'var(--text-secondary)', letterSpacing: '0.04em' }}
                        >
                          {unit.unit}
                        </span>
                        <span
                          style={{ color: 'var(--text-muted)', letterSpacing: '0.04em' }}
                        >
                          {unit.class}
                        </span>
                        <span
                          style={{
                            color: 'var(--text-muted)',
                            letterSpacing: '0.04em',
                            textAlign: 'right',
                          }}
                        >
                          {unit.crew}
                        </span>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Badge variant={unit.status}>{unit.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </PanelContent>
          </Panel>
        </div>

        {/* ── RIGHT: SYSTEM STATUS ── */}
        <div
          style={{
            background: 'var(--background)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
            overflowY: 'auto',
          }}
        >
          {/* System gauges */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>SYSTEM STATUS</PanelTitle>
            </PanelHeader>
            <PanelContent>
              {/* Key system rings */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  paddingBottom: '1rem',
                  marginBottom: '1rem',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <ProgressRing value={91}  label="POWER"    variant="ACTIVE"   size={76} />
                <ProgressRing value={94}  label="SUPERLASER" variant="CRITICAL" size={76} />
                <ProgressRing value={73}  label="SHIELDS"  variant="WARNING"  size={76} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <Progress value={91} label="MAIN POWER" />
                <Progress value={73} label="DEFLECTOR SHIELDS" />
                <Progress value={67} label="ION ENGINES" />
                <Progress value={100} label="COMM ARRAY" />
                <Progress value={94} label="SUPERLASER CHARGE" />
              </div>
            </PanelContent>
          </Panel>

          {/* Active units */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>ACTIVE UNITS</PanelTitle>
            </PanelHeader>
            <StatusGrid
              systems={activeUnits.map((u) => ({ name: u.name, status: u.status as SystemStatus }))}
            />
          </Panel>

          {/* Personnel */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>BRIDGE PERSONNEL</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { name: 'GRAND MOFF TARKIN', role: 'COMMANDER', status: 'ACTIVE' as BadgeVariant },
                  { name: 'DARTH VADER', role: 'DARK LORD', status: 'ACTIVE' as BadgeVariant },
                  { name: 'LT. CMDR. PRAJI', role: 'TACTICAL', status: 'ACTIVE' as BadgeVariant },
                  { name: 'ADM. MOTTI', role: 'OPERATIONS', status: 'WARNING' as BadgeVariant },
                ].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.4rem 0.5rem',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.1rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.65rem',
                          color: 'var(--text-secondary)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {p.name}
                      </span>
                      <Badge variant={p.status}>{p.status}</Badge>
                    </div>
                    <span
                      style={{
                        fontSize: '0.58rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {p.role}
                    </span>
                  </div>
                ))}
              </div>
            </PanelContent>
          </Panel>
        </div>
      </div>

      {/* ── COMMAND FOOTER ── */}
      <footer
        style={{
          minHeight: '52px',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '0.5rem 1.25rem',
          gap: '0.5rem',
          position: 'sticky',
          bottom: 0,
          zIndex: 50,
          flexShrink: 0,
        }}
      >
        <Button
          variant="EXEC"
          size="SM"
          onClick={() => setOrderSent(true)}
          disabled={orderSent}
        >
          {orderSent ? '✓ ORDER TRANSMITTED' : 'EXEC ORDER 66'}
        </Button>
        <Button variant="OUTLINE" size="SM">
          TRANSMIT
        </Button>
        <Button variant="GHOST" size="SM">
          REQUEST REINFORCEMENTS
        </Button>
        <Button variant="ABORT" size="SM">
          ABORT MISSION
        </Button>

        <div style={{ flex: 1 }} />

        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
          }}
        >
          TIMESTAMP: 0 BBY // CLASSIFIED
        </span>

        <span style={{ color: 'var(--border)' }}>│</span>

        <Badge variant="ACTIVE">CHANNEL SECURE</Badge>
      </footer>
    </div>
    </>
  )
}
