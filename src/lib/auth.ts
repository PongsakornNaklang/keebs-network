import { IUsers as IUsersForSignUp } from "@/pages/api/signup";
import { IUsers } from "@/pages/api/user";
import axios from "axios";
import { useSession } from "next-auth/react";

export const postSignup = async (data: IUsersForSignUp) => {
    const response = await axios.post('/api/signup', data);
    return response
}

export const updateProfile = async (payload: Partial<IUsers>) => {
    const session = useSession()
    const response = await axios.patch('/api/user', payload, {
        headers: {
            Authorization: `Bearer ${session.data?.accessToken.token}`
        }
    })
    return response
}