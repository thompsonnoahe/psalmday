import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSavedVerses } from '../../actions/user';
import { Link } from 'react-router-dom';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

const SavedVerses = props => {
  const getSavedVerses = () => {
    props.getSavedVerses(props.user?.user_id);
  };

  useEffect(() => {
    getSavedVerses();
  }, []);

  useEffect(() => {
    getSavedVerses();
  }, [props.user?.user_id]);

  return (
    <div className='content'>
      <h2>My Saved Verses</h2>
      {_.uniq(props.savedVerses, 'verse')?.map((verse, index) => (
        <Link
          key={index}
          to={`/psalm/${verse.psalm}`}
          className='has-text-grey-darker'>
          <div className='shadow-xl hover:shadow-2xl transition-all p-10 m-10 relative overflow-hidden'>
            <div className='absolute has-text-grey-light text-8xl left-1 top-0'>
              <FontAwesomeIcon icon={faQuoteLeft} />
            </div>
            <div className='ml-32 text-xl'>{verse.verse}</div>
            <div className='ml-32 italic'>Psalm {verse.psalm}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return { savedVerses: state.savedVerses };
};

export default connect(mapStateToProps, { getSavedVerses })(SavedVerses);
