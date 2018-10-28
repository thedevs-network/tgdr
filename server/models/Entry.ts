import { Document, model, Model, Schema } from 'mongoose';
import { IEntryQuery } from '../types';
import {
  getLimit,
  getMatches,
  getSkip,
  getSort,
} from '../utils';
import CustomError from '../helpers/customError';

export interface IEntrySchema extends Document {
  category: string;
  created_at: Date;
  description: string;
  dislikes: number;
  likes: number;
  members?: number;
  ratio: number;
  reject_reason?: string;
  status: 'pending' | 'active' | 'rejected';
  telegram_id?: number;
  title: string;
  type: 'channel' | 'bot' | 'supergroup';
  username: string;
}

export interface IEntryModel extends Model<IEntrySchema> {
  getTags(): Promise<
    Array<{
      count: number;
      tag: string;
    }>
  >;
  getEntries(
    query: IEntryQuery
  ): Promise<
    {
      data: IEntrySchema[];
      limit: number;
      skip: number;
    } & IEntryQuery
  >;
  getEntry(username: string): Promise<IEntrySchema>;
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
  status: {
    default: 'pending',
    enum: ['pending', 'active', 'rejected'],
    required: true,
    type: String,
  },
  telegram_id: { type: Number },
  title: {
    maxlength: 54,
    minlength: 3,
    required: true,
    trim: true,
    type: String,
  },
  type: {
    enum: ['channel', 'bot', 'supergroup'],
    required: true,
    type: String,
  },
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

entrySchema.static('getEntry', async function(username: string) {
  const entry = await this.findOne({ username }).lean();
  if (!entry) throw new CustomError("Couldn't find the entry.");
  return entry;
});

entrySchema.static('getEntries', async function(query: IEntryQuery) {
  const $match = getMatches(query);
  const $limit = getLimit(query);
  const $skip = getSkip(query);
  const sort = getSort(query);

  const data = await this.aggregate([
    { $match },
    { $project: { _id: 0, __v: 0 } },
    { $sort: { [sort]: -1 } },
    { $skip },
    { $limit },
  ]);

  return {
    data,
    ...query,
    limit: $limit,
    skip: $skip,
  };
});

entrySchema.static('getTags', async function() {
  const data = await this.aggregate([
    { $match: { status: 'active' } },
    { $project: { tagList: ['$type', '$category'] } },
    { $unwind: '$tagList' },
    { $group: { _id: '$tagList', count: { $sum: 1 } } },
    { $project: { count: '$count', tag: '$_id' } },
  ]);

  // Reduce data to show it as "tag: count"
  const list = data.reduce(
    (obj, { count, tag }) => ({
      ...obj,
      [tag]: count,
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
