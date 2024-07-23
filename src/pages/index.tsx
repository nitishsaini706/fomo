import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../store';
import { setStocks, selectStocks, selectSelectedStock } from '../store/stockSlice';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const stocks = useSelector(selectStocks);
  const selectedStock = useSelector(selectSelectedStock);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/stocks?symbol=${selectedStock}`);
      console.log('response.d', response.data)
      dispatch(setStocks(response.data));
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [selectedStock, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Stock Price Tracker</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => dispatch(selectSelectedStock('BTC'))}
      >
        Change Stock/Crypto
      </button>
      <table className="min-w-full bg-gray-600">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Symbol</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock:any) => (
            <tr key={stock.timestamp}>
              <td className="py-2 px-4 border-b">{stock.symbol}</td>
              <td className="py-2 px-4 border-b">{stock.price}</td>
              <td className="py-2 px-4 border-b">{new Date(stock.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default wrapper.withRedux(Home);
