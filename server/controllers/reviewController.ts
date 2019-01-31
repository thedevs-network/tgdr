import * as express from 'express';
import * as entryQuery from '../db/entryQuery';
import * as authQuery from '../db/authQuery';
import * as reviewQuery from '../db/reviewQuery';
import CustomError from '../helpers/customError';
import {
  getEntryFeedback,
  getEntryRemoveFeedback,
  getReviewsQuery,
  getScore,
} from '../utils';
import { sendUserSpamReport } from './botController';
import { Types } from 'mongoose';

export const withReview: express.RequestHandler = async (req, res, next) => {
  const review = await reviewQuery.findOne({
    entry: res.locals.entry && Types.ObjectId(res.locals.entry._id.toString()),
    user: req.user && Types.ObjectId(req.user._id.toString()),
  });

  res.locals.review = review;

  return next();
};

export const withReviewById: express.RequestHandler = async (
  req,
  res,
  next
) => {
  const review = await reviewQuery.findById(req.body.reviewId);

  res.locals.review = review;

  return next();
};

export const get: express.RequestHandler = async (req, res) => {
  const query = getReviewsQuery({
    ...req.query,
    entryId: Types.ObjectId(res.locals.entry._id),
  });
  const reiews = await reviewQuery.get(query);
  return res.status(200).json(reiews);
};

export const create: express.RequestHandler = async (req, res) => {
  const { entry, review } = res.locals;
  const { disliked, liked, username } = req.body;
  const { user } = req;

  const userReviewing = await authQuery.setReviewingFlag(user.telegram_id);

  if (!userReviewing) {
    throw new CustomError("Can't review multiple times at once");
  }

  await reviewQuery.create({
    ...req.body,
    created_at: new Date(),
    disliked: !!disliked,
    entry: Types.ObjectId(entry._id),
    liked: !!liked,
    user: Types.ObjectId(user._id),
  });
  
  if (!(review.liked === !!liked && review.disliked === !!disliked)) {
    const feedbacks = getEntryFeedback(review, disliked, liked);
    const score = getScore(entry, feedbacks);
    await entryQuery.update(username, { ...feedbacks, score });
    const updatedUser = await authQuery.updateLikes(
      user.telegram_id,
      feedbacks
    );
    sendUserSpamReport(updatedUser);
  } else {
    await authQuery.setReviewingFlag(user.telegram_id, false);
  }

  return res
    .status(201)
    .json({ message: 'Review has been submitted successfully.' });
};

export const remove: express.RequestHandler = async (req, res) => {
  const { entry, review } = res.locals;

  if (!review) throw new CustomError("Couldn't find the review");

  await reviewQuery.remove(review);

  const feedbacks = getEntryRemoveFeedback(review);
  const score = getScore(entry, feedbacks);
  await entryQuery.update(entry.username, { ...feedbacks, score });
  const updatedUser = await authQuery.updateLikes(
    req.user.telegram_id,
    feedbacks
  );
  sendUserSpamReport(updatedUser);

  return res
    .status(200)
    .json({ message: 'Review has been deleted successfully.' });
};
