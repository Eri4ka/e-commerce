import { memo, useEffect } from 'react';

import { Button } from '@components/Button';
import { useUpdateUserMutation } from '@myredux/api';
import { IActiveField } from '@pages/Account/components/AccountProfile';
import { Formik, Form, Field } from 'formik';
import { CSSTransition } from 'react-transition-group';
import * as Yup from 'yup';
import './FieldForm.scss';

type FieldFormProps = {
  onHandleToggle: () => void;
  toggle: boolean;
  activeField: IActiveField;
};

const getSchema = (field: string) => {
  switch (field) {
    case 'phone':
      return Yup.number().typeError('Not a valid').positive('Not a valid').integer('Not a valid').required('Required');
    case 'email':
      return Yup.string().email('Not a valid e-mail').required('Required');
    case 'pass':
      return Yup.string()
        .required('No password provided')
        .min(6, 'Password is too short - 6 chars minimum')
        .matches(/[a-zA-Z0-9]/, 'Password can only symbols');
    case 'number' || 'zipcode':
      return Yup.number().typeError('Not a valid').required('Required');
    default:
      return Yup.string().required('Required');
  }
};

const FieldForm: React.FC<FieldFormProps> = memo(({ toggle, onHandleToggle, activeField }) => {
  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      onHandleToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <CSSTransition in={toggle} timeout={200} classNames='field-form' unmountOnExit>
      <div className='field-form'>
        <div className='field-form-content'>
          <button className='field-form__exit' onClick={onHandleToggle}>
            &#10006;
          </button>
          <h3 className='field-form-content__head'>{activeField.title}</h3>
          <Formik
            initialValues={{
              [activeField.id]: '',
            }}
            validationSchema={Yup.object({
              [activeField.id]: getSchema(activeField.id),
            })}
            onSubmit={(values) => {
              const user = {
                ...values,
              };
              updateUser(user);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field className='field-form-content__input' name={activeField.id} type='text' placeholder={activeField.title} />
                {errors[activeField.id] && touched[activeField.id] ? <div className='field-form-content__error'>{errors[activeField.id]}</div> : null}
                <Button type='submit' className='field-form-content__btn' loading={isLoading}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </CSSTransition>
  );
});

export default FieldForm;
