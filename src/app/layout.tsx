
import Head from "next/head";
import { Providers } from "./providers";
import { Container } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: 'Keebs Network :)',
  description: 'Custom Keyboard Community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container _dark={{
        bg: 'gray.900',
        color: 'whiteAlpha.900',
      }}
        w={"full"}>
        <main className={inter.className}>
          {children}
        </main>
      </Container>
    </Providers >
  )
}
