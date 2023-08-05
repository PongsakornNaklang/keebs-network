import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

import '../../styles/globals.scss';
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript, Container } from "@chakra-ui/react";
import theme from "@/hook/theme";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Nunito } from "next/font/google";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";

const nunito = Nunito({ subsets: ['latin'] });

function MyApp({ Component, pageProps: { session, ...pageProps }, title = "Keebs Network" }: AppProps & { title: string }) {
    return (
        <CacheProvider>
            <ChakraProvider>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <SessionProvider session={session}>
                    <main className={nunito.className}>
                        <title>{title}</title>
                        <div>
                            <Container maxW='container.xl' className="d-flex justify-content-center">
                                <Navbar />
                                <Component {...pageProps} />
                                <Footer />
                            </Container>
                        </div>
                    </main>
                </SessionProvider>
            </ChakraProvider>
        </CacheProvider>
    )
}

export default MyApp
