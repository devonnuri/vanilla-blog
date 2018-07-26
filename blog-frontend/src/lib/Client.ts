import axios from 'axios';

axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/blog-6397d/us-central1/api'
      : 'https://us-central1-blog-6397d.cloudfunctions.net/api',
  withCredentials: true,
});

export default client;
