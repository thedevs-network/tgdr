import * as express from 'express';
import * as signale from 'signale';
import CustomError from '../helpers/customError';
import config from '../config';

export const send: express.ErrorRequestHandler = (error, _req, res, _next) => {
  // If it's not a custom error message use a generic error message
  const message =
    error instanceof CustomError ? error.message : 'An error occurred.';

  if (config.is_dev) signale.fatal(error);

  res.status(422).json({ error: message });
};
