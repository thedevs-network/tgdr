import { Reducer } from 'redux';
import producer from 'immer';
import { ITagsState, TagsStateTypes } from './tagsTypes';
import { RootAction } from '../storeTypes';

const initialState: ITagsState = {
  actives: [],
  data: {},
  isFetched: false,
};

export const tagsReducer: Reducer<ITagsState> = (
  state = initialState,
  action: RootAction
) =>
  producer(state, draft => {
    switch (action.type) {
      case TagsStateTypes.LOAD:
        draft.data = action.payload;
        draft.isFetched = true;
        return;

      case TagsStateTypes.SET_ACTIVES:
        draft.actives = action.payload;
        return;
    }
  });
