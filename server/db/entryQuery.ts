import { Document } from 'mongoose';
import Entry, { IEntryModel } from '../models/Entry';
import { IEntryQuery } from '../types';
import { getEntryUpdates } from '../utils';

export const getNonBots = () => Entry.getNonBots();

export const findOne = (username: string) => Entry.findOne({ username }).lean();

export const findById = (entry: string | Document) =>
  Entry.findById(entry).lean();

export const create = (entry: IEntryModel) => Entry.create(entry);

export const update = async (
  username: string,
  body: Record<string, string | number | boolean>,
  isAdmin = false
) => {
  const updates = getEntryUpdates(body, isAdmin);
  await Entry.updateOne({ username }, updates, {
    runValidators: true,
    setDefaultsOnInsert: true,
  });
};

export const get = (query: IEntryQuery) => Entry.getEntries(query);
