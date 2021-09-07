import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginOutButton from '../auth/LoginOutButton';
import ProfileIcon from '../auth/ProfileIcon';
import MobileMenu from './MobileMenu';
import './Header.scss';

const Header = () => {
  const [isMobileActive, setMobileActive] = useState(false);
  return (
    <nav
      className='navbar is-fixed-top p-10 backdrop-filter backdrop-blur'
      role='navigation'
      aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className='navbar-item is-size-3' to='/'>
          <h1 className='select-none'>psalmday</h1>
        </Link>

        <Link
          to={''}
          role='button'
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
          onClick={() => setMobileActive(!isMobileActive)}>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </Link>
      </div>
      <div className={isMobileActive ? '' : 'hidden'}>
        <MobileMenu />
      </div>
      <div className='navbar-menu rounded-b-full'>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <ProfileIcon />
          </div>
          <div className='navbar-item'>
            <div className='buttons'>
              <LoginOutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
