import type { AppProps } from "next/app"
import { SessionProvider, useSession } from "next-auth/react"

import '../../styles/globals.scss';
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript, UseToastOptions } from "@chakra-ui/react";
import theme from "@/hook/theme";

import dynamic from "next/dynamic";
const Layout = dynamic(() => import("@/component/layout"), { ssr: false });

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Nunito } from "next/font/google";
import { NextComponentType, NextPageContext } from "next";

const nunito = Nunito({ subsets: ['latin'] });

const defaultOptions: UseToastOptions = {
    position: 'top',
    duration: 2000,
    isClosable: true
}

type Component = NextComponentType<NextPageContext, any, any> & {
    auth: boolean;
};

export default function MyApp({ Component, pageProps: { session, ...pageProps }, title = "Keebs Network" }: AppProps & { title: string, Component: Component }) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme} toastOptions={{ defaultOptions }}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <SessionProvider session={session}>
                    <main className={nunito.className}>
                        <title>{title}</title>
                        <Layout>
                            {Component.auth ? (
                                <Auth>
                                    <Component {...pageProps} />
                                </Auth>
                            ) : (
                                <Component {...pageProps} />
                            )}
                        </Layout>
                    </main>
                </SessionProvider >
            </ChakraProvider >
        </CacheProvider >
    )
}

const Auth = ({ children }: { children: React.ReactNode }) => {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession({ required: true })

    if (status === "loading") {
        return null
    }

    return children
}