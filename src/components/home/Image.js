import React, { useEffect, useState } from 'react';
import unsplash from '../../apis/unsplash';

const Image = () => {
  const [image, setImage] = useState(null);
  const getRandomImage = async () => {
    const { data } = await unsplash.get('/random', {
      params: {
        query: 'christian',
      },
    });
    setImage(data?.urls?.regular);
  };

  useEffect(() => {
    getRandomImage();
  }, []);

  return (
    <div
      className='h-screen mt-28 sm:m-0'
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}></div>
  );
};

export default Image;
