import { useToggle } from '@hooks/useToggle';
import { IProductCart } from '@myredux/slices/cartSlice';
import cl from 'classnames';

import AccountProductsList from '../AccountProductsList';

const AccountOrdersSlider = ({ products }: { products: IProductCart[] }) => {
  const { toggle, onHandleToggle } = useToggle();

  return (
    <div className='orders-slider'>
      <span className={cl('orders-slider__head', toggle ? 'orders-slider_show' : 'orders-slider_hide')} onClick={onHandleToggle}>
        Products
      </span>
      {toggle && <AccountProductsList products={products} />}
    </div>
  );
};

export default AccountOrdersSlider;
