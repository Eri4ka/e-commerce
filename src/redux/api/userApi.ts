import { api, IUser, IResponse, IUserLogin } from '@myredux/api';
import { addUser } from '@myredux/slices/userSlice';
import { RootState } from '@myredux/store';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<IUser[], string>({
      async queryFn(_args, { dispatch }, _extraOptions, fetchWithBQ) {
        const findUser = await fetchWithBQ(`/users?id=${_args}`);
        const data = findUser.data as IUser[];
        dispatch(addUser(data[0]));
        return { data };
      },
    }),
    registerUser: build.query<IResponse, IUser>({
      async queryFn(args, { dispatch }, _extraOptions, fetchWithBQ) {
        const findUser = await fetchWithBQ(`/users?email=${args.email}&pass=${args.pass}`);
        const data = findUser.data as IUser[];

        if (data.length > 0) {
          return { data: { status: 'error', data, message: 'User already registered' } };
        } else {
          const setUser = await fetchWithBQ({
            url: '/users',
            method: 'POST',
            body: args,
          });

          const data = setUser.data as IUser;
          dispatch(addUser(data));
          return { data: { status: 'succsess', data } };
        }
      },
    }),
    loginUser: build.query<IResponse, IUserLogin>({
      async queryFn(args, { dispatch }, _extraOptions, fetchWithBQ) {
        const findUser = await fetchWithBQ(`/users?email=${args.email}&pass=${args.pass}`);
        const data = findUser.data as IUser[];

        if (data.length === 0) {
          return { data: { status: 'error', data, message: 'User not registered' } };
        } else {
          dispatch(addUser(data[0]));
          return { data: { status: 'succsess', data: data[0] } };
        }
      },
    }),
    updateUser: build.mutation({
      async queryFn(args, { getState, dispatch }, _extraOptions, fetchWithBQ) {
        const state = getState() as RootState;
        const customerId = state.user.user?.id;

        const result = await fetchWithBQ({
          url: `/users/${customerId}`,
          method: 'PATCH',
          body: args,
        });

        const data = result.data as IUser;
        dispatch(addUser(data));
        return { data };
      },
    }),
  }),
});

export const { useLazyGetUserQuery, useLazyRegisterUserQuery, useLazyLoginUserQuery, useUpdateUserMutation } = userApi;
