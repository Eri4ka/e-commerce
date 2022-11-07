import { memo } from 'react';

import { useAppSelector } from '@myredux/hooks';
import { Bucket } from '@myredux/slices/orderSlice';

import AccountOrdersItem from '../AccountOrdersItem';

const AccountOrdersList = memo(() => {
  const orders = useAppSelector((state) => state.orders.orders);

  if (orders.length === 0) {
    return null;
  }

  const renderOrders = (arr: Bucket[]) => {
    return arr.map((item) => {
      return <AccountOrdersItem key={item.id} order={item} />;
    });
  };

  const elements = renderOrders(orders);

  return (
    <div className='orders__content'>
      <ul className='orders__list'>{elements}</ul>
    </div>
  );
});

export default AccountOrdersList;
