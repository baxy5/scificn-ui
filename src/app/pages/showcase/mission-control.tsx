import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  StatCard,
  Terminal,
  StatusGrid,
  ProgressRing,
  BarChart,
  LineChart,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/ui'
import type { TerminalLine } from '@/ui/terminal'
import type { SystemEntry, SystemStatus } from '@/ui/status-grid'

// ── APIs ──────────────────────────────────────────────────────────────────
// ISS telemetry (live, polled every 5s) — wheretheiss.at: lat/lng/altitude/velocity/visibility
// SpaceX crew, past launches, upcoming launches — api.spacexdata.com

// ── Types ─────────────────────────────────────────────────────────────────

interface ISSData {
  latitude: number
  longitude: number
  altitude: number
  velocity: number
  visibility: 'daylight' | 'eclipsed'
  timestamp: number
}

interface SpaceXCrew {
  id: string
  name: string
  agency: string
  status: 'active' | 'inactive' | 'retired' | 'unknown'
}

interface SpaceXLaunch {
  id: string
  name: string
  date_utc: string
  flight_number: number
  success: boolean | null
  details: string | null
}

// ── Helpers ───────────────────────────────────────────────────────────────

async function fetchWithTimeout(url: string, ms = 8000): Promise<Response> {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), ms)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}

function daysUntilLaunch(dateUtc: string): string {
  const diff = new Date(dateUtc).getTime() - Date.now()
  if (diff <= 0) return 'TBD'
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const mins = Math.floor((diff % 3_600_000) / 60_000)
  if (days > 0) return `${days}D ${hours}H`
  if (hours > 0) return `${hours}H ${mins}M`
  return `${mins}M`
}

function orbitalProgress(timestamp: number): number {
  const PERIOD_SECS = 5520 // ISS orbital period ≈ 92 min
  return Math.round(((timestamp % PERIOD_SECS) / PERIOD_SECS) * 100)
}

function successRate(launches: SpaceXLaunch[]): number {
  const decided = launches.filter((l) => l.success !== null)
  if (!decided.length) return 0
  return Math.round((decided.filter((l) => l.success === true).length / decided.length) * 100)
}

function launchesByYear(launches: SpaceXLaunch[]): { label: string; value: number }[] {
  const currentYear = new Date().getFullYear()
  const buckets: Record<number, number> = {}
  for (let y = currentYear - 7; y <= currentYear; y++) buckets[y] = 0
  launches.forEach((l) => {
    const y = new Date(l.date_utc).getFullYear()
    if (y in buckets) buckets[y]++
  })
  return Object.entries(buckets).map(([y, v]) => ({
    label: `'${y.slice(-2)}`,
    value: v as number,
  }))
}

function fmtUtc(dateUtc: string): string {
  return new Date(dateUtc).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  })
}

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

function now(): string {
  return new Date().toLocaleTimeString('en-GB', { hour12: false })
}

// ── Component ─────────────────────────────────────────────────────────────

export default function MissionControlPage() {
  const narrow = useNarrow()
  const [tick, setTick] = useState(0)

  const [iss, setIss] = useState<ISSData | null>(null)
  const [issError, setIssError] = useState(false)
  const [issHistory, setIssHistory] = useState<{ label: string; value: number }[]>([])

  const [activeCrew, setActiveCrew] = useState<SpaceXCrew[]>([])
  const [pastLaunches, setPastLaunches] = useState<SpaceXLaunch[]>([])
  const [upcomingLaunches, setUpcomingLaunches] = useState<SpaceXLaunch[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dataError, setDataError] = useState(false)

  const [termLines, setTermLines] = useState<TerminalLine[]>([
    {
      type: 'system',
      text: 'EARTH ORBIT COMMAND // INITIALIZING DATA LINKS...',
      timestamp: now(),
    },
  ])

  const addLine = (line: TerminalLine) =>
    setTermLines((prev) => [...prev.slice(-49), line])

  // Restore default sci-fi theme on mount
  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-theme')
    document.documentElement.removeAttribute('data-theme')
    return () => {
      if (prev) document.documentElement.setAttribute('data-theme', prev)
      else document.documentElement.removeAttribute('data-theme')
    }
  }, [])

  // Clock tick
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  // One-time static data: SpaceX crew + past + upcoming launches
  useEffect(() => {
    Promise.all([
      fetchWithTimeout('https://api.spacexdata.com/v4/crew').then((r) => r.json()),
      fetchWithTimeout('https://api.spacexdata.com/v4/launches/past').then((r) => r.json()),
      fetchWithTimeout('https://api.spacexdata.com/v4/launches/upcoming').then((r) => r.json()),
    ])
      .then(([crew, past, upcoming]) => {
        const active: SpaceXCrew[] = (crew as SpaceXCrew[]).filter(
          (c) => c.status === 'active'
        )
        setActiveCrew(active)
        setPastLaunches(past ?? [])
        const sorted = [...(upcoming ?? [])].sort(
          (a, b) => new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime()
        )
        setUpcomingLaunches(sorted)
        setDataLoaded(true)

        addLine({
          type: 'output',
          text: `SPACEX CREW MANIFEST LOADED — ${active.length} ACTIVE PERSONNEL`,
          timestamp: now(),
        })
        addLine({
          type: 'output',
          text: `FLIGHT DATABASE — ${(past as SpaceXLaunch[]).length} HISTORICAL MISSIONS`,
          timestamp: now(),
        })
        addLine({
          type: 'output',
          text: `UPCOMING MANIFEST — ${sorted.length} MISSIONS SCHEDULED`,
          timestamp: now(),
        })
        addLine({
          type: 'system',
          text: 'ALL DATA LINKS NOMINAL. ORBITAL TRACKING ACTIVE.',
          timestamp: now(),
        })
      })
      .catch(() => {
        setDataError(true)
        addLine({
          type: 'error',
          text: 'SPACEX DATA LINK FAILURE — CHECK NETWORK CONNECTION',
          timestamp: now(),
        })
      })
  }, [])

  // ISS telemetry poll — every 5s via wheretheiss.at
  useEffect(() => {
    let mounted = true

    async function poll() {
      try {
        const res = await fetchWithTimeout(
          'https://api.wheretheiss.at/v1/satellites/25544',
          6000
        )
        const data: ISSData = await res.json()
        if (!mounted) return

        setIss(data)
        setIssError(false)
        setIssHistory(prev => {
          const entry = { label: now(), value: Math.round(data.altitude) }
          return [...prev.slice(-29), entry]
        })

        const lat = data.latitude.toFixed(2)
        const lng = data.longitude.toFixed(2)
        const alt = data.altitude.toFixed(1)
        const vel = (data.velocity / 3600).toFixed(2)
        const vis = data.visibility.toUpperCase()

        addLine({
          type: 'output',
          text: `ISS // LAT ${lat}° LNG ${lng}° // ALT ${alt} KM // ${vel} KM/S // ${vis}`,
          timestamp: now(),
        })
      } catch {
        if (!mounted) return
        setIssError(true)
        addLine({
          type: 'warn',
          text: 'ISS SIGNAL LOST — RETRYING IN 5S...',
          timestamp: now(),
        })
      }
    }

    poll()
    const id = setInterval(poll, 5000)
    return () => {
      mounted = false
      clearInterval(id)
    }
  }, [])

  // Derived values
  const nextLaunch = upcomingLaunches[0] ?? null
  const successPct = successRate(pastLaunches)
  const chartData = launchesByYear(pastLaunches)
  const orbitalPct = iss ? orbitalProgress(iss.timestamp) : 0
  const crewPct = Math.min(Math.round((activeCrew.length / 50) * 100), 100)
  const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false })

  const crewSystems: SystemEntry[] = activeCrew.map((c) => ({
    name: c.name.toUpperCase(),
    status: 'ACTIVE' as SystemStatus,
    detail: c.agency,
  }))

  const overallError = issError && dataError

  return (
    <>
      <title>Mission Control — scificn-ui</title>
      <meta
        name="description"
        content="Live space mission control dashboard using real ISS and SpaceX data, built with scificn-ui."
      />

      <div
        style={{
          minHeight: '100vh',
          background: 'var(--background)',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* ── HEADER ── */}
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
            EARTH ORBIT CMD
          </span>

          {!narrow && (
            <span
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                flexShrink: 0,
              }}
            >
              // ISS TRACKER // SPACEX TELEMETRY
            </span>
          )}

          <div style={{ flex: 1 }} />

          {!narrow && (
            <Badge variant={issError ? 'WARNING' : iss ? 'ACTIVE' : 'SCANNING'}>
              {issError ? 'ISS OFFLINE' : iss ? 'ISS LIVE' : 'ACQUIRING'}
            </Badge>
          )}

          <Badge variant={overallError ? 'CRITICAL' : dataLoaded ? 'ACTIVE' : 'SCANNING'}>
            {overallError ? 'LINK FAIL' : dataLoaded ? 'FEED LIVE' : 'LOADING'}
          </Badge>

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

        {/* ── BODY ── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            background: 'var(--border)',
          }}
        >
          {/* STAT CARDS — all live from wheretheiss.at */}
          <div
            style={{
              background: 'var(--background)',
              padding: '0.75rem 1rem',
              display: 'grid',
              gridTemplateColumns: narrow ? '1fr 1fr' : 'repeat(4, 1fr)',
              gap: '0.75rem',
            }}
          >
            <StatCard
              label="ISS ALTITUDE"
              value={iss ? `${iss.altitude.toFixed(0)} KM` : '---'}
              sublabel={iss ? `${iss.visibility.toUpperCase()}` : 'ACQUIRING LOCK'}
              variant={iss ? 'ACTIVE' : 'DEFAULT'}
            />
            <StatCard
              label="ISS VELOCITY"
              value={iss ? `${(iss.velocity / 3600).toFixed(2)} KM/S` : '---'}
              sublabel={iss ? 'LIVE · 5S REFRESH' : 'ACQUIRING LOCK'}
              variant={iss ? 'ACTIVE' : 'DEFAULT'}
            />
            <StatCard
              label="ISS LATITUDE"
              value={iss ? `${iss.latitude.toFixed(2)}°` : '---'}
              sublabel={iss ? `LNG ${iss.longitude.toFixed(2)}°` : 'ACQUIRING LOCK'}
              variant={iss ? 'ACTIVE' : 'DEFAULT'}
            />
            <StatCard
              label="NEXT LAUNCH"
              value={nextLaunch ? daysUntilLaunch(nextLaunch.date_utc) : '---'}
              sublabel={
                nextLaunch
                  ? nextLaunch.name.length > 20
                    ? nextLaunch.name.slice(0, 20).toUpperCase() + '…'
                    : nextLaunch.name.toUpperCase()
                  : 'LOADING...'
              }
              variant={nextLaunch ? 'WARNING' : 'DEFAULT'}
            />
          </div>

          {/* 3-COLUMN GRID */}
          <div
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: narrow ? '1fr' : '260px 1fr 240px',
              gap: '1px',
              background: 'var(--border)',
            }}
          >
            {/* ── LEFT: CREW + ORBITAL METRICS ── */}
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
              <Panel notch="sm">
                <PanelHeader>
                  <PanelTitle>SPACEX CREW</PanelTitle>
                  <div style={{ marginLeft: 'auto' }}>
                    <Badge variant={dataLoaded ? 'ACTIVE' : 'SCANNING'}>
                      {dataLoaded ? `${activeCrew.length} ACTIVE` : 'LOADING'}
                    </Badge>
                  </div>
                </PanelHeader>

                {crewSystems.length > 0 ? (
                  <StatusGrid systems={crewSystems} />
                ) : (
                  <PanelContent>
                    <div
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {dataError ? 'DATA LINK FAILURE' : 'ACQUIRING CREW DATA...'}
                    </div>
                  </PanelContent>
                )}
              </Panel>

              <Panel notch="sm">
                <PanelHeader>
                  <PanelTitle>ORBITAL METRICS</PanelTitle>
                </PanelHeader>
                <PanelContent>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.25rem',
                    }}
                  >
                    <ProgressRing
                      value={successPct}
                      label="SUCCESS"
                      variant="ACTIVE"
                      size={74}
                    />
                    <ProgressRing
                      value={orbitalPct}
                      label="ORBIT"
                      variant={iss ? 'ACTIVE' : 'DEFAULT'}
                      size={74}
                    />
                    <ProgressRing
                      value={crewPct}
                      label="CREW / 50"
                      variant={crewPct > 75 ? 'WARNING' : 'ACTIVE'}
                      size={74}
                    />
                  </div>

                  <div
                    style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--border)',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '0.25rem',
                      textAlign: 'center',
                    }}
                  >
                    {[
                      { label: 'LAUNCH SUCCESS', note: 'SpaceX history' },
                      { label: 'ORBIT CYCLE', note: '~92min period' },
                      { label: 'CREW ACTIVE', note: 'of all SpaceX' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div
                          style={{
                            fontSize: '0.52rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: '0.48rem',
                            color: 'var(--border)',
                            letterSpacing: '0.06em',
                            marginTop: '1px',
                          }}
                        >
                          {item.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </PanelContent>
              </Panel>
            </div>

            {/* ── CENTER: OPERATIONS TABS ── */}
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
                  <PanelTitle>OPERATIONS // EARTH ORBIT COMMAND</PanelTitle>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                    <Badge variant="ACTIVE">SYS NOMINAL</Badge>
                  </div>
                </PanelHeader>

                <PanelContent style={{ padding: 0 }}>
                  <Tabs defaultValue="launches">
                    <TabsList
                      style={{ padding: '0 1rem', background: 'var(--surface-raised)' }}
                    >
                      <TabsTrigger value="launches">LAUNCHES</TabsTrigger>
                      <TabsTrigger value="next">NEXT MISSION</TabsTrigger>
                      <TabsTrigger value="telemetry">ISS TELEMETRY</TabsTrigger>
                      <TabsTrigger value="altitude">ALTITUDE</TabsTrigger>
                    </TabsList>

                    {/* LAUNCHES TAB */}
                    <TabsContent value="launches" style={{ margin: 0, padding: '1rem' }}>
                      {chartData.some((d) => d.value > 0) ? (
                        <>
                          <BarChart
                            data={chartData}
                            orientation="vertical"
                            variant="ACTIVE"
                            title="SPACEX LAUNCHES BY YEAR (LAST 8 YEARS)"
                            style={{ width: '100%' }}
                          />
                          <div
                            style={{
                              marginTop: '1rem',
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gap: '0.625rem',
                            }}
                          >
                            {[
                              {
                                label: 'TOTAL LAUNCHES',
                                value: pastLaunches.length,
                              },
                              {
                                label: 'SUCCESSFUL',
                                value: pastLaunches.filter((l) => l.success === true).length,
                              },
                              {
                                label: 'SUCCESS RATE',
                                value: `${successPct}%`,
                              },
                            ].map((s) => (
                              <div
                                key={s.label}
                                style={{
                                  padding: '0.75rem',
                                  background: 'var(--surface)',
                                  border: '1px solid var(--border)',
                                  textAlign: 'center',
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: '0.55rem',
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.12em',
                                    marginBottom: '0.4rem',
                                  }}
                                >
                                  {s.label}
                                </div>
                                <div
                                  style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: 'var(--color-green)',
                                    textShadow: 'var(--text-glow-green)',
                                    letterSpacing: '0.02em',
                                  }}
                                >
                                  {s.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div
                          style={{
                            padding: '3rem',
                            textAlign: 'center',
                            color: dataError ? 'var(--color-red)' : 'var(--text-muted)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em',
                          }}
                        >
                          {dataError ? 'DATA LINK FAILURE' : 'LOADING LAUNCH DATABASE...'}
                        </div>
                      )}
                    </TabsContent>

                    {/* NEXT MISSION TAB */}
                    <TabsContent value="next" style={{ margin: 0, padding: '1rem' }}>
                      {nextLaunch ? (
                        <div
                          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                        >
                          <Alert variant="STATUS">
                            <AlertTitle>
                              FLIGHT #{nextLaunch.flight_number} —{' '}
                              {nextLaunch.name.toUpperCase()}
                            </AlertTitle>
                            <AlertDescription>
                              {nextLaunch.details ??
                                'Mission details have not been released yet. Stand by for further information.'}
                            </AlertDescription>
                          </Alert>

                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: narrow ? '1fr' : '1fr 1fr',
                              gap: '0.625rem',
                            }}
                          >
                            {[
                              {
                                label: 'LAUNCH DATE (UTC)',
                                value: fmtUtc(nextLaunch.date_utc),
                              },
                              {
                                label: 'FLIGHT NUMBER',
                                value: `#${nextLaunch.flight_number}`,
                              },
                              {
                                label: 'T-MINUS',
                                value: daysUntilLaunch(nextLaunch.date_utc),
                              },
                              { label: 'LAUNCH STATUS', value: 'SCHEDULED' },
                            ].map((item) => (
                              <div
                                key={item.label}
                                style={{
                                  padding: '0.75rem',
                                  background: 'var(--surface)',
                                  border: '1px solid var(--border)',
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: '0.55rem',
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.12em',
                                    marginBottom: '0.35rem',
                                  }}
                                >
                                  {item.label}
                                </div>
                                <div
                                  style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--text-secondary)',
                                    letterSpacing: '0.04em',
                                  }}
                                >
                                  {item.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            padding: '3rem',
                            textAlign: 'center',
                            color: dataError ? 'var(--color-red)' : 'var(--text-muted)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em',
                          }}
                        >
                          {dataError ? 'DATA LINK FAILURE' : 'ACQUIRING MISSION DATA...'}
                        </div>
                      )}
                    </TabsContent>

                    {/* ISS TELEMETRY TAB */}
                    <TabsContent value="telemetry" style={{ margin: 0, padding: '1rem' }}>
                      <Terminal
                        lines={termLines}
                        title="ISS TELEMETRY FEED // WHERETHEISS.AT // 5S REFRESH"
                        height="22rem"
                        style={{ width: '100%' }}
                      />
                    </TabsContent>

                    {/* ALTITUDE TAB */}
                    <TabsContent value="altitude" style={{ margin: 0, padding: '1rem' }}>
                      {issHistory.length >= 2 ? (
                        <LineChart
                          series={[{ id: 'alt', label: 'ALTITUDE KM', data: issHistory.map(h => h.value) }]}
                          labels={issHistory.map(h => h.label)}
                          title="ISS ALTITUDE TRACK // 5S SAMPLES"
                          showArea
                          animated={false}
                          style={{ width: '100%' }}
                        />
                      ) : (
                        <div
                          style={{
                            padding:       '3rem',
                            textAlign:     'center',
                            color:         issError ? 'var(--color-red)' : 'var(--text-muted)',
                            fontSize:      '0.7rem',
                            letterSpacing: '0.1em',
                          }}
                        >
                          {issError ? 'ISS SIGNAL LOST' : issHistory.length === 1 ? 'ACQUIRING DATA — NEXT SAMPLE IN 5S...' : 'ACQUIRING ISS LOCK...'}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </PanelContent>
              </Panel>
            </div>

            {/* ── RIGHT: UPCOMING + FLEET STATS ── */}
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
              <Panel notch="sm">
                <PanelHeader>
                  <PanelTitle>UPCOMING MISSIONS</PanelTitle>
                  <div style={{ marginLeft: 'auto' }}>
                    <Badge variant={upcomingLaunches.length > 0 ? 'SCANNING' : 'OFFLINE'}>
                      {upcomingLaunches.length > 0
                        ? `${upcomingLaunches.length} QUEUED`
                        : 'LOADING'}
                    </Badge>
                  </div>
                </PanelHeader>
                <PanelContent style={{ padding: 0 }}>
                  {upcomingLaunches.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {upcomingLaunches.slice(0, 8).map((launch, i) => {
                        const isNext = i === 0
                        const isLast = i === Math.min(upcomingLaunches.length, 8) - 1
                        return (
                          <div
                            key={launch.id}
                            style={{
                              padding: '0.6rem 0.75rem',
                              borderBottom: isLast ? 'none' : '1px solid var(--border)',
                              background: isNext ? 'var(--surface-raised)' : 'transparent',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: '0.5rem',
                              }}
                            >
                              <div style={{ overflow: 'hidden', flex: 1 }}>
                                <div
                                  style={{
                                    fontSize: '0.68rem',
                                    color: isNext
                                      ? 'var(--text-secondary)'
                                      : 'var(--text-muted)',
                                    letterSpacing: '0.04em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  {launch.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: '0.57rem',
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.06em',
                                    marginTop: '2px',
                                  }}
                                >
                                  {daysUntilLaunch(launch.date_utc)} // #{launch.flight_number}
                                </div>
                              </div>
                              <Badge variant={isNext ? 'WARNING' : 'SCANNING'}>
                                {isNext ? 'NEXT' : 'SCHED'}
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <PanelContent>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: dataError ? 'var(--color-red)' : 'var(--text-muted)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {dataError ? 'DATA LINK FAILURE' : 'LOADING MANIFEST...'}
                      </div>
                    </PanelContent>
                  )}
                </PanelContent>
              </Panel>

              <Panel notch="sm">
                <PanelHeader>
                  <PanelTitle>FLEET STATISTICS</PanelTitle>
                </PanelHeader>
                <PanelContent>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      {
                        label: 'TOTAL LAUNCHES',
                        value: dataLoaded ? pastLaunches.length : '---',
                      },
                      {
                        label: 'SUCCESS RATE',
                        value: dataLoaded ? `${successPct}%` : '---',
                      },
                      {
                        label: 'MISSIONS UPCOMING',
                        value: dataLoaded ? upcomingLaunches.length : '---',
                      },
                      {
                        label: 'ACTIVE CREW',
                        value: dataLoaded ? activeCrew.length : '---',
                      },
                      {
                        label: 'ISS ALTITUDE',
                        value: iss ? `${iss.altitude.toFixed(0)} KM` : '---',
                      },
                      {
                        label: 'ISS VELOCITY',
                        value: iss ? `${(iss.velocity / 3600).toFixed(2)} KM/S` : '---',
                      },
                      {
                        label: 'ORBIT PERIOD',
                        value: '~92 MIN',
                      },
                    ].map((item, i, arr) => (
                      <div
                        key={item.label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.4rem 0',
                          borderBottom:
                            i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.6rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          style={{
                            fontSize: '0.78rem',
                            color: 'var(--color-green)',
                            textShadow: 'var(--text-glow-green)',
                            letterSpacing: '0.04em',
                            fontWeight: 600,
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </PanelContent>
              </Panel>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer
          style={{
            minHeight: '44px',
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
          <span
            style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
          >
            ISS: WHERETHEISS.AT
          </span>
          <span style={{ color: 'var(--border)' }}>│</span>
          <span
            style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
          >
            LAUNCHES: SPACEXDATA.COM
          </span>
          <span style={{ color: 'var(--border)' }}>│</span>
          <span
            style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
          >
            ISS POSITION REFRESHES EVERY 5S
          </span>

          <div style={{ flex: 1 }} />

          <Badge
            variant={
              overallError ? 'CRITICAL' : dataLoaded && iss ? 'ACTIVE' : 'SCANNING'
            }
          >
            {overallError
              ? 'LINK FAILURE'
              : dataLoaded && iss
                ? 'SYS ONLINE'
                : 'INITIALIZING'}
          </Badge>
        </footer>
      </div>
    </>
  )
}
