import { getLineInfo } from '@/services/lineInfo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const lines = await getLineInfo();
    res.status(200).json(lines);
  } catch (error) {
    console.error('Error fetching line info:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}
