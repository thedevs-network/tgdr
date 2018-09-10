import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import { TagsStateTypes } from './tagsTypes';
import { getStateType } from '../generalStateTypes';

const loadTags = (payload): AnyAction => ({
  payload,
  type: TagsStateTypes.TAGS_LOAD,
});

export const getTags = () => async (
  dispatch: Dispatch,
  getState: getStateType
) => {
  const { isFetched } = getState().tags;
  if (isFetched) return null;

  const { data } = await axios.get('/api/tags');
  dispatch(loadTags(data));
};
