import { IUser } from '@myredux/api';
import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => initialState,
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export default reducer;
export const { logOut, addUser } = actions;
