import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import axios from 'axios';
import * as botController from './botController';

export const getDetails: express.RequestHandler = async (req, res, next) => {
  const { category, description, title, username } = req.body;
  
  const isBot = /^\w+bot$/ig.test(username);

  const entryDetails = isBot 
      ? await botController.getBotDetails(username) 
      : await botController.getChatDetails(username);

  res.locals.entry = {
    ...entryDetails,
    category,
    description, 
    title,
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

  response.data.on('end', next);

  response.data.on('error', () => {
    throw new Error('An error occurred');
  });
};