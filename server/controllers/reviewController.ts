import * as express from 'express';
import * as entryQuery from '../db/entryQuery';
import * as reviewQuery from '../db/reviewQuery';

export const create: express.RequestHandler = async (req, res) => {
  const { liked, text, username } = req.body;
  const entry = await entryQuery.getSingle(username);
  await reviewQuery.create({
    entryId: entry._id,
    liked,
    text,
    userId: req.user._id,
  });
  return res
    .status(201)
    .json({ message: 'Review has been submitted successfully.' });
};