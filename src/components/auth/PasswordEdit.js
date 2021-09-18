import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import psalmday from '../../apis/psalmday';
import { useAuth0 } from '@auth0/auth0-react';

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be a minimum of 8 characters')
    .max(20, 'Password cannot exceed 20 characters.')
    .matches(
      /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/,
      'Password must have at least one lowercase letter, one uppercase and one special character (!@#$%^&*) and must be at least eight characters long.'
    ),
});

const PasswordEdit = ({ user }) => {
  const { logout } = useAuth0();

  const renderPasswordInput = props => {
    return (
      <div className='field'>
        <label className='label'>{props.title}</label>
        <div className='control has-icons-left has-icons-right'>
          <input
            type='password'
            className={`input ${
              props.form.errors[props.error] ? 'is-danger' : ''
            }`}
            {...props.field}
            placeholder={props.placeholder || ''}
          />
          <span className='icon is-small is-left'>
            <FontAwesomeIcon icon={props.icon} />
          </span>
          {!props.form.errors[props.error] ? (
            <span className='icon is-small is-right'>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ) : null}
        </div>
        {props.form.errors[props.error] ? (
          <p className='help is-danger'>{props.form.errors[props.error]}</p>
        ) : null}
        <p className='help is-primary italic'>
          Note: Updating your password will force a logout.
        </p>
      </div>
    );
  };

  const handleSubmit = async values => {
    await psalmday.patch(`/users/${user?.user_id}`, {
      ...values,
    });
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className='mb-10'>
      <Formik
        validationSchema={PasswordSchema}
        initialValues={{ password: '' }}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Field
              type='password'
              name='password'
              component={renderPasswordInput}
              error='password'
              title='Password'
              placeholder='Enter your new password'
              icon={faLock}
            />
            <div className='control'>
              <button
                type='submit'
                className='button is-primary'
                disabled={isSubmitting}>
                Save & Logout
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordEdit;
