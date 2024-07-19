import Cookies from 'js-cookie';
import { DataService } from '../../config/dataService';
import actions from './actions';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (values, callback, errorHandle) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      // const response = await DataService.post('/users/login/', values);
      // if (response.data.errors) {
      //   dispatch(loginErr(response.data.errors));
      // } else {
      //   Cookies.set('access_token', response.data.token.access_token);
      //   Cookies.set('loggedIn', true);
      //   dispatch(loginSuccess(true));
      //   callback();
      // }
      Cookies.set('access_token', 'cr7');
      Cookies.set('loggedIn', true);
      dispatch(loginSuccess(true));
      callback();
    } catch (err) {
      dispatch(loginErr(err));
      errorHandle();
    }
  };
};

const register = (values) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post('/users/register/', values);
      if (response.data.errors) {
        dispatch(loginErr('Registration failed!'));
      } else {
        dispatch(loginSuccess(false));
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = (callback) => {
  return async (dispatch) => {
    dispatch(logoutBegin());
    try {
      Cookies.remove('loggedIn');
      Cookies.remove('access_token');
      dispatch(logoutSuccess(false));
      callback();
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut, register };
