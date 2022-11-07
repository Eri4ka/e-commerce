import { useState } from 'react';

import './Account.scss';

import AccountItem from './components/AccountItem';
import AccountOrders from './components/AccountOrders';
import AccountProfile from './components/AccountProfile';

const Account = () => {
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
        <AccountProfile id='profile' activeTab={activeTab} />
        <AccountOrders id='orders' activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Account;
