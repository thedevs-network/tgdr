import { action } from 'typesafe-actions';
import { Axios } from '../../utils';
import {
  IReviewsState,
  ISubmitReviewParams,
  ReviewsStateTypes,
} from './reviewsTypes';
import { AsyncAction } from '../storeTypes';
import { getAuthHeader } from '../../utils';

export const reviewsRequest = (skip: number) =>
  action(ReviewsStateTypes.REQUEST, skip);

export const reviewsSuccess = (
  payload: Partial<IReviewsState & { loadMore: boolean }>
) => action(ReviewsStateTypes.SUCCESS, payload);

export const reviewsFailure = () => action(ReviewsStateTypes.FAILURE);

export const submitReviewRequest = (payload: ISubmitReviewParams) =>
  action(ReviewsStateTypes.SUBMIT_REQUEST, payload);

export const submitReviewSuccess = (payload: ISubmitReviewParams) =>
  action(ReviewsStateTypes.SUBMIT_SUCCESS, payload);

export const submitReviewFailure = () =>
  action(ReviewsStateTypes.SUBMIT_FAILURE);

export const getReviews: AsyncAction = (
  username: string,
  loadMore: boolean
) => async (dispatch, getState) => {
  const { limit, skip } = getState().reviews;
  const newSkip = loadMore ? limit + skip : 0;
  dispatch(reviewsRequest(newSkip));
  try {
    const { data } = await Axios.get(
      `/api/review/${username.replace('@', '')}?skip=${newSkip}`,
      getAuthHeader(getState)
    );
    dispatch(reviewsSuccess({ ...data, loadMore }));
  } catch (error) {
    dispatch(reviewsFailure());
  }
};

export const submitReview: AsyncAction = (
  params: ISubmitReviewParams
) => async (dispatch, getState) => {
  dispatch(submitReviewRequest(params));
  try {
    const isDelete = !params.liked && !params.disliked;
    if (isDelete) {
      await Axios.delete(
        `/api/review/${params.username}`,
        getAuthHeader(getState)
      );
    } else {
      await Axios.post('/api/review', params, getAuthHeader(getState));
    }
    dispatch(submitReviewSuccess(params));
  } catch (error) {
    dispatch(submitReviewFailure());
  }
};
