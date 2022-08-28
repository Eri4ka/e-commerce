import React from 'react';

import { Button, ButtonColor } from '@components/Button/Button';
import cl from 'classnames';

import './SingleProductCard.scss';
import SingleProductRelated from '../SingleProductRelated';

type SingleProductCardProps = {
  product: any;
};

const SingleProductCard: React.FC<SingleProductCardProps> = React.memo(
  ({ product }) => {
    const [sliced, setSliced] = React.useState<boolean>(false);

    return (
      <div className={cl('product')}>
        <div className={cl('product-card')}>
          <div>
            <img
              className={cl('product-card__image')}
              src={product.image}
              alt=""
            />
          </div>
          <div className={cl('product-card__meta')}>
            <div className={cl('product-card__title')}>{product.title}</div>
            <div
              className={cl('product-card__description')}
              onClick={() => setSliced((sl) => !sl)}
            >
              {product.description && product.description.length > 190
                ? !sliced
                  ? product.description.slice(0, 190) + '... '
                  : product.description + ' '
                : product.description}
              {product.description && product.description.length > 190 ? (
                !sliced ? (
                  <span style={{ color: '#518581' }}>Read More</span>
                ) : (
                  <span style={{ color: '#518581' }}>Close</span>
                )
              ) : null}
            </div>
            <div className={cl('product-card__price')}>
              {'$' + product.price}
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

        <SingleProductRelated product={product} />
      </div>
    );
  }
);

export default SingleProductCard;
