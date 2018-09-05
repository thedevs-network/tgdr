import * as express from 'express';
import { validationResult } from 'express-validator/check';
import CustomError from '../helpers/customError';

interface IError {
  msg: string;
}

export const entry: express.RequestHandler = async (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((item: IError) => item.msg);
    throw new CustomError(messages[0]);
  }
  return next();
};
