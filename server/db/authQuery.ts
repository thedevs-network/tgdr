import User, { IUserModel } from '../models/User';
import { getFeedbackUpdates } from '../utils';

export const find = (telegram_id: number) => User.findOne({ telegram_id });

export const create = (telegram_id: number, userData: Partial<IUserModel>) =>
  User.findOneAndUpdate({ telegram_id }, userData, {
    new: true,
    setDefaultsOnInsert: true,
    upsert: true,
  });

export const setReviewingFlag = async (telegram_id: number) => {
  return User.findOneAndUpdate(
    { telegram_id, reviewing: { $ne: true } },
    { reviewing: true },
    {
      new: true,
    }
  ).lean();
};

export const updateLikes = async (
  telegram_id: number,
  userData: Partial<IUserModel>
) => {
  const updates = getFeedbackUpdates(userData);
  return User.findOneAndUpdate(
    { telegram_id },
    { ...updates, reviewing: false },
    {
      new: true,
    }
  ).lean();
};
