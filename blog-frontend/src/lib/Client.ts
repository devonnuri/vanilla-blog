import axios from 'axios';

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/blog-6397d/us-central1/api'
      : 'https://us-central1-blog-6397d.cloudfunctions.net/api',
});

export default client;
