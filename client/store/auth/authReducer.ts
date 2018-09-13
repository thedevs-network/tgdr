import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import { RootAction } from '../storeTypes';
import * as authActions from './authActions';
import { IAuthState } from './authTypes';
import { shortenLongName } from '../../utils';
import { getAuthMessages } from '../../../constants/texts';

const initialState: IAuthState = {
  isAuthenticated: false,
  isFetched: false,
  isLoading: false,
  message: {
    text: null,
    title: null,
    type: null,
  },
  name: null,
  token: null,
};

export const authReducer: Reducer<IAuthState> = (
  state = initialState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(authActions.requestLogin):
      return { ...state, isAuthenticated: false, isLoading: true };

    case getType(authActions.loginSuccessful):
    case getType(authActions.renewTokenSuccessful):
      return {
        ...state,
        isAuthenticated: true,
        isFetched: true,
        isLoading: false,
        message: getAuthMessages(shortenLongName(action.payload.name, 17))
          .success,
        name: action.payload.name,
        token: action.payload.token,
      };

    case getType(authActions.loginFailure):
      return {
        ...state,
        isAuthenticated: false,
        isFetched: true,
        isLoading: false,
        message: getAuthMessages(null).error,
      };

    default:
      return state;
  }
};
