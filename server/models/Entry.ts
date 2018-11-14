import { Document, model, Model, Schema } from 'mongoose';
import { IEntryQuery } from '../types';
import { getLimit, getMatches, getSearch, getSkip, getSort } from '../utils';

export interface IEntrySchema extends Document {
  category: string;
  created_at: Date;
  description: string;
  dislikes: number;
  featured?: boolean;
  likes: number;
  members?: number;
  nophoto?: boolean;
  ratio: number;
  reject_reason?: string;
  score?: number;
  status: 'pending' | 'active' | 'rejected';
  telegram_id?: number;
  title: string;
  type: 'channel' | 'bot' | 'supergroup';
  username: string;
  verified?: boolean;
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
  getNonBots(): Promise<IEntrySchema[]>;
}

const entrySchema: Schema = new Schema({
  category: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  description: {
    maxlength: 800,
    minlength: 20,
    required: true,
    trim: true,
    type: String,
  },
  dislikes: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false },
  likes: { type: Number, required: true, default: 0 },
  members: Number,
  nophoto: Boolean,
  reject_reason: String,
  score: Number,
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
  verified: { type: Boolean, default: false },
});

entrySchema.index(
  {
    category: 'text',
    description: 'text',
    title: 'text',
    username: 'text',
  },
  {
    weights: {
      category: 1,
      description: 2,
      title: 3,
      username: 4,
    },
  }
);

entrySchema.virtual('ratio').set(function() {
  const all = this.likes + this.dislikes;
  if (all === 0) return 0;
  return Math.round((this.likes / all) * 100);
});

entrySchema.static('getEntries', async function(query: IEntryQuery) {
  const search = getSearch(query);
  const match = getMatches(query);
  const $limit = getLimit(query);
  const $skip = getSkip(query);
  const $sort = getSort(query);

  const [{ data, info }] = await this.aggregate([
    { $match: { ...match, ...search } },
    {
      $facet: {
        data: [
          { $sort },
          { $skip },
          { $limit },
          { $project: { _id: 0, __v: 0 } },
          {
            $addFields: {
              ratio: {
                $cond: [
                  { $eq: ['$likes', 0] },
                  0,
                  {
                    $trunc: {
                      $multiply: [
                        {
                          $divide: [
                            '$likes',
                            { $add: ['$likes', '$dislikes'] },
                          ],
                        },
                        100,
                      ],
                    },
                  },
                ],
              },
            },
          },
        ],
        info: [{ $count: 'total' }],
      },
    },
  ]);

  return {
    data,
    ...query,
    limit: $limit,
    skip: $skip,
    total: info[0] ? info[0].total : 0,
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

entrySchema.static('getNonBots', async function() {
  const data = await this.aggregate([
    { $match: { $or: [{ type: 'channel'}, { type: 'supergroup' }] } },
  ]);
  return data;
});

const Entry: IEntryModel = model<IEntrySchema, IEntryModel>(
  'Entry',
  entrySchema
);

export default Entry;
