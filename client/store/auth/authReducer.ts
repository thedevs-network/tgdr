import { Reducer } from 'redux';
import { AuthStateTypes, IAuthState } from './types';
import { shortenLongName } from '../../utils';

const initialState: IAuthState = {
  isFetched: false,
  isLoading: false,
  message: {
    text: null,
    title: null,
    type: null,
  },
  token: null,
};

export const authReducer: Reducer<IAuthState> = (state = initialState, action) => {
  switch (action.type) {
  case AuthStateTypes.LOGIN_REQUEST:
    return { ...state, isLoading: true };

  case AuthStateTypes.LOGIN_SUCCESS:
    return {
      ...state,
      isFetched: true,
      isLoading: false,
      message: {
        text: 'You have logged in successfully.',
        title: `Welcome ${shortenLongName(action.payload.name, 17)}`,
        type: 'success'
      },
      token: action.payload.token,
    };

  case AuthStateTypes.LOGIN_FAILURE:
    return {
      ...state,
      isFetched: true,
      isLoading: false,
      message: {
        text: "Coudn't login. Please try again later.",
        title: 'Error',
        type: 'error'
      },
    };

  default:
    return state;
  }
};