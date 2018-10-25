import { Reducer } from 'redux';
import produce from 'immer';
import { EntryStateTypes, IEntryState } from './entryTypes';
import { RootAction } from '../storeTypes';

const initialState: IEntryState = {
  data: null,
  hasError: false,
  isLoading: false,
};

export const entryReducer: Reducer<IEntryState> = (
  state = initialState,
  action: RootAction
) =>
  produce(state, draft => {
    switch (action.type) {
      case EntryStateTypes.REQUEST:
        draft.hasError = false;
        draft.isLoading = true;
        return;

      case EntryStateTypes.SUCCESS:
        draft.data = action.payload;
        draft.hasError = false;
        draft.isLoading = false;
        return;

      case EntryStateTypes.FAILURE:
        draft.hasError = true;
        draft.isLoading = false;
        return;
    }
  });
