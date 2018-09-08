import User from '../models/User';

export const find = (telegram_id: number) => User.findOne({ telegram_id });

interface IUserData {
  first_name: string;
  telegram_id: number;
  username?: string;
}

export const findAndUpdate = (telegram_id: number, userData: IUserData) =>
  User.findOneAndUpdate({ telegram_id }, userData, {
    new: true,
    upsert: true,
  });
