import Entry, { IEntryModel } from '../models/Entry';
import * as redis from '../redis';

export const find = (username: string) => Entry.findOne({ username });

export const create = (etnry: IEntryModel) => new Entry(etnry).save();

export const getTags = async () => {
  const cachedTags = await redis.get('tags');

  if (cachedTags) return JSON.parse(cachedTags);

  const tags = await Entry.getTags();
  await redis.set('tags', JSON.stringify(tags), 'EX', 10);
  return tags;
};
