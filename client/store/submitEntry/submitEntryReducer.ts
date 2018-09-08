import { Reducer } from 'redux';
import { ISubmitEntryState, SubmitEntryStateTypes } from './submitEntryTypes';
import { getSubmitEntryMessages } from '../../../constants/texts';

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
  action
) => {
  switch (action.type) {
    case SubmitEntryStateTypes.SUBMIT_ENTRY_REQUEST:
      return { ...state, isLoading: true };

    case SubmitEntryStateTypes.SUBMIT_ENTRY_SUCCESS:
      return {
        ...state,
        isFetched: true,
        isLoading: false,
        message: getSubmitEntryMessages().success,
      };

    case SubmitEntryStateTypes.SUBMIT_ENTRY_FAILURE:
      return {
        ...state,
        isFetched: true,
        isLoading: false,
        message: getSubmitEntryMessages(action.payload.error)[
          action.payload.status
        ],
      };

    case SubmitEntryStateTypes.SUBMIT_ENTRY_CLEAR:
      return initialState;

    default:
      return state;
  }
};
