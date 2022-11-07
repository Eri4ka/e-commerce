import { api } from '@myredux/api';
import { configureStore, Middleware } from '@reduxjs/toolkit';

import cart from './slices/cartSlice';
import category from './slices/categorySlice';
import orders from './slices/orderSlice';
import products from './slices/productsSlice';
import relatedProducts from './slices/relatedProductsSlice';
import product from './slices/singleProductSlice';
import user, { addUser, logOut } from './slices/userSlice';

const authMiddleware: Middleware<{}> = () => (next) => (action) => {
  if (addUser.match(action)) {
    localStorage.setItem('userId', action.payload.id);
  } else if (logOut.match(action)) {
    localStorage.removeItem('userId');
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    products,
    category,
    product,
    relatedProducts,
    user,
    cart,
    orders,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware, api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type LoadingStatus = 'idle' | 'loading' | 'error' | '';
