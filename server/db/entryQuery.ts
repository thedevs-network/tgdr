import Entry, { IEntryModel } from '../models/Entry';
import { IEntryQuery } from '../types';
import { getEntryUpdates } from '../utils';

export const find = (username: string) => Entry.findOne({ username }).lean();

export const create = (entry: IEntryModel) => new Entry(entry).save();

export const update = async (
  username: string,
  body: Record<string, string | number | boolean>,
  isAdmin = false,
) => {
  const updates = getEntryUpdates(body, isAdmin);
  await Entry.updateOne({ username }, updates, {
    runValidators: true,
    setDefaultsOnInsert: true,
  });
};

export const get = (query: IEntryQuery) => Entry.getEntries(query);
