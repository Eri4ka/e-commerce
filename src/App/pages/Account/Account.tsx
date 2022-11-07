import { useState } from 'react';

import { useAppSelector } from '@myredux/hooks';

import './Account.scss';

import AccountItem from './components/AccountItem';
import AccountOrders from './components/AccountOrders';
import AccountProfile from './components/AccountProfile';

const Account = () => {
  const user = useAppSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className='account'>
      <nav className='account-nav'>
        <ul className='account-nav__list'>
          <AccountItem title='Profile' id='profile' activeTab={activeTab} setActiveTab={setActiveTab} />
          <AccountItem title='Orders' id='orders' activeTab={activeTab} setActiveTab={setActiveTab} />
        </ul>
      </nav>
      <div className='account-content'>
        <AccountProfile id='profile' activeTab={activeTab} user={user} />
        <AccountOrders id='orders' activeTab={activeTab} user={user} />
      </div>
    </div>
  );
};

export default Account;
