import lineChart   from './line-chart.json'
import radarChart  from './radar-chart.json'
import nodeGraph   from './node-graph.json'
import utils        from './utils.json'
import alert        from './alert.json'
import badge        from './badge.json'
import barChart     from './bar-chart.json'
import breadcrumb   from './breadcrumb.json'
import button       from './button.json'
import card         from './card.json'
import checkbox     from './checkbox.json'
import dialog       from './dialog.json'
import grid         from './grid.json'
import heatmap      from './heatmap.json'
import input        from './input.json'
import kbd          from './kbd.json'
import label        from './label.json'
import panel        from './panel.json'
import progress     from './progress.json'
import progressRing from './progress-ring.json'
import select       from './select.json'
import separator    from './separator.json'
import skeleton     from './skeleton.json'
import spinner      from './spinner.json'
import statCard     from './stat-card.json'
import statusGrid   from './status-grid.json'
import switchReg    from './switch.json'
import tabs         from './tabs.json'
import terminal     from './terminal.json'
import textarea     from './textarea.json'
import toast        from './toast.json'
import tooltip      from './tooltip.json'
import typography   from './typography.json'

export const registry = [
  utils,
  lineChart,
  radarChart,
  nodeGraph,
  alert,
  badge,
  barChart,
  breadcrumb,
  button,
  card,
  checkbox,
  dialog,
  grid,
  heatmap,
  input,
  kbd,
  label,
  panel,
  progress,
  progressRing,
  select,
  separator,
  skeleton,
  spinner,
  statCard,
  statusGrid,
  switchReg,
  tabs,
  terminal,
  textarea,
  toast,
  tooltip,
  typography,
] as const

export type RegistryEntry = (typeof registry)[number]
