import React, { useEffect, useState } from 'react';
import unsplash from '../../apis/unsplash';

const Image = () => {
  const [image, setImage] = useState(null);
  const getRandomImage = async () => {
    try {
      const { data } = await unsplash.get('/random', {
        params: {
          query: 'bible',
        },
      });
      setImage(data?.urls?.regular);
    } catch (error) {
      setImage(
        'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'
      );
    }
  };

  useEffect(() => {
    getRandomImage();
  }, []);

  return (
    <div
      className='h-screen shadow-inner mt-28 '
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}></div>
  );
};

export default Image;
