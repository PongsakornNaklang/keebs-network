import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Center,
    useToast,
} from '@chakra-ui/react'
import { useState, useRef, RefObject } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/router'
import { IUsers } from '@/pages/api/signup'
import axios from 'axios'

export default function SignupCard({ isOpen, onClose }: any) {
    const [showPassword, setShowPassword] = useState(false)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const toast = useToast()

    const getValue = (ref: RefObject<HTMLInputElement>) => ref.current?.value ?? "";

    const onSignUp = async () => {
        setLoading(true);
        const firstName = getValue(firstNameRef);
        const lastName = getValue(lastNameRef);
        const email = getValue(emailRef);
        const password = getValue(passwordRef);
        const username = getValue(usernameRef);

        if (firstName && lastName && email && password) {
            console.log(firstName, lastName, email, password);
            const data: IUsers = {
                firstName,
                lastName,
                username,
                email,
                password,
            };

            try {
                const response = await axios.post('/api/signup', data);

                if (response.status === 201) {
                    const signInResult = await signIn('credentials', {
                        redirect: false,
                        email,
                        password,
                    });

                    if (signInResult?.error) {
                        console.log(signInResult.error);
                    }

                    if (signInResult?.url) {
                        router.replace(signInResult.url);
                    }

                    onClose();
                    toast({
                        title: 'Account created.',
                        description: "We've created your account for you.",
                        status: 'success'
                    });
                }
            } catch (error: any) {
                const errMassage = error.response?.data.message
                console.log(errMassage)
                toast({
                    title: 'Error',
                    description: errMassage,
                    status: 'error'
                });
            }
        } else {
            toast({
                title: 'Error',
                description: 'Please fill all the required fields',
                status: 'error'
            });
        }

        setLoading(false);
    };

    return (
        <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={useColorModeValue('gray.50', 'gray.800')}>
                {/* <ModalHeader>Modal Title</ModalHeader> */}
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        align={'center'}
                        justify={'center'}>
                        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                            <Stack align={'center'}>
                                <Heading fontSize={'4xl'} textAlign={'center'}>
                                    Sign up
                                </Heading>
                                <Text fontSize={'lg'} color={'gray.600'}>
                                    to enjoy all of our cool features ✌️
                                </Text>
                            </Stack>
                            <Box
                                rounded={'lg'}
                                bg={useColorModeValue('white', 'gray.700')}
                                boxShadow={'lg'}
                                p={8}>
                                <Stack spacing={4}>
                                    <HStack>
                                        <Box>
                                            <FormControl id="firstName" isRequired>
                                                <FormLabel>First Name</FormLabel>
                                                <Input type="text" ref={firstNameRef} />
                                            </FormControl>
                                        </Box>
                                        <Box>
                                            <FormControl id="lastName" isRequired>
                                                <FormLabel>Last Name</FormLabel>
                                                <Input type="text" ref={lastNameRef} />
                                            </FormControl>
                                        </Box>
                                    </HStack>
                                    <FormControl id="username" isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input type="text" ref={usernameRef} />
                                    </FormControl>
                                    <FormControl id="email" isRequired>
                                        <FormLabel>Email address</FormLabel>
                                        <Input type="email" ref={emailRef} />
                                    </FormControl>
                                    <FormControl id="password" isRequired>
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
                                    <Stack spacing={5} pt={2}>
                                        <Button
                                            size="lg"
                                            bg={'blue.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'blue.500',
                                            }}
                                            onClick={onSignUp}
                                            isLoading={loading}
                                        >
                                            Sign up
                                        </Button>
                                        <Button size="lg" variant={'outline'} leftIcon={<FcGoogle />}>
                                            <Center>
                                                <Text>Sign up with Google</Text>
                                            </Center>
                                        </Button>
                                    </Stack>

                                    <Stack pt={6}>
                                        <Text align={'center'}>
                                            Already a user? <Link color={'blue.400'} onClick={() => signIn()}>Login</Link>
                                        </Text>
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