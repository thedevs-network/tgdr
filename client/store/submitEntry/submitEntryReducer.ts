import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import * as submitEntryActions from './submitEntryActions';
import { ISubmitEntryState } from './submitEntryTypes';
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
) => {
  switch (action.type) {
    case getType(submitEntryActions.submitEntryRequest):
      return { ...state, isLoading: true };

    case getType(submitEntryActions.submitEntrySuccess):
      return {
        ...state,
        isFetched: true,
        isLoading: false,
        message: getSubmitEntryMessages().success,
      };

    case getType(submitEntryActions.submitEntryFailure):
      return {
        ...state,
        isFetched: true,
        isLoading: false,
        message: getSubmitEntryMessages(action.payload.error)[
          action.payload.status
        ],
      };

    case getType(submitEntryActions.submitEntryClear):
      return initialState;

    default:
      return state;
  }
};
