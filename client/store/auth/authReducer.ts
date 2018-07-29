import { Reducer } from 'redux';
import { AuthStateTypes, IAuthState } from './types';

const initialState: IAuthState = {
  jwt: null,
  loading: false,
};

export const authReducer: Reducer<IAuthState> = (state = initialState, action) => {
  switch (action.type) {
  case AuthStateTypes.LOGIN_REQUEST:
    return { ...state, loading: true };

  default:
    return state;
  }
};