import { action } from 'typesafe-actions';
import axios from 'axios';
import * as Cookie from 'js-cookie';
import * as jwtDecode from 'jwt-decode';
import differenceInDays from 'date-fns/difference_in_days';
import { AuthStateTypes, ILoginParams, IToken } from './authTypes';
import { AsyncAction } from '../storeTypes';
import { getAuthHeader } from '../../utils';

export const authenticateUser = (payload: IToken) =>
  action(AuthStateTypes.AUTHENTICATE, payload);

export const requestLogin = () => action(AuthStateTypes.LOGIN_REQUEST);

export const loginSuccessful = (payload: IToken) =>
  action(AuthStateTypes.LOGIN_SUCCESS, payload);

export const loginFailure = (payload: string) =>
  action(AuthStateTypes.LOGIN_FAILURE, payload);

export const loginClear = () => action(AuthStateTypes.CLEAR);

export const requestLogout = () => action(AuthStateTypes.LOGOUT_REQUEST);

export const logoutSuccessful = () => action(AuthStateTypes.LOGOUT_REQUEST);

export const renewTokenSuccessful = (payload: IToken) =>
  action(AuthStateTypes.RENEW_SUCCESS, payload);

export const renewTokenFailure = () => action(AuthStateTypes.RENEW_FAILURE);

export const decodeToken = (token: string): IToken => jwtDecode(token);

const saveToken = (token: string) => {
  const decodedToken = decodeToken(token);
  const daysToExpire = differenceInDays(decodedToken.exp, decodedToken.iat);
  Cookie.set('token', token, { expires: daysToExpire });
};

const deleteToken = () => Cookie.remove('token');

export const login: AsyncAction = (params: ILoginParams) => async dispatch => {
  try {
    dispatch(requestLogin());
    const {
      data: { token },
    } = await axios.post('/api/auth/login', params);
    saveToken(token);
    const decodedToken = decodeToken(token);
    dispatch(loginSuccessful({ ...decodedToken, token }));
  } catch (error) {
    const { error: messaege } = error.response.data;
    dispatch(loginFailure(messaege));
  }
};

export const logout: AsyncAction = () => dispatch => {
  dispatch(requestLogout());
  deleteToken();
  dispatch(logoutSuccessful());
};

export const renewToken: AsyncAction = () => async (dispatch, getState) => {
  try {
    const {
      data: { token },
    } = await axios.post('/api/auth/renew', null, getAuthHeader(getState));
    saveToken(token);
    const decodedToken = decodeToken(token);
    dispatch(renewTokenSuccessful({ ...decodedToken, token }));
  } catch (error) {
    deleteToken();
    dispatch(renewTokenFailure());
  }
};
