import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import psalmday from '../../apis/psalmday';
import EmailEdit from './EmailEdit';
import FavoritePsalms from './FavoritePsalms';
import PasswordEdit from './PasswordEdit';
import ProfileEdit from './ProfileEdit';
import SavedVerses from './SavedVerses';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [profileSaved, setProfileSaved] = useState(null);
  const { userId } = useParams();
  const { user: currentUser, isAuthenticated } = useAuth0();

  const getUser = async () => {
    const { data } = await psalmday.get(`users/${userId}`);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [profileSaved, userId]);

  const renderName = () => {
    if (!(user?.given_name && user?.family_name)) {
      return user?.nickname;
    } else {
      return `${user?.given_name || ''} ${user?.family_name || ''}`;
    }
  };

  const renderProfileDescription = () => {
    return user?.user_metadata?.description ? (
      <div className='content'>
        <p className='text-xl'>{user?.user_metadata?.description}</p>
      </div>
    ) : null;
  };

  const renderProfileEdit = () => {
    return showEdit ? (
      <div className='mx-32'>
        <EmailEdit user={user} />
        <PasswordEdit user={user} />
        <ProfileEdit onProfileSaved={onProfileSaved} user={user} />
      </div>
    ) : null;
  };

  const renderEditProfileButton = () => {
    return isAuthenticated && userId === currentUser?.sub ? (
      <div>
        <div className='text-center'>
          <button
            className='button is-primary '
            onClick={() => setShowEdit(!showEdit)}>
            Edit Profile
          </button>
        </div>
        {renderProfileEdit()}
      </div>
    ) : null;
  };

  const onProfileSaved = () => {
    setProfileSaved(!profileSaved);
  };

  return (
    <div>
      <section className='p-10 mt-20'>
        <div className='flex flex-col justify-center items-center content'>
          <div className=' max-w-lg flex flex-col items justify-center text-center animate-fadeIn'>
            <img
              className='rounded-full'
              src={user?.picture}
              alt={user?.nickname}
            />
            <h1>{renderName()}</h1>
            {renderProfileDescription()}
          </div>
        </div>
        <FavoritePsalms user={user} />
        <SavedVerses user={user} />
      </section>
      <section className='p-5'>{renderEditProfileButton()}</section>
    </div>
  );
};

export default Profile;
