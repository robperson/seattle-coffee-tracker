// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getAllShops } from '@/db'
import { Shop } from '@/models/shops'

type Response = {
    shops: Shop[]
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                // fetch shops from mongo
                const shops = await getAllShops();
                res.status(200).json({ shops: shops, message: 'Success!' });
            } catch (error) {
                res.status(500).json({ shops: [], message: (error as Error).message })
            }

            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
