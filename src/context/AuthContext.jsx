import { API_LOGIN, API_REGISTER } from '@/utils/apiConst';
import { setCookie } from '@/utils/cookie';
import { dataService } from '@/utils/dataService';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { notification } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { createContext, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ACCESS_TOKEN, clearLogoutLocalStorageAndCookie, LOGGED_IN, ORG_ID, REACT_MODE, REFRESH_TOKEN } from '../utils';
import { watchObject } from './../utils/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { t } = useTranslation();

  const [authState, setAuthState] = useState({
    login: getLocalStorage(LOGGED_IN) || false,
    orgId: getLocalStorage(ORG_ID) || null,
    loading: false,
  });

  watchObject(window.localStorage, ['removeItem'], (method, key) => {
    if (method === 'removeItem' && key === LOGGED_IN && authState.login) {
      setAuthState({ login: false, loading: false });
    }
  });

  const handleAuthSuccess = (token) => {
    const { access_token, refresh_token } = token;
    const { organization_id } = jwtDecode(access_token);

    setCookie(ACCESS_TOKEN, access_token);
    setCookie(REFRESH_TOKEN, refresh_token);

    setLocalStorage(LOGGED_IN, true);
    setLocalStorage(ORG_ID, organization_id);

    setAuthState({ login: true, loading: false, orgId: organization_id });
  };

  const handleAuthError = (authType) => {
    setAuthState((prevState) => ({ ...prevState, login: false, loading: false }));

    notification.error({
      message: t(`Auth_${authType}`),
      description: t(`Auth_${authType}_Failed`),
    });
  };

  const login = async (values) => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    try {
      if (REACT_MODE === 'ave') {
        setLocalStorage(LOGGED_IN, true);
        setAuthState({ login: true, loading: false });
      } else {
        const { data } = await dataService.post(API_LOGIN, values);
        handleAuthSuccess(data.token);
      }
    } catch (err) {
      console.error(err);
      handleAuthError('SignIn');
    }
  };

  const register = async (values, handleSuccess) => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await dataService.post(API_REGISTER, values);
      handleAuthSuccess(response.data.token, 'SignUp');
      handleSuccess && handleSuccess();
    } catch (err) {
      console.error(err);
      handleAuthError('SignUp');
    }
  };

  const logOut = useCallback(() => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    setAuthState({ login: false, loading: false });
    clearLogoutLocalStorageAndCookie();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.login,
        loading: authState.loading,
        login,
        register,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
