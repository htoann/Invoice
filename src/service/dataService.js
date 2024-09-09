import { getCookie, setCookie } from '@/utils/cookie';
import { ACCESS_TOKEN, API_ENDPOINT, clearLogoutLocalStorageAndCookie, REFRESH_TOKEN } from '@/utils/index';
import axios from 'axios';
import { API_LOGIN, API_REGISTER } from './apiConst';

const whiteListAPIs = [API_LOGIN, API_REGISTER];

let refreshTokenPromise = null;
let failedQueue = [];

const processQueue = (error, accessToken = null) => {
  failedQueue.forEach((prom) => (accessToken ? prom.resolve(accessToken) : prom.reject(error)));
  failedQueue = [];
};

class DataService {
  constructor() {
    this.client = axios.create({
      baseURL: API_ENDPOINT,
      headers: {
        'Content-Type': 'application/json',
        ...this.authHeader(),
      },
    });

    this.initializeInterceptors();
  }

  authHeader() {
    const token = getCookie(ACCESS_TOKEN);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  initializeInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        config.headers = { ...config.headers, ...this.authHeader() };
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => this.handleResponseError(error),
    );
  }

  async handleResponseError(error) {
    const { response, config } = error;
    if (response?.status === 401 && !whiteListAPIs.includes(config.url)) {
      const originalRequest = config;

      if (refreshTokenPromise) {
        return refreshTokenPromise
          .then((accessToken) => {
            if (accessToken) {
              originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
              return this.client(originalRequest);
            }
          })
          .catch((err) => Promise.reject(err));
      }

      refreshTokenPromise = this.refreshAccessToken()
        .then((accessToken) => {
          refreshTokenPromise = null;
          if (accessToken) {
            this.client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            processQueue(null, accessToken);

            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return this.client(originalRequest);
          }
        })
        .catch(this.handleRefreshError);

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });
    }

    return Promise.reject(error);
  }

  async refreshAccessToken() {
    const refreshToken = getCookie(REFRESH_TOKEN);
    if (!refreshToken) {
      return Promise.reject(new Error('No refresh token available'));
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
      return this.handleRefreshError(error);
    }
  }

  handleRefreshError(error) {
    console.error('Failed to refresh token:', error);
    refreshTokenPromise = null;
    clearLogoutLocalStorageAndCookie();
    return Promise.reject(error);
  }

  async get(path, params = {}, config = {}) {
    return this.client.get(path, { params, ...config });
  }

  async post(path, data = {}, optionalHeader = {}) {
    return this.client.post(path, data, {
      headers: { ...this.authHeader(), ...optionalHeader },
    });
  }

  async patch(path, data = {}) {
    return this.client.patch(path, data, {
      headers: { ...this.authHeader() },
    });
  }

  async put(path, data = {}) {
    return this.client.put(path, data, {
      headers: { ...this.authHeader() },
    });
  }

  async delete(path) {
    return this.client.delete(path, {
      headers: { ...this.authHeader() },
    });
  }
}

export const dataService = new DataService();
