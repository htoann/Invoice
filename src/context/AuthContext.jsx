import { DataService } from '@/config/dataService';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { t } = useTranslation();

  const [authState, setAuthState] = useState({
    login: Cookies.get('loggedIn') || false,
    loading: false,
    error: null,
  });

  const login = useCallback(async (values) => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    try {
      // const response = await DataService.post('/users/login/', values);
      // if (response.data.errors) {
      //   setAuthState((prevState) => ({ ...prevState, loading: false, error: response.data.errors }));
      // } else {
      //   Cookies.set('access_token', response.data.token.access_token);
      //   Cookies.set('loggedIn', true);
      //   setAuthState({ login: true, loading: false, error: null });
      // }
      Cookies.set('access_token', 'cr7');
      Cookies.set('loggedIn', true);
      setAuthState({ login: true, loading: false, error: null });
    } catch (err) {
      setAuthState({ login: false, loading: false, error: err });

      notification.error({
        message: t('Auth_SignIn'),
        description: t('Auth_SignIn_Failed'),
      });
    }
  }, []);

  const register = useCallback(async (values) => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await DataService.post('/users/register/', values);
      if (response.data.errors) {
        setAuthState((prevState) => ({ ...prevState, loading: false, error: 'Registration failed!' }));
      } else {
        setAuthState((prevState) => ({ ...prevState, loading: false, error: null }));
      }
    } catch (err) {
      setAuthState((prevState) => ({ ...prevState, loading: false, error: err }));
    }
  }, []);

  const logOut = useCallback(() => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    try {
      Cookies.remove('loggedIn');
      Cookies.remove('access_token');
      setAuthState({ login: false, loading: false, error: null });
    } catch (err) {
      setAuthState((prevState) => ({ ...prevState, loading: false, error: err }));
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
