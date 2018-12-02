import { Document, model, Model, Schema, Types } from 'mongoose';
import { IGetReviewsQuery } from '../types';
import { getLimit, getSkip } from '../utils';

export interface IReviewSchema extends Document {
  created_at: Date;
  entry: Types.ObjectId;
  liked: boolean;
  disliked: boolean;
  text?: string;
  user: Types.ObjectId;
}

export interface IReviewModel extends Model<IReviewSchema> {
  getReviews(
    query: IGetReviewsQuery
  ): Promise<{
    data: IReviewSchema[];
    limit: number;
    skip: number;
  }>;
  getSingle(body: Partial<IReviewSchema>): Promise<IReviewSchema>;
}

const reviewSchema: Schema = new Schema({
  created_at: { type: Date, required: true, default: Date.now },
  disliked: { type: Boolean, required: true },
  entry: { type: Schema.Types.ObjectId, ref: 'Entry' },
  liked: { type: Boolean, required: true },
  text: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

reviewSchema.static('getReviews', async function(query: IGetReviewsQuery) {
  const $limit = getLimit(query);
  const $skip = getSkip(query);

  const [{ data, info }] = await this.aggregate([
    { $match: { entry: query.entryId, text: { $exists: true, $ne: null } } },
    {
      $facet: {
        data: [
          { $sort: { created_at: -1 } },
          { $skip },
          { $limit },
          {
            $lookup: {
              as: 'users',
              foreignField: '_id',
              from: 'users',
              localField: 'user',
            },
          },
          {
            $addFields: {
              user: { $arrayElemAt: ['$users', 0] },
            },
          },
          {
            $project: {
              _id: 1,
              created_at: 1,
              disliked: 1,
              first_name: '$user.first_name',
              last_name: '$user.last_name',
              liked: 1,
              text: 1,
            },
          },
        ],
        info: [{ $count: 'total' }],
      },
    },
  ]);

  return {
    data,
    limit: $limit,
    skip: $skip,
    total: info[0] ? info[0].total : 0,
  };
});

reviewSchema.static('getSingle', async function(body: Partial<IReviewSchema>) {
  const [data] = await this.aggregate([
    { $match: body },
    {
      $lookup: {
        as: 'users',
        foreignField: '_id',
        from: 'users',
        localField: 'user',
      },
    },
    {
      $addFields: {
        user: { $arrayElemAt: ['$users', 0] },
      },
    },
    {
      $project: {
        _id: 1,
        created_at: 1,
        disliked: 1,
        first_name: '$user.first_name',
        last_name: '$user.last_name',
        liked: 1,
        text: 1,
      },
    },
  ]);

  return data || {};
});

const Review: IReviewModel = model<IReviewSchema, IReviewModel>(
  'Review',
  reviewSchema
);

export default Review;
