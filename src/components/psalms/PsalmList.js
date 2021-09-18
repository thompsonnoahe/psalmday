import React from 'react';
import { Link } from 'react-router-dom';
import unsplash from '../../apis/unsplash';
import _ from 'lodash';

const PsalmList = () => {
  const getRandomImage = async () => {
    try {
      const { data } = await unsplash.get('/random', {
        params: {
          query: 'bible',
        },
      });
      return data?.urls?.small;
    } catch (error) {
      return 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    }
  };

  const changeBackgroundImage = async e => {
    e.target.style.backgroundImage = `url('${await getRandomImage()}')`;
    e.target.style.backgroundSize = 'cover';
    e.target.style.backgroundPosition = 'center';
    e.target.classList.add('has-text-white');
  };

  const removeBackgroundImage = e => {
    e.target.style.backgroundImage = '';
    e.target.style.backgroundPosition = '';
    e.target.classList.remove('has-text-white');
  };

  return (
    <div className='m-24 text-center grid grid-cols-3 sm:grid-cols-1'>
      {_.range(1, 151).map(psalm => (
        <Link
          key={psalm}
          to={`/psalm/${psalm}`}
          className='has-text-grey-darker'>
          <div
            onMouseOver={changeBackgroundImage}
            onMouseOut={removeBackgroundImage}
            className='p-10 shadow-xl hover:shadow-2xl m-5 transition-all'>
            Psalm {psalm}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PsalmList;
