import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import { Warning } from "@phosphor-icons/react"
import { signOut } from "next-auth/react"


const SignOutModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const toast = useToast()

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack>
                            <Warning />
                            <p>Do you want to sign out?</p>
                        </HStack>
                    </ModalHeader>
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

export default SignOutModal