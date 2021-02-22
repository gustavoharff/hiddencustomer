import axios from 'axios';

import { SERVICE_URL } from '../config';

const api = axios.create({
  baseURL: SERVICE_URL,
});

export { api };
