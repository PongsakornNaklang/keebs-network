import { Box, Flex, Link, Button, Avatar, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, useColorMode, useColorModeValue, useDisclosure, Container, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from './../../public/keebs-network-high-logo.png'
import SignupCard from './auth/signUpModal';

export default function Navbar() {
    const router = useRouter();
    const session = useSession();

    const signOutModal = useDisclosure()
    const signUpModal = useDisclosure()

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
                        {session.status === "authenticated" ? (
                            <Flex className='items-center gap-x-2' zIndex={100}>
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
                                            <MenuItem onClick={signOutModal.onOpen}>Sign Out</MenuItem>
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
                            <Flex className='items-center gap-x-2'>
                                <Button variant='ghost' onClick={signUpModal.onOpen}>
                                    Sign Up
                                </Button>
                                <Button colorScheme='cyan' color={useColorModeValue("white", "gray.800")} onClick={() => signIn()}>
                                    Sign In
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                <SignupCard isOpen={signUpModal.isOpen} onClose={signUpModal.onClose} />
                <SignOutModal isOpen={signOutModal.isOpen} onClose={signOutModal.onClose} />
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

const SignOutModal = ({ isOpen, onClose }: any) => {
    const toast = useToast()

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Do you want to sign out?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        You will be redirected to the home page.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            No
                        </Button>
                        <Button variant='ghost' onClick={() => {
                            signOut({
                                callbackUrl: "/",
                                redirect: false,
                            })
                            onClose()
                            toast({
                                title: "Signed out",
                                description: "You have been signed out. Bye! 👋",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                                position: "top",
                                colorScheme: "cyan"
                            })
                        }
                        }>Yes, Sign out</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}