import { Reducer } from 'redux';
import produce from 'immer';
import { IReviewsState, ReviewsStateTypes } from './reviewsTypes';
import { RootAction } from '../storeTypes';

const initialState: IReviewsState = {
  data: null,
  isLoading: false,
  limit: 4,
  skip: 0,
};

export const rviewsReducer: Reducer<IReviewsState> = (
  state = initialState,
  action: RootAction
) =>
  produce(state, draft => {
    switch (action.type) {
      case ReviewsStateTypes.REQUEST:
        draft.skip = action.payload;
        draft.isLoading = true;
        return;

      case ReviewsStateTypes.SUCCESS:
        draft.data = action.payload;
        draft.isLoading = false;
        return;

      case ReviewsStateTypes.FAILURE:
        draft.isLoading = false;
        return;
    }
  });
