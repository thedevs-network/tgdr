import { Reducer } from 'redux';
import produce from 'immer';
import { RootAction } from '../storeTypes';
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
  action: RootAction
) =>
  produce(state, draft => {
    switch (action.type) {
      case AuthStateTypes.AUTHENTICATE:
        draft.isAuthenticated = true;
        draft.token = action.payload;
        return;

      case AuthStateTypes.LOGIN_REQUEST:
        draft.isAuthenticated = false;
        draft.isLoading = true;
        return;

      case AuthStateTypes.LOGIN_SUCCESS:
      case AuthStateTypes.RENEW_SUCCESS:
        draft.isAuthenticated = true;
        draft.isFetched = true;
        draft.isLoading = false;
        draft.message = getAuthMessages(
          shortenLongName(action.payload.name, 17)
        ).success;
        draft.name = action.payload.name;
        draft.token = action.payload.token;
        return;

      case AuthStateTypes.LOGIN_FAILURE:
        draft.isAuthenticated = false;
        draft.isFetched = true;
        draft.isLoading = false;
        draft.message = getAuthMessages(null).error;
        return;
    }
  });
