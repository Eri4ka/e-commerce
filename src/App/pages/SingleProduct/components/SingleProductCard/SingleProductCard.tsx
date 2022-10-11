import { memo } from 'react';

import { Button, ButtonColor } from '@components/Button';
import OrderForm from '@components/Form/OrderForm';
import LoadedContent from '@components/LoadedContent';
import { useToggle } from '@hooks/useToggle';
import { useAppSelector } from '@myredux/hooks';
import cl from 'classnames';

import './SingleProductCard.scss';
import SingleProductRelated from '../SingleProductRelated';
import ProductCardDescription from './ProductCardDescription';

const SingleProductCard: React.FC = memo(() => {
  const singleProduct = useAppSelector((state) => state.product.product);
  const { toggle, onHandleToggle } = useToggle();

  if (Object.keys(singleProduct).length === 0) {
    return null;
  }

  console.log('dd');

  return (
    <div className={cl('product')}>
      <div className={cl('product-card')}>
        <div>
          <img className={cl('product-card__image')} src={singleProduct.image} alt='' />
        </div>
        <div className={cl('product-card__meta')}>
          <div className={cl('product-card__title')}>{singleProduct.title}</div>
          <ProductCardDescription />
          <div className={cl('product-card__price')}>{'$' + singleProduct.price}</div>
          <div className={cl('product-card__buttons')}>
            <Button className={cl('product-card__button')} color={ButtonColor.primary} onClick={onHandleToggle}>
              Buy Now
            </Button>
            <Button className={cl('product-card__button')} color={ButtonColor.none}>
              Add to Chart
            </Button>
          </div>
        </div>
      </div>
      <LoadedContent loading={'idle'} Component={SingleProductRelated} />
      <OrderForm onHandleToggle={onHandleToggle} toggle={toggle} />
    </div>
  );
});

export default SingleProductCard;
