import axios from 'axios';

const esv = axios.create({
  baseURL: 'https://api.esv.org/v3/passage/',
  headers: {
    Authorization: process.env.REACT_APP_CROSSWAY_API_KEY,
  },
});

export default esv;
