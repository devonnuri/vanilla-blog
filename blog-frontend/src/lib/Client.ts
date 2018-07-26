import axios from 'axios';

axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/:5000' : '',
  withCredentials: true,
});

export default client;
