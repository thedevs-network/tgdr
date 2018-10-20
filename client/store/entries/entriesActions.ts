import { action } from 'typesafe-actions';
import axios from 'axios';
import queryString from 'query-string';
import {
  EntriesStateTypes,
  IGetEntriesParams,
  IGetEntriesResponse,
} from './entriesTypes';
import { AsyncAction } from '../storeTypes';

export const entriesRequest = (payload: IGetEntriesParams) =>
  action(EntriesStateTypes.REQUEST, payload);

export const entriesSuccess = (payload: IGetEntriesResponse) =>
  action(EntriesStateTypes.SUCCESS, payload);
export const entriesFailure = () => action(EntriesStateTypes.FAILURE);

export const getEntries: AsyncAction = (
  params: IGetEntriesParams
) => async dispatch => {
  const query = queryString.stringify(params);
  dispatch(entriesRequest(params));
  try {
    const {
      data: { data },
    } = await axios.get(`/api/etnry?${query}`);
    dispatch(entriesSuccess(data));
  } catch (error) {
    dispatch(entriesFailure());
  }
};
