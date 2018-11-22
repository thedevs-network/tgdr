import { Document } from 'mongoose';
import * as redis from '../redis';
import Entry, { IEntryModel, IEntrySchema } from '../models/Entry';
import { IEntryQuery } from '../types';
import { getEntryUpdates, stringifyValues } from '../utils';

export const getNonBots = () => Entry.getNonBots();

export const findOne = async (query: Partial<IEntrySchema>) => {
  const queryString = stringifyValues(query);

  if (query.status) {
    const cachedEntry = await redis.get(queryString);
  
    if (cachedEntry) return JSON.parse(cachedEntry);
  }

  const entry = await Entry.findOne(query).lean();
  if (entry && query.status) {
    await redis.set(queryString, JSON.stringify(entry), 'EX', 60 * 60 * 1);
  }
  return entry;
};

export const findById = (entry: string | Document) =>
  Entry.findById(entry).lean();

export const create = (entry: IEntryModel) => Entry.create(entry);

export const update = async (
  username: string,
  body: Record<string, string | number | boolean>,
  isAdmin = false
) => {
  const updates = getEntryUpdates(body, isAdmin);
  const entry = await Entry.findOneAndUpdate({ username }, updates, {
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  const queryString = stringifyValues({
    status: entry.status,
    username: entry.username,
  });
  await redis.set(queryString, JSON.stringify(entry), 'EX', 60 * 60 * 1);
  return entry;
};

export const get = async (query: IEntryQuery) => {
  const queryString = stringifyValues(query);

  const cachedEntries = await redis.get(queryString);

  if (cachedEntries) return JSON.parse(cachedEntries);

  const entries = await Entry.getEntries(query);
  await redis.set(queryString, JSON.stringify(entries), 'EX', 60 * 60 * 1);
  return entries;
};
