import { action } from 'typesafe-actions';
import { ReviewsStateTypes } from './reviewsTypes';
import { IReview } from '../storeTypes';

export const reviewsRequest = (skip: number) =>
  action(ReviewsStateTypes.REQUEST, skip);

export const reviewsSuccess = (data: IReview[]) =>
  action(ReviewsStateTypes.SUCCESS, data);

export const reviewsFailure = () => action(ReviewsStateTypes.FAILURE);
