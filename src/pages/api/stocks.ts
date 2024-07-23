import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import StockPrice from '../../server/models/StockPrice';
import dotenv from 'dotenv';

dotenv.config();

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI ?? 'mongodb://localhost:27017/stock', {
    serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
}

const server = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('Request received with query:', req.query);
    const { symbol } = req.query;

    if (!symbol) {
      return res.status(400).json({ error: 'Symbol is required' });
    }

    const stockData = await StockPrice.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.status(200).json(stockData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default server;
