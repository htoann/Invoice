import { API_LOGIN, API_REGISTER, API_USER_INFO, dataService } from '@/service';
import { setCookie } from '@/utils/cookie';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { notification } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ACCESS_TOKEN, clearLogoutLocalStorageAndCookie, LOGGED_IN, ORG_ID, ORG_LIST, REFRESH_TOKEN } from '../utils';
import { watchObject } from './../utils/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { t } = useTranslation();

  const [authState, setAuthState] = useState({
    isLoggedIn: getLocalStorage(LOGGED_IN) || false,
    loading: false,
    userInfo: null,
  });

  const { userInfo, isLoggedIn, orgId, loading } = authState || {};

  useEffect(() => {
    if (!userInfo && isLoggedIn && getLocalStorage(ORG_ID)) {
      getProfileInfo();
    }
  }, [userInfo, isLoggedIn, getLocalStorage(ORG_ID)]);

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
    const { organizations } = jwtDecode(access_token);

    setCookie(ACCESS_TOKEN, access_token);
    setCookie(REFRESH_TOKEN, refresh_token);

    setLocalStorage(LOGGED_IN, true);
    setLocalStorage(ORG_LIST, organizations);
    organizations?.[0]?.id && setLocalStorage(ORG_ID, organizations?.[0]?.id);

    setAuthState({ isLoggedIn: true, loading: false });
  };

  const handleAuthError = (err, msg) => {
    console.error(err);
    setState({ isLoggedIn: false, loading: false });
    const errMsg =
      err?.response?.data?.errors?.code === 'org_not_found' ? t('Auth_Failed_Org') : t('Auth_Failed_Credential');
    notification.error({
      message: msg,
      description: errMsg,
    });
  };

  const login = async (values, handleSuccess) => {
    setState({ loading: true });
    try {
      const { data } = await dataService.post(API_LOGIN, values);
      handleAuthSuccess(data.token);
      handleSuccess && handleSuccess();
    } catch (err) {
      handleAuthError(err, t(`Auth_SignIn`));
    }
  };

  const register = async (values, handleSuccess) => {
    setState({ loading: true });
    try {
      const response = await dataService.post(API_REGISTER, values);
      handleAuthSuccess(response.data.token, 'SignUp');
      handleSuccess && handleSuccess();
    } catch (err) {
      handleAuthError(err, t(`Auth_SignUp`));
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
