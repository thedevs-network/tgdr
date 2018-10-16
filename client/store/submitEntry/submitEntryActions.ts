import { action } from 'typesafe-actions';
import axios from 'axios';
import { ISubmitEntryParams, SubmitEntryStateTypes } from './submitEntryTypes';
import { getAuthHeader, wait } from '../../utils';
import { AsyncAction } from '../storeTypes';

export const submitEntryRequest = () =>
  action(SubmitEntryStateTypes.REQUEST);

export const submitEntrySuccess = () =>
  action(SubmitEntryStateTypes.SUCCESS);

export const submitEntryFailure = (payload: {
  error: string;
  status: 0 | 1 | 2 | 'error' | 'success';
}) => action(SubmitEntryStateTypes.FAILURE, payload);

export const submitEntryClear = () =>
  action(SubmitEntryStateTypes.CLEAR);

export const submitNewEntry: AsyncAction = (
  params: ISubmitEntryParams
) => async (dispatch, getState) => {
  try {
    dispatch(submitEntryRequest());
    await wait(500);
    await axios.post('/api/entry/submit', params, getAuthHeader(getState));
    dispatch(submitEntrySuccess());
  } catch (error) {
    const { error: errorMessage, status = 'error' } = error.response.data;
    dispatch(submitEntryFailure({ error: errorMessage, status }));
  }
};
