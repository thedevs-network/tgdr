import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import axios from 'axios';
import * as botController from './botController';
import { StatusEnum, TypeEnum } from '../../constants/entry';
import Entry, { IEntryModel } from '../models/Entry';

export const checkExistence: express.RequestHandler = async (
  req, 
  res, 
  next,
) => {
  const { username } = req.body;
  
  const entry: IEntryModel = await Entry.findOne({username});

  if (entry) {
    return res.status(422).json({ 
      error: 'Entry is already submitted.', 
      status: StatusEnum[entry.status] 
    });
  }

  return next();
};

export const getDetails: express.RequestHandler = async (req, res, next) => {
  const { category, description, title, username } = req.body;
  
  const isBot = /^\w+bot$/ig.test(username);
  
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
    type: TypeEnum[entryType],
    username,
  };

  next();

};

export const downloadImage: express.RequestHandler = async (_req, res,next) => {
  const { username } = res.locals.entry;
    
  const fileLocalPath = path.join(
      __dirname, 
      '../../static/images/entry', 
      `${username}.jpg`
    );

  const response = await axios({
    method: 'GET',
    responseType: 'stream',
    url: res.locals.entry.image,
  });

  response.data.pipe(fs.createWriteStream(fileLocalPath));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
      next();
    });
  
    response.data.on('error', reject);
  });
};

export const createEntry: express.RequestHandler = async (_req, res) => {
  const entry = new Entry(res.locals.entry);
  await entry.save();
  return res.status(201).json({ 
    message: 'Entry has been submitted successfully.'
  });
};