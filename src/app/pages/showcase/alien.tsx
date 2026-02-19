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

const SENSOR_MAP = `  SWEEP: USCSS NOSTROMO // INTERNAL GRID
  ┌───────────────────────────────────────────┐
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  [C] ·  ·  ·  ·  ·  ·  ·  ·  · │  ← CRYO DECK
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  ·  ·  ·  [E] ·  ·  ·  ·  ·  · │  ← ENGINE ROOM
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  [B] ·  ·  ·  ·  ·  ·  ·  ·  ·  · │  ← BRIDGE
  │  ·  ·  ·  ·  ·  ·  ·  ·  ◉  ·  ·  ·  · │  ← SPECIMEN [MOVING]
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  └───────────────────────────────────────────┘
  HEAT SIG: CONFIRMED // ACID TRACE: DECK C-7 // STATUS: HOSTILE`

const crew = [
  { name: 'RIPLEY, E.', role: 'WARRANT OFFICER', status: 'ACTIVE' as BadgeVariant },
  { name: 'ASH', role: 'SCIENCE OFFICER', status: 'WARNING' as BadgeVariant },
  { name: 'DALLAS, A.', role: 'CAPTAIN', status: 'OFFLINE' as BadgeVariant },
  { name: 'KANE, G.', role: 'EXEC. OFFICER', status: 'CRITICAL' as BadgeVariant },
  { name: 'LAMBERT, J.', role: 'NAVIGATOR', status: 'OFFLINE' as BadgeVariant },
  { name: 'BRETT, S.', role: 'ENGINEER', status: 'OFFLINE' as BadgeVariant },
  { name: 'PARKER, D.', role: 'CHIEF ENGINEER', status: 'OFFLINE' as BadgeVariant },
]

const logs = [
  {
    id: 'MU-0937-A',
    entry: 'Commercial towing vehicle Nostromo. Crew: seven. Cargo: refinery processing unit. Returning to Earth with crew in hypersleep.',
    time: '2122.06.03 // 00:14',
    tag: 'STATUS' as const,
  },
  {
    id: 'MU-0937-B',
    entry: 'Distress signal LV-426 origin confirmed. Rerouting per Company directive. Crew awakened from hypersleep. Proceeding to source.',
    time: '2122.06.07 // 09:41',
    tag: 'INFO' as const,
  },
  {
    id: 'MU-0937-C',
    entry: 'Crew member Kane, G. returned to ship with unknown organism attached to face. Quarantine protocol bypassed. Science Officer authorised entry.',
    time: '2122.06.08 // 03:22',
    tag: 'WARNING' as const,
  },
  {
    id: 'MU-0937-D',
    entry: 'SPECIAL ORDER 937. Priority One. All other priorities rescinded. Crew expendable. Bring back organism. Specimen integrity paramount.',
    time: '2122.06.09 // 17:05',
    tag: 'CRITICAL' as const,
  },
]

const cargo = [
  { item: 'CRUDE OIL REFINERY UNIT', mass: '65,000t', status: 'ACTIVE' as BadgeVariant },
  { item: 'HYPERSLEEP CHAMBERS × 7', mass: '4.2t', status: 'WARNING' as BadgeVariant },
  { item: 'SPECIMEN CONTAINER MK-II', mass: '0.8t', status: 'SCANNING' as BadgeVariant },
  { item: 'EMERGENCY EVA SUITS', mass: '1.1t', status: 'ACTIVE' as BadgeVariant },
  { item: 'MAINTENANCE DRONE × 3', mass: '0.6t', status: 'OFFLINE' as BadgeVariant },
]

export default function AlienShowcase() {
  const [arming, setArming] = useState(false)
  const [armed, setArmed] = useState(false)

  // Apply alien theme on mount, restore previous on unmount
  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-theme')
    document.documentElement.setAttribute('data-theme', 'alien')
    return () => {
      if (prev) {
        document.documentElement.setAttribute('data-theme', prev)
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }
  }, [])

  // Simulate self-destruct arm sequence
  function handleArm() {
    if (armed) return
    setArming(true)
    setTimeout(() => {
      setArming(false)
      setArmed(true)
    }, 2000)
  }

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
          WEYLAND-YUTANI
        </span>
        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}
        >
          // USCSS NOSTROMO // MU/TH/UR 6000
        </span>

        <div style={{ flex: 1 }} />

        <Badge variant="CRITICAL">SPECIMEN LOOSE</Badge>
        <Badge variant="SCANNING">TRACKING</Badge>

        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            flexShrink: 0,
          }}
        >
          2122.06.09 // CLASSIFIED
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
        {/* ── LEFT: CREW STATUS ── */}
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
          {/* Crew roster */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>CREW STATUS</PanelTitle>
              <div style={{ marginLeft: 'auto' }}>
                <Badge variant="WARNING">1 / 7 ACTIVE</Badge>
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
                      padding: '0.45rem 0',
                      borderBottom: i < crew.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '0.68rem',
                          color:
                            member.status === 'ACTIVE'
                              ? 'var(--color-green)'
                              : member.status === 'WARNING'
                                ? 'var(--color-amber)'
                                : 'var(--text-muted)',
                          letterSpacing: '0.04em',
                          textShadow:
                            member.status === 'ACTIVE' ? 'var(--text-glow-green)' : 'none',
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

          {/* MOTHER alert */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>MOTHER // DIRECTIVE</PanelTitle>
            </PanelHeader>
            <PanelContent style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <Alert variant="CRITICAL">
                <AlertTitle>SPECIAL ORDER 937</AlertTitle>
                <AlertDescription>
                  Crew expendable. Specimen integrity paramount. Return organism to Company.
                  All other priorities rescinded.
                </AlertDescription>
              </Alert>
              <Alert variant="WARNING">
                <AlertTitle>SCIENCE OFFICER</AlertTitle>
                <AlertDescription>
                  Ash behaviour anomalous. Loyalty to Company directive. Exercise caution.
                </AlertDescription>
              </Alert>
            </PanelContent>
          </Panel>

          {/* Escape options */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>ESCAPE OPTIONS</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {[
                  { label: 'LOCATE SPECIMEN', done: true },
                  { label: 'SEAL DECK C-7', done: true },
                  { label: 'VENT ATMOSPHERE', done: false },
                  { label: 'REACH NARCISSUS', done: false },
                  { label: 'INITIATE SELF-DESTRUCT', done: false },
                  { label: 'JETTISON FROM NOSTROMO', done: false },
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
        </div>

        {/* ── CENTER: SHIP SYSTEMS ── */}
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
              <PanelTitle>SHIP SYSTEMS // NOSTROMO</PanelTitle>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                <Badge variant="SCANNING">MU/TH/UR ONLINE</Badge>
              </div>
            </PanelHeader>
            <PanelContent style={{ padding: 0 }}>
              <Tabs defaultValue="sensors">
                <TabsList style={{ padding: '0 1rem', background: 'var(--surface-raised)' }}>
                  <TabsTrigger value="sensors">SENSORS</TabsTrigger>
                  <TabsTrigger value="lifesupport">LIFE SUPPORT</TabsTrigger>
                  <TabsTrigger value="log">SHIP LOG</TabsTrigger>
                </TabsList>

                {/* SENSORS TAB */}
                <TabsContent value="sensors" style={{ margin: 0, padding: '1rem' }}>
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
                      {SENSOR_MAP}
                    </pre>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '0.75rem',
                    }}
                  >
                    {[
                      { label: 'HEAT SIGNATURES', value: '1 HOSTILE', color: 'var(--color-red)' },
                      { label: 'ACID TRACE', value: 'DECK C-7', color: 'var(--color-amber)' },
                      { label: 'MOVEMENT', value: 'CONFIRMED', color: 'var(--color-amber)' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        style={{
                          padding: '0.875rem',
                          border: '1px solid var(--border)',
                          background: 'var(--surface)',
                          textAlign: 'center',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.58rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.12em',
                            marginBottom: '0.35rem',
                            textTransform: 'uppercase',
                          }}
                        >
                          {stat.label}
                        </div>
                        <div
                          style={{
                            fontSize: '0.9rem',
                            color: stat.color,
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* LIFE SUPPORT TAB */}
                <TabsContent value="lifesupport" style={{ margin: 0, padding: '1rem' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                      <Progress value={97} label="OXYGEN LEVEL" />
                      <Progress value={76} label="NITROGEN BALANCE" />
                      <Progress value={12} label="CO₂ SCRUBBERS" />
                      <Progress value={88} label="CABIN PRESSURE" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                      <Progress value={54} label="HULL TEMPERATURE" />
                      <Progress value={91} label="REACTOR OUTPUT" />
                      <Progress value={23} label="COOLANT LEVEL" />
                      <Progress value={67} label="GRAVITY PLATING" />
                    </div>
                  </div>

                  <Alert variant="WARNING">
                    <AlertTitle>CO₂ CRITICAL</AlertTitle>
                    <AlertDescription>
                      Scrubber efficiency below threshold on decks C and D. Ventilation
                      rerouted. Estimated time to critical failure: 04h 38m.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                {/* SHIP LOG TAB */}
                <TabsContent value="log" style={{ margin: 0, padding: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {logs.map((log) => (
                      <Alert key={log.id} variant={log.tag}>
                        <AlertTitle>
                          <span
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <span>LOG {log.id}</span>
                            <span
                              style={{
                                color: 'var(--text-muted)',
                                fontWeight: 400,
                                fontSize: '0.6rem',
                              }}
                            >
                              {log.time}
                            </span>
                          </span>
                        </AlertTitle>
                        <AlertDescription>{log.entry}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </PanelContent>
          </Panel>
        </div>

        {/* ── RIGHT: SYSTEMS & CARGO ── */}
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
          {/* Ship integrity */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>HULL & POWER</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <Progress value={82} label="HULL INTEGRITY" />
                <Progress value={91} label="MAIN REACTOR" />
                <Progress value={34} label="FUEL REMAINING" />
                <Progress value={100} label="COMM ARRAY" />
                <Progress value={47} label="SECONDARY POWER" />
              </div>
            </PanelContent>
          </Panel>

          {/* Cargo manifest */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>CARGO MANIFEST</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {cargo.map((item, i) => (
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
                      <Badge variant={item.status}>{item.status}</Badge>
                      <span
                        style={{
                          fontSize: '0.6rem',
                          color: 'var(--text-muted)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {item.mass}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.63rem',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.04em',
                        display: 'block',
                        marginTop: '0.15rem',
                      }}
                    >
                      {item.item}
                    </span>
                  </div>
                ))}
              </div>
            </PanelContent>
          </Panel>

          {/* Self-destruct */}
          <Panel notch="sm">
            <PanelHeader>
              <PanelTitle>EMERGENCY SYSTEMS</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <Alert variant={armed ? 'CRITICAL' : 'WARNING'} style={{ marginBottom: '0.75rem' }}>
                <AlertTitle>{armed ? 'SELF-DESTRUCT ARMED' : 'SELF-DESTRUCT AVAILABLE'}</AlertTitle>
                <AlertDescription>
                  {armed
                    ? 'T-minus 10:00. All crew must evacuate immediately. No further abort possible.'
                    : 'Nostromo destruct sequence requires two-stage authorisation. Irreversible once initiated.'}
                </AlertDescription>
              </Alert>
              <Button
                variant={armed ? 'ABORT' : 'OUTLINE'}
                size="SM"
                style={{ width: '100%' }}
                onClick={handleArm}
                disabled={arming || armed}
              >
                {arming ? 'ARMING...' : armed ? '✕ SELF-DESTRUCT ARMED' : 'ARM SELF-DESTRUCT'}
              </Button>
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
        <Button variant="ABORT" size="SM">
          EMERGENCY BEACON
        </Button>
        <Button variant="EXEC" size="SM">
          VENT ATMOSPHERE
        </Button>
        <Button variant="OUTLINE" size="SM">
          JETTISON AIRLOCK
        </Button>
        <Button variant="GHOST" size="SM">
          CONTACT MOTHER
        </Button>

        <div style={{ flex: 1 }} />

        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
          }}
        >
          WEYLAND-YUTANI CORP // CLASSIFIED // BUILD BETTER WORLDS
        </span>

        <span style={{ color: 'var(--border)' }}>│</span>

        <Badge variant="CRITICAL">ALERT LEVEL: RED</Badge>
      </footer>
    </div>
  )
}
