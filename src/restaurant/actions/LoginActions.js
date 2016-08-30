import AppDispatcher from './../../dispatcher/AppDispatcher';
import { doLogin } from './../WebAPIUtils/login';

export function login(credentials) {
  // Call method to send credentials to API
  doLogin(credentials);
}

export function loginSuccess(user) {
  AppDispatcher.dispatch({
    actionType: 'LOGIN_SUCCESS',
    user,
  });

  // Save user details in local storage
  if (localStorage.getItem('BUSINESS')) {
    localStorage.removeItem('BUSINESS');
  }
  localStorage.setItem('BUSINESS', JSON.stringify(user));
}

export function loginFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'LOGIN_FAILED',
    error,
  });
}
