'use client'
import { IUsers } from '@/pages/api/user'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, Button, Center, FormControl, FormLabel, HStack, Heading, Icon, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tag, TagLabel, TagLeftIcon, useColorModeValue, useDisclosure, useEditableControls, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

const ProfileModal = ({ isOpen, onClose }: any) => {
    const session = useSession()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const userNameRef = useRef<HTMLInputElement>(null)

    const toast = useToast()

    const onUpdate = async () => {

        const payload: Partial<IUsers> = {
            firstName: firstNameRef.current?.value,
            lastName: lastNameRef.current?.value,
            username: userNameRef.current?.value,
            email: session.data?.user.email
        }

        console.log(session);


        try {
            await axios.patch('/api/user', payload, {
                headers: {
                    Authorization: `Bearer ${session.data?.accessToken.token}`
                }
            })
            toast({
                title: "Update success",
                description: "Your profile has been updated",
                status: "success"
            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Update failed",
                description: "Your profile has not been updated",
                status: "error"
            })
        }

        setIsEditing(false)
        // router.reload()
        onClose()
    }

    return (
        <>
            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent >
                    <Stack
                        spacing={4}
                        bg={useColorModeValue('white', 'gray.700')}
                        rounded={'xl'}
                        boxShadow={'lg'}
                        p={6}
                    >
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                            Account Settings
                        </Heading>
                        <ModalCloseButton />
                        <FormControl id="userName">
                            <FormLabel>Profile image</FormLabel>
                            <Stack direction={['column', 'row']} spacing={6}>
                                <Center>
                                    <Avatar size="xl" src={session.data?.user.image ?? undefined}>
                                        <AvatarBadge
                                            as={IconButton}
                                            size="sm"
                                            rounded="full"
                                            top="-10px"
                                            colorScheme="red"
                                            aria-label="remove Image"
                                            icon={<SmallCloseIcon />}
                                        />
                                    </Avatar>
                                </Center>
                                <Center w="full">
                                    <Button w="full">Change image</Button>
                                </Center>
                            </Stack>
                        </FormControl>
                        <FormControl id="userName" >
                            <FormLabel>Username</FormLabel>
                            <Input
                                placeholder="UserName"
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                                defaultValue={session.data?.user?.username}
                                contentEditable={false}
                                ref={userNameRef}
                                readOnly={!isEditing}
                                border={isEditing ? '1px solid #ccc' : 'none'}
                            />
                        </FormControl>
                        <HStack>
                            <FormControl id="firstName" >
                                <FormLabel>First name</FormLabel>
                                <Input
                                    placeholder="First name"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="text"
                                    defaultValue={session.data?.user?.firstName}
                                    ref={firstNameRef}
                                    readOnly={!isEditing}
                                    border={isEditing ? '1px solid #ccc' : 'none'}
                                    backgroundColor={useColorModeValue('white', 'gray.700')}
                                />
                            </FormControl>
                            <FormControl id="lastName" >
                                <FormLabel>Last name</FormLabel>
                                <Input
                                    placeholder="Last name"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="text"
                                    defaultValue={session.data?.user?.lastName}
                                    ref={lastNameRef}
                                    readOnly={!isEditing}
                                    border={isEditing ? '1px solid #ccc' : 'none'}
                                />
                            </FormControl>
                        </HStack>
                        {
                            session.data?.user?.type === "google" ? (
                                <FormControl id="google">
                                    <FormLabel>SignIn with</FormLabel>
                                    <Tag size='lg' colorScheme='cyan' borderRadius='full' >
                                        <TagLeftIcon boxSize="24px" as={FcGoogle} />
                                        <TagLabel>{session.data?.user?.email}</TagLabel>
                                    </Tag>
                                </FormControl>
                            ) : (
                                <>
                                    <FormControl id="email" >
                                        <FormLabel>Email address</FormLabel>
                                        <Input
                                            placeholder="your-email@example.com"
                                            _placeholder={{ color: 'gray.500' }}
                                            type="email"
                                            defaultValue={session.data?.user?.email}
                                            readOnly={true}
                                            border={isEditing ? '1px solid #ccc' : 'none'}
                                        />
                                    </FormControl>
                                    <FormControl id="password" >
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            placeholder="password"
                                            _placeholder={{ color: 'gray.500' }}
                                            type="password"
                                            defaultValue={session.data?.user?.password}
                                            readOnly={true}
                                            border={isEditing ? '1px solid #ccc' : 'none'}
                                        />
                                    </FormControl>
                                </>
                            )
                        }
                        <Stack spacing={6} direction={['column', 'row']}>
                            {
                                isEditing ? (
                                    <>
                                        <Button
                                            w="full"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            colorScheme='cyan'
                                            textColor={useColorModeValue('white', 'gray.700')}
                                            w="full"
                                            onClick={onUpdate}
                                        >
                                            Submit
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        w="full"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit
                                    </Button>
                                )
                            }
                        </Stack>
                    </Stack>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal