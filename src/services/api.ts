import axios, { AxiosError } from 'axios';
import { navigate } from 'navigation/navigate';

import { SERVICE_URL } from '../config';

let failuredRequestsQueue = [] as {
  reject(err: AxiosError): void;
}[];

export const api = axios.create({
  baseURL: SERVICE_URL,
});

api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 440) {
      navigate('Loggout', {
        code: 'token.expired',
      });

      failuredRequestsQueue.forEach(request => request.reject(error));

      failuredRequestsQueue = [];

      return new Promise((resolve, reject) => {
        failuredRequestsQueue.push({
          // resolve: () => {},
          reject: (err: AxiosError) => {
            reject(err);
          },
        });
      });
    }

    return Promise.reject(error);
  },
);
