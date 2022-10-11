import { useHttp } from '@hooks/http.hook';
import { Product } from '@pages/Product/components/MainContent/MainContent';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ProductState {
  product: Product;
  singleProductLoadingStatus: string;
}

const initialState = {
  product: {},
  singleProductLoadingStatus: 'idle',
} as ProductState;

export const fetchSingleProduct = createAsyncThunk('product/fetchSingleProduct', async (id: string | number) => {
  const { request } = useHttp();
  const response = await request(`https://fakestoreapi.com/products/${id}`);
  return response;
});

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
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.singleProductLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = singleProductSlice;

export default reducer;
