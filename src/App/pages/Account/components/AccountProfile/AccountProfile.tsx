import { useCallback, useState } from 'react';

import './AccountProfile.scss';

import { Button } from '@components/Button';
import FieldForm from '@components/Form/FieldForm';
import { Loader, LoaderSize } from '@components/Loader';
import { useToggle } from '@hooks/useToggle';
import { IUser } from '@myredux/api';
import { useAppDispatch, useAppSelector } from '@myredux/hooks';
import { logOut } from '@myredux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

import AccountProfileField from './components/AccountProfileField';

type AccountProfileProps = {
  id: string;
  activeTab: string;
  user: IUser | null;
};

export interface IActiveField {
  id: string;
  title: string;
}

const AccountProfile: React.FC<AccountProfileProps> = ({ user, id, activeTab }) => {
  const dispatch = useAppDispatch();
  const [activeField, setActiveField] = useState<IActiveField>({ id: '', title: '' });
  const { toggle, onHandleToggle } = useToggle();
  const navigate = useNavigate();

  const onActiveField = useCallback((props: IActiveField) => {
    onHandleToggle();
    setActiveField(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onExit = () => {
    dispatch(logOut());
    navigate('/signin');
  };

  return id === activeTab ? (
    <div className='account-content__profile'>
      <h2 className='account-content__head'>Profile</h2>
      {!user ? (
        <Loader size={LoaderSize.l} />
      ) : (
        <>
          <AccountProfileField id='firstName' title='First name' text={user.firstName} onActiveField={onActiveField} />
          <AccountProfileField id='lastName' title='Last name' text={user.lastName} onActiveField={onActiveField} />
          <AccountProfileField id='email' title='E-mail' text={user.email} onActiveField={onActiveField} />
          <AccountProfileField id='pass' title='Password' text={user.pass.replace(/./gi, '*')} onActiveField={onActiveField} />
          <AccountProfileField id='phone' title='Phone' text={user?.phone} onActiveField={onActiveField} exists={user.phone ? true : false} />
          <AccountProfileField id='city' title='City' text={user?.city} onActiveField={onActiveField} exists={user.city ? true : false} />
          <AccountProfileField id='street' title='Street' text={user?.street} onActiveField={onActiveField} exists={user.street ? true : false} />
          <AccountProfileField id='number' title='Number' text={user?.number} onActiveField={onActiveField} exists={user.number ? true : false} />
          <AccountProfileField id='zipcode' title='Zipcode' text={user?.zipcode} onActiveField={onActiveField} exists={user.zipcode ? true : false} />
        </>
      )}
      <Button onClick={onExit}>Logout</Button>
      <FieldForm onHandleToggle={onHandleToggle} toggle={toggle} activeField={activeField} />
    </div>
  ) : null;
};

export default AccountProfile;
