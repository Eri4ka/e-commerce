import { useHttp } from '@hooks/http.hook';
import { RootState, LoadingStatus } from '@myredux/store';
import { Product } from '@pages/Product/components/MainContent/MainContent';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

interface RelatedProductsState {
  relatedProducts: Product[];
  relatedProductsLoadingStatus: LoadingStatus;
}

const initialState = {
  relatedProducts: [],
  relatedProductsLoadingStatus: 'idle',
} as RelatedProductsState;

export const fetchRelatedProducts = createAsyncThunk('product/fetchRelatedProduct', async (category: string) => {
  const { request } = useHttp();
  return await request(`https://fakestoreapi.com/products/category/${category}`);
});

const relatedProductsSlice = createSlice({
  name: 'relatedProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.relatedProductsLoadingStatus = 'loading';
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProductsLoadingStatus = 'idle';
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state) => {
        state.relatedProductsLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = relatedProductsSlice;
export default reducer;

export const relatedProductsSelector = createSelector(
  (state: RootState) => state.product.product,
  (state: RootState) => state.relatedProducts.relatedProducts,
  (product, related) => {
    return related.filter((elem: any) => {
      return elem.id !== product.id;
    });
  },
);
