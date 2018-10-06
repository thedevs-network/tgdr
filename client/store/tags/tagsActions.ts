import { action } from 'typesafe-actions';
import axios from 'axios';
import { ITags, TagsStateTypes } from './tagsTypes';
import { AsyncAction } from '../storeTypes';

export const loadTags = (payload: ITags[]) =>
  action(TagsStateTypes.TAGS_LOAD, payload);

export const getTags: AsyncAction = () => async (dispatch, getState) => {
  const { isFetched } = getState().tags;
  if (isFetched) return null;

  const {
    data: { data },
  } = await axios.get('/api/tags');
  dispatch(loadTags(data));
};
