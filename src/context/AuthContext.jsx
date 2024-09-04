import { API_LOGIN, API_REGISTER, API_USER_INFO } from '@/utils/apiConst';
import { setCookie } from '@/utils/cookie';
import { dataService } from '@/utils/dataService';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { notification } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ACCESS_TOKEN, clearLogoutLocalStorageAndCookie, LOGGED_IN, ORG_ID, REFRESH_TOKEN } from '../utils';
import { watchObject } from './../utils/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { t } = useTranslation();

  const [authState, setAuthState] = useState({
    isLoggedIn: getLocalStorage(LOGGED_IN) || false,
    orgId: getLocalStorage(ORG_ID) || null,
    loading: false,
    userInfo: null,
  });

  const { userInfo, isLoggedIn, orgId, loading } = authState || {};

  useEffect(() => {
    if (!userInfo && isLoggedIn) {
      getProfileInfo();
    }
  }, [userInfo, isLoggedIn]);

  const getProfileInfo = async () => {
    try {
      const response = await dataService.get(API_USER_INFO);
      setState({ userInfo: response.data });
    } catch (err) {
      console.error(err);
    }
  };

  watchObject(window.localStorage, ['removeItem'], (method, key) => {
    if (method === 'removeItem' && key === LOGGED_IN && isLoggedIn) {
      setAuthState({ isLoggedIn: false, loading: false });
    }
  });

  const handleAuthSuccess = (token) => {
    const { access_token, refresh_token } = token;
    const { organization_id } = jwtDecode(access_token);

    setCookie(ACCESS_TOKEN, access_token);
    setCookie(REFRESH_TOKEN, refresh_token);

    setLocalStorage(LOGGED_IN, true);
    setLocalStorage(ORG_ID, organization_id);

    setAuthState({ isLoggedIn: true, loading: false, orgId: organization_id });
  };

  const handleAuthError = (authType) => {
    setState({ isLoggedIn: false, loading: false });

    notification.error({
      message: t(`Auth_${authType}`),
      description: t(`Auth_${authType}_Failed`),
    });
  };

  const login = async (values, handleSuccess) => {
    setState({ loading: true });
    try {
      const { data } = await dataService.post(API_LOGIN, values);
      handleAuthSuccess(data.token);
      handleSuccess && handleSuccess();
    } catch (err) {
      console.error(err);
      handleAuthError('SignIn');
    }
  };

  const register = async (values, handleSuccess) => {
    setState({ loading: true });
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
    setState({ loading: true });
    setAuthState({ isLoggedIn: false, loading: false });
    clearLogoutLocalStorageAndCookie();
  }, []);

  const setState = (updateState) => {
    setAuthState((prevState) => ({
      ...prevState,
      ...updateState,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        login,
        register,
        logOut,
        userInfo,
        orgId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
