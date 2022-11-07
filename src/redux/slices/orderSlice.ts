import { useHttp } from '@hooks/http.hook';
import { BASE_URL } from '@lib/constants';
import { LoadingStatus, RootState } from '@myredux/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { IProductCart } from './cartSlice';

export interface Bucket {
  id?: number;
  userId?: number;
  date: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | number;
  city: string;
  street: string;
  number: string | number;
  zipcode: string | number;
  delivery: string;
  payment: string;
  products: IProductCart[];
  sum: string | number;
  total: number;
}

interface OrdersState {
  orders: Bucket[];
  ordersLoadingStatus: LoadingStatus;
  ordersAddLoadingStatus: LoadingStatus;
}

const initialState = {
  orders: [],
  ordersLoadingStatus: 'idle',
  ordersAddLoadingStatus: 'idle',
} as OrdersState;

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (args, { getState }) => {
  const { request } = useHttp();
  const state = getState() as RootState;
  const user = state.user.user;

  return await request(`${BASE_URL}/buckets?userId=${user?.id}`);
});

export const fetchAddOrder = createAsyncThunk('orders/fetchAddOrder', async (data: Bucket, { getState }) => {
  const { request } = useHttp();
  const state = getState() as RootState;
  const user = state.user.user;
  console.log(data);

  return await request(`${BASE_URL}/buckets`, 'POST', {
    userId: user ? user.id : nanoid(),
    ...data,
  });
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.ordersLoadingStatus = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersLoadingStatus = 'idle';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.ordersLoadingStatus = 'error';
      });
    builder
      .addCase(fetchAddOrder.pending, (state) => {
        state.ordersAddLoadingStatus = 'loading';
      })
      .addCase(fetchAddOrder.fulfilled, (state) => {
        state.ordersAddLoadingStatus = 'idle';
      })
      .addCase(fetchAddOrder.rejected, (state) => {
        state.ordersAddLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = ordersSlice;

export default reducer;
