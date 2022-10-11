import { useHttp } from '@hooks/http.hook';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const initialState = {
  category: [],
  categoryLoadingStatus: 'idle',
  activeFilter: '',
};

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const { request } = useHttp();
  const response = await request('https://fakestoreapi.com/products/categories');
  return response.map((value: string, key: number) => {
    return { key, value };
  });
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    filtersChanged: (state, action) => {
      if (state.activeFilter === action.payload.value) {
        state.activeFilter = '';
      } else {
        state.activeFilter = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoryLoadingStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoryLoadingStatus = 'idle';
        state.category = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoryLoadingStatus = 'loading';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = categorySlice;
export default reducer;

export const categorySelector = createSelector(
  (state: RootState) => state.category.category,
  (items) => items,
);
export const { filtersChanged } = actions;
