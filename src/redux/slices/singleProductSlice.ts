import { useHttp } from '@hooks/http.hook';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { RootState } from '../store';

const singleProductAdapter = createEntityAdapter({});

const initialState = singleProductAdapter.getInitialState({
  singleProductLoadingStatus: 'idle',
});

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (id: string | number) => {
    const { request } = useHttp();
    const response = await request(`https://fakestoreapi.com/products/${id}`);
    return [response];
  }
);

const singleProductSlice = createSlice({
  name: 'product',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductLoadingStatus = 'loading';
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductLoadingStatus = 'idle';
        singleProductAdapter.setAll(state, action.payload);
      })
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.singleProductLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = singleProductSlice;

export default reducer;

export const { selectAll } = singleProductAdapter.getSelectors(
  (state: RootState) => state.product
);
