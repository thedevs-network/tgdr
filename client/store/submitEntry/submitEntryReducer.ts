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
      case SubmitEntryStateTypes.SUBMIT_ENTRY_REQUEST:
        draft.isLoading = true;
        return;

      case SubmitEntryStateTypes.SUBMIT_ENTRY_SUCCESS:
        draft.isFetched = true;
        draft.isLoading = false;
        draft.message = getSubmitEntryMessages().success;
        return;

      case SubmitEntryStateTypes.SUBMIT_ENTRY_FAILURE:
        draft.isFetched = true;
        draft.isLoading = false;
        draft.message = getSubmitEntryMessages(action.payload.error)[
          action.payload.status
        ];
        return;

      case SubmitEntryStateTypes.SUBMIT_ENTRY_CLEAR:
        return initialState;
    }
  });
