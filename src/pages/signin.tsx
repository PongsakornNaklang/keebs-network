import dynamic from "next/dynamic"
const SignInContainer = dynamic(() => import("@/component/auth/signInTemp"), { ssr: false });

const SignIn = () => {

    return (
        <>
            <SignInContainer />
        </>
    )
}

export default SignIn