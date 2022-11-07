import { memo } from 'react';

import { Bucket } from '@myredux/slices/orderSlice';

import AccountOrdersBlock from '../AccountOrdersBlock';
import AccountOrdersSlider from '../AccountOrdersSlider';

const AccountOrdersItem = memo(({ order }: { order: Bucket }) => {
  const { id, date, sum, firstName, lastName, email, phone, city, street, number, zipcode, delivery, payment, products } = order;
  const dateString = date.toString().slice(0, -5).replace(/T/gi, ' ');

  return (
    <li className='orders-item'>
      <div className='orders-item__head'>
        <div className='orders-item__left'>
          <div className='orders-item__number'>{`№ ${id}`}</div>
          <div className='orders-item__date'>{dateString}</div>
        </div>
        <div className='orders-item__right'>
          Sum:
          <span className='orders-item__sum'> {sum}</span>
        </div>
      </div>
      <div className='orders-item__content'>
        <AccountOrdersBlock label='First Name' value={firstName} />
        <AccountOrdersBlock label='Last Name' value={lastName} />
        <AccountOrdersBlock label='E-mail' value={email} />
        <AccountOrdersBlock label='Phone' value={phone} />
      </div>
      <div className='orders-item__content'>
        <AccountOrdersBlock label='City' value={city} />
        <AccountOrdersBlock label='Street' value={street} />
        <AccountOrdersBlock label='Number' value={number} />
        <AccountOrdersBlock label='Zipcode' value={zipcode} />
      </div>
      <div className='orders-item__content'>
        <AccountOrdersBlock label='Delivery type' value={delivery} />
        <AccountOrdersBlock label='Payment type' value={payment} />
      </div>
      <AccountOrdersSlider products={products} />
    </li>
  );
});

export default AccountOrdersItem;
