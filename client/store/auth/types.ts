export enum AuthStateTypes {
  LOGIN_FAILURE = '@@auth/LOGIN_FAILURE',
  LOGIN_REQUEST = '@@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGOUT_REQUEST = '@@auth/LOGOUT_REQUEST',
  LOGOUT_SUCCESS = '@@auth/LOGOUT_SUCCESS',
}

export interface ILoginParams {
  auth_date: string;
  first_name: string;
  hash: string;
  id: number;
  photo_url: string;
  username: string;
}

export interface IAuthState {
  readonly isFetched: boolean;
  readonly isLoading: boolean;
  readonly message: {
    text: string
    title: string
    type: 'success' | 'error'
  };
  readonly name: string;
  readonly token: string;
}

export interface IToken {
  exp: number;
  iat: number;
  iss: string;
  sub: string;
}