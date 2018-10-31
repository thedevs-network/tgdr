import { Document, model, Model, Schema } from 'mongoose';
import { IGetReviewsQuery } from '../types';
import { getLimit, getSkip } from '../utils';

export interface IReviewSchema extends Document {
  created_at: Date;
  entry: string;
  liked: boolean;
  disliked: boolean;
  text?: string;
  user: string;
}

export interface IReviewModel extends Model<IReviewSchema> {
  getReviews(query: IGetReviewsQuery): Promise<{
    data: IReviewSchema[];
    limit: number;
    skip: number;
  }>; 
}

const reviewSchema: Schema = new Schema({
  created_at: { type: Date, required: true, default: () => new Date() },
  disliked: { type: Boolean, required: true },
  entry: { type: Schema.Types.ObjectId, ref: 'Entry' },
  liked: { type: Boolean, required: true },
  text: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});


reviewSchema.static('getReviews', async function(query: IGetReviewsQuery) {
  const $limit = getLimit(query);
  const $skip = getSkip(query);

  const data = await this.aggregate([
    { $match: { entry: query.entryId } },
    { $project: { _id: 0, __v: 0, entry: 0, user: 0 } },
    { $sort: { created_at: -1 } },
    { $skip },
    { $limit },
  ]);

  return {
    data,
    limit: $limit,
    skip: $skip,
  };
});

const Review: IReviewModel = model<IReviewSchema, IReviewModel>(
  'Review',
  reviewSchema
);

export default Review;
