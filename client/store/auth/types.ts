export enum AuthStateTypes {
  LOGIN_REQUEST = '@@auth/LOGIN_REQUEST'
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
  readonly jwt: string;
  readonly loading: boolean;
}