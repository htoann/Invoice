import { API_LOGIN, API_REGISTER } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { REACT_MODE } from '../utils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { t } = useTranslation();

  const [authState, setAuthState] = useState({
    login: Cookies.get('loggedIn') || false,
    loading: false,
  });

  const login = useCallback(async (values) => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    try {
      if (REACT_MODE === 'ave') {
        Cookies.set('access_token', 'cr7');
        Cookies.set('loggedIn', true);
        setAuthState({ login: true, loading: false });
      } else {
        const response = await dataService.post(API_LOGIN, values);
        Cookies.set('access_token', response.data.access_token);
        Cookies.set('loggedIn', true);
        setAuthState({ login: true, loading: false });
      }

      notification.success({
        message: t('Auth_SignIn'),
        description: t('Auth_SignIn_Success'),
      });
    } catch (err) {
      console.error(err);
      setAuthState({ login: false, loading: false });

      notification.error({
        message: t('Auth_SignIn'),
        description: t('Auth_SignIn_Failed'),
      });
    }
  }, []);

  const register = useCallback(async (values) => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await dataService.post(API_REGISTER, values);

      Cookies.set('access_token', response.data.access_token);
      Cookies.set('loggedIn', true);
      setAuthState({ login: true, loading: false });

      notification.success({
        message: t('Auth_SignUp'),
        description: t('Auth_SignUp_Success'),
      });
    } catch (err) {
      console.error(err);
      setAuthState((prevState) => ({ ...prevState, loading: false }));

      notification.error({
        message: t('Auth_SignIn'),
        description: t('Auth_SignUp_Failed'),
      });
    }
  }, []);

  const logOut = useCallback(() => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    try {
      Cookies.remove('loggedIn');
      Cookies.remove('access_token');
      setAuthState({ login: false, loading: false });
    } catch {
      setAuthState((prevState) => ({ ...prevState, loading: false }));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.login,
        loading: authState.loading,
        error: authState.error,
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
