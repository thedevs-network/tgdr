import { Reducer } from 'redux';
import produce from 'immer';
import { EntriesStateTypes, IEntriesState } from './entriesTypes';
import { RootAction } from '../storeTypes';

const initialState: IEntriesState = {
  category: null,
  data: {
    bot: {
      hot: [],
      new: [],
      top: [],
    },
    channel: {
      hot: [],
      new: [],
      top: [],
    },
    supergroup: {
      hot: [],
      new: [],
      top: [],
    },
  },
  hasError: false,
  limit: 9,
  skip: 0,
  total: 0,
};

export const entriesReducer: Reducer<IEntriesState> = (
  state = initialState,
  action: RootAction
) =>
  produce(state, draft => {
    switch (action.type) {
      case EntriesStateTypes.REQUEST:
        return;

      case EntriesStateTypes.SUCCESS:
        draft.category = action.payload.category;
        draft.limit = action.payload.limit;
        draft.skip = action.payload.skip;
        draft.total = action.payload.total;
        draft.hasError = false;
        draft.data[action.payload.type][action.payload.sort] = action.payload
          .loadMore
          ? [
              ...draft.data[action.payload.type][action.payload.sort],
              ...action.payload.data,
            ]
          : action.payload.data;
        return;

      case EntriesStateTypes.FAILURE:
        draft.hasError = true;
        return;
    }
  });
