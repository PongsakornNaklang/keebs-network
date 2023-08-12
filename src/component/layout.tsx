import React from 'react'
import { Box, Container, createStandaloneToast, useColorMode, useColorModeValue } from '@chakra-ui/react'

import dynamic from "next/dynamic";
import { NavbarLoading } from '@/component/navbar';
import { FloatButton } from 'antd';
import { Moon, SunDim } from '@phosphor-icons/react';
const Navbar = dynamic(() => import("@/component/navbar"), { ssr: false, loading: () => <NavbarLoading /> });
const Footer = dynamic(() => import("@/component/footer"), { ssr: false });

const { ToastContainer } = createStandaloneToast()

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Box minH={"100%"} bg={useColorModeValue('white', 'gray.800')}>
                <Container maxW='container.xl' className="d-flex justify-content-center">
                    {children}
                    <Footer />
                    <ToastContainer />
                </Container>
            </Box>
            <FloatButton
                icon={colorMode === 'light' ? <SunDim size={18} weight="fill" /> : <Moon size={18} weight="fill" />}
                onClick={toggleColorMode}
            />
        </div>
    )
}

export default Layout