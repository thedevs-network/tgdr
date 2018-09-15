import { Reducer } from 'redux';
import producer from 'immer';
import { ITagsState, TagsStateTypes } from './tagsTypes';
import { RootAction } from '../storeTypes';

const initialState: ITagsState = {
  data: null,
  isFetched: false,
};

export const tagsReducer: Reducer<ITagsState> = (
  state = initialState,
  action: RootAction
) =>
  producer(state, draft => {
    switch (action.type) {
      case TagsStateTypes.TAGS_LOAD:
        draft.data = action.payload;
        draft.isFetched = true;
        return;
    }
  });
