import React from 'react';
import ProfileIcon from '../auth/ProfileIcon';
import LoginOutButton from '../auth/LoginOutButton';

const MobileMenu = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex items-center justify-center'>
        <ProfileIcon />
      </div>
      <div className='navbar-item'>
        <div className='buttons'>
          <LoginOutButton />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
