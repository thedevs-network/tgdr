import { Reducer } from 'redux';
import { ITagsState, TagsStateTypes } from './tagsTypes';

const initialState: ITagsState = {
  data: null,
  isFetched: false,
};

export const tagsReducer: Reducer<ITagsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TagsStateTypes.TAGS_LOAD:
      return { ...state, data: action.payload, isFetched: true };

    default:
      return state;
  }
};
