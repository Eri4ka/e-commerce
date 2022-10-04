import { configureStore } from '@reduxjs/toolkit';

import category from './slices/categorySlice';
import products from './slices/productsSlice';
import relatedProducts from './slices/relatedProductsSlice';
import product from './slices/singleProductSlice';

const store = configureStore({
  reducer: { products, category, product, relatedProducts },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
