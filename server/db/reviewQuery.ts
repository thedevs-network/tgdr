import { Document } from 'mongoose';
import Review, { IReviewSchema } from '../models/Review';
import { IReviewQuery } from '../types';
import { getReviewUpdate } from '../utils';

export const findOne = async (body: Partial<IReviewSchema>) =>
  Review.findOne(body);

export const create = async (body: IReviewQuery) => {
  const { entry, user } = body;
  const updates = getReviewUpdate(body);
  await Review.updateOne(
    { entry, user },
    updates,
    { upsert: true, runValidators: true }
  );
};

export const remove = async (id: string | Document) =>
  Review.findByIdAndRemove(id);
