import NextAuth from "next-auth"
interface IUser {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    image: string
    type: string
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