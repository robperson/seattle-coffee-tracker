// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import fetchCoffeeShops from '@/services/yelp'

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
      // fetch shops from Yelp and refresh DB
      await fetchCoffeeShops();
      res.status(200).json({ message: 'Success!' });
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
