import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginOutButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  if (isAuthenticated) {
    return (
      <button
        className='button is-light'
        onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    );
  }
  return (
    <button className='button is-primary' onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginOutButton;
