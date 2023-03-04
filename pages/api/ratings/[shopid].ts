// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getRatingsForShop } from '@/db'
import { Rating } from '@/models/ratings'

type GetResponse = {
    ratings: Rating[]
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetResponse>
) {
    const { method } = req
    const { shopid } = req.query

    switch (method) {
        case 'GET':
            try {
                // fetch shops from Yelp and refresh DB
                const ratings = await getRatingsForShop(shopid as string);
                res.status(200).json({ ratings: ratings, message: 'Success!' });
            } catch (error) {
                res.status(500).json({ ratings: [], message: (error as Error).message })
            }

            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
