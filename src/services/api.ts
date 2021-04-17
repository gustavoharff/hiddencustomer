import axios from 'axios';

import { SERVICE_URL } from '../config';

const api = axios.create({
  baseURL: SERVICE_URL,
});

api.interceptors.response.use(response => {
  console.log(response);

  return response;
});

export { api };
