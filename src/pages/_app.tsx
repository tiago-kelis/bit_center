import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        components: {
          Radio: {
            styles: {
              radio: { width: '20px', height: '20px' }, // Aplicado globalmente
            },
          },
        },
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}
