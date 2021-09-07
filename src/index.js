import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';
import './index.css';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain='psalmday.us.auth0.com'
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience='https://psalmday.us.auth0.com/api/v2/'
      scope='read:current_user update:current_user_metadata'>
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);

export default store;
