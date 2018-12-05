import * as express from 'express';
import * as botController from './botController';
import cloudinary from '../cloudinary';
import { IEntrySchema } from '../models/Entry';
import * as entryQuery from '../db/entryQuery';
import { getEntryQuery, isAdmin, omitExtraFields } from '../utils';
import CustomError from '../helpers/customError';

export const checkExistence: express.RequestHandler = async (
  req,
  res,
  next
) => {
  const username = req.body.username.toLowerCase();

  const entry: IEntrySchema = await entryQuery.findOne({ username });

  if (entry) {
    return res.status(422).json({
      error: 'Entry is already submitted.',
      status: entry.status,
      ...(entry.reject_reason && { reject_reason: entry.reject_reason }),
    });
  }

  return next();
};

export const getDetails: express.RequestHandler = async (req, res, next) => {
  const { category, description, title, username } = req.body;

  const isBot = /^\w+bot$/gi.test(username);

  const entryDetails = isBot
    ? await botController.getBotDetails(username)
    : await botController.getChatDetails(username);

  res.locals.entry = {
    ...entryDetails,
    category,
    description,
    telegram_id: entryDetails.id,
    title,
    username,
  };

  next();
};

export const downloadImage: express.RequestHandler = async (
  _req,
  res,
  next
) => {
  const { image, username } = res.locals.entry;

  res.locals.entry.nophoto = !image;

  if (!image) return next();

  await cloudinary.v2.uploader.upload(image, {
    public_id: username.toLowerCase(),
  });

  next();
};

export const create: express.RequestHandler = async (_req, res, next) => {
  await entryQuery.create(res.locals.entry);
  next();
};

export const update: express.RequestHandler = async (req, res) => {
  await entryQuery.update(req.body.username, req.body, req.user.isAdmin);
  return res.status(200).json({
    message: 'Entry has been updated successfully.',
  });
};

export const get: express.RequestHandler = async (req, res) => {
  const query = getEntryQuery(req.query);
  const entries = await entryQuery.get(query);
  return res.status(200).json(entries);
};

export const withEntry: express.RequestHandler = async (req, res, next) => {
  const username = req.body.username || req.params.username;
  const admin = req.user && isAdmin(req.user.telegram_id);
  const query = {
    username,
    ...(!admin && { status: req.body.status || req.params.status || 'active' }),
  };

  const entry = await entryQuery.findOne(query);

  if (!entry) throw new CustomError("Couldn't find the entry");

  res.locals.entry = entry;

  return next();
};

export const getSingle: express.RequestHandler = async (_req, res) => {
  const { entry, review } = res.locals;
  const data = omitExtraFields({ ...entry, review });
  return res.status(200).json({ data });
};
