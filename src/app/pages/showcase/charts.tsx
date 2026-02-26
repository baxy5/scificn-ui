import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Panel, PanelHeader, PanelTitle, PanelContent,
  Badge, Button,
  StatCard,
  Tabs, TabsList, TabsTrigger, TabsContent,
  ProgressRing, Progress,
  BarChart, LineChart, RadarChart, NodeGraph, Heatmap,
  StatusGrid,
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose,
} from '@/ui'

// ── Types ──────────────────────────────────────────────────────────────────

type ThemeKey = 'sci-fi' | 'star-wars' | 'alien'

type Anomaly = {
  id: string
  type: string
  sector: string
  sev: 'WARNING' | 'CRITICAL'
  age: string
  detail: string
}

type Module = {
  name: string
  status: 'ACTIVE' | 'OFFLINE' | 'WARNING' | 'CRITICAL' | 'SCANNING'
  detail?: string
}

type DiagCheck = { label: string; result: 'PASS' | 'WARN' | 'FAIL' }

interface ThemeData {
  htmlTheme: string | null
  title: string
  subtitle: string
  backLabel: string
  // Header badges
  badge1Label: string
  badge2Label: (anomaly: number) => string
  badge2Variant: (anomaly: number) => 'WARNING' | 'SCANNING'
  // Stat cards
  stat1Label: string
  stat1Value: (tick: number) => string
  stat1Sub: (tick: number) => string
  stat1Variant: (tick: number) => 'ACTIVE' | 'WARNING'
  stat2Label: string
  stat2Value: (v: number) => string
  stat2Sub: string
  stat2Variant: (v: number) => 'ACTIVE' | 'WARNING'
  stat3Label: string
  stat3Value: (v: number) => string
  stat3Sub: string
  stat4Label: string
  stat4Value: (v: number) => string
  stat4Sub: string
  // Section titles
  profileTitle: string
  centerTitle: string
  centerBadge: string
  rightChartTitle: string
  anomalyPanelTitle: string
  // Radar data
  profileAxes: { axis: string; value: number }[]
  coverageAxes: { axis: string; value: number }[]
  coverageTitle: string
  // Timeseries
  timeseriesTitle: string
  seriesA: { id: string; label: string; data: number[] }
  seriesB: { id: string; label: string; data: number[] }
  seriesC: { id: string; label: string; data: number[] }
  timeStatLabels: [string, string, string]
  timeStatValues: [string, string, string]
  // Network
  networkTitle: string
  networkNodes: { id: string; label: string; x: number; y: number; status: 'ACTIVE' | 'OFFLINE' | 'WARNING' | 'CRITICAL' | 'NEUTRAL' | 'SCANNING'; sublabel?: string }[]
  networkEdges: { from: string; to: string; animated?: boolean; label?: string }[]
  // Heatmap
  heatmapTitle: string
  heatRowLabels: string[]
  heatColLabels: string[]
  // Signal bars
  signalTitle: string
  signalData: { label: string; value: number }[]
  signalVariant: 'ACTIVE' | 'WARNING'
  // Annual bars
  annualTitle: string
  annualData: { label: string; value: number }[]
  // Anomaly list
  anomalies: (extra: boolean) => Anomaly[]
  // Footer
  footerText: string
  // Ring labels
  ring1Label: string
  ring2Label: string
  ring3Label: string
  statsRows: { label: string; value: string }[]
  // NEW: System modules StatusGrid
  systemModules: Module[]
  systemModulesTitle: string
  // NEW: Resource bar labels
  resourceLabels: [string, string, string, string]
  // NEW: Diagnostic scan checks
  diagnosticChecks: DiagCheck[]
  diagnosticTitle: string
}

// ── Shared base timeseries data ────────────────────────────────────────────

const TIMES = Array.from({ length: 24 }, (_, i) => {
  const h = Math.floor((i * 5) / 60).toString().padStart(2, '0')
  const m = ((i * 5) % 60).toString().padStart(2, '0')
  return `${h}:${m}`
})

const HEATMAP_DATA = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 24 }, (_, col) => {
    const base = [55, 60, 48, 72, 81, 65, 58][row]
    const wave = Math.sin((col / 24) * Math.PI * 2) * 15
    const noise = ((row * 7 + col * 13) % 17) - 8
    return Math.max(0, Math.min(100, Math.round(base + wave + noise)))
  })
)

// ── Theme configs ──────────────────────────────────────────────────────────

const THEMES: Record<ThemeKey, ThemeData> = {
  'sci-fi': {
    htmlTheme: null,
    title: 'SECTOR ANALYTICS CONSOLE',
    subtitle: '// DEEP SPACE MONITORING ARRAY // CHARTS DEMO',
    backLabel: '◄ SHOWCASE',
    badge1Label: 'DATA LIVE',
    badge2Label: n => `${n} ANOMALIES`,
    badge2Variant: n => n > 3 ? 'WARNING' : 'SCANNING',
    stat1Label: 'ACTIVE PROBES',
    stat1Value: () => '8 / 8',
    stat1Sub: () => 'ALL NOMINAL',
    stat1Variant: () => 'ACTIVE',
    stat2Label: 'RADIATION LEVEL',
    stat2Value: v => `${v} mSv`,
    stat2Sub: 'NOMINAL',
    stat2Variant: v => v > 27 ? 'WARNING' : 'ACTIVE',
    stat3Label: 'MAGNETIC FLUX',
    stat3Value: v => `${v} nT`,
    stat3Sub: 'SECTOR-ALPHA',
    stat4Label: 'SCAN COVERAGE',
    stat4Value: v => `${v}%`,
    stat4Sub: 'ACTIVE SWEEP',
    profileTitle: 'SECTOR PROFILE',
    centerTitle: 'MONITORING ARRAY // SECTOR-ALPHA',
    centerBadge: 'SWEEP ACTIVE',
    rightChartTitle: 'ANOMALY COUNT BY YEAR',
    anomalyPanelTitle: 'ACTIVE ANOMALIES',
    profileAxes: [
      { axis: 'RADIATION',     value: 68 },
      { axis: 'MAGNETIC',      value: 82 },
      { axis: 'THERMAL',       value: 47 },
      { axis: 'GRAVITATIONAL', value: 91 },
      { axis: 'PARTICLE',      value: 55 },
      { axis: 'EM FLUX',       value: 73 },
    ],
    coverageTitle: 'COVERAGE MAP',
    coverageAxes: [
      { axis: 'N', value: 94 }, { axis: 'NE', value: 87 }, { axis: 'E', value: 91 },
      { axis: 'SE', value: 78 }, { axis: 'S', value: 96 }, { axis: 'SW', value: 62 },
      { axis: 'W', value: 88 }, { axis: 'NW', value: 83 },
    ],
    timeseriesTitle: 'SENSOR READINGS // 2H WINDOW // 5-MIN SAMPLES',
    seriesA: { id: 'rad', label: 'RADIATION (mSv)', data: [12,14,13,15,17,19,22,24,23,21,19,18,20,22,25,28,31,29,27,26,24,22,21,20] },
    seriesB: { id: 'mag', label: 'MAGNETIC FLUX (nT)', data: [45,44,46,48,47,49,51,50,52,54,53,51,50,48,47,49,51,53,55,57,56,54,52,51] },
    seriesC: { id: 'par', label: 'PARTICLE DENSITY', data: [8,9,8,10,12,11,13,15,14,13,11,10,9,11,13,15,17,16,14,13,12,11,10,9] },
    timeStatLabels: ['AVG RADIATION', 'PEAK MAGNETIC', 'PARTICLE EVENTS'],
    timeStatValues: ['21 mSv', '57 nT', '7'],
    networkTitle: 'PROBE NETWORK TOPOLOGY // SECTOR-ALPHA // RELAY-01 HUB',
    networkNodes: [
      { id: 'relay', label: 'RELAY-01', x: 50, y: 50, status: 'ACTIVE',   sublabel: 'hub' },
      { id: 'pa1',   label: 'A1',       x: 18, y: 18, status: 'ACTIVE' },
      { id: 'pa2',   label: 'A2',       x: 50, y: 12, status: 'ACTIVE' },
      { id: 'pb1',   label: 'B1',       x: 82, y: 18, status: 'WARNING',  sublabel: 'degraded' },
      { id: 'pb2',   label: 'B2',       x: 88, y: 50, status: 'ACTIVE' },
      { id: 'pc1',   label: 'C1',       x: 82, y: 82, status: 'ACTIVE' },
      { id: 'pc2',   label: 'C2',       x: 50, y: 88, status: 'CRITICAL', sublabel: 'low signal' },
      { id: 'pd1',   label: 'D1',       x: 18, y: 82, status: 'ACTIVE' },
    ],
    networkEdges: [
      { from: 'relay', to: 'pa1', animated: true },
      { from: 'relay', to: 'pa2', animated: true },
      { from: 'relay', to: 'pb1' },
      { from: 'relay', to: 'pb2', animated: true },
      { from: 'relay', to: 'pc1', animated: true },
      { from: 'relay', to: 'pc2' },
      { from: 'relay', to: 'pd1', animated: true },
      { from: 'pa1',   to: 'pd1' },
      { from: 'pa2',   to: 'pb1' },
      { from: 'pb2',   to: 'pc1' },
    ],
    heatmapTitle: 'RADIATION INTENSITY // DAY × HOUR MATRIX',
    heatRowLabels: ['MON','TUE','WED','THU','FRI','SAT','SUN'],
    heatColLabels: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2,'0')}:00`),
    signalTitle: 'PROBE SIGNAL STRENGTH // % OF NOMINAL',
    signalData: [
      { label: 'PROBE-A1', value: 94 }, { label: 'PROBE-A2', value: 87 },
      { label: 'PROBE-B1', value: 72 }, { label: 'PROBE-B2', value: 61 },
      { label: 'PROBE-C1', value: 89 }, { label: 'PROBE-C2', value: 44 },
      { label: 'PROBE-D1', value: 96 }, { label: 'RELAY-01',  value: 100 },
    ],
    signalVariant: 'WARNING',
    annualTitle: 'ANOMALY COUNT BY YEAR',
    annualData: [
      { label: "'19", value: 4 }, { label: "'20", value: 7 }, { label: "'21", value: 12 },
      { label: "'22", value: 18 }, { label: "'23", value: 24 }, { label: "'24", value: 31 },
      { label: "'25", value: 29 }, { label: "'26", value: 38 },
    ],
    anomalies: extra => [
      { id: 'ANX-0041', type: 'RADIATION SPIKE',  sector: 'GRID-A4',   sev: 'WARNING',  age: '00:12', detail: 'Elevated particle flux detected above nominal threshold. Probe B1 signal degraded.' },
      { id: 'ANX-0040', type: 'MAGNETIC BURST',   sector: 'GRID-B2',   sev: 'WARNING',  age: '00:47', detail: 'Intermittent magnetic field distortion. Auto-calibration in progress.' },
      { id: 'ANX-0039', type: 'SIGNAL DROPOUT',   sector: 'PROBE-C2',  sev: 'CRITICAL', age: '01:03', detail: 'Complete signal loss. Last known position: 88° / 4.2 AU. Recovery protocol initiated.' },
      ...(extra ? [{ id: 'ANX-0042', type: 'PARTICLE EVENT', sector: 'GRID-D1', sev: 'WARNING' as const, age: '00:02', detail: 'New particle burst event. Monitoring in progress.' }] : []),
    ],
    footerText: 'SECTOR-ALPHA MONITORING ARRAY // 8 PROBES ACTIVE // RELAY-01 // 3S REFRESH',
    ring1Label: 'COVERAGE',
    ring2Label: 'QUALITY',
    ring3Label: 'SIG LOCK',
    statsRows: [
      { label: 'SCAN RANGE',   value: '4.2 AU' },
      { label: 'SAMPLE RATE',  value: '5 MIN'  },
      { label: 'DATA RATE',    value: '4.7 TB/S' },
      { label: 'UPTIME',       value: '99.3%' },
      { label: 'LAST ANOMALY', value: new Date().toLocaleTimeString('en-GB', { hour12: false }) },
    ],
    systemModules: [
      { name: 'RELAY-01',    status: 'ACTIVE',   detail: 'hub'      },
      { name: 'PROBE ARRAY', status: 'WARNING',  detail: 'degraded' },
      { name: 'SCAN ENGINE', status: 'ACTIVE',   detail: 'running'  },
      { name: 'DATA CORE',   status: 'ACTIVE',   detail: 'synced'   },
      { name: 'COMMS',       status: 'SCANNING', detail: 'sweep'    },
      { name: 'POWER GRID',  status: 'ACTIVE',   detail: 'nominal'  },
    ],
    systemModulesTitle: 'SYSTEM MODULES',
    resourceLabels: ['CPU LOAD', 'DATA BUFFER', 'BANDWIDTH', 'POWER DRAW'],
    diagnosticChecks: [
      { label: 'SENSOR ARRAY',       result: 'PASS' },
      { label: 'RELAY COMMS',        result: 'PASS' },
      { label: 'DATA INTEGRITY',     result: 'WARN' },
      { label: 'POWER REGULATION',   result: 'PASS' },
      { label: 'MAGNETIC SHIELDING', result: 'FAIL' },
    ],
    diagnosticTitle: 'FULL SYSTEM DIAGNOSTIC',
  },

  'star-wars': {
    htmlTheme: 'star-wars',
    title: 'IMPERIAL SENSOR ARRAY',
    subtitle: '// DEATH STAR SYSTEMS // SECTOR SURVEILLANCE',
    backLabel: '◄ SHOWCASE',
    badge1Label: 'FEED LIVE',
    badge2Label: n => `${n} REBEL CONTACTS`,
    badge2Variant: n => n > 3 ? 'WARNING' : 'SCANNING',
    stat1Label: 'TURBOLASERS ONLINE',
    stat1Value: () => '768 / 768',
    stat1Sub: () => 'OPERATIONAL',
    stat1Variant: () => 'ACTIVE',
    stat2Label: 'DEFLECTOR SHIELD',
    stat2Value: v => `${v}%`,
    stat2Sub: 'NOMINAL',
    stat2Variant: v => v < 70 ? 'WARNING' : 'ACTIVE',
    stat3Label: 'FLEET UNITS',
    stat3Value: () => '6',
    stat3Sub: 'ISD + TIE WINGS',
    stat4Label: 'TARGET LOCK',
    stat4Value: () => 'YAVIN IV',
    stat4Sub: 'T-MINUS 04:12',
    profileTitle: 'BATTLE STATION PROFILE',
    centerTitle: 'DEATH STAR TACTICAL // DS-1 ORBITAL STATION',
    centerBadge: 'TARGET ACQUIRED',
    rightChartTitle: 'FLEET DEPLOYMENTS BY YEAR (BBY)',
    anomalyPanelTitle: 'REBEL CONTACTS',
    profileAxes: [
      { axis: 'DEFLECTOR',  value: 92 },
      { axis: 'TURBOLASER', value: 88 },
      { axis: 'HYPERDRIVE', value: 74 },
      { axis: 'LONG SCAN',  value: 81 },
      { axis: 'COMLINK',    value: 95 },
      { axis: 'LIFE SUP',   value: 67 },
    ],
    coverageTitle: 'SECTOR SWEEP',
    coverageAxes: [
      { axis: 'N', value: 97 }, { axis: 'NE', value: 91 }, { axis: 'E', value: 88 },
      { axis: 'SE', value: 94 }, { axis: 'S', value: 79 }, { axis: 'SW', value: 85 },
      { axis: 'W', value: 92 }, { axis: 'NW', value: 96 },
    ],
    timeseriesTitle: 'BATTLE STATION READINGS // 2H WINDOW',
    seriesA: { id: 'shield', label: 'SHIELD INTEGRITY (%)', data: [95,94,96,93,91,89,87,85,86,88,90,91,89,87,84,82,80,79,81,83,85,84,82,80] },
    seriesB: { id: 'power',  label: 'POWER OUTPUT (%)',    data: [78,80,82,84,83,85,87,89,88,86,84,86,88,90,92,91,89,87,85,83,84,86,88,90] },
    seriesC: { id: 'sensor', label: 'SENSOR RANGE (AU)',   data: [12,13,12,14,15,14,16,17,16,15,14,13,14,15,17,18,19,18,17,16,15,14,13,12] },
    timeStatLabels: ['AVG SHIELD',   'PEAK POWER',  'REBEL SIGHTINGS'],
    timeStatValues: ['86%',          '92%',         '4'],
    networkTitle: 'IMPERIAL FLEET NETWORK // DS-1 COMMAND HUB',
    networkNodes: [
      { id: 'ds1',   label: 'DS-1',     x: 50, y: 50, status: 'ACTIVE',   sublabel: 'command' },
      { id: 'isd1',  label: 'DEVAST.',  x: 18, y: 22, status: 'ACTIVE',   sublabel: 'ISD' },
      { id: 'isd2',  label: 'AVENGER',  x: 82, y: 22, status: 'ACTIVE',   sublabel: 'ISD' },
      { id: 'tie1',  label: 'WING VI',  x: 14, y: 60, status: 'ACTIVE',   sublabel: 'TIE' },
      { id: 'tie2',  label: 'WING IX',  x: 86, y: 60, status: 'WARNING',  sublabel: 'engaged' },
      { id: 'probe', label: 'DROIDS',   x: 50, y: 85, status: 'NEUTRAL',  sublabel: 'deployed' },
    ],
    networkEdges: [
      { from: 'ds1',  to: 'isd1',  animated: true  },
      { from: 'ds1',  to: 'isd2',  animated: true  },
      { from: 'ds1',  to: 'probe', animated: true  },
      { from: 'isd1', to: 'tie1',  animated: false },
      { from: 'isd2', to: 'tie2',  animated: false },
      { from: 'isd1', to: 'isd2',  label: 'RELAY'  },
    ],
    heatmapTitle: 'POWER GRID LOAD // SECTOR × HOUR',
    heatRowLabels: ['DECK 1','DECK 2','DECK 3','DECK 4','DECK 5','DECK 6','DECK 7'],
    heatColLabels: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2,'0')}:00`),
    signalTitle: 'SQUADRON READINESS // % OF FULL STRENGTH',
    signalData: [
      { label: 'WING I',    value: 100 }, { label: 'WING II',   value: 94 },
      { label: 'WING III',  value: 88  }, { label: 'WING IV',   value: 71 },
      { label: 'WING V',    value: 96  }, { label: 'WING VI',   value: 55 },
      { label: 'WING VII',  value: 83  }, { label: 'WING VIII', value: 91 },
    ],
    signalVariant: 'WARNING',
    annualTitle: 'FLEET DEPLOYMENTS BY YEAR (BBY)',
    annualData: [
      { label: '26', value: 3  }, { label: '24', value: 6  }, { label: '22', value: 9  },
      { label: '20', value: 14 }, { label: '18', value: 11 }, { label: '5',  value: 22 },
      { label: '4',  value: 31 }, { label: '3',  value: 18 },
    ],
    anomalies: extra => [
      { id: 'RBL-007', type: 'X-WING SQUADRON',   sector: 'SECTOR 7-G', sev: 'CRITICAL', age: '00:08', detail: 'Twelve X-wing fighters approaching from sector 7-G. Attack vector calculated. Interceptors scrambled.' },
      { id: 'RBL-006', type: 'Y-WING ATTACK RUN', sector: 'TRENCH-04',  sev: 'CRITICAL', age: '00:21', detail: 'Multiple Y-wings executing trench run. Turbolaser batteries ineffective at low altitude. TIE fighters dispatched.' },
      { id: 'RBL-005', type: 'UNKNOWN CRAFT',      sector: 'GRID-H9',    sev: 'WARNING',  age: '00:44', detail: 'Unidentified vessel evading sensor lock. Possible cloaking device. Alert level raised.' },
      ...(extra ? [{ id: 'RBL-008', type: 'SIGNAL INTERCEPT', sector: 'RELAY-2', sev: 'WARNING' as const, age: '00:01', detail: 'Encrypted Rebel transmission intercepted. Decoding in progress.' }] : []),
    ],
    footerText: 'DEATH STAR I // IMPERIAL NAVY // SECTOR COMMAND // DS-1 ORBITAL BATTLE STATION',
    ring1Label: 'SHIELDS',
    ring2Label: 'WEAPONS',
    ring3Label: 'SENSORS',
    statsRows: [
      { label: 'STATION CLASS', value: 'DS-1'   },
      { label: 'DIAMETER',      value: '160 KM' },
      { label: 'CREW',          value: '1.18M'  },
      { label: 'SUPERLASER',    value: 'ARMED'  },
      { label: 'T-MINUS',       value: '04:12'  },
    ],
    systemModules: [
      { name: 'SUPERLASER',   status: 'ACTIVE',  detail: 'armed'   },
      { name: 'DEFLECTORS',   status: 'WARNING', detail: 'sector 7'},
      { name: 'HYPERDRIVE',   status: 'ACTIVE',  detail: 'standby' },
      { name: 'TARGETING',    status: 'ACTIVE',  detail: 'locked'  },
      { name: 'COMLINK',      status: 'ACTIVE',  detail: 'secure'  },
      { name: 'LIFE SUPPORT', status: 'OFFLINE', detail: 'deck 7'  },
    ],
    systemModulesTitle: 'BATTLE STATION SYSTEMS',
    resourceLabels: ['PROC LOAD', 'WEAPONS PWR', 'COMMS BW', 'SHIELD DRAW'],
    diagnosticChecks: [
      { label: 'SUPERLASER CORE',  result: 'PASS' },
      { label: 'TARGETING MATRIX', result: 'PASS' },
      { label: 'DEFLECTOR GRID',   result: 'WARN' },
      { label: 'COMLINK ARRAY',    result: 'PASS' },
      { label: 'NAVIGATION',       result: 'PASS' },
    ],
    diagnosticTitle: 'BATTLE STATION DIAGNOSTIC',
  },

  alien: {
    htmlTheme: 'alien',
    title: 'MU/TH/UR 6000 // SYSTEM MONITOR',
    subtitle: '// USCSS NOSTROMO // WEYLAND-YUTANI CORP',
    backLabel: '◄ SHOWCASE',
    badge1Label: 'SYSTEMS ONLINE',
    badge2Label: n => `${n} BIO SIGNATURES`,
    badge2Variant: n => n > 3 ? 'WARNING' : 'SCANNING',
    stat1Label: 'LIFE SUPPORT',
    stat1Value: () => 'NOMINAL',
    stat1Sub: () => 'O₂ AT 97%',
    stat1Variant: () => 'ACTIVE',
    stat2Label: 'HULL INTEGRITY',
    stat2Value: v => `${v}%`,
    stat2Sub: 'ALL DECKS',
    stat2Variant: v => v < 80 ? 'WARNING' : 'ACTIVE',
    stat3Label: 'CREW ACTIVE',
    stat3Value: () => '1 / 7',
    stat3Sub: 'RIPLEY, E.',
    stat4Label: 'BIO SIGNATURES',
    stat4Value: () => 'CONFIRMED',
    stat4Sub: 'DECK C-7',
    profileTitle: 'SHIP SYSTEMS PROFILE',
    centerTitle: 'NOSTROMO SYSTEMS // WEYLAN-YUTANI MU/TH/UR 6000',
    centerBadge: 'MONITORING',
    rightChartTitle: 'BIO EVENTS BY MISSION HOUR',
    anomalyPanelTitle: 'CRITICAL EVENTS',
    profileAxes: [
      { axis: 'OXYGEN',    value: 97 },
      { axis: 'PRESSURE',  value: 84 },
      { axis: 'TEMP',      value: 71 },
      { axis: 'RADIATION', value: 38 },
      { axis: 'BIO SCAN',  value: 94 },
      { axis: 'POWER',     value: 62 },
    ],
    coverageTitle: 'DECK SWEEP',
    coverageAxes: [
      { axis: 'BRIDGE',  value: 90 }, { axis: 'CRYO',    value: 85 }, { axis: 'LAB',     value: 72 },
      { axis: 'ENGINE',  value: 88 }, { axis: 'HOLD C',  value: 41 }, { axis: 'HOLD B',  value: 67 },
      { axis: 'MEDICAL', value: 94 }, { axis: 'AIRLOCK', value: 78 },
    ],
    timeseriesTitle: 'SHIP VITALS // 2H WINDOW // CONTINUOUS MONITOR',
    seriesA: { id: 'o2',   label: 'O₂ LEVEL (%)',            data: [98,97,98,97,96,95,97,98,97,96,95,94,93,94,95,96,97,96,95,94,93,92,93,94] },
    seriesB: { id: 'temp', label: 'CORE TEMP (°C)',           data: [22,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44] },
    seriesC: { id: 'bio',  label: 'BIO SIGNATURE STRENGTH',  data: [0,0,0,0,1,2,3,5,7,8,10,12,14,15,17,19,21,22,24,25,27,29,30,32] },
    timeStatLabels: ['CURRENT O₂',  'CORE TEMP',  'BIO SIG PEAK'],
    timeStatValues: ['94%',          '44°C',        '32 UNITS'],
    networkTitle: 'NOSTROMO SHIP NETWORK // DECK INTERCONNECT',
    networkNodes: [
      { id: 'bridge', label: 'BRIDGE',  x: 50, y: 12, status: 'ACTIVE',   sublabel: 'secure'  },
      { id: 'cryo',   label: 'CRYO',    x: 15, y: 35, status: 'ACTIVE',   sublabel: 'offline' },
      { id: 'lab',    label: 'LAB',     x: 85, y: 35, status: 'WARNING',  sublabel: 'breach'  },
      { id: 'engine', label: 'ENGINE',  x: 50, y: 60, status: 'ACTIVE',   sublabel: 'nominal' },
      { id: 'holdc',  label: 'HOLD C',  x: 15, y: 82, status: 'CRITICAL', sublabel: 'hostile' },
      { id: 'holdb',  label: 'HOLD B',  x: 85, y: 82, status: 'OFFLINE',  sublabel: 'sealed'  },
    ],
    networkEdges: [
      { from: 'bridge', to: 'cryo',   animated: false },
      { from: 'bridge', to: 'lab',    animated: false },
      { from: 'bridge', to: 'engine', animated: true  },
      { from: 'engine', to: 'holdc',  animated: true, label: 'BIO' },
      { from: 'engine', to: 'holdb',  animated: false },
      { from: 'lab',    to: 'holdc',  animated: true  },
    ],
    heatmapTitle: 'BIO SIGNATURE INTENSITY // DECK × HOUR',
    heatRowLabels: ['BRIDGE','CRYO','LAB','ENGINE','HOLD C','HOLD B','AIRLOCK'],
    heatColLabels: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2,'0')}:00`),
    signalTitle: 'DECK INTEGRITY // % OF NOMINAL',
    signalData: [
      { label: 'BRIDGE',  value: 100 }, { label: 'CRYO',    value: 92 },
      { label: 'LAB',     value: 61  }, { label: 'ENGINE',  value: 88 },
      { label: 'HOLD C',  value: 24  }, { label: 'HOLD B',  value: 71 },
      { label: 'MEDICAL', value: 95  }, { label: 'AIRLOCK', value: 83 },
    ],
    signalVariant: 'WARNING',
    annualTitle: 'BIO EVENTS BY MISSION HOUR',
    annualData: [
      { label: 'H+0',  value: 0  }, { label: 'H+12', value: 1  }, { label: 'H+24', value: 2  },
      { label: 'H+36', value: 4  }, { label: 'H+48', value: 8  }, { label: 'H+60', value: 15 },
      { label: 'H+72', value: 22 }, { label: 'H+84', value: 31 },
    ],
    anomalies: extra => [
      { id: 'MU-037', type: 'BIO SIGNATURE MOBILE', sector: 'DECK C-7',   sev: 'CRITICAL', age: '00:03', detail: 'Hostile bio-entity detected moving through service conduit C-7. Motion tracker active. Crew advised to evacuate.' },
      { id: 'MU-036', type: 'ACID TRACE DETECTED',  sector: 'CORRIDOR 4', sev: 'CRITICAL', age: '00:31', detail: 'Molecular acid detected on deck plating. Hull breach risk elevated. Damage control protocol initiated.' },
      { id: 'MU-035', type: 'LAB PRESSURE DROP',    sector: 'LAB SEC-2',  sev: 'WARNING',  age: '00:58', detail: 'Atmospheric pressure falling in laboratory section 2. Possible seal failure. Do not enter without EVA suit.' },
      ...(extra ? [{ id: 'MU-038', type: 'MOVEMENT DETECTED', sector: 'HOLD B', sev: 'WARNING' as const, age: '00:01', detail: 'Unidentified movement in sealed cargo hold B. Investigating.' }] : []),
    ],
    footerText: 'USCSS NOSTROMO // WEYLAND-YUTANI CORP // MU/TH/UR 6000 // SPECIAL ORDER 937',
    ring1Label: 'LIFE SUP',
    ring2Label: 'HULL',
    ring3Label: 'BIO SCAN',
    statsRows: [
      { label: 'SHIP CLASS',  value: 'USCSS'    },
      { label: 'CREW ACTIVE', value: '1 / 7'    },
      { label: 'DESTINATION', value: 'EARTH'    },
      { label: 'CARGO',       value: 'REFINERY' },
      { label: 'SPECIAL ORD', value: '937'      },
    ],
    systemModules: [
      { name: 'BRIDGE',       status: 'ACTIVE',   detail: 'secure'  },
      { name: 'CRYO CHAMBER', status: 'OFFLINE',  detail: 'offline' },
      { name: 'LAB',          status: 'WARNING',  detail: 'breach'  },
      { name: 'ENGINE CORE',  status: 'ACTIVE',   detail: 'nominal' },
      { name: 'HOLD C',       status: 'CRITICAL', detail: 'hostile' },
      { name: 'LIFE SUPPORT', status: 'ACTIVE',   detail: '97% O₂'  },
    ],
    systemModulesTitle: 'SHIP COMPARTMENTS',
    resourceLabels: ['CPU CYCLES', 'O₂ BUFFER', 'NET UPLINK', 'POWER CELL'],
    diagnosticChecks: [
      { label: 'LIFE SUPPORT',    result: 'PASS' },
      { label: 'BIO CONTAINMENT', result: 'FAIL' },
      { label: 'ENGINE CORE',     result: 'PASS' },
      { label: 'HULL INTEGRITY',  result: 'WARN' },
      { label: 'CRYO SYSTEMS',    result: 'PASS' },
    ],
    diagnosticTitle: 'MU/TH/UR FULL DIAGNOSTIC',
  },
}

// ── Helpers ────────────────────────────────────────────────────────────────

const THEME_BUTTONS: { key: ThemeKey; label: string }[] = [
  { key: 'sci-fi',    label: 'SCI-FI'    },
  { key: 'star-wars', label: 'STAR WARS' },
  { key: 'alien',     label: 'ALIEN'     },
]

function ageToProgress(age: string): number {
  const [h, m] = age.split(':').map(Number)
  return Math.min(100, Math.round(((h * 60 + m) / 90) * 100))
}

function getResources(tick: number, theme: ThemeKey): [number, number, number, number] {
  if (theme === 'sci-fi') return [
    Math.min(97, 45 + (tick % 7) * 3),
    Math.min(97, 76 + (tick % 5)),
    Math.min(97, 60 + (tick % 9) * 2),
    Math.min(97, 90 + (tick % 3)),
  ]
  if (theme === 'star-wars') return [
    Math.min(97, 82 + (tick % 5)),
    Math.min(97, 95 - (tick % 8)),
    Math.min(97, 71 + (tick % 6)),
    Math.min(97, 88 + (tick % 4)),
  ]
  return [
    Math.min(97, 34 + (tick % 11) * 2),
    Math.min(97, 94 - (tick % 5)),
    Math.min(97, 58 + (tick % 7)),
    Math.min(97, 71 - (tick % 9)),
  ]
}

const RESULT_VARIANT: Record<DiagCheck['result'], 'ACTIVE' | 'WARNING' | 'CRITICAL'> = {
  PASS: 'ACTIVE',
  WARN: 'WARNING',
  FAIL: 'CRITICAL',
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

// ── Component ─────────────────────────────────────────────────────────────

export default function ChartsShowcase() {
  const narrow = useNarrow()
  const [tick, setTick] = useState(0)
  const [theme, setTheme] = useState<ThemeKey>('sci-fi')
  const [offsets, setOffsets] = useState([0, 0, 0])
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null)
  const [diagOpen, setDiagOpen] = useState(false)
  const [diagSteps, setDiagSteps] = useState<number[]>([])
  const [diagRunKey, setDiagRunKey] = useState(0)

  const cfg = THEMES[theme]

  // Capture original theme on mount, restore it on unmount
  const prevThemeRef = useRef<string | null>(null)
  useEffect(() => {
    prevThemeRef.current = document.documentElement.getAttribute('data-theme')
    return () => {
      if (prevThemeRef.current) {
        document.documentElement.setAttribute('data-theme', prevThemeRef.current)
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }
  }, [])

  // Apply theme whenever selection changes
  useEffect(() => {
    if (cfg.htmlTheme) {
      document.documentElement.setAttribute('data-theme', cfg.htmlTheme)
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [cfg.htmlTheme])

  // Live tick + data jitter
  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1)
      setOffsets([
        Math.round((Math.random() - 0.5) * 4),
        Math.round((Math.random() - 0.5) * 3),
        Math.round((Math.random() - 0.5) * 3),
      ])
    }, 3000)
    return () => clearInterval(id)
  }, [])

  // Diagnostic animation — runs sequentially through each check
  useEffect(() => {
    if (!diagOpen) { setDiagSteps([]); return }
    const checks = cfg.diagnosticChecks
    setDiagSteps(Array(checks.length).fill(0))
    let step = 0, progress = 0
    const id = setInterval(() => {
      progress += 8
      if (progress >= 100) {
        setDiagSteps(prev => { const n = [...prev]; n[step] = 100; return n })
        step++; progress = 0
        if (step >= checks.length) clearInterval(id)
      } else {
        setDiagSteps(prev => { const n = [...prev]; n[step] = progress; return n })
      }
    }, 40)
    return () => clearInterval(id)
  }, [diagOpen, theme, diagRunKey])

  const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false })

  // Live-jittered last data point
  const seriesA = { ...cfg.seriesA, data: cfg.seriesA.data.map((v, i) => i === cfg.seriesA.data.length - 1 ? v + offsets[0] : v) }
  const seriesB = { ...cfg.seriesB, data: cfg.seriesB.data.map((v, i) => i === cfg.seriesB.data.length - 1 ? v + offsets[1] : v) }
  const seriesC = { ...cfg.seriesC, data: cfg.seriesC.data.map((v, i) => i === cfg.seriesC.data.length - 1 ? v + offsets[2] : v) }

  const liveA = seriesA.data[seriesA.data.length - 1]
  const liveB = seriesB.data[seriesB.data.length - 1]
  const scanCoverage = 94 + (tick % 3 === 0 ? 0 : tick % 3 === 1 ? 1 : -1)
  const anomalyCount = liveA > (theme === 'sci-fi' ? 27 : theme === 'star-wars' ? 88 : 28) ? 4 : 3
  const extraAnomaly = anomalyCount > 3

  const ring1Val = theme === 'sci-fi' ? scanCoverage : theme === 'star-wars' ? Math.round(liveA) : 97
  const ring2Val = theme === 'sci-fi' ? 87 : theme === 'star-wars' ? Math.round(liveB) : 84
  const ring3Val = theme === 'sci-fi' ? 91 : theme === 'star-wars' ? 78 : 94

  const resources = getResources(tick, theme)

  return (
    <>
      <title>{cfg.title} — scificn-ui</title>
      <meta name="description" content={`${cfg.title} — charts showcase for scificn-ui.`} />

      <div
        style={{
          minHeight:     '100vh',
          background:    'var(--background)',
          display:       'flex',
          flexDirection: 'column',
          fontFamily:    'var(--font-mono)',
        }}
      >
        {/* ── HEADER ── */}
        <header
          style={{
            height:       '44px',
            background:   'var(--surface)',
            borderBottom: '1px solid var(--border)',
            display:      'flex',
            alignItems:   'center',
            padding:      '0 1.25rem',
            gap:          '0.75rem',
            position:     'sticky',
            top:          0,
            zIndex:       50,
            flexShrink:   0,
          }}
        >
          <Link
            to="/showcase"
            style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.08em', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-green)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {cfg.backLabel}
          </Link>

          <span style={{ color: 'var(--border)', flexShrink: 0 }}>│</span>

          <span style={{ color: 'var(--color-green)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textShadow: 'var(--text-glow-green)', flexShrink: 0 }}>
            {cfg.title}
          </span>

          {!narrow && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.08em', flexShrink: 0 }}>
              {cfg.subtitle}
            </span>
          )}

          <div style={{ flex: 1 }} />

          {/* Theme switcher */}
          <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
            {THEME_BUTTONS.map(t => (
              <button
                key={t.key}
                onClick={() => setTheme(t.key)}
                style={{
                  background:    theme === t.key ? 'var(--color-green)' : 'transparent',
                  border:        '1px solid var(--color-green)',
                  color:         theme === t.key ? 'var(--background)' : 'var(--color-green)',
                  fontSize:      '0.58rem',
                  letterSpacing: '0.1em',
                  padding:       '2px 8px',
                  cursor:        'pointer',
                  fontFamily:    'var(--font-mono)',
                  transition:    'all 0.15s',
                  textShadow:    theme === t.key ? 'none' : 'var(--text-glow-green)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Badge variant="ACTIVE">{cfg.badge1Label}</Badge>
          <Badge variant={cfg.badge2Variant(anomalyCount)}>
            {cfg.badge2Label(anomalyCount)}
          </Badge>

          <span style={{ color: 'var(--color-green)', fontSize: '0.65rem', letterSpacing: '0.1em', textShadow: 'var(--text-glow-green)', flexShrink: 0, opacity: tick % 2 === 0 ? 1 : 0.5, transition: 'opacity 0.3s' }}>
            {timeStr}
          </span>
        </header>

        {/* ── BODY ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>

          {/* STAT CARDS */}
          <div
            style={{
              background: 'var(--background)',
              padding:    '0.75rem 1rem',
              display:    'grid',
              gridTemplateColumns: narrow ? '1fr 1fr' : 'repeat(4, 1fr)',
              gap:        '0.75rem',
            }}
          >
            <StatCard label={cfg.stat1Label} value={cfg.stat1Value(tick)} sublabel={cfg.stat1Sub(tick)} variant={cfg.stat1Variant(tick)} />
            <StatCard label={cfg.stat2Label} value={cfg.stat2Value(liveA)} sublabel={cfg.stat2Sub} variant={cfg.stat2Variant(liveA)} />
            <StatCard label={cfg.stat3Label} value={cfg.stat3Value(liveB)} sublabel={cfg.stat3Sub} variant="ACTIVE" />
            <StatCard label={cfg.stat4Label} value={cfg.stat4Value(scanCoverage)} sublabel={cfg.stat4Sub} variant="ACTIVE" />
          </div>

          {/* 3-COLUMN GRID */}
          <div
            style={{
              flex:                1,
              display:             'grid',
              gridTemplateColumns: narrow ? '1fr' : '260px 1fr 220px',
              gap:                 '1px',
              background:          'var(--border)',
            }}
          >
            {/* ── LEFT ── */}
            <div style={{ background: 'var(--background)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', overflowY: 'auto' }}>
              <Panel notch="sm">
                <PanelHeader>
                  <PanelTitle>{cfg.profileTitle}</PanelTitle>
                  <div style={{ marginLeft: 'auto' }}><Badge variant="SCANNING">LIVE</Badge></div>
                </PanelHeader>
                <PanelContent style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.5rem' }}>
                  <RadarChart data={cfg.profileAxes} variant="ACTIVE" size={220} showValues />
                </PanelContent>
              </Panel>

              <Panel notch="sm">
                <PanelHeader><PanelTitle>ARRAY HEALTH</PanelTitle></PanelHeader>
                <PanelContent>
                  <div style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                    <ProgressRing value={ring1Val} label={cfg.ring1Label} variant="ACTIVE"  size={72} />
                    <ProgressRing value={ring2Val} label={cfg.ring2Label} variant={ring2Val < 75 ? 'WARNING' : 'ACTIVE'} size={72} />
                    <ProgressRing value={ring3Val} label={cfg.ring3Label} variant="ACTIVE"  size={72} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {cfg.statsRows.map((item, i, arr) => (
                      <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                        <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{item.label}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-green)', textShadow: 'var(--text-glow-green)', fontWeight: 600, letterSpacing: '0.04em' }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </PanelContent>
              </Panel>

              {/* NEW: Live resource progress bars */}
              <Panel notch="sm">
                <PanelHeader>
                  <PanelTitle>SYS RESOURCES</PanelTitle>
                  <div style={{ marginLeft: 'auto' }}><Badge variant="ACTIVE">LIVE</Badge></div>
                </PanelHeader>
                <PanelContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {cfg.resourceLabels.map((label, i) => (
                      <Progress
                        key={label}
                        label={label}
                        value={resources[i]}
                        showValue
                      />
                    ))}
                  </div>
                </PanelContent>
              </Panel>
            </div>

            {/* ── CENTER ── */}
            <div style={{ background: 'var(--background)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', overflowY: 'auto' }}>
              <Panel notch="md" style={{ flex: 1 }}>
                <PanelHeader>
                  <PanelTitle>{cfg.centerTitle}</PanelTitle>
                  <div style={{ marginLeft: 'auto' }}><Badge variant="ACTIVE">{cfg.centerBadge}</Badge></div>
                </PanelHeader>

                <PanelContent style={{ padding: 0 }}>
                  <Tabs defaultValue="timeseries">
                    <TabsList style={{ padding: '0 1rem', background: 'var(--surface-raised)' }}>
                      <TabsTrigger value="timeseries">TIMESERIES</TabsTrigger>
                      <TabsTrigger value="heatmap">HEATMAP</TabsTrigger>
                      <TabsTrigger value="signals">SIGNALS</TabsTrigger>
                      <TabsTrigger value="coverage">COVERAGE</TabsTrigger>
                    </TabsList>

                    <TabsContent value="timeseries" style={{ margin: 0, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div>
                        <LineChart
                          series={[seriesA, seriesB, seriesC]}
                          labels={TIMES}
                          title={cfg.timeseriesTitle}
                          height={220}
                          showArea={false}
                          showLegend
                          animated={false}
                          style={{ width: '100%' }}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'repeat(3, 1fr)', gap: '0.625rem', marginTop: '1rem' }}>
                          {cfg.timeStatLabels.map((label, i) => (
                            <div key={label} style={{ padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
                              <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>{label}</div>
                              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-green)', textShadow: 'var(--text-glow-green)', letterSpacing: '0.02em' }}>{cfg.timeStatValues[i]}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <NodeGraph
                          nodes={cfg.networkNodes}
                          edges={cfg.networkEdges}
                          directed
                          title={cfg.networkTitle}
                          height={320}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="heatmap" style={{ margin: 0, padding: '1rem' }}>
                      <Heatmap
                        data={HEATMAP_DATA.flat()}
                        columns={24}
                        rowLabels={cfg.heatRowLabels}
                        colLabels={cfg.heatColLabels}
                        title={cfg.heatmapTitle}
                        variant="GREEN"
                        style={{ width: '100%' }}
                      />
                    </TabsContent>

                    <TabsContent value="signals" style={{ margin: 0, padding: '1rem' }}>
                      <BarChart
                        data={cfg.signalData}
                        orientation="horizontal"
                        variant={cfg.signalVariant}
                        title={cfg.signalTitle}
                        style={{ width: '100%' }}
                      />
                    </TabsContent>

                    {/* NEW: Coverage tab */}
                    <TabsContent value="coverage" style={{ margin: 0, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em', alignSelf: 'flex-start' }}>
                        {cfg.coverageTitle} // DIRECTIONAL SWEEP COVERAGE
                      </div>
                      <RadarChart data={cfg.coverageAxes} variant="ACTIVE" size={280} showValues />
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', width: '100%' }}>
                        {cfg.coverageAxes.map(a => (
                          <div key={a.axis} style={{ textAlign: 'center', padding: '0.4rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{a.axis}</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: a.value < 70 ? 'var(--color-amber)' : 'var(--color-green)', textShadow: a.value < 70 ? 'var(--text-glow-amber)' : 'var(--text-glow-green)' }}>{a.value}%</div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </PanelContent>
              </Panel>
            </div>

            {/* ── RIGHT ── */}
            <div style={{ background: 'var(--background)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', overflowY: 'auto' }}>
              <Panel notch="sm">
                <PanelHeader><PanelTitle>{cfg.rightChartTitle}</PanelTitle></PanelHeader>
                <PanelContent style={{ padding: 0 }}>
                  <BarChart data={cfg.annualData} orientation="vertical" variant="ACTIVE" title={cfg.annualTitle} style={{ width: '100%' }} />
                </PanelContent>
              </Panel>

              {/* NEW: System modules StatusGrid */}
              <Panel notch="sm">
                <PanelHeader>
                  <PanelTitle>{cfg.systemModulesTitle}</PanelTitle>
                  <div style={{ marginLeft: 'auto' }}><Badge variant="SCANNING">LIVE</Badge></div>
                </PanelHeader>
                <PanelContent style={{ padding: 0 }}>
                  <StatusGrid systems={cfg.systemModules} columns={1} />
                </PanelContent>
              </Panel>

              {/* Anomaly list — each row clickable */}
              <Panel notch="sm">
                <PanelHeader>
                  <PanelTitle>{cfg.anomalyPanelTitle}</PanelTitle>
                  <div style={{ marginLeft: 'auto' }}>
                    <Badge variant={extraAnomaly ? 'WARNING' : 'SCANNING'}>{anomalyCount} OPEN</Badge>
                  </div>
                </PanelHeader>
                <PanelContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cfg.anomalies(extraAnomaly).map(a => (
                      <button
                        key={a.id}
                        onClick={() => setSelectedAnomaly(a)}
                        style={{
                          display:    'block',
                          width:      '100%',
                          textAlign:  'left',
                          padding:    '0.5rem 0.625rem',
                          background: 'var(--surface-raised)',
                          border:     `1px solid ${a.sev === 'CRITICAL' ? 'var(--color-red)' : 'var(--border)'}`,
                          cursor:     'pointer',
                          fontFamily: 'var(--font-mono)',
                          transition: 'border-color 0.15s, background 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--color-green)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-raised)'; e.currentTarget.style.borderColor = a.sev === 'CRITICAL' ? 'var(--color-red)' : 'var(--border)' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{a.id}</span>
                          <Badge variant={a.sev}>{a.sev}</Badge>
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>{a.type}</div>
                        <div style={{ fontSize: '0.57rem', color: 'var(--text-muted)', letterSpacing: '0.06em', marginTop: '2px' }}>{a.sector} // +{a.age}</div>
                      </button>
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
            minHeight:    '44px',
            background:   'var(--surface)',
            borderTop:    '1px solid var(--border)',
            display:      'flex',
            alignItems:   'center',
            flexWrap:     'wrap',
            padding:      '0.5rem 1.25rem',
            gap:          '0.5rem',
            position:     'sticky',
            bottom:       0,
            zIndex:       50,
            flexShrink:   0,
          }}
        >
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            {cfg.footerText}
          </span>
          <div style={{ flex: 1 }} />
          <Button variant="OUTLINE" size="SM" onClick={() => setDiagOpen(true)}>
            RUN DIAGNOSTICS
          </Button>
          <Badge variant="ACTIVE">SYS ONLINE</Badge>
        </footer>
      </div>

      {/* ── ANOMALY DETAIL MODAL ── */}
      <Dialog open={selectedAnomaly !== null} onOpenChange={open => { if (!open) setSelectedAnomaly(null) }}>
        <DialogContent>
          {selectedAnomaly && (
            <>
              <DialogHeader>
                <DialogTitle>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{selectedAnomaly.id} //</span>{' '}
                  {selectedAnomaly.type}
                </DialogTitle>
              </DialogHeader>

              <DialogBody>
                {/* Meta row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {[
                    { label: 'SECTOR',    value: selectedAnomaly.sector },
                    { label: 'SEVERITY',  value: <Badge variant={selectedAnomaly.sev}>{selectedAnomaly.sev}</Badge> },
                    { label: 'DETECTED',  value: `+${selectedAnomaly.age} AGO` },
                    { label: 'STATUS',    value: <Badge variant="SCANNING">OPEN</Badge> },
                  ].map(row => (
                    <div key={row.label} style={{ padding: '0.5rem 0.625rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.25rem' }}>{row.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row.value}</div>
                    </div>
                  ))}
                </div>

                {/* Detail text */}
                <div style={{ padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>EVENT LOG</div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selectedAnomaly.detail}</p>
                </div>

                {/* Detection age progress */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <Progress
                    label="ELAPSED TIME SINCE DETECTION"
                    value={ageToProgress(selectedAnomaly.age)}
                    showValue
                  />
                </div>

                {/* Affected systems */}
                <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>AFFECTED SYSTEMS</div>
                <StatusGrid
                  systems={cfg.systemModules.filter((_, i) => i < 3)}
                  columns={1}
                />
              </DialogBody>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="OUTLINE" size="SM">ACKNOWLEDGE</Button>
                </DialogClose>
                <Button
                  variant="EXEC"
                  size="SM"
                  onClick={() => setSelectedAnomaly(prev => prev ? { ...prev, sev: 'CRITICAL' } : prev)}
                >
                  ESCALATE
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── DIAGNOSTICS MODAL ── */}
      <Dialog open={diagOpen} onOpenChange={setDiagOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{cfg.diagnosticTitle}</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {cfg.diagnosticChecks.map((check, i) => {
                const step = diagSteps[i] ?? 0
                const done = step >= 100
                return (
                  <div key={check.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.65rem', color: done ? 'var(--text-secondary)' : 'var(--text-muted)', letterSpacing: '0.1em' }}>
                        {check.label}
                      </span>
                      {done && <Badge variant={RESULT_VARIANT[check.result]}>{check.result}</Badge>}
                    </div>
                    <Progress value={step} showValue={false} />
                  </div>
                )
              })}
            </div>

            {/* Summary once all done */}
            {diagSteps.length === cfg.diagnosticChecks.length && diagSteps.every(s => s >= 100) && (
              <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>DIAGNOSTIC COMPLETE</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  {(['PASS', 'WARN', 'FAIL'] as const).map(r => {
                    const count = cfg.diagnosticChecks.filter(c => c.result === r).length
                    return (
                      <div key={r} style={{ textAlign: 'center' }}>
                        <Badge variant={RESULT_VARIANT[r]}>{r}</Badge>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-green)', marginTop: '0.25rem' }}>{count}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </DialogBody>

          <DialogFooter>
            <Button variant="GHOST" size="SM" onClick={() => setDiagOpen(false)}>
              CLOSE
            </Button>
            <Button
              variant="EXEC"
              size="SM"
              onClick={() => setDiagRunKey(k => k + 1)}
            >
              RE-RUN
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
