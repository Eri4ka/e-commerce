import './SignUp.scss';
import { useEffect } from 'react';

import { Button } from '@components/Button';
import { MyTextInputProps } from '@components/Form/OrderForm';
import { useLazyRegisterUserQuery } from '@myredux/api';
import { useAppSelector } from '@myredux/hooks';
import { Formik, Form, useField } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export const MyTextAuthInput = ({ label, ...props }: MyTextInputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [field, meta] = useField(props);

  return (
    <div className='auth__block'>
      <div className='auth__label'>{label}</div>
      <input className='auth__input' {...field} {...props} />
      {meta.touched && meta.error ? <div className='auth__error'>{meta.error}</div> : null}
    </div>
  );
};

const SignUp = () => {
  const [trigger, { data, isFetching }] = useLazyRegisterUserQuery();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const error = data?.status === 'error';

  useEffect(() => {
    if (user) {
      navigate('/account');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className='auth'>
      <div className='auth__wrapper'>
        <h2 className='auth__head'>Sign up</h2>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            pass: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Not a valid e-mail').required('Required'),
            pass: Yup.string()
              .required('No password provided')
              .min(6, 'Password is too short - 6 chars minimum')
              .matches(/[a-zA-Z0-9]/, 'Password can only symbols'),
          })}
          onSubmit={(values) => {
            trigger(values);
          }}
        >
          <Form>
            <div className='auth__fields'>
              <MyTextAuthInput label='First Name' id='firstName' name='firstName' />
              <MyTextAuthInput label='Last Name' id='lastName' name='lastName' />
              <MyTextAuthInput label='Email' id='email' name='email' />
              <MyTextAuthInput label='Password' id='password' name='pass' type='password' />
            </div>

            <div className='auth-submit'>
              <Button type='submit' loading={isFetching}>
                Sign up
              </Button>
              {error && <div className='auth__error'>{data.message}</div>}
              <span className='auth-submit__text'>
                Already have an account?
                <NavLink end to='/signin' className='auth-submit__link'>
                  {' '}
                  Sign in
                </NavLink>
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
