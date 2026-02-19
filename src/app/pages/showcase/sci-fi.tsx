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
} from '@/ui'

type BadgeVariant = 'ACTIVE' | 'OFFLINE' | 'WARNING' | 'CRITICAL' | 'SCANNING'

const ORBITAL_MAP = `  ORBITAL MAP: NEXUS-7 // SECTOR ALPHA // LIVE SWEEP
  ┌─────────────────────────────────────────────┐
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  ○  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │  ← DSV PROMETHEUS [INBOUND]
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  ·  ·  ⊕  ·  ·  ·  ·  ◇  ·  ·  · │  ← NEXUS-7 · CSS HERALD
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  △  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │  ← TGV BLACKSTAR [HOLD]
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  □  ·  ·  ·  · │  ← RSV MERIDIAN [DEPART]
  └─────────────────────────────────────────────┘
  TRACKED: 4 VESSELS // NEXT ARRIVAL: BAY 3 // COLLISION RISK: NONE`

const modules = [
  { name: 'HABITAT RING A', status: 'ACTIVE' as BadgeVariant },
  { name: 'HABITAT RING B', status: 'ACTIVE' as BadgeVariant },
  { name: 'RESEARCH LAB', status: 'WARNING' as BadgeVariant },
  { name: 'DOCKING CLUSTER', status: 'ACTIVE' as BadgeVariant },
  { name: 'ENGINEERING BAY', status: 'SCANNING' as BadgeVariant },
  { name: 'MEDICAL BAY', status: 'ACTIVE' as BadgeVariant },
  { name: 'COMMAND DECK', status: 'ACTIVE' as BadgeVariant },
  { name: 'EXTERNAL ARRAY', status: 'OFFLINE' as BadgeVariant },
]

const crew = [
  { name: 'REYES, A.', role: 'OPS COMMANDER', status: 'ACTIVE' as BadgeVariant },
  { name: 'CHEN, M.', role: 'NAVIGATION', status: 'ACTIVE' as BadgeVariant },
  { name: 'KOVACS, D.', role: 'ENGINEERING', status: 'ACTIVE' as BadgeVariant },
  { name: 'OSEI, F.', role: 'MEDICAL', status: 'ACTIVE' as BadgeVariant },
  { name: 'TANAKA, R.', role: 'EXTERNAL OPS', status: 'WARNING' as BadgeVariant },
]

const vessels = [
  {
    id: 'DSV-PROMETHEUS',
    name: 'DSV PROMETHEUS',
    class: 'DEEP SPACE FREIGHTER',
    origin: 'GANYMEDE DEPOT',
    eta: '02:14',
    bay: 'BAY 3',
    status: 'CRITICAL' as BadgeVariant,
    note: 'EMERGENCY DOCKING REQUEST',
  },
  {
    id: 'CSS-HERALD',
    name: 'CSS HERALD',
    class: 'COLONY TRANSPORT',
    origin: 'EARTH L2',
    eta: '06:33',
    bay: 'BAY 1',
    status: 'SCANNING' as BadgeVariant,
    note: 'SCHEDULED ARRIVAL',
  },
  {
    id: 'TGV-BLACKSTAR',
    name: 'TGV BLACKSTAR',
    class: 'TUG VESSEL',
    origin: 'BELT OPS',
    eta: 'PENDING',
    bay: 'HOLD',
    status: 'WARNING' as BadgeVariant,
    note: 'AWAITING CLEARANCE',
  },
  {
    id: 'RSV-MERIDIAN',
    name: 'RSV MERIDIAN',
    class: 'RESEARCH VESSEL',
    origin: 'NEXUS-7',
    eta: '00:47',
    bay: 'DEPARTED',
    status: 'ACTIVE' as BadgeVariant,
    note: 'OUTBOUND TO DEEP SPACE',
  },
]

const comms = [
  {
    from: 'DSV PROMETHEUS',
    msg: 'MAYDAY MAYDAY. Reactor coolant breach in section 4. Requesting emergency docking clearance. 2 crew critical. Please respond.',
    time: '04:17:02',
    tag: 'CRITICAL' as const,
  },
  {
    from: 'DEEP SPACE RELAY 9',
    msg: 'Anomalous signal detected in sector 7-G. Origin unknown. Estimated source: beyond charted space. Forwarding raw data.',
    time: '03:55:41',
    tag: 'WARNING' as const,
  },
  {
    from: 'COLONIAL ADMIN',
    msg: 'Cargo transfer order NX-7-2291 approved. CSS Herald manifest confirmed. Docking bay 1 reserved for 09:00 standard.',
    time: '03:22:18',
    tag: 'STATUS' as const,
  },
  {
    from: 'EARTH COMMAND',
    msg: 'Quarterly resupply schedule transmitted. All personnel rotation requests acknowledged. Next supply run: 14 sols.',
    time: '02:48:30',
    tag: 'INFO' as const,
  },
]

export default function SciFiShowcase() {
  const [dockingAuthorized, setDockingAuthorized] = useState(false)
  const [tick, setTick] = useState(0)

  // Apply default sci-fi theme (no data-theme attribute) on mount
  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-theme')
    document.documentElement.removeAttribute('data-theme')
    return () => {
      if (prev) {
        document.documentElement.setAttribute('data-theme', prev)
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }
  }, [])

  // Live clock tick for blinking effect
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false })

  return (
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
          NEXUS STATION-7
        </span>
        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}
        >
          // SECTOR ALPHA // OPERATIONS CONTROL
        </span>

        <div style={{ flex: 1 }} />

        {dockingAuthorized ? (
          <Badge variant="ACTIVE">BAY 3 OPEN</Badge>
        ) : (
          <Badge variant="CRITICAL">EMERGENCY DOCKING</Badge>
        )}
        <Badge variant="SCANNING">LIVE SWEEP</Badge>

        <span
          style={{
            color: 'var(--color-green)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textShadow: 'var(--text-glow-green)',
            flexShrink: 0,
            opacity: tick % 2 === 0 ? 1 : 0.5,
            transition: 'opacity 0.3s',
          }}
        >
          {timeStr}
        </span>
      </header>

      {/* ── MAIN 3-COLUMN GRID ── */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '256px 1fr 260px',
          gap: '1px',
          background: 'var(--border)',
          overflow: 'hidden',
        }}
      >
        {/* ── LEFT: STATION STATUS ── */}
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
          {/* Station modules */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>STATION MODULES</PanelTitle>
              <div style={{ marginLeft: 'auto' }}>
                <Badge variant="WARNING">1 FAULT</Badge>
              </div>
            </PanelHeader>
            <PanelContent>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {modules.map((mod, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.4rem 0',
                      borderBottom: i < modules.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.68rem',
                        color:
                          mod.status === 'ACTIVE'
                            ? 'var(--text-secondary)'
                            : mod.status === 'WARNING'
                              ? 'var(--color-amber)'
                              : mod.status === 'OFFLINE'
                                ? 'var(--text-muted)'
                                : 'var(--color-green)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {mod.name}
                    </span>
                    <Badge variant={mod.status}>{mod.status}</Badge>
                  </div>
                ))}
              </div>
            </PanelContent>
          </Panel>

          {/* Active crew */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>ON-SHIFT CREW</PanelTitle>
              <div style={{ marginLeft: 'auto' }}>
                <Badge variant="ACTIVE">5 ON DUTY</Badge>
              </div>
            </PanelHeader>
            <PanelContent>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {crew.map((member, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.4rem 0',
                      borderBottom: i < crew.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '0.68rem',
                          color: 'var(--text-secondary)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {member.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.57rem',
                          color: 'var(--text-muted)',
                          letterSpacing: '0.08em',
                          marginTop: '1px',
                        }}
                      >
                        {member.role}
                      </div>
                    </div>
                    <Badge variant={member.status}>{member.status}</Badge>
                  </div>
                ))}
              </div>
            </PanelContent>
          </Panel>

          {/* Research lab fault */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>ACTIVE FAULTS</PanelTitle>
            </PanelHeader>
            <PanelContent style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <Alert variant="WARNING">
                <AlertTitle>RESEARCH LAB — COOLANT</AlertTitle>
                <AlertDescription>
                  Secondary coolant loop pressure below nominal. Maintenance crew dispatched.
                  ETA to resolution: 01h 20m.
                </AlertDescription>
              </Alert>
              <Alert variant="STATUS">
                <AlertTitle>EXTERNAL ARRAY — OFFLINE</AlertTitle>
                <AlertDescription>
                  Scheduled maintenance window. Array restored by sol-end. No operational impact.
                </AlertDescription>
              </Alert>
            </PanelContent>
          </Panel>
        </div>

        {/* ── CENTER: OPS TABS ── */}
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
              <PanelTitle>OPERATIONS // NEXUS-7</PanelTitle>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                <Badge variant="ACTIVE">SYS NOMINAL</Badge>
              </div>
            </PanelHeader>
            <PanelContent style={{ padding: 0 }}>
              <Tabs defaultValue="docking">
                <TabsList style={{ padding: '0 1rem', background: 'var(--surface-raised)' }}>
                  <TabsTrigger value="docking">DOCKING</TabsTrigger>
                  <TabsTrigger value="comms">COMMS</TabsTrigger>
                  <TabsTrigger value="radar">RADAR</TabsTrigger>
                </TabsList>

                {/* DOCKING TAB */}
                <TabsContent value="docking" style={{ margin: 0, padding: '1rem' }}>
                  {!dockingAuthorized && (
                    <Alert variant="CRITICAL" style={{ marginBottom: '1rem' }}>
                      <AlertTitle>EMERGENCY DOCKING — DSV PROMETHEUS</AlertTitle>
                      <AlertDescription>
                        Reactor coolant breach. 2 crew critical. Requesting immediate clearance
                        for Bay 3. Authorize to open docking approach.
                      </AlertDescription>
                    </Alert>
                  )}
                  {dockingAuthorized && (
                    <Alert variant="STATUS" style={{ marginBottom: '1rem' }}>
                      <AlertTitle>BAY 3 OPEN — DSV PROMETHEUS INBOUND</AlertTitle>
                      <AlertDescription>
                        Docking corridor pressurised. Medical team on standby. ETA 02:14.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {/* Header row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 60px 70px 100px',
                        gap: '0.5rem',
                        padding: '0.375rem 0.75rem',
                        fontSize: '0.58rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.12em',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <span>VESSEL</span>
                      <span>CLASS</span>
                      <span>ETA</span>
                      <span>BAY</span>
                      <span style={{ textAlign: 'right' }}>STATUS</span>
                    </div>

                    {vessels.map((v) => (
                      <div
                        key={v.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr 60px 70px 100px',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.55rem 0.75rem',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          fontSize: '0.7rem',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              color: 'var(--text-secondary)',
                              letterSpacing: '0.04em',
                              marginBottom: '0.1rem',
                            }}
                          >
                            {v.name}
                          </div>
                          <div
                            style={{
                              fontSize: '0.57rem',
                              color: 'var(--text-muted)',
                              letterSpacing: '0.06em',
                            }}
                          >
                            {v.note}
                          </div>
                        </div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                          {v.class}
                        </span>
                        <span
                          style={{
                            color:
                              v.status === 'CRITICAL' ? 'var(--color-red)' : 'var(--text-muted)',
                            fontSize: '0.68rem',
                            letterSpacing: '0.04em',
                            fontWeight: v.status === 'CRITICAL' ? 700 : 400,
                          }}
                        >
                          {v.eta}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                          {v.bay}
                        </span>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Badge
                            variant={
                              v.id === 'DSV-PROMETHEUS' && dockingAuthorized ? 'ACTIVE' : v.status
                            }
                          >
                            {v.id === 'DSV-PROMETHEUS' && dockingAuthorized
                              ? 'INBOUND'
                              : v.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* COMMS TAB */}
                <TabsContent value="comms" style={{ margin: 0, padding: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {comms.map((msg, i) => (
                      <Alert key={i} variant={msg.tag}>
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
                                fontSize: '0.6rem',
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

                {/* RADAR TAB */}
                <TabsContent value="radar" style={{ margin: 0, padding: '1rem' }}>
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
                      {ORBITAL_MAP}
                    </pre>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '0.625rem',
                    }}
                  >
                    {[
                      { label: 'TRACKED', value: '4', color: 'var(--color-green)' },
                      { label: 'INBOUND', value: '2', color: 'var(--color-green)' },
                      { label: 'OUTBOUND', value: '1', color: 'var(--text-secondary)' },
                      { label: 'HOLDING', value: '1', color: 'var(--color-amber)' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        style={{
                          padding: '0.75rem 0.5rem',
                          border: '1px solid var(--border)',
                          background: 'var(--surface)',
                          textAlign: 'center',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.57rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.12em',
                            marginBottom: '0.3rem',
                          }}
                        >
                          {s.label}
                        </div>
                        <div
                          style={{
                            fontSize: '1.1rem',
                            color: s.color,
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </PanelContent>
          </Panel>
        </div>

        {/* ── RIGHT: POWER & ENVIRONMENT ── */}
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
          {/* Power allocation */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>POWER ALLOCATION</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <Progress value={89} label="FUSION REACTOR" />
                <Progress value={76} label="HABITAT LIFE SUPPORT" />
                <Progress value={94} label="DOCKING SYSTEMS" />
                <Progress value={61} label="PROPULSION ARRAY" />
                <Progress value={100} label="COMM RELAY" />
                <Progress value={43} label="DEFLECTOR GRID" />
              </div>
            </PanelContent>
          </Panel>

          {/* Environment */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>ENVIRONMENT</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <Progress value={98} label="O₂ LEVELS" />
                <Progress value={82} label="ATMOSPHERIC PRESSURE" />
                <Progress value={71} label="HUMIDITY" />
                <Progress value={55} label="RADIATION SHIELDING" />
              </div>
            </PanelContent>
          </Panel>

          {/* Proximity */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>PROXIMITY ALERTS</PanelTitle>
            </PanelHeader>
            <PanelContent style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                {
                  name: 'DSV PROMETHEUS',
                  dist: '0.4 AU',
                  status: 'CRITICAL' as const,
                },
                {
                  name: 'CSS HERALD',
                  dist: '2.1 AU',
                  status: 'SCANNING' as const,
                },
                {
                  name: 'TGV BLACKSTAR',
                  dist: '0.9 AU',
                  status: 'WARNING' as const,
                },
                {
                  name: 'DEBRIS FIELD 7G',
                  dist: '3.8 AU',
                  status: 'OFFLINE' as const,
                },
              ].map((obj, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.4rem 0.5rem',
                    background: 'var(--surface-raised)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {obj.name}
                    </div>
                    <div
                      style={{
                        fontSize: '0.57rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.08em',
                        marginTop: '1px',
                      }}
                    >
                      {obj.dist}
                    </div>
                  </div>
                  <Badge variant={obj.status}>{obj.status}</Badge>
                </div>
              ))}
            </PanelContent>
          </Panel>
        </div>
      </div>

      {/* ── COMMAND FOOTER ── */}
      <footer
        style={{
          height: '52px',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.25rem',
          gap: '0.625rem',
          position: 'sticky',
          bottom: 0,
          zIndex: 50,
          flexShrink: 0,
        }}
      >
        <Button
          variant="EXEC"
          size="SM"
          onClick={() => setDockingAuthorized(true)}
          disabled={dockingAuthorized}
        >
          {dockingAuthorized ? '✓ DOCKING AUTHORIZED' : 'AUTHORIZE DOCKING'}
        </Button>
        <Button variant="OUTLINE" size="SM">
          BROADCAST ALERT
        </Button>
        <Button variant="GHOST" size="SM">
          REQUEST SUPPORT
        </Button>
        <Button variant="ABORT" size="SM">
          LOCK DOWN STATION
        </Button>

        <div style={{ flex: 1 }} />

        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
          }}
        >
          NEXUS-7 // SECTOR ALPHA // COLONIAL AUTHORITY
        </span>

        <span style={{ color: 'var(--border)' }}>│</span>

        <Badge variant="ACTIVE">SYS ONLINE</Badge>
      </footer>
    </div>
  )
}
