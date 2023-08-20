import React from 'react'
import { Box, Container, createStandaloneToast, useColorModeValue } from '@chakra-ui/react'

import dynamic from "next/dynamic";
import { NavbarLoading } from '@/component/navbar';
const Navbar = dynamic(() => import("@/component/navbar"), { ssr: false, loading: () => <NavbarLoading /> });
const Footer = dynamic(() => import("@/component/footer"), { ssr: false });

const { ToastContainer } = createStandaloneToast()

const Layout = ({ children }: { children: React.ReactNode }) => {
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
        </div>
    )
}

export default Layout