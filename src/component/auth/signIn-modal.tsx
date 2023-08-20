import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Text,
    InputGroup,
    InputRightElement,
    Center,
    createStandaloneToast,
    Skeleton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody
} from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRef, useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'

const { toast } = createStandaloneToast()

const SignInModal = ({ isOpen, onClose = () => { }, isCloseBtn = true }: { isOpen: boolean, onClose?: () => void, isCloseBtn?: boolean }) => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        if (session.status === 'authenticated') {
            router.replace('/')
        }
    }, [])

    const onSubmit = async () => {
        if (!emailRef.current?.value || !passwordRef.current?.value) return
        setIsLoading(true)
        const result = await signIn('credentials', {
            redirect: false,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })

        if (result?.error) {
            toast({
                title: "Sign in failed",
                description: `${result.error} 😥`,
                status: "error",
            })
            setIsLoading(false)
            return
        }

        router.replace('/')
        onClose()
        toast({
            title: "Sign in successfully",
            description: `Welcome back!🎉`,
            status: "success",
            colorScheme: "cyan"
        })
        setIsLoading(false)
    }

    const onGoogleSignIn = async () => {
        const result = await signIn('google', { redirect: false, callbackUrl: '/' })
    }

    return (
        <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={useColorModeValue('gray.50', 'gray.800')}>
                {/* <ModalHeader>Modal Title</ModalHeader> */}
                {isCloseBtn ? <ModalCloseButton /> : null}
                <ModalBody>
                    <Flex className='items-center justify-center'>
                        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                            <Stack align={'center'}>
                                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                                <Text fontSize={'lg'} color={'gray.600'}>
                                    to enjoy all of our cool features✌️
                                </Text>
                            </Stack>
                            <Box
                                rounded={'lg'}
                                bg={useColorModeValue('white', 'gray.700')}
                                boxShadow={'lg'}
                                p={8}>
                                <Stack spacing={4}>
                                    <FormControl id="email">
                                        <FormLabel>Email address</FormLabel>
                                        <Input type="email" ref={emailRef} />
                                    </FormControl>
                                    <FormControl id="password">
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                            <Input type={showPassword ? 'text' : 'password'} ref={passwordRef} />
                                            <InputRightElement h={'full'}>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <Stack spacing={4}>
                                        <Stack
                                            direction={{ base: 'column', sm: 'row' }}
                                            align={'start'}
                                            justify={'space-between'}>
                                            <Checkbox>Remember me</Checkbox>
                                            <Text color={'cyan.400'}>Forgot password?</Text>
                                        </Stack>
                                        <Button
                                            size="lg"
                                            bg={'cyan.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'cyan.500',
                                            }}
                                            isLoading={isLoading}
                                            onClick={onSubmit}
                                        >
                                            Sign in
                                        </Button>
                                        <Button size="lg" w={'full'} maxW={'md'} variant={'outline'} leftIcon={<FcGoogle />} onClick={onGoogleSignIn}>
                                            <Center>
                                                <Text>Sign in with Google</Text>
                                            </Center>
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SignInModal

export const SignInSkeleton = () => {
    return (
        <Flex className='items-center justify-center' >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Skeleton><Heading fontSize={'4xl'}>Sign in to your account</Heading></Skeleton>
                    <Skeleton><Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features✌️
                    </Text>
                    </Skeleton>
                </Stack>
                <Box
                    rounded={'lg'}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <Skeleton><FormLabel>Email address</FormLabel> </Skeleton>
                            <Skeleton><Input w="full" type="email" /> </Skeleton>
                        </FormControl>
                        <FormControl id="password">
                            <Skeleton><FormLabel>Password</FormLabel> </Skeleton>
                            <Skeleton>
                                <InputGroup>
                                    <Input w="full" type={'password'} />
                                </InputGroup>
                            </Skeleton>
                        </FormControl>
                        <Stack spacing={4}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Skeleton><Checkbox>Remember me</Checkbox></Skeleton>
                                <Skeleton><Text>Forgot password?</Text></Skeleton>
                            </Stack>
                            <Skeleton>
                                <Button w="full">
                                    Sign in
                                </Button>
                            </Skeleton>
                            <Skeleton >
                                <Button w={'full'} maxW={'md'} variant={'outline'}>
                                </Button>
                            </Skeleton>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}