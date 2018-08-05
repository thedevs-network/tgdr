import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import * as Cookie from 'js-cookie';
import * as jwtDecode from 'jwt-decode';
import differenceInDays from 'date-fns/difference_in_days';
import { AuthStateTypes, ILoginParams, IToken } from './types';

const requestLogin = (): AnyAction => ({
  type: AuthStateTypes.LOGIN_REQUEST
});

const loginSuccessful = (payload: IToken & { token: string }): AnyAction => ({
  payload,
  type: AuthStateTypes.LOGIN_SUCCESS,
});

const loginFailure = (): AnyAction => ({
  type: AuthStateTypes.LOGIN_FAILURE,
});

const decodeToken = (token: string): IToken => jwtDecode(token);

const saveToken = (token: string) => {
  const decodedToken = decodeToken(token);
  const daysToExpire = differenceInDays(decodedToken.exp, decodedToken.iat);
  Cookie.set('token', token, { expires: daysToExpire });
};

export const login = (params: ILoginParams) => async (dispatch: Dispatch) => {
  try {
    dispatch(requestLogin());
    const { data: { token } } = await axios.post('/api/auth/login', params);
    saveToken(token);
    const decodedToken = decodeToken(token);
    dispatch(loginSuccessful({ ...decodedToken, token }));
  } catch (error) {
    dispatch(loginFailure());
    return Promise.reject(error);
  }
}; 