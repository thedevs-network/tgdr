import { IReview } from "../storeTypes";

export enum ReviewsStateTypes {
  REQUEST = '@@reviews/REQUEST',
  SUCCESS = '@@reviews/SUCCESS',
  FAILURE = '@@reviews/FAILURE',
  SUBMIT_REQUEST = '@@reviews/SUBMIT_REQUEST',
  SUBMIT_SUCCESS = '@@reviews/SUBMIT_SUCCESS',
  SUBMIT_FAILURE = '@@reviews/SUBMIT_FAILURE',
}

export interface IReviewsState extends Readonly<{
  data: IReview[];
  isLoading: boolean;
  limit: number;
  skip: number;
  total: number;
}> {}

export interface ISubmitReviewParams {
  liked?: boolean;
  disliked?: boolean;
  text?: string;
  username: string;
}