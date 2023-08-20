import { Box, Flex, Link, Button, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useColorMode, useColorModeValue, useDisclosure, Container, Center } from '@chakra-ui/react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from './../../public/keebs-network-high-logo.png'
import SignupCard from './auth/signup-modal';
import ProfileModal from './index/profile-modal';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import SignOutModal from './auth/signout-modal';
import SignInModal from './auth/signIn-modal';

export default function Navbar() {
    const router = useRouter();
    const session = useSession();

    const signOutModal = useDisclosure()
    const signUpModal = useDisclosure()
    const profileModal = useDisclosure()
    const signInModal = useDisclosure()

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box boxShadow={'lg'} zIndex={20}>
            <Container maxW='container.xl' className="d-flex justify-content-center">
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
                        <Button rounded={"full"} w={"40px"} h={"40px"} onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        {session.status === "authenticated" ? (
                            <Flex className='items-center gap-x-2' zIndex={100}>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}
                                        className='px-2 py-2 rounded-full'
                                    >
                                        <Avatar
                                            w={"40px"}
                                            h={"40px"}
                                            src={session.data?.user.image ?? undefined}
                                        />
                                    </MenuButton>
                                    <MenuList alignItems={'center'}>
                                        <br />
                                        <Center>
                                            <Avatar
                                                size={'xl'}
                                                src={session.data?.user.image ?? undefined}
                                            />
                                        </Center>
                                        <br />
                                        <Center>
                                            <p>{session.data?.user?.username}</p>
                                        </Center>
                                        <br />
                                        <MenuDivider />
                                        <MenuItem>Your Projects</MenuItem>
                                        <MenuItem onClick={profileModal.onOpen}>Account Settings</MenuItem>
                                        <MenuItem onClick={signOutModal.onOpen}>Sign Out</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        ) : !router.pathname.includes("signin") && session.status === "unauthenticated" && (
                            <Flex className='items-center gap-x-2'>
                                <Button variant='ghost' onClick={signUpModal.onOpen}>
                                    Sign Up
                                </Button>
                                <Button colorScheme='cyan' color={useColorModeValue("white", "gray.800")} onClick={signInModal.onOpen}>
                                    Sign In
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                <SignupCard isOpen={signUpModal.isOpen} onClose={signUpModal.onClose} />
                <SignOutModal isOpen={signOutModal.isOpen} onClose={signOutModal.onClose} />
                <ProfileModal isOpen={profileModal.isOpen} onClose={profileModal.onClose} />
                <SignInModal isOpen={signInModal.isOpen} onClose={signInModal.onClose} />
            </Container>
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