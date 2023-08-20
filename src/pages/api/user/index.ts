
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { getToken } from 'next-auth/jwt';

export interface IUsers {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}

const secret = process.env.NEXTAUTH_SECRET

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret })
    // console.log(req);

    if (!token) {
        res.status(401).end()
        return
    }

    const { method, body } = req;
    if (method === "PATCH") {
        try {
            const { email, firstName, lastName, username } = body;

            const client = await clientPromise;
            const db = client.db('Keebs_Network');
            const usersCollection = db.collection('users');

            const result = await usersCollection.updateOne(
                { email },
                { $set: { firstName, lastName, username } }
            );

            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'User updated successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}