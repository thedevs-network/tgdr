import { Reducer } from 'redux';
import { AuthStateTypes, IAuthState } from './types';
import { shortenLongName } from '../../utils';

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
  action
) => {
  switch (action.type) {
    case AuthStateTypes.LOGIN_REQUEST:
      return { ...state, isAuthenticated: false, isLoading: true };

    case AuthStateTypes.LOGIN_SUCCESS:
    case AuthStateTypes.RENEW_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetched: true,
        isLoading: false,
        message: {
          text: 'You have logged in successfully.',
          title: `Welcome ${shortenLongName(action.payload.name, 17)}`,
          type: 'success',
        },
        name: action.payload.name,
        token: action.payload.token,
      };

    case AuthStateTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetched: true,
        isLoading: false,
        message: {
          text: "Coudn't login. Please try again later.",
          title: 'Error',
          type: 'error',
        },
      };

    default:
      return state;
  }
};
