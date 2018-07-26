import axios from 'axios';

axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api:5000' : '/api',
  withCredentials: true,
});

export default client;
