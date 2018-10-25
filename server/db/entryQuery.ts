import Entry, { IEntryModel } from '../models/Entry';
import { IEntryQuery } from '../types';

export const find = (username: string) => Entry.findOne({ username });

export const create = (entry: IEntryModel) => new Entry(entry).save();

export const get = (query: IEntryQuery) => Entry.getEntries(query);

export const getSingle = (username: string) => Entry.getEntry(username);
