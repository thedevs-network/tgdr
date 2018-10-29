import * as express from 'express';
import * as entryQuery from '../db/entryQuery';
import * as reviewQuery from '../db/reviewQuery';
import CustomError from '../helpers/customError';
import { getEntryFeedback, getEntryRemoveFeedback, getScore } from '../utils';

export const create: express.RequestHandler = async (req, res) => {
  const { disliked, liked, username } = req.body;
  if (!liked && !disliked) {
    throw new CustomError("Couldn't liked or disliked values.");
  }

  if (liked && disliked) {
    throw new CustomError('Can not both like and dislike an entry.');
  }

  const entry = await entryQuery.find(username);

  if (!entry) throw new CustomError("Couldn't find the entry");

  const review = await reviewQuery.findOne({
    entry,
    user: req.user,
  });

  
  if (review && ((review.disliked && disliked) || (review.liked && liked))) {
    return res.status(200).json({ message: 'Already submitted.' });
  }
  
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
  const { username } = req.body;
  const entry = await entryQuery.find(username);

  if (!entry) throw new CustomError("Couldn't find the entry");

  const review = await reviewQuery.findOne({
    entry,
    user: req.user,
  });

  if (!review) throw new CustomError("Couldn't find the review");

  await reviewQuery.remove(review);

  const feedbackQuery = getEntryRemoveFeedback(review.liked);
  await entryQuery.update(username, feedbackQuery);

  return res
    .status(200)
    .json({ message: 'Review has been deleted successfully.' });
};
