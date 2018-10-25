import * as express from 'express';
import * as botController from './botController';
import cloudinary from '../cloudinary';
import { IEntrySchema } from '../models/Entry';
import * as entryQuery from '../db/entryQuery';
import { getEntryQuery } from '../utils';

export const checkExistence: express.RequestHandler = async (
  req,
  res,
  next
) => {
  const username = req.body.username.toLowerCase();

  const entry: IEntrySchema = await entryQuery.find(username);

  if (entry) {
    return res.status(422).json({
      error: 'Entry is already submitted.',
      status: entry.status,
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

  const entryType = isBot ? 'bot' : entryDetails.type;

  res.locals.entry = {
    ...entryDetails,
    category,
    description,
    telegram_id: entryDetails.id,
    title,
    type: entryType,
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

  if (!image) return next();

  await cloudinary.v2.uploader.upload(image, {
    public_id: username.toLowerCase(),
  });

  next();
};

export const createEntry: express.RequestHandler = async (_req, res) => {
  await entryQuery.create(res.locals.entry);
  return res.status(201).json({
    message: 'Entry has been submitted successfully.',
  });
};

export const getEntries: express.RequestHandler = async (req, res) => {
  const query = getEntryQuery(req.query);
  const entries = await entryQuery.get(query);
  return res.status(201).json(entries);
};

export const getEntry: express.RequestHandler = async (req, res) => {
  const { username } = req.params;
  const entry = await entryQuery.getSingle(username);
  return res.status(201).json(entry);
};
