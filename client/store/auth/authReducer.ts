import { Reducer } from 'redux';
import { AuthStateTypes, IAuthState } from './authTypes';
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
  action
) => {
  const messsages =
    action.payload &&
    action.payload.name &&
    getAuthMessages(shortenLongName(action.payload.name, 17));

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
        message: messsages.success,
        name: action.payload.name,
        token: action.payload.token,
      };

    case AuthStateTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetched: true,
        isLoading: false,
        message: messsages.error,
      };

    default:
      return state;
  }
};
