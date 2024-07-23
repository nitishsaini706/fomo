import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  stocks: [],
  selectedStock: 'GOOG',
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStocks: (state, action) => {
      state.stocks = action.payload;
    },
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action,
      };
    });
  },
});

export const { setStocks, setSelectedStock } = stockSlice.actions;
export const selectStocks = (state:any) => state.stock.stocks;
export const selectSelectedStock = (state:any) => {console.log(state);state.stock.selectedStock};
export default stockSlice.reducer;
