import { useHttp } from '@hooks/http.hook';
import { BASE_URL } from '@lib/constants';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

import { RootState, LoadingStatus } from '../store';

export interface IProductCart {
  id: number;
  image: string;
  title: string;
  price: number;
}

interface Cart {
  userId: number;
  products: IProductCart[];
  id: number;
}

interface CartState {
  cart: Cart[];
  cartLoadingStatus: LoadingStatus;
  addCartLoadingStatus: LoadingStatus;
  deleteCartLoadingStatus: LoadingStatus;
}

const initialState = {
  cart: [],
  cartLoadingStatus: 'idle',
  addCartLoadingStatus: '',
  deleteCartLoadingStatus: 'idle',
} as CartState;

export const fetchCart = createAsyncThunk('cart/fetchCart', async (arg, { getState }) => {
  const { request } = useHttp();
  const state = getState() as RootState;
  const user = state.user.user;

  return await request(`${BASE_URL}/carts?userId=${user?.id}`);
});

export const fetchAddCart = createAsyncThunk(
  'cart/fetchAddCart',
  async (data: { id: number; image: string; title: string; price: number }, { getState }) => {
    const { id, image, title, price } = data;
    const { request } = useHttp();
    const state = getState() as RootState;
    const user = state.user.user;
    const cart = state.cart.cart[0] as Cart;

    if (!cart) {
      return await request(`${BASE_URL}/carts`, 'POST', {
        userId: user?.id,
        products: [{ id, title, image, price }],
      });
    } else {
      return await request(`${BASE_URL}/carts/${cart.id}`, 'PATCH', {
        products: [...cart.products, { id, title, image, price }],
      });
    }
  },
);

export const fetchDeleteSingleCart = createAsyncThunk('cart/fetchDeleteSingleCart', async (id: number, { getState }) => {
  const { request } = useHttp();
  const state = getState() as RootState;
  const cart = state.cart.cart[0] as Cart;
  return await request(`${BASE_URL}/carts/${cart.id}`, 'PATCH', {
    products: cart.products.filter((item: IProductCart) => item.id !== id),
  });
});

export const fetchDeleteCart = createAsyncThunk('cart/fetchDeleteCart', async (args, { getState }) => {
  const { request } = useHttp();
  const state = getState() as RootState;
  const cart = state.cart.cart[0] as Cart;
  return await request(`${BASE_URL}/carts/${cart.id}`, 'DELETE');
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.cartLoadingStatus = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartLoadingStatus = 'idle';
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.cartLoadingStatus = 'error';
      });
    builder
      .addCase(fetchAddCart.pending, (state) => {
        state.addCartLoadingStatus = 'loading';
      })
      .addCase(fetchAddCart.fulfilled, (state) => {
        state.addCartLoadingStatus = 'idle';
      })
      .addCase(fetchAddCart.rejected, (state) => {
        state.addCartLoadingStatus = 'error';
      });
    builder.addCase(fetchDeleteSingleCart.fulfilled, (state, action) => {
      state.cart = [action.payload];
    });
    builder
      .addCase(fetchDeleteCart.pending, (state) => {
        state.deleteCartLoadingStatus = 'loading';
      })
      .addCase(fetchDeleteCart.fulfilled, (state, action) => {
        state.deleteCartLoadingStatus = 'idle';
        state.cart = action.payload;
      })
      .addCase(fetchDeleteCart.rejected, (state) => {
        state.deleteCartLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = cartSlice;

export const cartSelector = createSelector(
  (state: RootState) => state.cart.cart[0]?.products,
  (cart) => Array.from(new Set(cart?.map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item)),
);

export const totalSelector = createSelector(cartSelector, (cart) => {
  const sum = cart.reduce((acc, i) => acc + i.price, 0).toFixed(2);
  const total = cart.length;
  return { sum, total };
});

export default reducer;
