import {
    Box,
    Flex,
    Link,
    useBreakpointValue,
    Image,
    Button,
    useColorMode,
    Avatar,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuGroup,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';
import { Moon, SunDim } from '@phosphor-icons/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode()
    const router = useRouter()
    const session = useSession()
    console.log(session);

    useEffect(() => {
        console.log(colorMode);
    }, [colorMode])

    return (
        <Box>
            <Flex
                className="min-h-[70px] py-2 bg-transparent z-2 left-0 right-0 m-auto items-center">
                <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
                    <Link onClick={() => router.push("/")}>
                        <Image
                            textAlign={useBreakpointValue({ base: 'left', md: 'left' })}
                            height={30}
                            //https://jmp.sh/s/kaBlJECuJu97B8XVJSH4
                            //<a href="https://ibb.co/GVqFnBZ"><img src="https://i.ibb.co/HrjXB1c/keebs-network-high-logo.png" alt="keebs-network-high-logo" border="0" /></a>
                            src='https://i.ibb.co/HrjXB1c/keebs-network-high-logo.png'
                        />
                    </Link>
                </Flex>
                <Flex
                    flex={{ base: 1, md: 0 }}
                    justify={{ base: 'end', md: 'end' }}
                    className='space-x-4 items-center'
                >
                    {session.status === "authenticated" ? (
                        <Flex className='items-center gap-x-2'>
                            <Menu>
                                <MenuButton>
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
                    ) : !router.pathname.includes("signin") ? (
                        <Button onClick={() => signIn()}>
                            Sign In
                        </Button>
                    ) : null}
                    <Button onClick={toggleColorMode} variant="ghost"
                    >
                        {
                            colorMode === 'light' ? <SunDim size={18} weight="fill" /> : <Moon size={18} weight="fill" />
                        }
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
}