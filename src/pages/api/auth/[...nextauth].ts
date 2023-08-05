import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials as any
                const res = await fetch(`${process.env.API_URL}/authentication/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: username, password: password })
                })

                const user = await res.json()
                if (res.ok && user) {
                    return user
                } else {
                    return null
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        // ...add more providers here
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = user.token
                token.user = user.user
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            session.accessToken = token.accessToken
            return session
        }
    }
}
export default NextAuth(authOptions)