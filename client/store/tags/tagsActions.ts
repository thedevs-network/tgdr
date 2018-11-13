import { action } from 'typesafe-actions';
import axios from 'axios';
import { ITags, TagsStateTypes } from './tagsTypes';
import { AsyncAction } from '../storeTypes';

export const loadTags = (payload: ITags) =>
  action(TagsStateTypes.LOAD, payload);

export const setActiveTags = (payload: string[]) =>
  action(TagsStateTypes.SET_ACTIVES, payload);

export const getTags: AsyncAction = () => async (dispatch, getState) => {
  const { isFetched } = getState().tags;
  if (isFetched) return null;

  const {
    data: { data },
  } = await axios.get('/api/tags');
  dispatch(loadTags(data));
};
