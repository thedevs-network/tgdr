import { Document, model, Model, Schema } from 'mongoose';

export interface IReviewSchema extends Document {
  created_at: Date;
  entry: string;
  liked: boolean;
  disliked: boolean;
  text?: string;
  user: string;
}

const reviewSchema: Schema = new Schema({
  created_at: { type: Date, required: true, default: () => new Date() },
  disliked: { type: Boolean, required: true },
  entry: { type: Schema.Types.ObjectId, ref: 'Entry' },
  liked: { type: Boolean, required: true },
  text: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Review: Model<IReviewSchema> = model<IReviewSchema>(
  'Review',
  reviewSchema
);

export default Review;
