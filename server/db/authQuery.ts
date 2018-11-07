import User from '../models/User';
import { IUserQuery } from '../types';

export const find = (telegram_id: number) => User.findOne({ telegram_id });

export const create = (telegram_id: number, userData: IUserQuery) =>
  User.findOneAndUpdate({ telegram_id }, userData, {
    new: true,
    setDefaultsOnInsert: true,
    upsert: true,
  });
