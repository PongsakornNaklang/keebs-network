import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SignInModal from "@/component/auth/signIn-modal";

const SignInPage = () => {
    const router = useRouter();

    const onCloseModal = () => {
        router.back();
        router.back();
    };

    return <SignInModal isOpen={true} onClose={onCloseModal} />;
};

export default SignInPage;