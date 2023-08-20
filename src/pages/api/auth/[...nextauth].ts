import NextAuth, { NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

import clientPromise from "../../../lib/mongodb";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { IUser } from "../../../../types/next-auth";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
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

                const userData: IUser = {
                    id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.image,
                    password: user.password,
                    type: "credentials"
                }

                const data: User = {
                    user: userData,
                    id: userData.id,
                    token: {
                        token: token,
                        type: "credentials",
                        expires_at: ""
                    },
                    email: userData.email,
                    image: userData.image,
                    name: userData.username
                }

                return data
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
        // ...add more providers here
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async signIn({ account, profile }: any) {
            if (account?.provider === "google" && profile) {
                console.log(profile);
                try {
                    const client = await clientPromise;
                    const db = client.db('Keebs_Network');
                    const usersCollection = db.collection('users');

                    const alreadyUser = await usersCollection.findOne({
                        $or: [
                            { email: profile.email },
                        ]
                    });
                    if (alreadyUser) {
                        return true
                    }

                    const user: Partial<IUser> = {
                        email: profile.email ?? "",
                        firstName: profile?.given_name,
                        lastName: profile?.family_name,
                        username: profile.email?.split("@gmail.com")[0] ?? "",
                        image: profile?.picture
                    }

                    const result = await usersCollection.insertOne(user);
                    if (!result) throw new Error('Create User failed');

                    return true
                } catch (error: any) {
                    return false
                }
            }

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
            console.log(session, token);
            if (token.user && token.accessToken) {
                token.user.password = ""
                session.user = token.user
                session.accessToken = token.accessToken
            } else {
                const client = await clientPromise;
                const db = client.db('Keebs_Network');
                const usersCollection = db.collection('users');

                const user: any = await usersCollection.findOne({ email: token.email });
                user.type = "google"
                session.user = user
                session.accessToken = token.accessToken
            }

            return session
        }
    }
}
export default NextAuth(authOptions)

async function verifyCredentials(password: string, user: any): Promise<boolean> {
    const passwordIsValid = await bcrypt.compare(password, user?.password)

    // const passwordIsValid = password === user?.password

    if (!passwordIsValid) {
        // throw new Error("Invalid credentials");
        return false
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