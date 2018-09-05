import * as express from 'express';
import CustomError from '../helpers/customError';

export const send: express.ErrorRequestHandler = (error, _req, res, _next) => {
  // If it's not a custom error message send a generic error message
  const message =
    error instanceof CustomError ? error.message : 'An error occurred.';

  res.status(422).json({ error: message });
};
