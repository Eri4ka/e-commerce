import { memo } from 'react';

import { Button } from '@components/Button';
import { useAddBucketMutation } from '@myredux/api/bucketApi';
import { useAppSelector } from '@myredux/hooks';
import { Formik, Form, useField } from 'formik';
import { CSSTransition } from 'react-transition-group';
import * as Yup from 'yup';
import './OrderForm.scss';

type OrderFormType = {
  onHandleToggle: () => void;
  toggle: boolean;
};

type MyTextInputProps = {
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
  const [addBucket] = useAddBucketMutation();
  const singleProduct = useAppSelector((state) => state.product.product);
  console.log('mount');
  return (
    <CSSTransition in={toggle} timeout={200} classNames='order-form' unmountOnExit>
      <div className='order-form'>
        <div className='order-form-content'>
          <button className='order-form__exit' onClick={onHandleToggle}>
            &#10006;
          </button>
          <h2>Creating an order</h2>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              city: '',
              street: '',
              number: '',
              zipcode: '',
            }}
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
              const bucket = {
                userId: 5,
                date: '2022-02-03',
                products: [
                  {
                    productId: singleProduct.id,
                    quantity: 1,
                  },
                ],
              };
              addBucket(bucket);
              console.log(bucket);
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
              </div>

              <div className='order-form-content__submit'>
                <Button type='submit'>Create</Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </CSSTransition>
  );
});

export default OrderForm;
