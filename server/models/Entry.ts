import { Document, model, Model, Schema } from 'mongoose';
import { StatusEnum, TypeEnum } from '../../constants/entry';

export interface IEntrySchema extends Document {
  category: string;
  created_at: Date;
  description: string;
  dislikes: number;
  likes: number;
  members?: number;
  ratio: number;
  reject_reason?: string;
  status: number;
  telegram_id?: number;
  title: string;
  type: number;
  username: string;
}

export interface IEntryModel extends Model<IEntrySchema> {
  getTags(): Array<{
    count: number;
    tag: string;
  }>;
}

const entrySchema: Schema = new Schema({
  category: { type: String, required: true },
  created_at: { type: Date, required: true, default: () => new Date() },
  description: {
    maxlength: 800,
    minlength: 20,
    required: true,
    trim: true,
    type: String,
  },
  dislikes: { type: Number, required: true, default: 0 },
  likes: { type: Number, required: true, default: 0 },
  members: Number,
  ratio: { type: Number, required: true, default: 0 },
  reject_reason: String,
  status: { type: Number, required: true, default: 0, min: 0, max: 2 },
  telegram_id: { type: Number },
  title: {
    maxlength: 54,
    minlength: 3,
    required: true,
    trim: true,
    type: String,
  },
  type: { type: Number, required: true, min: 0, max: 2 },
  username: {
    index: true,
    lowercase: true,
    required: true,
    trim: true,
    type: String,
  },
});

entrySchema.pre<IEntrySchema>('save', function(next) {
  this.ratio = Math.round((this.likes / (this.likes + this.dislikes)) * 100);
  next();
});

entrySchema.static('getTags', async function() {
  const data = await this.aggregate([
    { $match: { status: StatusEnum.active } },
    { $project: { tagList: ['$type', '$category'] } },
    { $unwind: '$tagList' },
    { $group: { _id: '$tagList', count: { $sum: 1 } } },
    { $project: { count: '$count', tag: '$_id' } },
  ]);

  // Reduce data to show it as "tag: count"
  const list = data.reduce(
    (obj, { count, tag }) => ({
      ...obj,
      [typeof tag === 'number' ? TypeEnum[tag] : tag]: count,
    }),
    {}
  );

  return list;
});

const Entry: IEntryModel = model<IEntrySchema, IEntryModel>(
  'Entry',
  entrySchema
);

export default Entry;
