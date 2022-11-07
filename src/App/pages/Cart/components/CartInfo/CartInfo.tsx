import { memo } from 'react';

interface ICartInfo {
  count: string | number;
  title: string;
}

const CartInfo: React.FC<ICartInfo> = memo(({ count, title }) => {
  return (
    <div className='cart-info__wrapper'>
      <span className='cart-info__title'>{title}</span>
      <span className='cart-info__count'>{count}</span>
    </div>
  );
});

export default CartInfo;
