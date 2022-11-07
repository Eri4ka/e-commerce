import { IProductCart } from '@myredux/slices/cartSlice';

import AccountProductsItem from '../AccountProductsItem';

const AccountProductsList = ({ products }: { products: IProductCart[] }) => {
  return (
    <div className='orders-products'>
      <ul className='orders-products__list'>
        {products.map((item) => {
          return <AccountProductsItem key={item.id} product={item} />;
        })}
      </ul>
    </div>
  );
};

export default AccountProductsList;
