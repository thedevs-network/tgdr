import * as express from 'express';
import * as tagsQuery from '../db/tagsQuery';

export const getTags: express.RequestHandler = async (_req, res) => {
  const tags = await tagsQuery.getTags();
  return res.status(200).json({ data: tags });
};
