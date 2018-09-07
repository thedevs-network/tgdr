import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import { ISubmitEntryParams, SubmitEntryStateTypes } from './submitEntryTypes';

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

export const submitNewEntry = (params: ISubmitEntryParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(submitEntryRequest());
    await axios.post('/api/entry/submit', params);
    dispatch(submitEntrySuccess());
  } catch (error) {
    const { status = 'error' } = error.response.data;
    dispatch(submitEntryFailure(status));
  }
};
