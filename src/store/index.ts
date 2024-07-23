import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import stockReducer from './stockSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      stock: stockReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
