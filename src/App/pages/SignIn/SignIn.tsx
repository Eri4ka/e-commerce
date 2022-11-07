import { useEffect } from 'react';

import { Button } from '@components/Button';
import { useLazyLoginUserQuery } from '@myredux/api';
import { useAppSelector } from '@myredux/hooks';
import { MyTextAuthInput } from '@pages/SignUp';
import { Formik, Form } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SignIn = () => {
  const [trigger, { data, isFetching }] = useLazyLoginUserQuery();
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
        <h2 className='auth__head'>Sign in</h2>
        <Formik
          initialValues={{
            email: '',
            pass: '',
          }}
          validationSchema={Yup.object({
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
              <MyTextAuthInput label='Email' id='email' name='email' />
              <MyTextAuthInput label='Password' id='password' name='pass' type='password' />
            </div>

            <div className='auth-submit'>
              <Button type='submit' loading={isFetching}>
                Sign in
              </Button>
              {error && <div className='auth__error'>{data.message}</div>}
              <span className='auth-submit__text'>
                No account?
                <NavLink end to='/signup' className='auth-submit__link'>
                  {' '}
                  Sign up
                </NavLink>
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
