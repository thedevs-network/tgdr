import Entry from '../models/Entry';
import * as redis from '../redis';

export const getTags = async () => {
  const cachedTags = await redis.get('tags');

  if (cachedTags) return JSON.parse(cachedTags);

  const tags = await Entry.getTags();
  await redis.set('tags', JSON.stringify(tags), 'EX', 60 * 60 * 6);
  return tags;
};
