import { IMessage } from '../storeTypes';

export enum AuthStateTypes {
  AUTHENTICATE = '@@auth/AUTHENTICATE',
  LOGIN_FAILURE = '@@auth/LOGIN_FAILURE',
  LOGIN_REQUEST = '@@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGOUT_REQUEST = '@@auth/LOGOUT_REQUEST',
  LOGOUT_SUCCESS = '@@auth/LOGOUT_SUCCESS',
  RENEW_SUCCESS = '@@auth/RENEW_SUCCESS',
  RENEW_FAILURE = '@@auth/RENEW_FAILURE',
}

export interface ILoginParams {
  auth_date: string;
  first_name: string;
  hash: string;
  id: number;
  photo_url: string;
  username: string;
}

export interface IAuthState
  extends IMessage,
    Readonly<{
      isAuthenticated: boolean;
      isFetched: boolean;
      isLoading: boolean;
      name: string;
      token: string;
    }> {}

export interface IToken {
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  name: string;
  token?: string;
}
