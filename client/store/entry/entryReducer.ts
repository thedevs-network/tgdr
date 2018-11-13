import { Reducer } from 'redux';
import produce from 'immer';
import { EntryStateTypes, IEntryState } from './entryTypes';
import { RootAction } from '../storeTypes';
import { ReviewsStateTypes } from '../reviews';
import { AuthStateTypes } from '../auth';

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

      case AuthStateTypes.LOGOUT_REQUEST:
        if(draft.data) {
          draft.data.review = {};
        }
        return;

      case ReviewsStateTypes.SUBMIT_REQUEST:
        const liked = action.payload && action.payload.liked;
        const disliked = action.payload && action.payload.disliked;
        if (
          draft.data.review.liked === liked &&
          draft.data.review.disliked === disliked
        ) {
          return;
        }
        if (!liked && !disliked) {
          draft.data.likes =
            draft.data.likes - (draft.data.review.liked ? 1 : 0);
          draft.data.dislikes =
            draft.data.dislikes - (draft.data.review.disliked ? 1 : 0);
        }
        if (liked) {
          draft.data.likes = draft.data.likes + 1;
          draft.data.dislikes =
            draft.data.dislikes - (draft.data.review.disliked ? 1 : 0);
        }
        if (disliked) {
          draft.data.dislikes = draft.data.dislikes + 1;
          draft.data.likes =
            draft.data.likes - (draft.data.review.liked ? 1 : 0);
        }
        draft.data.review.liked = liked;
        draft.data.review.disliked = disliked;
        return;
    }
  });
