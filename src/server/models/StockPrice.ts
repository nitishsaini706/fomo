import mongoose from 'mongoose';

const stockPriceSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const StockPrice = mongoose.models.StockPrice || mongoose.model('StockPrice', stockPriceSchema);

export default StockPrice;
