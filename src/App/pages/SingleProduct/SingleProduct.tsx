import React from 'react';

import LoadedContent from '@components/LoadedContent';
import { useAppDispatch, useAppSelector } from '@myredux/hooks';
import { fetchSingleProduct } from '@myredux/slices/singleProductSlice';
import { useParams } from 'react-router-dom';

import SingleProductCard from './components/SingleProductCard';

const SingleProduct = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state) => state.product.singleProductLoadingStatus
  );

  React.useEffect(() => {
    dispatch(fetchSingleProduct(id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <LoadedContent loading={loading} Component={SingleProductCard} />;
};

export default SingleProduct;
