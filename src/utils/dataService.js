import { ACCESS_TOKEN, API_ENDPOINT, clearLogoutLocalStorageAndCookie, REFRESH_TOKEN } from '@/utils/index';
import axios from 'axios';
import { API_LOGIN, API_REGISTER } from './apiConst';
import { getCookie, setCookie } from './cookie';

const whiteListAPIs = [API_LOGIN, API_REGISTER];

let refreshTokenPromise = null;
let failedQueue = [];

const processQueue = (error, accessToken = null) => {
  failedQueue.forEach((prom) => {
    if (accessToken) {
      prom.resolve(accessToken);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

const authHeader = () => {
  if (getCookie(ACCESS_TOKEN)) {
    return {
      Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
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
  static get(path = '', params = {}, config = {}) {
    return client({
      method: 'GET',
      url: path,
      headers: { ...authHeader() },
      params,
      ...config,
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

const refreshAccessToken = async () => {
  const refreshToken = getCookie(REFRESH_TOKEN);
  if (!refreshToken) {
    return Promise.reject(new Error('No token available'));
  }

  try {
    const response = await axios.post(`${API_ENDPOINT}/auth/refresh/`, {
      refresh: refreshToken,
    });

    if (response?.data?.token) {
      const { access_token, refresh_token } = response.data.token;
      setCookie(ACCESS_TOKEN, access_token);
      setCookie(REFRESH_TOKEN, refresh_token);
      return access_token;
    }
  } catch (error) {
    handleRefreshError(error);
  }
};

const handleRefreshError = (error) => {
  console.error('Failed to refresh token:', error);
  refreshTokenPromise = null;
  clearLogoutLocalStorageAndCookie();
  return Promise.reject(error);
};

client.interceptors.request.use((config) => {
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers, ...authHeader() };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    if (response?.status === 401 && !whiteListAPIs.includes(config.url)) {
      const originalRequest = error.config;

      if (refreshTokenPromise) {
        return refreshTokenPromise
          .then((accessToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return client(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      refreshTokenPromise = refreshAccessToken()
        .then((accessToken) => {
          refreshTokenPromise = null;
          client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          processQueue(null, accessToken);

          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return client(originalRequest);
        })
        .catch((error) => {
          handleRefreshError(error);
        });

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });
    }

    return Promise.reject(error);
  },
);

export { DataService as dataService };
