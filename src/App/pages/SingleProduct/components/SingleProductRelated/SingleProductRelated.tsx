import React, { memo } from 'react';

import './SingleProductRelated.scss';
import { Card } from '@components/Card';
import { Loader, LoaderSize } from '@components/Loader';
import { useAppDispatch, useAppSelector } from '@myredux/hooks';
import { relatedProductsSelector, fetchRelatedProducts } from '@myredux/slices/relatedProductsSlice';
import cl from 'classnames';
import { Product } from 'src/App/pages/Product/components/MainContent/MainContent';

const SingleProductRelated: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const relatedProducts = useAppSelector(relatedProductsSelector);
  const singleProduct = useAppSelector((state) => state.product.product);
  const loading = useAppSelector((state) => state.relatedProducts.relatedProductsLoadingStatus);

  React.useEffect(() => {
    dispatch(fetchRelatedProducts(singleProduct.category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleProduct]);

  const renderProducts = () => {
    return (
      <div className={cl('main-goods')}>
        <div className={cl('main-goods__grid')}>
          {relatedProducts.map((item: Product) => {
            return (
              <Card
                id={item.id}
                key={item.id}
                category={item.category}
                image={item.image}
                title={item.title}
                subtitle={item.description}
                content={'$' + item.price}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderedProducts = loading === 'idle' && renderProducts();
  const loader = loading === 'loading' && <Loader size={LoaderSize.l} className={'loader'} />;

  return (
    <div className={cl('related')}>
      <div className={cl('related__title')}>Related Items</div>
      {renderedProducts}
      {loader}
    </div>
  );
});

export default SingleProductRelated;
