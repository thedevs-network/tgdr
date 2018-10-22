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
  const params = {
    category: findIn('categories'),
    sort: findIn('sorts'),
    type: findIn('types'),
  };

  const query = R.pick(['category', 'sort', 'type'], params);

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

  const findFirstIn = findCategory(categories, first);
  const findSecondIn = findCategory(categories, second);

  const params = {
    category: findSecondIn('categories'),
    sort: findSecondIn('sorts'),
    type: findFirstIn('types'),
  };

  const query = R.pick(['category', 'sort', 'type'], params);

  if (query.type && query.sort) {
    return app.render(req, res, '/list', query);
  }

  if (query.type && query.category) {
    return app.render(req, res, '/', query);
  }

  return next();
};


export const renderThreeLevel = (app: Next.Server) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { category, sort, type } = req.params;

  const params = {
    category: findCategory(categories, category)('categories'),
    sort: findCategory(categories, sort)('sorts'),
    type: findCategory(categories, type)('types'),
  };

  const query = R.pick(['category', 'sort', 'type'], params);

  const size = getLength(query);
  if (size !== 3) return next();

  return app.render(req, res, '/list', query);
};
