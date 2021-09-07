import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { getRandomPsalm, setSelectedText } from '../../actions';
import './Psalm.scss';
import Tooltip from './Tooltip';
import store from '../../index';

// When the user's mouse is up, create the tooltip at that location
document.addEventListener('mouseup', () => {
  const { focusNode } = document.getSelection();
  // If there is no node at that selection, or there's no selection, return
  if (!focusNode || !document.getSelection().toString().length) return;
  const el = focusNode.parentElement.insertAdjacentElement(
    'afterend',
    document.createElement('div')
  );

  ReactDOM.render(
    <Provider store={store}>
      <Tooltip />
    </Provider>,
    el
  );
  document.getSelection().removeAllRanges();
});

const Psalm = props => {
  const [favorited, setFavorited] = useState(false);
  const ref = useRef();

  const getPsalm = async () => {
    ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    props.getRandomPsalm();
  };

  const favoritePsalm = async () => {
    setFavorited(!favorited);
  };

  const getSelection = () => {
    // When the selection changes, console.log() it
    document.addEventListener('selectionchange', () => {
      const selectedText = document.getSelection().toString();
      if (!selectedText.length) return;
      props.setSelectedText(selectedText);
    });
  };

  useEffect(() => {
    getPsalm();
  }, []);

  useEffect(() => {
    getSelection();
  });

  return (
    <div
      ref={ref}
      className='h-screen p-10 mb-5 overflow-scroll overflow-x-hidden container is-size-4 sm:overflow-visible'>
      <div
        dangerouslySetInnerHTML={{
          __html: props.html,
        }}></div>
      <div className='flex justify-center items-center sm:p-5'>
        <button className='button is-primary m-2' onClick={getPsalm}>
          Get a new Psalm
        </button>
        {favorited ? (
          <button
            className='button is-primary is-light'
            onClick={favoritePsalm}>
            <span className='icon'>
              <FontAwesomeIcon icon={solidHeart} />
              <i className='fas fa-heart'></i>
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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    html: state.randomPsalm.html,
    psalm: state.randomPsalm.psalmNumber,
    selectedVerse: state.selectedVerse,
  };
};

export default connect(mapStateToProps, { getRandomPsalm, setSelectedText })(
  Psalm
);
