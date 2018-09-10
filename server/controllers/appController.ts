import * as express from 'express';
import * as Next from 'next';

export const renderHomepage = (app: Next.Server) => (
  req: express.Request,
  res: express.Response
) => {
  app.render(req, res, '/');
};
