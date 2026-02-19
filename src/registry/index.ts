import utils        from './utils.json'
import alert        from './alert.json'
import badge        from './badge.json'
import barChart     from './bar-chart.json'
import button       from './button.json'
import checkbox     from './checkbox.json'
import dialog       from './dialog.json'
import grid         from './grid.json'
import heatmap      from './heatmap.json'
import input        from './input.json'
import panel        from './panel.json'
import progress     from './progress.json'
import progressRing from './progress-ring.json'
import select       from './select.json'
import separator    from './separator.json'
import spinner      from './spinner.json'
import statCard     from './stat-card.json'
import statusGrid   from './status-grid.json'
import switchReg    from './switch.json'
import tabs         from './tabs.json'
import terminal     from './terminal.json'
import textarea     from './textarea.json'
import toast        from './toast.json'
import tooltip      from './tooltip.json'

export const registry = [
  utils,
  alert,
  badge,
  barChart,
  button,
  checkbox,
  dialog,
  grid,
  heatmap,
  input,
  panel,
  progress,
  progressRing,
  select,
  separator,
  spinner,
  statCard,
  statusGrid,
  switchReg,
  tabs,
  terminal,
  textarea,
  toast,
  tooltip,
] as const

export type RegistryEntry = (typeof registry)[number]
