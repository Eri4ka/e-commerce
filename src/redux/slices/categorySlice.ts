import { useHttp } from '@hooks/http.hook';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { RootState } from '../store';

const categoryAdapter = createEntityAdapter({
  selectId: (category: any) => category.key,
});
const initialState = categoryAdapter.getInitialState({
  categoryLoadingStatus: 'idle',
  activeFilter: '',
});

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const { request } = useHttp();
    const response = await request(
      'https://fakestoreapi.com/products/categories'
    );
    return response.map((value: string, key: number) => {
      return { key, value };
    });
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    filtersChanged: (state, action) => {
      // if (state.activeFilter.key === action.payload.key) {
      //   state.activeFilter = { key: null, value: '' };
      // } else {
      //   state.activeFilter = action.payload;
      // }
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
        categoryAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoryLoadingStatus = 'loading';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = categorySlice;
export default reducer;
const { selectAll } = categoryAdapter.getSelectors<RootState>(
  (state) => state.category
);

export const categorySelector = createSelector(selectAll, (items) => items);
export const { filtersChanged } = actions;
