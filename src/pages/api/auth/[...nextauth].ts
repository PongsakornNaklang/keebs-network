import NextAuth, { NextAuthOptions, User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

// import bcrypt from "bcrypt";
import clientPromise from "../../../lib/mongodb";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

export const authOptions: NextAuthOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials) {
                    return null
                }

                const client = await clientPromise;
                const usersCollection = client
                    .db("Keebs_Network")
                    .collection("users");
                const email = credentials.email.toLowerCase();
                const password = credentials.password
                const user = await usersCollection.findOne({ email });
                if (!user) {
                    throw new Error("User does not exist.");
                }

                verifyCredentials(password, user)
                const token = generateToken()
                await saveTokenToMongoDB(token, user);

                const userData = {
                    id: user._id.toString(),
                    user: user,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                }

                return userData as any
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        // ...add more providers here
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
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

async function verifyCredentials(password: string, user: any): Promise<boolean> {
    // const passwordIsValid = await bcrypt.compare(
    //     password!,
    //     user?.password
    // );

    const passwordIsValid = password === user?.password

    if (!passwordIsValid) {
        throw new Error("Invalid credentials");
    }
    return true;
}

function generateToken(): string {
    const token = uuidv4();
    return token;
}

async function saveTokenToMongoDB(token: string, user: any): Promise<void> {
    // Implement your own logic to save the token to MongoDB or any other database
    const client = new MongoClient(process.env.MONGODB_URI ?? "");
    await client.connect();
    const db = client.db("Keebs_Network");
    const tokens = db.collection('tokens');
    await tokens.insertOne({ token, userId: user._id.toString() });
    client.close();
}