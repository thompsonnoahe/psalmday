import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSavedVerses } from '../../actions/user';
import ReactDOM from 'react-dom';

const Tooltip = props => {
  const { user, isAuthenticated } = useAuth0();
  // Whenever the user's mouse is up, hide the element
  const hideOnMouseUp = () => {
    document.addEventListener('mouseup', e => {
      ReactDOM.unmountComponentAtNode(props.el);
      document.getSelection().empty();
    });
  };

  const handleSaveClick = () => {
    props.setSavedVerses(user?.sub, [
      props.selectedVerse,
      ...props.savedVerses,
    ]);
    document.getSelection().empty();
  };

  useEffect(() => {
    hideOnMouseUp();
  });

  return isAuthenticated ? (
    <div className={`card select-none`}>
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
