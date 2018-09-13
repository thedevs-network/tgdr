import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import axios from 'axios';
import * as Cookie from 'js-cookie';
import * as jwtDecode from 'jwt-decode';
import differenceInDays from 'date-fns/difference_in_days';
import { AuthStateTypes, ILoginParams, IToken } from './authTypes';

export const requestLogin = () => action(AuthStateTypes.LOGIN_REQUEST);

export const loginSuccessful = (payload: IToken) =>
  action(AuthStateTypes.LOGIN_SUCCESS, payload);

export const loginFailure = () => action(AuthStateTypes.LOGIN_FAILURE);

export const requestLogout = () => action(AuthStateTypes.LOGOUT_REQUEST);

export const logoutSuccessful = () => action(AuthStateTypes.LOGOUT_REQUEST);

export const renewTokenSuccessful = (payload: IToken) =>
  action(AuthStateTypes.RENEW_SUCCESS, payload);

const decodeToken = (token: string): IToken => jwtDecode(token);

const saveToken = (token: string) => {
  const decodedToken = decodeToken(token);
  const daysToExpire = differenceInDays(decodedToken.exp, decodedToken.iat);
  Cookie.set('token', token, { expires: daysToExpire });
  axios.defaults.headers.common.Authorization = token;
};

const deleteToken = () => Cookie.remove('token');

export const login = (params: ILoginParams) => async (dispatch: Dispatch) => {
  try {
    dispatch(requestLogin());
    const {
      data: { token },
    } = await axios.post('/api/auth/login', params);
    saveToken(token);
    const decodedToken = decodeToken(token);
    dispatch(loginSuccessful({ ...decodedToken, token }));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logout = () => (dispatch: Dispatch) => {
  dispatch(requestLogout());
  deleteToken();
  axios.defaults.headers.common.Authorization = null;
  dispatch(logoutSuccessful());
};

export const renewToken = (token: string) => async (dispatch: Dispatch) => {
  try {
    const {
      data: { token: newToken },
    } = await axios.post('/api/auth/renew', null, {
      headers: {
        Authorization: token,
      },
    });
    saveToken(newToken);
    const decodedToken = decodeToken(newToken);
    dispatch(renewTokenSuccessful({ ...decodedToken, token }));
  } catch (error) {
    deleteToken();
  }
};
