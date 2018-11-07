import { action } from 'typesafe-actions';
import axios from 'axios';
import { EntryStateTypes } from './entryTypes';
import { AsyncAction, IEntry } from '../storeTypes';
import { getAuthHeader } from '../../utils';

export const entryRequest = () => action(EntryStateTypes.REQUEST);

export const entrySuccess = (payload: IEntry) =>
  action(EntryStateTypes.SUCCESS, payload);

export const entryFailure = () => action(EntryStateTypes.FAILURE);

export const getEntry: AsyncAction = (username: string) => async (
  dispatch,
  getState
) => {
  dispatch(entryRequest());
  try {
    const {
      data: { data },
    } = await axios.get(
      `/api/entry/${username.replace('@', '')}`,
      getAuthHeader(getState)
    );
    dispatch(entrySuccess(data));
  } catch (error) {
    dispatch(entryFailure());
  }
};

export const reportEntry: AsyncAction = (values: {
  reason: string;
  info?: string;
}) => (_d, getState) => {
  const {
    data: { username },
  } = getState().entry;

  const data = {
    ...values,
    username,
  };
  
  return axios.post('/api/entry/report', data, getAuthHeader(getState));
};
