import axios from 'axios';

const nlt = axios.create({
  baseURL: 'https://api.nlt.to/api/',
  params: {
    key: process.env.REACT_APP_NLT_API_KEY,
  },
});

export default nlt;
