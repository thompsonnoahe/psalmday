import { useAuth0 } from '@auth0/auth0-react';
import _ from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);
  return (
    <div>
      <section className='p-10 mt-20'>
        <div className='flex flex-col justify-center items-center content'>
          <div className='max-w-lg text-center'>
            <img
              className='rounded-full'
              src={user?.picture}
              alt={user?.nickname}
            />
            <h1>{user?.nickname}</h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
