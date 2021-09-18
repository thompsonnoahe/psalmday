// TODO: Create email edit component, log user out when email changes
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import psalmday from '../../apis/psalmday';
import { useAuth0 } from '@auth0/auth0-react';
import * as Yup from 'yup';

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format.')
    .required('Required.'),
});

const EmailEdit = ({ user }) => {
  const { logout } = useAuth0();
  const renderInput = props => {
    return (
      <div className='field'>
        <label className='label'>{props.title}</label>
        <div className='control has-icons-left has-icons-right'>
          <input
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
          Note: Updating your email address will force a logout.
        </p>
      </div>
    );
  };

  const handleSubmit = async values => {
    await psalmday.patch(`/users/${user?.user_id}`, {
      email: values.email,
    });
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className='mb-10'>
      <Formik
        enableReinitialize={true}
        validationSchema={EmailSchema}
        initialValues={{ email: user?.email }}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Field
              type='email'
              name='email'
              component={renderInput}
              error='email'
              title='Email'
              placeholder='Enter your email address'
              icon={faEnvelope}
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

export default EmailEdit;
