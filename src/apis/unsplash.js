import axios from 'axios';

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com/photos/',
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
  },
});

export default unsplash;
