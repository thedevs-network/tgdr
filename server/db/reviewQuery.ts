import { Document } from 'mongoose';
import Review, { IReviewSchema } from '../models/Review';
import { IGetReviewsQuery, IReviewQuery } from '../types';
import { getReviewUpdate } from '../utils';

export const get = (query: IGetReviewsQuery) => Review.getReviews(query);

export const findById = (id: string) => Review.findById(id);

export const findOne = (body: Partial<IReviewSchema>) => Review.getSingle(body);

export const create = async (body: IReviewQuery) => {
  const { entry, user } = body;
  const updates = getReviewUpdate(body);
  await Review.updateOne({ entry, user }, updates, {
    runValidators: true,
    setDefaultsOnInsert: true,
    upsert: true,
  });
};

export const remove = (id: string | Document) => Review.findByIdAndRemove(id);
