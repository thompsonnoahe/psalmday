import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

const Tooltip = props => {
  const [hidden, setHidden] = useState(false);

  // Whenever the user's mouse is up, hide the element
  const hideOnMouseUp = () => {
    document.addEventListener('mouseup', e => {
      setHidden(true);
    });
  };

  useEffect(() => {
    hideOnMouseUp();
  });

  return (
    <div className={`card ${hidden ? 'hidden' : ''} select-none`}>
      <footer className='card-footer'>
        <button
          className='card-footer-item'
          onClick={() => {
            console.log(props.selectedVerse);
            document.getSelection().removeAllRanges();
          }}>
          Save
        </button>
      </footer>
    </div>
  );
};

const mapStateToProps = state => {
  return { selectedVerse: state.selectedVerse };
};

export default connect(mapStateToProps)(Tooltip);
