import React from "react";
import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core'
import { AppProps } from "next/app";

import theme from '../theme'

// noinspection JSUnusedGlobalSymbols
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  )
}
