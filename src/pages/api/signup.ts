import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export interface IUsers {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export default async function signupHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    if (method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db('Keebs_Network');

        // Get the users collection
        const usersCollection = db.collection('users');

        // Check if user already exists by email or username
        const alreadyUser = await usersCollection.findOne({
            $or: [
                { email: body.email },
                { username: body.username }
            ]
        });

        if (alreadyUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Encrypt the password
        const saltRounds = 10; // Number of salt rounds for bcrypt hashing
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        // Replace plain text password with hashed password in the user object
        const userWithHashedPassword = { ...body, password: hashedPassword };

        // Insert the user into the collection
        const result = await usersCollection.insertOne(userWithHashedPassword);

        if (!result) {
            throw new Error('Create User failed');
        }

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error });
    }
}