import utils     from './utils.json'
import alert     from './alert.json'
import badge     from './badge.json'
import button    from './button.json'
import checkbox  from './checkbox.json'
import dialog    from './dialog.json'
import input     from './input.json'
import panel     from './panel.json'
import progress  from './progress.json'
import select    from './select.json'
import separator from './separator.json'
import spinner   from './spinner.json'
import switchReg from './switch.json'
import tabs      from './tabs.json'
import textarea  from './textarea.json'
import toast     from './toast.json'
import tooltip   from './tooltip.json'

export const registry = [
  utils,
  alert,
  badge,
  button,
  checkbox,
  dialog,
  input,
  panel,
  progress,
  select,
  separator,
  spinner,
  switchReg,
  tabs,
  textarea,
  toast,
  tooltip,
] as const

export type RegistryEntry = (typeof registry)[number]
