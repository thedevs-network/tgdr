import * as express from 'express';

export const send: express.ErrorRequestHandler = (error, _req, res, _next) => {

  // If it's axios error show a generic error
  const message = error.response && error.response.status
  ? 'An error occurred.'
  : error.message;
  
  res.status(422).json({ error: message });
};