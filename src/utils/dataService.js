import { API_ENDPOINT } from '@/utils/index';
import axios from 'axios';
import { getCookie } from './cookie';

const authHeader = () => {
  if (getCookie('access_token')) {
    return {
      Authorization: `Bearer ${getCookie('access_token')}`,
    };
  }

  return {};
};

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    ...authHeader(),
    'Content-Type': 'application/json',
  },
});

class DataService {
  static get(path = '', params = {}) {
    return client({
      method: 'GET',
      url: path,
      headers: { ...authHeader() },
      params,
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static delete(path = '') {
    return client({
      method: 'DELETE',
      url: path,
      headers: { ...authHeader() },
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers, ...authHeader() };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response) {
      if (response.status === 500) {
        // Handle the 500 error case
        // You might want to do something like refreshing a token or retrying the request
        console.error('Server error:', response);
        // Return the response or throw an error
        return Promise.reject(error);
      }
    }

    // Return the error to the calling function so the catch block works
    return Promise.reject(error);
  },
);

export { DataService as dataService };
