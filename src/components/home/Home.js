import React from 'react';
import Image from './Image';
import Psalm from './Psalm';
const Home = () => {
  return (
    <div className='flex sm:flex-col'>
      <div className='w-1/2 sm:w-full'>
        <Image />
      </div>
      <div className='w-1/2 sm:w-full'>
        <Psalm />
      </div>
    </div>
  );
};

export default Home;
