import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import StockPrice from './models/StockPrice';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI??"mongodb://localhost:27017/stock");
  console.log('connected')
}

const pollStockPrices = async () => {
  const symbols = ['$'];
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`; 
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'cqfleq9r01qle0e3v7e0cqfleq9r01qle0e3v7eg'
    }
  };
  for (const symbol of symbols) {
    try {
      const response = await axios.get(apiUrl,options);
      console.log("api",response.data)
      const priceData = response.data;
      const newPrice = new StockPrice({
        symbol,
        price: priceData[symbol].usd,
        timestamp: new Date(),
      });
      await newPrice.save();
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
    }
  }
};

setInterval(pollStockPrices, 5000);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
