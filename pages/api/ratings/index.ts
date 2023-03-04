// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { insertRating } from '@/db'
import { Rating } from '@/models/ratings'

type PutResponse = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PutResponse>
) {
    const { method } = req

    switch (method) {
        case 'PUT':
                try {
                    // add rating to db
                    const rating = req.body as Rating;
                    await insertRating(rating);
                    res.status(200).json({ message: 'Success!' });
                } catch (error) {
                    res.status(500).json({ message: (error as Error).message })
                }
    
                break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
