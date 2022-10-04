import React from 'react';

import { Button, ButtonColor } from '@components/Button';
import LoadedContent from '@components/LoadedContent';
import { useAppSelector } from '@myredux/hooks';
import { selectAll } from '@myredux/slices/singleProductSlice';
import { Product } from '@pages/Product/components/MainContent/MainContent';
import cl from 'classnames';

import './SingleProductCard.scss';
import SingleProductRelated from '../SingleProductRelated';
import ProductCardDescription from './ProductCardDescription';

const SingleProductCard: React.FC = React.memo(() => {
  const singleProduct = useAppSelector(selectAll) as Product[];

  if (singleProduct.length === 0) {
    return null;
  }

  return (
    <div className={cl('product')}>
      <div className={cl('product-card')}>
        <div>
          <img
            className={cl('product-card__image')}
            src={singleProduct[0].image}
            alt=""
          />
        </div>
        <div className={cl('product-card__meta')}>
          <div className={cl('product-card__title')}>
            {singleProduct[0].title}
          </div>
          <ProductCardDescription />
          <div className={cl('product-card__price')}>
            {'$' + singleProduct[0].price}
          </div>
          <div className={cl('product-card__buttons')}>
            <Button
              className={cl('product-card__button')}
              color={ButtonColor.primary}
            >
              Buy Now
            </Button>
            <Button
              className={cl('product-card__button')}
              color={ButtonColor.none}
            >
              Add to Chart
            </Button>
          </div>
        </div>
      </div>
      <LoadedContent loading={'idle'} Component={SingleProductRelated} />
    </div>
  );
});

export default SingleProductCard;
