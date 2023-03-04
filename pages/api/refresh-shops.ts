// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import fetchCoffeeShops from '@/services/yelp'
import {insertShops} from '@/db'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        // fetch shops from Yelp and refresh DB
        const shops = await fetchCoffeeShops();
        await insertShops(shops);
        res.status(200).json({ message: `Successfully added ${shops.length} shops!` });
      } catch (error) {
        res.status(500).json({ message: (error as Error).message })
      }

      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
