import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavoritePsalms } from '../../actions';

const FavoritePsalms = props => {
  const getFavorites = () => {
    props.getFavoritePsalms(props.user?.user_id);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    getFavorites();
  }, [props.user?.user_id]);

  return (
    <div className='content'>
      <h2>My Favorite Psalms</h2>
      {props.favoritePsalms.map(psalm => (
        <Link
          key={psalm}
          to={`/psalm/${psalm}`}
          className='has-text-grey-darker'>
          <div className='shadow-xl hover:shadow-2xl transition-all p-10 m-10 relative overflow-hidden z-0'>
            <div className='absolute has-text-grey-light text-9xl left-0 top-0 -z-10'>
              {psalm}
            </div>
            <div className='ml-32 text-2xl z-10'>Psalm {psalm}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return { favoritePsalms: state.favoritePsalms };
};

export default connect(mapStateToProps, { getFavoritePsalms })(FavoritePsalms);
