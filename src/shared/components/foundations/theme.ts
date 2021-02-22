import * as styledComponents from 'styled-components'
import { darken } from 'polished'

export type Color = string
interface ColorVariant {
  main: Color
  light: Color
  dark: Color
}

enum Elevation {
  GLOBAL_HEADER = 1,
  MENU = 2,
  BACKDROP,
  MODAL,
  GLOBAL_LOADER,
}

const breakpoints = {
  md: 768,
  lg: 1024,
  xl: 1280,
}

export interface ITheme {
  color: {
    brand: {
      primary: ColorVariant
    }
    neutral: {
      900: Color
      800: Color
      700: Color
      600: Color
      500: Color
      400: Color
      300: Color
      200: Color
      100: Color
      50: Color
    }
    semantics: {
      invalid: Color
      info: Color
      success: Color
      error: Color
      notice: Color
      selected: Color
      highlight: Color
    }
    black: Color
    white: Color
    highlightBackground: Color
    backdrop: Color
    disabled: Color
    shadow: Color
    menu: {
      main: Color
      active: Color
    }
  }
  spacing: (...args: number[]) => string
  elevation: typeof Elevation
  shape: {
    radius: {
      sm: string
      rg: string
      lg: string
    }
  }
  font: {
    size: {
      sm: string
      rg: string
      md: string
      lg: string
      xl: string
    }
  }
}

const SPACE_UNIT = 8
const spacing = (...args: number[]): string => {
  const unit = (v: number) => v * SPACE_UNIT
  switch (args.length) {
    case 1:
      return `${unit(args[0] as number)}px`
    case 2:
      return [0, 1].map(n => `${unit(args[n] as number)}px`).join(' ')
    case 3:
      return [0, 1, 2].map(n => `${unit(args[n] as number)}px`).join(' ')
    case 4:
      return [0, 1, 2, 3].map(n => `${unit(args[n] as number)}px`).join(' ')
    default:
      return 'auto auto'
  }
}

export const theme: ITheme = {
  color: {
    brand: {
      primary: {
        main: '#d81312',
        light: '#FFD7D5',
        dark: '#AE2F28',
      },
    },
    neutral: {
      900: '#1B1B1B',
      800: '#222222',
      700: '#313131',
      600: '#545454',
      500: '#7f7f7f',
      400: '#9a9a9a',
      300: '#bebebe',
      200: '#dcdcdc',
      100: '#f3f3f3',
      50: '#fafbfc',
    },
    semantics: {
      invalid: '#8B91A1',
      info: '#588df1',
      error: '#aa0001',
      success: '#31bf69',
      notice: '#FFAB00',
      selected: '#def1ff',
      highlight: '#F9F48B',
    },
    black: '#202020',
    highlightBackground: '#f1f1f1',
    backdrop: 'rgba(0, 0, 0, 0.24)',
    shadow: 'rgba(0, 0, 0, 0.2)',
    white: 'rgba(255, 255, 255, 1)',
    disabled: '#9a9a9a',
    menu: {
      main: '#ffe8ef',
      active: darken(0.1, '#ffe8f0'),
    },
  },
  elevation: Elevation,
  spacing,
  shape: {
    radius: {
      sm: '3px',
      rg: '6px',
      lg: '12px',
    },
  },
  font: {
    size: {
      sm: '0.75rem',
      rg: '1rem',
      md: '1.333rem',
      lg: '1.777rem',
      xl: '2.369rem',
    },
  },
}

const media = {
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>

export default styled
export { breakpoints, media, css, createGlobalStyle, keyframes, ThemeProvider }
