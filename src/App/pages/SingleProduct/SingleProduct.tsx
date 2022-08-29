import React from 'react';

import { Loader, LoaderSize } from '@components/Loader/Loader';
import { useHttp } from '@hooks/http.hook';
import { useParams } from 'react-router-dom';

import SingleProductCard from './components/SingleProductCard';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState({});
  const { loading, request } = useHttp();

  React.useEffect(() => {
    request(`https://fakestoreapi.com/products/${id}`).then(setProduct);
  }, [id, request]);

  return (
    <>
      {loading ? (
        <Loader size={LoaderSize.l} className={'loader'} />
      ) : (
        <SingleProductCard product={product} />
      )}
    </>
  );
};

export default SingleProduct;
