import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setSavedVerses } from '../../actions/user';

const Tooltip = props => {
  const [hidden, setHidden] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  // Whenever the user's mouse is up, hide the element
  const hideOnMouseUp = () => {
    document.addEventListener('mouseup', e => {
      setHidden(true);
    });
  };

  const handleSaveClick = () => {
    props.setSavedVerses(user?.sub, [
      props.selectedVerse,
      ...props.savedVerses,
    ]);
    document.getSelection().removeAllRanges();
  };

  useEffect(() => {
    hideOnMouseUp();
  });

  return isAuthenticated ? (
    <div className={`card ${hidden ? 'hidden' : ''} select-none`}>
      <footer className='card-footer'>
        <button className='card-footer-item' onClick={handleSaveClick}>
          Save
        </button>
      </footer>
    </div>
  ) : null;
};

const mapStateToProps = state => {
  return { selectedVerse: state.selectedVerse, savedVerses: state.savedVerses };
};

export default connect(mapStateToProps, { setSavedVerses })(Tooltip);
