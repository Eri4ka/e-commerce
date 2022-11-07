import { useEffect, memo } from 'react';

import { useAppDispatch } from '@myredux/hooks';
import './AccountOrders.scss';
import { fetchOrders } from '@myredux/slices/orderSlice';

import AccountOrdersList from './components/AccountOrdersList';

type AccountOrdersProps = {
  id: string;
  activeTab: string;
};

const AccountOrders: React.FC<AccountOrdersProps> = memo(({ id, activeTab }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return id === activeTab ? (
    <div className='orders'>
      <h2 className='orders__head'>Orders</h2>
      <AccountOrdersList />
    </div>
  ) : null;
});

export default AccountOrders;
