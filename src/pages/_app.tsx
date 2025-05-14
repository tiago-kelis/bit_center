import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { CentralDeAcessoProvider } from '../data/contexts/CentralDeAcessoContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      defaultColorScheme="dark" // Nova propriedade em v7
      theme={{
        primaryColor: 'blue',
      }}
    >
      <CentralDeAcessoProvider>
        <Component {...pageProps} />
      </CentralDeAcessoProvider>
    </MantineProvider>
  )
}