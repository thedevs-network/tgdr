import Entry, { IEntryModel } from '../models/Entry';
import { IEntryQuery } from '../types';

export const find = (username: string) => Entry.findOne({ username });

export const create = (etnry: IEntryModel) => new Entry(etnry).save();

export const get = (query: IEntryQuery) => Entry.getEntries(query);
