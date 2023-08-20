import { IUsers as IUsersForSignUp } from "@/pages/api/signup";
import { IUsers } from "@/pages/api/user";
import { useSession } from "next-auth/react";

export const postSignup = async (data: IUsersForSignUp) => {
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
};

export const updateProfile = async (payload: Partial<IUsers>) => {
    const session = useSession();

    const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.data?.accessToken.token}`
        },
        body: JSON.stringify(payload)
    });

    return response.json();
};