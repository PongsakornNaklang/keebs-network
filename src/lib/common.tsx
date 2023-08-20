import SignInModal from "@/component/auth/signIn-modal";
import { useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useEffect } from "react"

export const onPush = (path: Url) => {
    const router = useRouter()
    const { status } = useSession()
    const signInModal = useDisclosure();

    useEffect(() => {
        if (status === "unauthenticated") {
            signInModal.onOpen();
        }
    }, [status, signInModal]);

    if (status === "authenticated") {
        router.push(path)
    }

    return <SignInModal isOpen={signInModal.isOpen} onClose={signInModal.onClose} />

}