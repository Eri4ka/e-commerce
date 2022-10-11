import { BASE_URL as baseUrl } from '@lib/constants';
import { api } from '@myredux/api';

export const bucketApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBuckets: build.query<any, void>({
      query: () => baseUrl + '/carts',
    }),
    addBucket: build.mutation({
      query: (bucket) => ({
        url: baseUrl + '/carts',
        method: 'POST',
        body: bucket,
      }),
    }),
  }),
});

export const { useGetBucketsQuery, useAddBucketMutation } = bucketApi;
