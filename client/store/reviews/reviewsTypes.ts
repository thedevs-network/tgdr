import { IReview } from "../storeTypes";

export enum ReviewsStateTypes {
  REQUEST = '@@reviews/REQUEST',
  SUCCESS = '@@reviews/SUCCESS',
  FAILURE = '@@reviews/FAILURE',
}

export interface IReviewsState extends Readonly<{
  data: IReview[];
  isLoading: boolean;
  limit: number;
  skip: number;
}> {}