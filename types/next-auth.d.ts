import NextAuth from "next-auth"
interface IUser {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: any
    roleId: string
    active: number
    createdAt: string
    updatedAt: string
}

interface IToken {
    type: string
    token: string
    expires_at: string
}

declare module "next-auth" {
    interface User {
        user: IUser
        token: IToken
    }

    interface Session {
        user: IUser
        accessToken: IToken
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: IUser
        accessToken: IToken
    }
}