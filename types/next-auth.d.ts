import NextAuth from "next-auth"
interface IUser {
    id: string
    name: string
    email: string
    password: string
    user: string
    image: string
}

interface IToken {
    type: string
    token: string
    // expires_at: string
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