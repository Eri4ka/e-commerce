import { useEffect, memo } from 'react';

import './CheckOut.scss';
import { Button } from '@components/Button';
import { useToggle } from '@hooks/useToggle';
import { useAppDispatch, useAppSelector } from '@myredux/hooks';
import { cartSelector, fetchCart, fetchDeleteCart, totalSelector } from '@myredux/slices/cartSlice';
import { fetchAddOrder } from '@myredux/slices/orderSlice';
import CartInfo from '@pages/Cart/components/CartInfo';
import cl from 'classnames';
import { Formik, Form, useField } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import CheckOutList from './components/CheckOutList';

export type MyTextInputProps = {
  label: string;
  name: string;
  validate?: (value: any) => undefined | string | Promise<any>;
  type?: string;
  multiple?: boolean;
  value?: string;
};

const MyTextInput = ({ label, ...props }: MyTextInputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [field, meta] = useField(props);

  return (
    <div className='checkout__block'>
      <div className='checkout__label'>{label}</div>
      <input className='checkout__input' {...field} {...props} />
      {meta.touched && meta.error ? <div className='checkout__error'>{meta.error}</div> : null}
    </div>
  );
};

const CheckOut = memo(() => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const ordersAddLoadingStatus = useAppSelector((state) => state.orders.ordersAddLoadingStatus);
  const cartItems = useAppSelector(cartSelector);
  const { total, sum } = useAppSelector(totalSelector);
  const { toggle, onHandleToggle } = useToggle();
  const navigate = useNavigate();

  const loading = ordersAddLoadingStatus === 'loading';

  const initialValues = {
    firstName: user?.firstName ? user.firstName : '',
    lastName: user?.lastName ? user.lastName : '',
    email: user?.email ? user.email : '',
    phone: user?.phone ? user.phone : '',
    city: user?.city ? user.city : '',
    street: user?.street ? user.street : '',
    number: user?.number ? user.number : '',
    zipcode: user?.zipcode ? user.zipcode : '',
    delivery: 'Courier',
    payment: 'Payment upon receipt',
  };

  useEffect(() => {
    dispatch(fetchCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className='checkout'>
      <h2 className='checkout__head'>Creating an order</h2>
      <div className='checkout-slider'>
        <h3 className={cl('checkout-slider__head', toggle ? 'checkout-slider_show' : 'checkout-slider_hide')} onClick={onHandleToggle}>
          Products
        </h3>
        {toggle && <CheckOutList items={cartItems} />}
      </div>
      <div className='checkout-info'>
        <CartInfo title='Total' count={total} />
        <CartInfo title='Sum' count={'$' + sum} />
      </div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          email: Yup.string().email('Not a valid e-mail').required('Required'),
          phone: Yup.number().typeError('Not a valid').positive('Not a valid').integer('Not a valid').required('Required'),
          city: Yup.string().required('Required'),
          street: Yup.string().required('Required'),
          number: Yup.number().typeError('Not a valid').required('Required'),
          zipcode: Yup.number().typeError('Not a valid').required('Required'),
        })}
        onSubmit={(values) => {
          const order = {
            date: new Date(),
            ...values,
            products: cartItems,
            total,
            sum,
          };
          dispatch(fetchAddOrder(order)).then(() => dispatch(fetchDeleteCart()).then(() => navigate('/cart')));
        }}
      >
        <Form>
          <h3 className='checkout__type'>Contacts</h3>
          <div className='checkout__contacts'>
            <MyTextInput label='First Name' id='firstName' name='firstName' placeholder='John' />
            <MyTextInput label='Last Name' id='lastName' name='lastName' placeholder='Doe' />
            <MyTextInput label='Email' id='email' name='email' placeholder='john@acme.com' />
            <MyTextInput label='Phone' id='phone' name='phone' placeholder='88005553535' />
          </div>

          <h3 className='checkout__type'>Delivery</h3>
          <div className='checkout__contacts'>
            <MyTextInput label='City' id='city' name='city' placeholder='Moscow' />
            <MyTextInput label='Street' id='street' name='street' placeholder='Nevskiy' />
            <MyTextInput label='Number' id='number' name='number' placeholder='11' />
            <MyTextInput label='Zipcode' id='zipcode' name='zipcode' placeholder='4722458' />
            <MyTextInput label='Delivery type' id='delivery' name='delivery' disabled />
            <MyTextInput label='Payment type' id='payment' name='payment' disabled />
          </div>
          <div className='checkout__submit'>
            <Button type='submit' loading={loading} disabled={total === 0} className='checkout__button'>
              Create
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
});

export default CheckOut;
