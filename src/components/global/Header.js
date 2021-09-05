import React from 'react';
import { Link } from 'react-router-dom';
import LoginOutButton from '../auth/LoginOutButton';
import './Header.scss';

const Header = () => {
  return (
    <nav
      className='navbar is-fixed-top p-10 backdrop-filter backdrop-blur'
      role='navigation'
      aria-label='main navigation'>
      <div className='navbar-brand '>
        <Link className='navbar-item is-size-3' to='/'>
          <h1>psalmday</h1>
        </Link>

        <Link
          to={''}
          role='button'
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </Link>
      </div>

      <div className='navbar-end'>
        <div className='navbar-item'>
          <LoginOutButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
