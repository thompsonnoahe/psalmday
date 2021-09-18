import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faCheck,
  faPortrait,
  faSignature,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import psalmday from '../../apis/psalmday';
import axios from 'axios';

const ProfileEditSchema = Yup.object().shape({
  nickname: Yup.string()
    .lowercase('Username must be lowercase.')
    .required('Required.')
    .max(20, 'Username cannot exceed 20 characters.'),
  given_name: Yup.string(),
  family_name: Yup.string(),
  description: Yup.string().max(
    150,
    'Description cannot exceed 150 characters.'
  ),
});

const ProfileEdit = ({ user, onProfileSaved }) => {
  const [hideSaved, setHideSaved] = useState(true);
  const [filePlaceholder, setFilePlaceholder] = useState('Upload a file...');
  const [pictureUrl, setPictureUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const [disabled, setDisabled] = useState(false);

  let initialValues = {
    nickname: user?.nickname,
    given_name: user?.given_name,
    family_name: user?.family_name,
    description: user?.user_metadata?.description,
    version: user?.user_data?.version,
    font_size: user?.user_data?.font_size,
  };

  const handleFileUpload = e => {
    if (!e.target.files[0].name.match(/(\.jpg|\.jpeg|\.png|\.gif)/)) {
      setFileError('Invalid file type.');
      e.target.files = null;
      setDisabled(true);
    } else {
      setFileError('');
      setDisabled(false);
    }
    setFilePlaceholder(e.target.files[0].name.replaceAll(' ', '-'));
    getSignedRequest(e.target.files[0]);
  };

  const getSignedRequest = async file => {
    const { data } = await axios.get(
      `/sign-s3?file-name=${file.name.replaceAll(' ', '-')}&file-type=${
        file.type
      }`
    );
    uploadFile(file, data.signedRequest, data.url);
  };

  const uploadFile = async (file, signedRequest, url) => {
    setPictureUrl(url);
    await axios.put(signedRequest, file, {
      headers: {
        'X-Content-Type-Options': 'nosniff',
      },
    });
  };

  const renderSelect = props => {
    return (
      <div className='my-10'>
        <label className='label mr-10'>{props.title}</label>
        <div className='select'>
          <select {...props.field}>{props.children}</select>
        </div>
      </div>
    );
  };

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
      </div>
    );
  };

  const renderDescriptionTextarea = props => {
    return (
      <div className='field'>
        <label className='label'>{props.title}</label>
        <textarea
          {...props.field}
          className='textarea'
          placeholder={props.placeholder}></textarea>
      </div>
    );
  };

  const renderFileUpload = props => {
    return (
      <div className='flex my-10 flex-col'>
        <label className='label mr-10'>{props.title}</label>
        <div className='file is-primary'>
          <label className='file-label'>
            <input
              className='file-input'
              type='file'
              name='picture'
              {...props.field}
              onChange={handleFileUpload}
            />
            <span className='file-cta'>
              <span className='file-icon'>
                <FontAwesomeIcon icon={faUpload} />
              </span>
              <span className='file-label'>Upload an image</span>
            </span>
            <span className='file-name'>{filePlaceholder}</span>
          </label>
        </div>
        <p className='help is-danger italic'>{fileError}</p>
      </div>
    );
  };

  const renderSavedNotification = () => {
    return (
      <div className='notification is-primary' hidden={hideSaved}>
        <button
          type='button'
          className='delete'
          onClick={() => setHideSaved(true)}></button>
        Saved!
      </div>
    );
  };

  const handleSubmit = async values => {
    setHideSaved(false);
    await psalmday.patch(`/users/${user?.user_id}`, {
      ...values,
      picture: pictureUrl || user?.picture,
      user_metadata: {
        description: values.description,
      },
    });
    await psalmday.patch(`/users/${user?.user_id}/userData`, {
      user_data: {
        version: values.version || 'NLT',
        font_size: values.font_size || 'text-base',
      },
    });
    onProfileSaved();
    initialValues = values;
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={ProfileEditSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className='animate-none'>
          <Field name='version' component={renderSelect} title='Version'>
            <option value='NLT'>New Living Translation</option>
            <option value='ESV'>English Standard Version</option>
          </Field>
          <Field name='font_size' component={renderSelect} title='Font Size'>
            <option value='text-sm'>Small</option>
            <option value='text-base'>Normal</option>
            <option value='text-lg'>Large</option>
            <option value='text-xl'>Extra Large</option>
            <option value='text-2xl'>Huge</option>
          </Field>
          <Field
            type='file'
            name='picture'
            component={renderFileUpload}
            error='picture'
            title='Profile Picture'
          />
          <Field
            type='text'
            name='nickname'
            component={renderInput}
            error='nickname'
            title='Username'
            placeholder='Enter your username'
            icon={faUser}
          />
          <Field
            type='text'
            name='given_name'
            component={renderInput}
            error='given_name'
            title='First Name'
            placeholder='Enter your first name'
            icon={faPortrait}
          />
          <Field
            type='text'
            name='family_name'
            component={renderInput}
            error='family_name'
            title='Last Name'
            placeholder='Enter your last name'
            icon={faSignature}
          />
          <Field
            type='textarea'
            name='description'
            title='Description'
            placeholder='Enter a brief description'
            component={renderDescriptionTextarea}
          />
          <div className='my-5 animate-none'>{renderSavedNotification()}</div>
          <div className='control'>
            <button
              type='submit'
              className='button is-primary'
              disabled={isSubmitting || disabled}>
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileEdit;
