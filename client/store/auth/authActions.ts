import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import { AuthStateTypes, ILoginParams } from './types';

const requestLogin = (): AnyAction => ({
  type: AuthStateTypes.LOGIN_REQUEST
});

export const login = (params: ILoginParams) => async (dispatch: Dispatch) => {
  try {
    dispatch(requestLogin());
    const res = await axios.post('/api/auth/login', params);
  } catch (error) {
    return;
  }
}; 