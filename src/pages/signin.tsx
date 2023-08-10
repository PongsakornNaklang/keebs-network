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
} from '@chakra-ui/react'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

const SignIn = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async () => {
        if (!emailRef.current?.value || !passwordRef.current?.value) return
        const result = await signIn('credentials', {
            redirect: true,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            callbackUrl: "/"
        })
        console.log(result);
    }

    return (
        <Flex className='items-center justify-center' bg={useColorModeValue('gray.50', 'gray.800')}>
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
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    ref={passwordRef}
                                />
                                <InputRightElement >
                                    {showPassword ? <EyeClosed onClick={handleTogglePassword} /> : <Eye onClick={handleTogglePassword} />}
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
                                bg={'cyan.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'cyan.500',
                                }}
                                onClick={onSubmit}
                            >
                                Sign in
                            </Button>
                            <Button w={'full'} maxW={'md'} variant={'outline'} leftIcon={<FcGoogle />}>
                                <Center>
                                    <Text>Sign in with Google</Text>
                                </Center>
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default SignIn