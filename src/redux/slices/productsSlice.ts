import { useHttp } from '@hooks/http.hook';
import { ITEMS_PER_PAGE } from '@lib/constants';
import { Product } from '@pages/Product/components/MainContent/MainContent';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

import { RootState, LoadingStatus } from '../store';

interface ProductsState {
  products: Product[];
  productsLoadingStatue: LoadingStatus;
  searchValue: string;
}

const initialState = {
  products: [],
  productsLoadingStatue: 'idle',
  searchValue: '',
} as ProductsState;

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (page: number, { getState }) => {
  const { request } = useHttp();
  const state = getState() as RootState;
  if (state.products.searchValue === '') {
    return await request(`https://fakestoreapi.com/products?limit=${ITEMS_PER_PAGE * page}`);
  } else {
    return await request('https://fakestoreapi.com/products');
  }
});

export const fetchCategoryProducts = createAsyncThunk(
  'products/fetchCategoryProducts',
  async (data: { value: string; page: number }, { getState }) => {
    const { value, page } = data;
    const state = getState() as RootState;
    const { request } = useHttp();
    if (state.products.searchValue === '') {
      return await request(`https://fakestoreapi.com/products/category/${value}?limit=${ITEMS_PER_PAGE * page}`);
    } else {
      return await request(`https://fakestoreapi.com/products/category/${value}`);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoadingStatue = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoadingStatue = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.productsLoadingStatue = 'error';
      });
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.productsLoadingStatue = 'loading';
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.productsLoadingStatue = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchCategoryProducts.rejected, (state) => {
        state.productsLoadingStatue = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = productsSlice;

export const productsSelector = createSelector(
  (state: RootState) => state.products.searchValue,
  (state: RootState) => state.products.products,
  (searchValue, products) => {
    if (searchValue) {
      return products.filter((item: Product) => {
        return item.title.toLowerCase().includes(searchValue);
      });
    } else {
      return products;
    }
  },
);

export const totalPagesSelector = createSelector(
  (state: RootState) => state.products.searchValue,
  (state: RootState) => state.category.activeFilter,
  (state: RootState) => state.products.products.length,
  (searchValue, activeFilter, prodsCount) => {
    if (searchValue.length > 0) {
      return prodsCount;
    } else {
      switch (activeFilter) {
        case 'electronics':
          return 6;
        case 'jewelery':
          return 4;
        case "men's clothing":
          return 4;
        case "women's clothing":
          return 4;
        default:
          return 20;
      }
    }
  },
);

export default reducer;
export const { getSearchValue } = actions;
