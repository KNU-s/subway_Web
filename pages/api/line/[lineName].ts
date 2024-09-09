import { getLineInfo } from '@/services/lineInfo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { lineName } = req.query;
  if (typeof lineName !== 'string') {
    return res.status(400).json({ message: 'Invalid line name' });
  }
  try {
    const allLines = await getLineInfo();
    const line = allLines.find((line) => line.lineFullName === lineName);
    if (line) {
      res.status(200).json(line);
    } else {
      res.status(404).json({ message: 'Line not found' });
    }
  } catch (error) {
    console.log(`Failed to get line by name (${lineName})`, error);
    res.status(500).json({ message: 'Failed to get Line Data' });
  }
}
