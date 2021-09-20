import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import {
  getRandomPsalm,
  setSelectedText,
  getFavoritePsalms,
  setFavoritePsalms,
} from '../../actions';
import './Psalm.scss';
import Tooltip from './Tooltip';
import store from '../../index';
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0Provider } from '@auth0/auth0-react';
import psalmday from '../../apis/psalmday';

// When the user's mouse is up, create the tooltip at that location
document.addEventListener('mouseup', () => {
  if (!document.getElementById('psalm')) return;

  const { focusNode } = document.getSelection();
  // If there is no node at that selection, or there's no selection, return
  if (!focusNode || !document.getSelection().toString().length) return;
  const el = focusNode.parentElement.insertAdjacentElement(
    'afterend',
    document.createElement('div')
  );
  ReactDOM.render(
    <Auth0Provider
      domain='psalmday.us.auth0.com'
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience='https://psalmday.us.auth0.com/api/v2/'
      scope='read:current_user update:current_user_metadata'>
      <Provider store={store}>
        <Tooltip el={el} />
      </Provider>
    </Auth0Provider>,
    el
  );
  document.getSelection().removeAllRanges();
});

const Psalm = props => {
  const currentFavorites = useSelector(state => state.favoritePsalms);
  const { user, isAuthenticated } = useAuth0();
  const [favorited, setFavorited] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [fontSize, setFontSize] = useState('text-base');
  const ref = useRef();

  const getUser = async () => {
    const { data: currentUser } = await psalmday.get(`/users/${user?.sub}`);
    setCurrentUser(currentUser);
    setFontSize(currentUser?.user_data?.font_size);
  };

  const getPsalm = async () => {
    ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    props.getRandomPsalm(currentUser?.user_data?.version);
  };

  const favoritePsalm = () => {
    props.setFavoritePsalms(user?.sub, [props.psalm, ...currentFavorites]);
  };

  const unFavoritePsalm = () => {
    props.setFavoritePsalms(
      user?.sub,
      currentFavorites.filter(psalm => psalm !== props.psalm)
    );
  };

  const getSelection = () => {
    document.addEventListener('selectionchange', () => {
      const selectedText = document.getSelection().toString();
      if (!selectedText.length) return;
      props.setSelectedText({
        verse: selectedText,
        psalm: props.psalm,
      });
    });
  };

  const renderFavoriteButton = () => {
    return isAuthenticated ? (
      <div>
        {favorited ? (
          <button
            className='button is-primary is-light'
            onClick={unFavoritePsalm}>
            <span className='icon'>
              <FontAwesomeIcon icon={solidHeart} />
            </span>
            <span>Favorited!</span>
          </button>
        ) : (
          <button
            className='button is-primary is-light m-2'
            onClick={favoritePsalm}>
            <span className='icon'>
              <FontAwesomeIcon icon={faHeart} />
            </span>
            <span>Favorite this Psalm</span>
          </button>
        )}
      </div>
    ) : null;
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    getPsalm();
    props.getFavoritePsalms(user?.sub);
  }, []);

  useEffect(() => {
    if (currentFavorites.includes(props.psalm)) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  });

  useEffect(() => {
    getSelection();
  });

  return (
    <div
      ref={ref}
      className={`h-screen p-10 mb-5 overflow-scroll overflow-x-hidden container sm:overflow-visible ${fontSize} sm:p-1`}>
      <div
        className='p-5'
        dangerouslySetInnerHTML={{
          __html: props.html,
        }}></div>
      <div className='flex justify-center items-center sm:p-5'>
        <button className='button is-primary m-2' onClick={getPsalm}>
          Get a new Psalm
        </button>
        {renderFavoriteButton()}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    html: state.randomPsalm.html,
    psalm: state.randomPsalm.psalmNumber,
    selectedVerse: state.selectedVerse,
    favoritePsalms: state.favoritePsalms,
  };
};

export default connect(mapStateToProps, {
  getRandomPsalm,
  setSelectedText,
  getFavoritePsalms,
  setFavoritePsalms,
})(Psalm);
