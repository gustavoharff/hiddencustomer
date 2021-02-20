import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nodejs.harff.dev',
});

export default api;
