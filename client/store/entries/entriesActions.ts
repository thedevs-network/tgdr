import { action } from 'typesafe-actions';
import queryString from 'query-string';
import { Axios } from '../../utils';
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
) => async (dispatch, getState) => {
  const { limit, skip } = getState().entries;

  const paramsWithDefaults = {
    limit,
    ...params,
  }

  const newSkip = params.loadMore ? paramsWithDefaults.limit + skip : 0;
    
  const query = queryString.stringify(paramsWithDefaults);
  dispatch(entriesRequest(paramsWithDefaults));
  try {
    const { data } = await Axios.get(`/api/entry?skip=${newSkip}&${query}`);
    dispatch(entriesSuccess({ ...data, loadMore: params.loadMore }));
  } catch (error) {
    dispatch(entriesFailure());
  }
};
