import axios from 'axios';

const psalmday = axios.create({
  baseURL: '/api/v1/',
});

export default psalmday;
