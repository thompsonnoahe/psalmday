import { useAuth0, User } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileIcon = () => {
  const { user, isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <Link to={`/profile/${user?.sub}`} className='mr-5'>
      <img className='rounded-full h-10' src={user?.picture} alt={user?.sub} />
    </Link>
  ) : null;
};

export default ProfileIcon;
