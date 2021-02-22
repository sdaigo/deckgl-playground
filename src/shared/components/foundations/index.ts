export { default as GlobalStyles } from './global-styles'

export {
  default as styled,
  breakpoints,
  media,
  css,
  theme,
  keyframes,
  ThemeProvider,
} from './theme'

import { theme } from './theme'
export type ITheme = typeof theme
