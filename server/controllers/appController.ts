import * as express from 'express';
import * as Next from 'next';
import * as R from 'ramda';
import * as categories from '../../constants/categories';
import { findCategory, getLength } from '../utils';

export const renderHomepage = (app: Next.Server) => (
  req: express.Request,
  res: express.Response
) => {
  const defaultQuery = { sort: 'top' };
  return app.render(req, res, '/', defaultQuery);
};

export const renderOneLevel = (app: Next.Server) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { cat } = req.params;

  const findIn = findCategory(categories, cat);
  const query = {
    category: findIn('categories'),
    sort: findIn('sorts'),
    type: findIn('types'),
  };

  const size = getLength(query);
  if (!size) return next();

  return app.render(req, res, '/', query);
};

export const renderTwoLevel = (app: Next.Server) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { first, second } = req.params;

  if (first === '_next') return next();

  const findFirstIn = findCategory(categories, first);
  const findSecondIn = findCategory(categories, second);

  const query = {
    category: findSecondIn('categories'),
    sort: findSecondIn('sorts'),
    type: findFirstIn('types'),
  };

  if (!query.type || (!query.sort && !query.category)) return next();
  return app.render(req, res, '/', query);
};

export const renderThreeLevel = (app: Next.Server) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { category, sort, type } = req.params;

  const query = {
    category: findCategory(categories, category)('categories'),
    sort: findCategory(categories, sort)('sorts'),
    type: findCategory(categories, type)('types'),
  };

  const size = getLength(query);
  if (size !== 3) return next();

  return app.render(req, res, '/', query);
};

export const renderSingle = (app: Next.Server) => (
  req: express.Request,
  res: express.Response
) => app.render(req, res, '/single', req.params);
