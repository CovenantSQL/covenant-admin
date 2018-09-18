const M_BREAKPOINT = 768
const L_BREAKPOINT = 1020
exports.breakpoints = { M_BREAKPOINT, L_BREAKPOINT }

const fonts = {
  iconFont: 'Saira, -apple-system, BlinkMacSystemFont, "Segoe UI", "Droid Sans", "Helvetica Neue", "PingFang HK", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", sans-serif',
  sansFont: '"Helvetica Neue", Helvetica, Arial, BlinkMacSystemFont, "Segoe UI", "Droid Sans", "PingFang HK", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", sans-serif'
}
exports.fonts = fonts

const utils = {
  gutter: '15px',
  'l-gutter': '20px',
  'xl-gutter': '30px',
  'l-breakpoint': `${L_BREAKPOINT}px`,
  'm-breakpoint': `${M_BREAKPOINT}px`,
  'headerHeight': '110px',
  inputShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.16)',
  inputActiveShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 4px 0 rgba(0, 0, 0, 0.08)',
}
exports.utils = utils

const colors = {
  mainColor: '#0053CC',
  fontColor: '#4A4A4A',

  linkColor: '#1050B0',
  linkHoverColor: '#0084FB',

  buttonColor: '#1050B0',
  buttonHoverColor: '#195BBF',
  actionColor: '#F5A623',
  actionHoverColor: '#FEBD52',
  dustygray: '#9b9b9b',
  athensgray2: '#f5f6f8',
  gallery: '#eeeeee',

  dark: '#4A4A4A',
  blue: '#1050B0',
  grey: '#BCBEBC',
  red: '#DB4437',
  green: '#25A42F'
}
exports.colors = colors

const viewports = {
  '--s': `(max-width: ${M_BREAKPOINT - 1}px)`, // small size
  '--m': `(max-width: ${L_BREAKPOINT - 1}px)`, // medium size
  '--l': `(min-width: ${L_BREAKPOINT}px)` // large size
}
exports.viewports = viewports

exports.variables = {
  ...fonts,
  ...utils,
  ...colors
}
