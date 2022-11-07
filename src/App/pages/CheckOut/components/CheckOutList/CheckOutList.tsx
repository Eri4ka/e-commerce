import { memo } from 'react';

import { IProductCart } from '@myredux/slices/cartSlice';
import CartItem from '@pages/Cart/components/CartItem';

const CheckOutList = memo(({ items }: { items: IProductCart[] }) => {
  const renderItems = (arr: IProductCart[]) => {
    if (arr.length === 0) {
      return null;
    }

    return arr.map(({ id, title, image, price }) => {
      return <CartItem key={id} id={id} title={title} image={image} price={price} />;
    });
  };

  const elements = renderItems(items);

  return <ul className='checkout__list'>{elements}</ul>;
});

export default CheckOutList;
