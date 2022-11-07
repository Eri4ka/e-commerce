import { useEffect, memo } from 'react';

import { IUser } from '@myredux/api';
import { useAppDispatch } from '@myredux/hooks';
import './AccountOrders.scss';
import { fetchOrders } from '@myredux/slices/orderSlice';

import AccountOrdersList from './components/AccountOrdersList';

type AccountOrdersProps = {
  id: string;
  activeTab: string;
  user: IUser | null;
};

const AccountOrders: React.FC<AccountOrdersProps> = memo(({ user, id, activeTab }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return id === activeTab ? (
    <div className='orders'>
      <h2 className='orders__head'>Orders</h2>
      <AccountOrdersList />
    </div>
  ) : null;
});

export default AccountOrders;
