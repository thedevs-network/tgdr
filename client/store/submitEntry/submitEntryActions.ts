import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import { ISubmitEntryParams, SubmitEntryStateTypes } from './submitEntryTypes';
import { wait } from '../../utils';

const submitEntryRequest = (): AnyAction => ({
  type: SubmitEntryStateTypes.SUBMIT_ENTRY_REQUEST,
});

const submitEntrySuccess = (): AnyAction => ({
  type: SubmitEntryStateTypes.SUBMIT_ENTRY_SUCCESS,
});

const submitEntryFailure = (payload): AnyAction => ({
  payload,
  type: SubmitEntryStateTypes.SUBMIT_ENTRY_FAILURE,
});

export const submitEntryClear = (): AnyAction => ({
  type: SubmitEntryStateTypes.SUBMIT_ENTRY_CLEAR,
});

export const submitNewEntry = (params: ISubmitEntryParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(submitEntryRequest());
    await wait(500);
    await axios.post('/api/entry/submit', params);
    dispatch(submitEntrySuccess());
  } catch (error) {
    const { error: errorMessage, status = 'error' } = error.response.data;
    dispatch(submitEntryFailure({ error: errorMessage, status }));
  }
};
