import { useHttp } from '@hooks/http.hook';
import { RootState } from '@myredux/store';
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

const relatedProductsAdapter = createEntityAdapter({});

const initialState = relatedProductsAdapter.getInitialState({
  relatedProductsLoadingStatus: 'idle',
});

export const fetchRelatedProducts = createAsyncThunk(
  'product/fetchRelatedProduct',
  async (category: string) => {
    const { request } = useHttp();
    return await request(
      `https://fakestoreapi.com/products/category/${category}`
    );
  }
);

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
        relatedProductsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchRelatedProducts.rejected, (state) => {
        state.relatedProductsLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = relatedProductsSlice;
export default reducer;

const { selectAll } = relatedProductsAdapter.getSelectors(
  (state: RootState) => state.relatedProducts
);

export const relatedProductsSelector = createSelector(
  (state: RootState) => state.product.ids,
  selectAll,
  (product, related) => {
    return related.filter((elem: any) => {
      return elem.id !== product[0];
    });
  }
);
