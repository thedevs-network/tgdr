import * as express from 'express';
import * as entryQuery from '../db/entryQuery';
import * as reviewQuery from '../db/reviewQuery';
import CustomError from '../helpers/customError';
import {
  getEntryFeedback,
  getEntryRemoveFeedback,
  getReviewsQuery,
  getScore,
} from '../utils';

export const withReview: express.RequestHandler = async (req, res, next) => {
  const review = await reviewQuery.findOne({
    entry: res.locals.entry,
    user: req.user,
  });

  res.locals.review = review;

  return next();
};

export const get: express.RequestHandler = async (req, res) => {
  const query = getReviewsQuery({
    ...req.query,
    entryId: res.locals.entry._id,
  });
  const reiews = await reviewQuery.get(query);
  return res.status(200).json(reiews);
};

export const create: express.RequestHandler = async (req, res) => {
  const { entry, review } = res.locals;
  const { disliked, liked, username } = req.body;

  await reviewQuery.create({
    ...req.body,
    disliked: !!disliked,
    entry,
    liked: !!liked,
    user: req.user,
  });

  const feedbacks = getEntryFeedback(review, disliked, liked);
  const score = getScore(entry, feedbacks);
  await entryQuery.update(username, { ...feedbacks, score });

  return res
    .status(201)
    .json({ message: 'Review has been submitted successfully.' });
};

export const remove: express.RequestHandler = async (req, res) => {
  const { review } = res.locals;
  const { username } = req.body;

  if (!review) throw new CustomError("Couldn't find the review");

  await reviewQuery.remove(review);

  const feedbackQuery = getEntryRemoveFeedback(review.liked);
  await entryQuery.update(username, feedbackQuery);

  return res
    .status(200)
    .json({ message: 'Review has been deleted successfully.' });
};
