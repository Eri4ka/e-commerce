import { memo } from 'react';

import { Button } from '@components/Button';
import { useAppDispatch, useAppSelector } from '@myredux/hooks';
import { fetchAddOrder } from '@myredux/slices/orderSlice';
import { Formik, Form, useField } from 'formik';
import { CSSTransition } from 'react-transition-group';
import * as Yup from 'yup';
import './OrderForm.scss';

type OrderFormType = {
  onHandleToggle: () => void;
  toggle: boolean;
};

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
    <div className='order-form-content__block'>
      <div className='order-form-content__label'>{label}</div>
      <input className='order-form-content__input' {...field} {...props} />
      {meta.touched && meta.error ? <div className='order-form-content__error'>{meta.error}</div> : null}
    </div>
  );
};

const OrderForm: React.FC<OrderFormType> = memo(({ onHandleToggle, toggle }) => {
  const { id, title, image, price } = useAppSelector((state) => state.product.product);
  const user = useAppSelector((state) => state.user.user);
  const ordersAddLoadingStatus = useAppSelector((state) => state.orders.ordersAddLoadingStatus);
  const dispatch = useAppDispatch();

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

  return (
    <CSSTransition in={toggle} timeout={200} classNames='order-form' unmountOnExit>
      <div className='order-form'>
        <div className='order-form-content'>
          <button className='order-form__exit' onClick={onHandleToggle}>
            &#10006;
          </button>
          <h2>Creating an order</h2>
          <Formik
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
                products: [{ id, title, image, price }],
                total: 1,
                sum: price,
              };
              console.log(order);
              dispatch(fetchAddOrder(order)).then(() => onHandleToggle());
            }}
          >
            <Form>
              <h3 className='order-form-content__type'>Contacts</h3>
              <div className='order-form-content__contacts'>
                <MyTextInput label='First Name' id='firstName' name='firstName' placeholder='John' />
                <MyTextInput label='Last Name' id='lastName' name='lastName' placeholder='Doe' />
                <MyTextInput label='Email' id='email' name='email' placeholder='john@acme.com' />
                <MyTextInput label='Phone' id='phone' name='phone' placeholder='88005553535' />
              </div>

              <h3 className='order-form-content__type'>Delivery</h3>
              <div className='order-form-content__contacts'>
                <MyTextInput label='City' id='city' name='city' placeholder='Moscow' />
                <MyTextInput label='Street' id='street' name='street' placeholder='Nevskiy' />
                <MyTextInput label='Number' id='number' name='number' placeholder='11' />
                <MyTextInput label='Zipcode' id='zipcode' name='zipcode' placeholder='4722458' />
                <MyTextInput label='Delivery type' id='delivery' name='delivery' disabled />
                <MyTextInput label='Payment type' id='payment' name='payment' disabled />
              </div>

              <div className='order-form-content__submit'>
                <Button type='submit' loading={ordersAddLoadingStatus === 'loading'}>
                  Create
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </CSSTransition>
  );
});

export default OrderForm;
