import * as React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import { AppName } from '@config'
import { theme, GlobalStyles, ThemeProvider } from '@components/foundations'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{AppName}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
