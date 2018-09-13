import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import * as typeActions from './tagsActions';
import { ITagsState } from './tagsTypes';
import { RootAction } from '../storeTypes';

const initialState: ITagsState = {
  data: null,
  isFetched: false,
};

export const tagsReducer: Reducer<ITagsState> = (
  state = initialState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(typeActions.loadTags):
      return { ...state, data: action.payload, isFetched: true };

    default:
      return state;
  }
};
