import { action } from 'typesafe-actions';
import axios from 'axios';
import { EntryStateTypes } from './entryTypes';
import { AsyncAction, IEntry } from '../storeTypes';

export const entryRequest = () => action(EntryStateTypes.REQUEST);

export const entrySuccess = (payload: IEntry) =>
  action(EntryStateTypes.SUCCESS, payload);

export const entryFailure = () => action(EntryStateTypes.FAILURE);

export const getEntry: AsyncAction = (username: string) => async dispatch => {
  dispatch(entryRequest());
  try {
    const {
      data: { data },
    } = await axios.get(`/api/entry/${username}`);
    dispatch(entrySuccess(data));
  } catch (error) {
    dispatch(entryFailure());
  }
};
