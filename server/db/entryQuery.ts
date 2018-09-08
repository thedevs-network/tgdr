import Entry, { IEntryModel } from '../models/Entry';

export const find = (username: string) => Entry.findOne({ username });

export const create = (etnry: IEntryModel) => new Entry(etnry).save();
