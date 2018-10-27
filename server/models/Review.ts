import { Document, model, Model, Schema } from 'mongoose';

export interface IReviewModel extends Document {
  created_at: Date;
  entry: string;
  liked: number,
  text?: string,
  user: string;
}

const reviewSchema: Schema = new Schema({
  created_at: { type: Date, required: true, default: () => new Date() },
  entry: { type: Schema.Types.ObjectId, ref: 'Entry' },
  liked: { type: Number, required: true, max: 1 },
  text: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Review: Model<IReviewModel> = model<IReviewModel>('Review', reviewSchema);

export default Review;