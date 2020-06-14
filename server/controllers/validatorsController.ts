import * as express from 'express';
import { validationResult } from 'express-validator/check';
import CustomError from '../helpers/customError';

interface IError {
  msg: string;
}

export const checkForErrors: express.RequestHandler = async (
  req,
  _res,
  next
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((item: IError) => item.msg);
    throw new CustomError(messages[0]);
  }
  return next();
};

export const createReview: express.RequestHandler = async (req, res, next) => {
  const { review } = res.locals;
  const { disliked, liked } = req.body;

  if (!liked && !disliked) {
    throw new CustomError("Couldn't find liked or disliked value.");
  }

  if (review && ((review.disliked && disliked) || (review.liked && liked))) {
    return res.status(200).json({ message: 'Already submitted.' });
  }

  return next();
};

export const ban: express.RequestHandler = async (req, _res, next) => {
  const { userId, reviewId } = req.body;

  if (!userId && !reviewId) {
    throw new CustomError('Need userId or reviewId value.');
  }

  return next();
};
