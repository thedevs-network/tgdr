import { Reducer } from 'redux';
import produce from 'immer';
import { ISubmitEntryState, SubmitEntryStateTypes } from './submitEntryTypes';
import { getSubmitEntryMessages } from '../../../constants/texts';
import { RootAction } from '../storeTypes';

const initialState: ISubmitEntryState = {
  isFetched: false,
  isLoading: false,
  message: {
    text: null,
    title: null,
    type: null,
  },
};

export const submitEntryReducer: Reducer<ISubmitEntryState> = (
  state = initialState,
  action: RootAction
) =>
  produce(state, draft => {
    switch (action.type) {
      case SubmitEntryStateTypes.REQUEST:
        draft.isLoading = true;
        return;

      case SubmitEntryStateTypes.SUCCESS:
        draft.isFetched = true;
        draft.isLoading = false;
        draft.message = getSubmitEntryMessages().success;
        return;

      case SubmitEntryStateTypes.FAILURE:
        draft.isFetched = true;
        draft.isLoading = false;
        draft.message = getSubmitEntryMessages(
          action.payload.error,
          action.payload.reject_reason
        )[action.payload.status];
        return;

      case SubmitEntryStateTypes.CLEAR:
        return initialState;
    }
  });
