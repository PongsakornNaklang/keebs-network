import { Box, Flex, Link, Button, Avatar, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { Moon, SunDim } from '@phosphor-icons/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from './../../public/keebs-network-high-logo.png'

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const router = useRouter();
    const session = useSession();

    return (
        <Box>
            <Flex className="min-h-[70px] py-2 bg-transparent z-2 left-0 right-0 m-auto items-center">
                <Flex className='flex-1 justify-start'>
                    <Link onClick={() => router.push("/")}>
                        <Image
                            src={logo}
                            height={30}
                            alt="Picture of the author"
                        />
                    </Link>
                </Flex>
                <Flex
                    flex={{ base: 1, md: 0 }}
                    justify={{ base: 'end', md: 'end' }}
                    className='space-x-2 items-center'
                >
                    {session.status === "authenticated" ? (
                        <Flex className='items-center gap-x-2'>
                            <Menu>
                                <MenuButton
                                    _hover={{
                                        background: useColorModeValue('gray.100', 'gray.700'),
                                    }}
                                    className='px-2 py-2 rounded-full'
                                >
                                    <Flex className='items-center gap-x-2'>
                                        <Avatar size="sm" />
                                        {session.data.user.user}
                                    </Flex>
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup title='Profile'>
                                        <MenuItem>My Account</MenuItem>
                                        <MenuItem>Payments</MenuItem>
                                        <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup title='Help'>
                                        <MenuItem>Docs</MenuItem>
                                        <MenuItem>FAQ</MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>
                        </Flex>
                    ) : !router.pathname.includes("signin") && session.status === "unauthenticated" && (
                        <Button onClick={() => signIn()}>
                            Sign In
                        </Button>
                    )}
                    <Button onClick={toggleColorMode} variant="ghost">
                        {colorMode === 'light' ? <SunDim size={18} weight="fill" /> : <Moon size={18} weight="fill" />}
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
}

export const NavbarLoading = () => {
    return (
        <Box>
            <Flex className="min-h-[70px] py-2 bg-transparent z-2 left-0 right-0 m-auto items-center">
            </Flex>
        </Box>
    )
}