import { Document, model, Model, Schema } from 'mongoose';
import { IReviewQuery } from '../types';

export interface IReviewSchema extends Document {
  created_at: Date;
  entry: string;
  liked: boolean;
  text?: string;
  user: string;
}

export interface IReviewModel extends Model<IReviewSchema> {
  add(query: IReviewQuery): Promise<void>;
}

const reviewSchema: Schema = new Schema({
  created_at: { type: Date, required: true, default: () => new Date() },
  entry: { type: Schema.Types.ObjectId, ref: 'Entry' },
  liked: { type: Boolean, required: true },
  text: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

reviewSchema.static('add', async function(query: IReviewQuery) {
  const { entryId, liked, text, userId } =  query;
  await this.updateOne(
    { entry: query.entryId, user: query.userId },
    { entry: entryId, liked, text, user: userId },
    { upsert: true, runValidators: true }
  );
});

const Review: IReviewModel = model<IReviewSchema, IReviewModel>(
  'Review',
  reviewSchema
);

export default Review;
